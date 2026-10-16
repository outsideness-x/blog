"""Seamless paper for the artbook pages, as two tiles of different sizes so the
repeat never lines up: the sheet itself (warm ivory, cold-press tooth lit from
the upper left, a few fibres) and a transparent layer of dust and specks.

    python3 scripts/art/paper.py   # writes public/sketchbook/paper.webp, specks.webp
Needs numpy, Pillow and cwebp."""
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

OUT = Path("public/sketchbook")
rng = np.random.default_rng(1610)


def band(n, f0, width):
    """Periodic noise with its energy around spatial frequency f0 (cycles/px)."""
    spec = np.fft.fft2(rng.standard_normal((n, n)))
    fx = np.fft.fftfreq(n)[:, None]
    fy = np.fft.fftfreq(n)[None, :]
    f = np.sqrt(fx**2 + fy**2)
    spec *= np.exp(-((f - f0) ** 2) / (2 * width**2))
    out = np.real(np.fft.ifft2(spec))
    return (out - out.mean()) / (out.std() + 1e-9)


def wrapped(draw_fn, n, mode, fill):
    """Draw on a 3x3 canvas and keep the middle, so marks wrap at the edges."""
    big = Image.new(mode, (n * 3, n * 3), fill)
    draw_fn(ImageDraw.Draw(big), n)
    tiles = [big.crop((x * n, y * n, x * n + n, y * n + n)) for y in range(3) for x in range(3)]
    acc = np.zeros_like(np.asarray(tiles[4], dtype=np.float32))
    base = np.asarray(Image.new(mode, (n, n), fill), dtype=np.float32)
    for t in tiles:
        acc += np.asarray(t, dtype=np.float32) - base
    return np.clip(base + acc, 0, 255)


def sheet(n=640):
    h = 1.0 * band(n, 1 / 10, 0.035) + 0.4 * band(n, 1 / 3.6, 0.08) + 0.3 * band(n, 1 / 70, 0.01)
    gx = (np.roll(h, -1, axis=1) - np.roll(h, 1, axis=1)) / 2
    gy = (np.roll(h, -1, axis=0) - np.roll(h, 1, axis=0)) / 2
    nx, ny, nz = -gx * 0.5, -gy * 0.5, np.ones_like(h)
    nl = np.sqrt(nx**2 + ny**2 + nz**2)
    light = np.array([-0.55, -0.62, 0.56])
    light /= np.linalg.norm(light)
    shade = (nx * light[0] + ny * light[1] + nz * light[2]) / nl
    shade = (shade - shade.mean()) / shade.std()

    def fibres(d, n):
        for _ in range(240):
            x, y = rng.uniform(n, 2 * n, 2)
            ang = rng.uniform(0, np.pi)
            length = rng.uniform(8, 34)
            bend = rng.uniform(-0.04, 0.04)
            tone = 128 + int(rng.choice([-1, 1]) * rng.uniform(5, 12))
            pts = [(x + np.cos(ang + bend * t * length) * length * t, y + np.sin(ang + bend * t * length) * length * t) for t in np.linspace(0, 1, 12)]
            d.line(pts, fill=tone, width=1)

    fib = (wrapped(fibres, n, "L", 128) - 128) / 12
    base = np.array([242, 237, 226], np.float32)
    lum = 1 + 0.017 * shade + 0.011 * fib + 0.005 * band(n, 1 / 1.6, 0.2)
    img = base[None, None, :] * lum[..., None]
    drift = band(n, 1 / 160, 0.004)
    img[..., 2] -= 0.9 * drift
    img[..., 0] += 0.5 * drift
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))


def specks(n=1040):
    """Dust and pulp inclusions: mostly tiny dots, a few blots and stray hairs."""

    def marks(d, n):
        for _ in range(230):
            x, y = rng.uniform(n, 2 * n, 2)
            r = rng.choice([0.5, 0.7, 0.9, 1.2, 1.6, 2.2], p=[0.3, 0.25, 0.2, 0.13, 0.08, 0.04])
            a = int(rng.uniform(60, 170))
            if r > 1.5:
                pts = [(x + np.cos(t) * r * rng.uniform(0.6, 1.3), y + np.sin(t) * r * rng.uniform(0.6, 1.3)) for t in np.linspace(0, 2 * np.pi, 9)[:-1]]
                d.polygon(pts, fill=a)
            else:
                d.ellipse((x - r, y - r, x + r, y + r), fill=a)
        for _ in range(16):
            x, y = rng.uniform(n, 2 * n, 2)
            ang = rng.uniform(0, 2 * np.pi)
            length = rng.uniform(7, 22)
            curl = rng.uniform(-0.15, 0.15)
            pts = []
            for t in np.linspace(0, 1, 14):
                a2 = ang + curl * t * length
                pts.append((x + np.cos(a2) * length * t, y + np.sin(a2) * length * t))
            d.line(pts, fill=int(rng.uniform(50, 110)), width=1)

    alpha = wrapped(marks, n, "L", 0).astype(np.uint8)
    rgba = np.zeros((n, n, 4), np.uint8)
    rgba[..., 0], rgba[..., 1], rgba[..., 2] = 62, 55, 49
    rgba[..., 3] = alpha
    return Image.fromarray(rgba)


def webp(img, name, *args):
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / f"{name}.png"
        img.save(png)
        subprocess.run(["cwebp", "-quiet", *args, str(png), "-o", str(OUT / f"{name}.webp")], check=True)
    print("wrote", OUT / f"{name}.webp")


webp(sheet(), "paper", "-q", "80")
webp(specks(), "specks", "-q", "85", "-alpha_q", "90")
