# Navigation optics

The navigation uses `liquid-glass-web-react` 0.1.1 (MIT, pinned) for a real SVG displacement lens over live DOM, inspired by [Aave's Building Glass for the Web](https://aave.com/design/building-glass-for-the-web). It moves using a damped spring and the library's imperative position API, without rebuilding the displacement map every frame. The lens survives route changes because it lives in the shared layout. Reduced motion snaps to the destination.

The selected tab has no opaque fill. The bar uses a very light tint and 3px backdrop blur, with a refractive rim, restrained highlights and minimal chromatic separation. Chromium additionally refracts the actual page backdrop through the same lens map. Safari and Firefox retain the live-DOM refraction but use standard backdrop blur behind it.

References evaluated:

- [Aave: Building Glass for the Web](https://aave.com/design/building-glass-for-the-web) — live DOM displacement, bounded filter regions and cross-browser considerations.
- [liquid-glass-web-react](https://github.com/PallavAg/liquid-glass-web-react) — dependency-free React implementation of this technique.
- [Kube: Liquid Glass in the Browser](https://kube.io/blog/liquid-glass-css-svg/) — lens profiles, refraction maps and the Chromium-only SVG backdrop limitation.

The implementation refracts only the small navigation region; it does not filter or duplicate the entire page. Keyboard navigation and actual links remain intact.
