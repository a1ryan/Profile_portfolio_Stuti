import { useEffect, useRef } from 'react';

/*
 * Smooth flowing marble / liquid-metal background.
 *
 * Technique: per-pixel sine-wave plasma rendered on a ¼-resolution
 * offscreen canvas, then scaled up with bilinear smoothing.
 * Rendering ¼ resolution keeps the pixel loop fast enough for 60 fps.
 *
 * Each pixel value:
 *   n1 = sin(x·0.008 + t·0.5)  + sin(y·0.006 + t·0.3)
 *   n2 = sin((x+y)·0.005 + t·0.4) + cos(x·0.004 − t·0.2)
 *   n3 = sin(x·0.003 − y·0.004 + t·0.6)
 *   value = (n1 + n2 + n3) / 5   → roughly −1 … 1
 *
 * Color stops (smooth interpolation):
 *   0.00  →  #0d0010  near-black deep purple
 *   0.30  →  #1a0030  dark purple
 *   0.62  →  #6b21a8  rich vivid purple
 *   0.85  →  #7c3aed  bright purple
 *   1.00  →  #c026d3  magenta accent
 */

const SCALE = 4; // render at 1/SCALE resolution, upscale with smoothing

/* Smooth 5-stop gradient: dark zone expanded so most pixels are near-black,
   vivid colors only appear in brightest plasma peaks → better text readability */
const STOPS = [
  { t: 0.00, r:  11, g:  0, b:  14 },  // #0b000e  near-black deep purple
  { t: 0.52, r:  22, g:  0, b:  41 },  // #160029  dark purple  (holds dark for longer)
  { t: 0.78, r:  91, g: 28, b: 143 },  // #5b1c8f  rich vivid purple
  { t: 0.92, r: 105, g: 49, b: 202 },  // #6931ca  bright purple
  { t: 1.00, r: 163, g: 32, b: 179 },  // #a320b3  magenta accent
];

function gradientRGB(norm) {
  // norm: 0 … 1
  const n = Math.max(0, Math.min(1, norm));
  let lo = STOPS[0], hi = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (n >= STOPS[i].t && n <= STOPS[i + 1].t) {
      lo = STOPS[i];
      hi = STOPS[i + 1];
      break;
    }
  }
  const span = hi.t - lo.t || 1;
  const f    = (n - lo.t) / span;
  return [
    Math.round(lo.r + f * (hi.r - lo.r)),
    Math.round(lo.g + f * (hi.g - lo.g)),
    Math.round(lo.b + f * (hi.b - lo.b)),
  ];
}

const HoloCanvas = ({ style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas   = canvasRef.current;
    if (!canvas) return;
    const ctx      = canvas.getContext('2d');

    // Offscreen canvas at ¼ resolution
    const off      = document.createElement('canvas');
    const octx     = off.getContext('2d');

    let animId;
    let t  = 0;
    let W  = 0, H  = 0;
    let OW = 0, OH = 0;
    let imgData = null;

    const resize = () => {
      W  = canvas.width  = window.innerWidth;
      H  = canvas.height = window.innerHeight;
      OW = off.width     = Math.ceil(W / SCALE);
      OH = off.height    = Math.ceil(H / SCALE);
      imgData = octx.createImageData(OW, OH);
    };
    resize();
    window.addEventListener('resize', resize);

    ctx.imageSmoothingEnabled  = true;
    ctx.imageSmoothingQuality  = 'high';

    const draw = () => {
      t += 0.026; // slightly faster — full field cycle ≈ 8 s

      const data = imgData.data;

      for (let py = 0; py < OH; py++) {
        const y = py * SCALE;           // full-res y coord
        const yt3 = y * 0.007 + t * 0.55;
        const yt4 = y * 0.005;

        for (let px = 0; px < OW; px++) {
          const x = px * SCALE;         // full-res x coord

          // Three layered sine/cosine fields — higher t coefficients = more motion
          const n1 = Math.sin(x * 0.009 + t * 1.10) + Math.sin(yt3);
          const n2 = Math.sin((x + y) * 0.006 + t * 0.95) + Math.cos(x * 0.005 - t * 0.60);
          const n3 = Math.sin(x * 0.004 - yt4 + t * 1.35);

          // Average; n1,n2 range ±2, n3 ±1 → sum ±5 → /5 gives −1…1
          const value = (n1 + n2 + n3) / 5;

          // Normalise −1…1 → 0…1
          const norm = (value + 1) * 0.5;

          const [r, g, b] = gradientRGB(norm);

          const i = (py * OW + px) * 4;
          data[i    ] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }

      octx.putImageData(imgData, 0, 0);

      // Upscale ¼-res → full viewport with bilinear smoothing
      ctx.drawImage(off, 0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', pointerEvents: 'none', ...style, opacity: 1 }}
    />
  );
};

export default HoloCanvas;
