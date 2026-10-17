import { defineConfig } from '@playwright/test';

const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:3100';
export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: origin,
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'safari', use: { browserName: 'webkit' } },
    { name: 'chromium', use: { browserName: 'chromium', channel: 'chromium' } },
  ],
  webServer: process.env.TEST_ORIGIN ? undefined : {
    command: 'NEXT_DIST_DIR=.next-responsive npm run dev -- --hostname 127.0.0.1 --port 3100',
    url: origin,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
