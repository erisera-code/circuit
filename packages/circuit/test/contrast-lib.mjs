// WCAG 2.x contrast maths shared by contrast.test.mjs. Values are opaque
// `#rrggbb`, `hsl(<hue> S% L%)`, or `oklch(from hsl(...) min|max(l, X) c h)`
// (OKLCH lightness clamp, chroma and hue kept), with `var(--circuit-hue)` /
// `var(--hue)` substituted so a value can be evaluated at any hue.

const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const f = (n) => l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
};
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

const linToOklab = ([r, g, b]) => {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};
const oklabToLin = ([L, a, b]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};
const inGamut = (rgb) => rgb.every((v) => v >= -1e-6 && v <= 1 + 1e-6);

// Linear-light sRGB for a value at a given hue.
function linear(value, hue) {
  const v = value.replace(/var\(--(?:circuit-)?hue\)/g, String(hue));
  let m = v.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => toLin(parseInt(m[1].slice(i, i + 2), 16) / 255));
  m = v.match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/);
  if (m) return hslToRgb(+m[1], +m[2], +m[3]).map(toLin);
  m = v.match(/^oklch\(from hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)\s+(min|max)\(l,\s*([\d.]+)\)\s+c\s+h\)$/);
  if (m) {
    const [L0, a, b] = linToOklab(hslToRgb(+m[1], +m[2], +m[3]).map(toLin));
    const C = Math.hypot(a, b), H = Math.atan2(b, a);
    const L = (m[4] === 'min' ? Math.min : Math.max)(L0, +m[5]);
    const at = (c) => oklabToLin([L, c * Math.cos(H), c * Math.sin(H)]);
    let rgb = at(C);
    if (!inGamut(rgb)) { // CSS gamut mapping: reduce chroma, keep lightness and hue
      let lo = 0, hi = C;
      for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; (inGamut(at(mid)) ? (lo = mid) : (hi = mid)); }
      rgb = at(lo);
    }
    return rgb.map((x) => Math.min(1, Math.max(0, x)));
  }
  throw new Error(`unparsable: ${value}`);
}
// Round through 8-bit sRGB like a real display pipeline does.
const lum = (value, hue) => {
  const [r, g, b] = linear(value, hue).map((c) => toLin(Math.round(255 * toGamma(c)) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (fg, bg, hue) => {
  const [hi, lo] = [lum(fg, hue), lum(bg, hue)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
