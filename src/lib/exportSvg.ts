/**
 * Rasterise an on-page SVG to a PNG the user can keep.
 *
 * The wheel paints itself with CSS custom properties (var(--gold), and a
 * color-mix() for the sign bands). A serialised clone is loaded by the browser as
 * an isolated document with no access to our stylesheet, so every one of those
 * would resolve to nothing and the export would come out blank. Copying the
 * *computed* paint off each live node sidesteps that: whatever the browser
 * already resolved — variables, color-mix, inherited fonts — is what gets baked in.
 */
const PAINT_PROPS = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-dasharray',
  'stroke-dashoffset',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'text-anchor',
  'dominant-baseline',
] as const;

function inlineComputedPaint(live: SVGSVGElement, clone: SVGSVGElement) {
  const liveNodes = [live, ...Array.from(live.querySelectorAll<SVGElement>('*'))];
  const cloneNodes = [clone, ...Array.from(clone.querySelectorAll<SVGElement>('*'))];
  for (let i = 0; i < liveNodes.length && i < cloneNodes.length; i++) {
    const computed = window.getComputedStyle(liveNodes[i]);
    const target = cloneNodes[i];
    for (const prop of PAINT_PROPS) {
      const value = computed.getPropertyValue(prop);
      if (value && value !== 'none') target.style.setProperty(prop, value);
    }
    // Entry animations leave elements at opacity 0 if the export runs mid-flight.
    target.style.setProperty('opacity', computed.getPropertyValue('opacity') || '1');
    target.style.removeProperty('animation');
    target.removeAttribute('class');
  }
}

export type SvgExportOptions = {
  filename: string;
  /** Painted behind the artwork so the PNG is not transparent. */
  background?: string;
  /** Longest edge of the output bitmap. */
  pixels?: number;
};

export function downloadSvgAsPng(
  svg: SVGSVGElement,
  { filename, background = '#0B0E14', pixels = 1120 }: SvgExportOptions,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const viewBox = svg.viewBox.baseVal;
    const width = viewBox?.width || svg.clientWidth || pixels;
    const height = viewBox?.height || svg.clientHeight || pixels;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));
    inlineComputedPaint(svg, clone);

    const xml = new XMLSerializer().serializeToString(clone);
    const source = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));

    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(source);
      const scale = pixels / Math.max(width, height);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas is unavailable'));
        return;
      }
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((png) => {
        if (!png) {
          reject(new Error('Could not encode the PNG'));
          return;
        }
        const href = URL.createObjectURL(png);
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        link.click();
        // Revoking straight away cancels the download in some browsers.
        window.setTimeout(() => URL.revokeObjectURL(href), 10_000);
        resolve();
      }, 'image/png');
    };
    image.onerror = () => {
      URL.revokeObjectURL(source);
      reject(new Error('Could not rasterise the chart'));
    };
    image.src = source;
  });
}
