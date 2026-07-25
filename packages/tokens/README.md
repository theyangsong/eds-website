# @eds/website-tokens

## Liquid Glass

Liquid Glass uses a Canvas-generated displacement map with SVG
`feDisplacementMap`, then applies it through `backdrop-filter`. The implementation
is adapted from [shuding/liquid-glass](https://github.com/shuding/liquid-glass)
under the MIT License.

Import the token CSS once, then initialize semantic glass layers:

```ts
import '@eds/website-tokens';
import { initLiquidGlass } from '@eds/website-tokens/liquid-glass';

initLiquidGlass();
```

`initLiquidGlass()` binds `.effect-flotation-box__glass` and
`.effect-popup-box__glass`, watches for dynamically inserted matching elements,
and refreshes active surfaces when theme or stylesheet values change.

### Attach a custom surface

```ts
import {
  attachLiquidGlass,
  detachLiquidGlass,
  refreshLiquidGlass,
} from '@eds/website-tokens/liquid-glass';

const element = document.querySelector<HTMLElement>('.my-glass');
if (!element) throw new Error('Missing .my-glass surface');
const surface = attachLiquidGlass(element, {
  varPrefix: '--my-liquid-glass',
});

surface.refresh();
refreshLiquidGlass(element); // Refresh one surface.
refreshLiquidGlass(); // Refresh every attached surface.

detachLiquidGlass(element);
```

For Vue, attach after mount and always detach before unmount:

```ts
onMounted(() => attachLiquidGlass(surface.value, { varPrefix: '--my-liquid-glass' }));
onBeforeUnmount(() => {
  if (surface.value) detachLiquidGlass(surface.value);
});
```

### Parameters

Declare parameters on `:root`. The prefix can be
`--effect-glass-bg`, `--effect-glass-box-liquid`, or a custom `varPrefix`.

```css
:root {
  --my-liquid-glass-blur: 2px;
  --my-liquid-glass-contrast: 1.2;
  --my-liquid-glass-brightness: 1.05;
  --my-liquid-glass-saturate: 1.1;
  --my-liquid-glass-surface: color-mix(
    in display-p3,
    var(--eds-face) 72%,
    transparent
  );

  --my-liquid-glass-shader-edge-start: 0.8;
  --my-liquid-glass-shader-edge-end: 0;
  --my-liquid-glass-shader-edge-offset: 0.15;
  --my-liquid-glass-shader-rect-inset-x: 0.2;
  --my-liquid-glass-shader-rect-inset-y: 0.15;
  --my-liquid-glass-shader-corner-radius: 0.6;
  --my-liquid-glass-shader-interior-refraction: 6;
  --my-liquid-glass-shader-interior-frequency-x: 1.2;
  --my-liquid-glass-shader-interior-frequency-y: 0.8;
  --my-liquid-glass-refraction-scale: 0.5;

  --my-liquid-glass-fallback: blur(12px) saturate(180%);
  --my-liquid-glass-fallback-surface: color-mix(
    in display-p3,
    var(--eds-face) 85%,
    transparent
  );
}
```

- `blur`, `contrast`, `brightness`, and `saturate` tune the backdrop.
- `surface` controls the translucent material color.
- `edge-*`, `rect-inset-*`, and `corner-radius` shape edge refraction.
- `interior-refraction` is the center displacement in pixels.
- `interior-frequency-x/y` control the center wave density.
- `refraction-scale` multiplies the complete displacement map.

After changing variables programmatically, call `surface.refresh()` or
`refreshLiquidGlass()`. When initialized through `initLiquidGlass()`, stylesheet
and theme changes are refreshed automatically.

### Compatibility and performance

SVG displacement as a backdrop filter is enabled only in Chromium browsers.
Safari and Firefox receive the configured ordinary blur/saturation fallback.

The displacement map is regenerated when a surface changes size or is refreshed.
Keep glass surfaces reasonably small, avoid refreshing every animation frame, and
detach surfaces that leave the application lifecycle.
