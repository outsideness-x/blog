import { test, expect } from '@playwright/test';

const routes = ['/', '/projects', '/contacts', '/projects/orot', '/projects/diple', '/projects/inkept', '/projects/chemical', '/playground'];
const widths = [320, 360, 375, 390, 430, 600, 760, 761, 768, 820, 900, 901, 1024, 1100, 1101, 1440];

for (const route of routes) {
  for (const language of ['en', 'ru']) {
    test(`${route} — ${language}: readable layout at every breakpoint`, async ({ page }, testInfo) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(language => localStorage.setItem('portfolio-language', language), language);
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-lang', language);
      await page.evaluate(() => document.fonts.ready);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const problems = await page.evaluate(() => {
          const issues = [];
          const viewport = document.documentElement.clientWidth;
          if (document.documentElement.scrollWidth > viewport + 1)
            issues.push(`page scrolls sideways: ${document.documentElement.scrollWidth} > ${viewport}`);
          const visible = element => {
            const box = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return box.width > 0 && box.height > 0 && style.visibility !== 'hidden' && style.opacity !== '0';
          };
          const artwork = '.project-art, .cover-scene, .hero-sketch, .plate-board, .type-specimen, .reward-object, .device, .brand-carousel, .screen-expand, .memory-card';
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;
            if (!node.textContent.trim() || !parent || getComputedStyle(parent).visibility === 'hidden' || parent.closest(`script, style, svg, ${artwork}, .skip-link`)) continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            const rects = [...range.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0);
            if (!rects.length) continue;
            for (const rect of rects) {
              if (rect.width > 0 && (rect.left < -1 || rect.right > viewport + 1))
                issues.push(`text leaves viewport: ${node.textContent.trim().slice(0, 60)}`);
            }
            // The dangerous symbols must be SVGs, including in translated copy.
            if (/[✳↗↘↙↖]/.test(node.textContent))
              issues.push(`platform-dependent icon: ${node.textContent.trim()}`);
          }
          const groups = ['.hero-actions', '.contact-row', '.project-card-info', '.section-heading'];
          for (const selector of groups) {
            for (const group of document.querySelectorAll(selector)) {
              const children = [...group.children].filter(visible);
              for (let i = 0; i < children.length; i++) {
                for (let j = i + 1; j < children.length; j++) {
                  const a = children[i].getBoundingClientRect();
                  const b = children[j].getBoundingClientRect();
                  const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                  const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                  if (x > 2 && y > 2) issues.push(`${selector}: children overlap by ${Math.round(x)} × ${Math.round(y)}px`);
                }
              }
            }
          }
          const heading = document.querySelector('.hero-copy h1');
          if (heading) {
            const translation = heading.querySelector(`.lang-${document.documentElement.lang}`);
            if (parseFloat(getComputedStyle(translation).fontSize) < 25)
              issues.push('hero heading is too small to read');
          }
          const nav = document.querySelector('.main-nav');
          const navBox = nav.getBoundingClientRect();
          if (navBox.left < 0 || navBox.right > viewport) issues.push('navigation leaves viewport');
          return issues;
        });
        expect(problems, `${route} ${language} at ${width}px`).toEqual([]);
      }
      expect(errors).toEqual([]);
      // Save an inspectable mobile render with all lazy images loaded.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; }));
      await expect.poll(() => page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0)), { timeout: 30_000 }).toBe(true);
      await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
    });
  }
}

test('mobile navigation and language switching work after scrolling', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to Russian' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ru');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(page.locator('.main-nav')).toHaveAttribute('data-scrolled', 'true');
  await page.getByRole('navigation', { name: 'Главная навигация' }).getByRole('link', { name: 'Контакты' }).click();
  await expect(page).toHaveURL(/\/contacts$/);
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ru');
  await page.getByRole('button', { name: 'Переключить на английский' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'en');
});

test('mobile brief, FAQ, and form focus remain usable', async ({ page }) => {
  await page.goto('/contacts');
  await page.getByRole('button', { name: 'Design + iOS app', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Design + iOS app', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.brief-idea textarea').fill('An app with a very long project description. '.repeat(30));
  await expect(page.locator('.brief-preview')).toContainText('Design + iOS app');
  expect(await page.locator('.brief-idea textarea').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
  await page.locator('.faq-item > summary').first().click();
  await expect(page.locator('.faq-item').first()).toHaveAttribute('open', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('screen preview fits a small phone and closes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/projects/inkept');
  await page.locator('.screen-button').first().click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(321);
  await dialog.getByRole('button', { name: /Close/ }).click();
  await expect(dialog).not.toBeVisible();
});

test('memory card and type controls respond to touch', async ({ page }) => {
  await page.goto('/projects/inkept');
  await page.locator('.memory-card').click();
  await expect(page.locator('.memory-card')).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/projects/chemical');
  await page.getByRole('button', { name: 'Hangul', exact: true }).click();
  await expect(page.locator('.type-specimen-area')).toHaveValue(/안녕하세요/);
  await page.locator('.type-features > button').last().click();
  await expect(page.locator('.type-features > button').last()).toHaveAttribute('aria-pressed', 'true');
});

test('phone layouts survive rotation and short viewports', async ({ page }) => {
  for (const route of ['/', '/contacts', '/projects/diple']) {
    await page.goto(route);
    for (const viewport of [{ width: 844, height: 390 }, { width: 390, height: 600 }, { width: 320, height: 568 }]) {
      await page.setViewportSize(viewport);
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
        nav: document.querySelector('.main-nav').getBoundingClientRect().toJSON(),
      }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 1);
      expect(dimensions.nav.left).toBeGreaterThanOrEqual(0);
      expect(dimensions.nav.right).toBeLessThanOrEqual(viewport.width);
      expect(dimensions.nav.bottom).toBeLessThan(viewport.height);
    }
  }
});
