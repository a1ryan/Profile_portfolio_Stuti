import { useEffect, useRef } from 'react';

/*
 * Luxury light-mode animated background — maximum-quality strip warping.
 *
 * Quality stack:
 *  • devicePixelRatio — canvas renders at native screen density (Retina / 4K)
 *  • 400 strips       — each strip ≤ 2–3 px tall, seams invisible
 *  • Integer-snapped source coordinates (Math.round on every srcX/srcY/srcH)
 *    → eliminates sub-pixel bilinear blur between strips, keeps pixels crisp
 *  • bgOff rendered once at full physical resolution, reused every frame
 *  • imageSmoothingQuality: 'high' re-asserted every frame before drawing
 *  • Horizontal margin in bgOff prevents wave-shift from exposing canvas edges
 *  • +3px strip overlap eliminates any residual seam hairlines
 */

const STRIPS        = 400;
const AMP_MAIN      = 10;
const AMP_SECONDARY = 5;
const AMP_VERTICAL  = 3;
const MARGIN        = AMP_MAIN + AMP_SECONDARY + 4;
const SPEED         = 0.016;

const LightWaveCanvas = ({ style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');          // alpha:true → transparent until draw() runs

    const bgOff  = document.createElement('canvas');
    const bgCtx  = bgOff.getContext('2d', { alpha: false }); // bgOff is never shown directly

    let animId;
    let t       = 0;
    let W = 0, H = 0;
    let PW = 0, PH = 0;
    let DPR     = 1;
    let bgReady = false;
    let srcImg  = null;

    // ── Load image ─────────────────────────────────────────────────────────
    const img  = new Image();
    img.onload = () => { srcImg = img; buildBg(); bgReady = true; };
    img.src    = '/light_bg_4.jpeg';

    // ── Build offscreen at full physical resolution + horizontal margin ─────
    const buildBg = () => {
      if (!srcImg) return;
      const offW = PW + Math.round(MARGIN * 2 * DPR);
      const offH = PH;
      bgOff.width  = offW;
      bgOff.height = offH;

      bgCtx.imageSmoothingEnabled = true;
      bgCtx.imageSmoothingQuality = 'high';

      const imgAspect    = srcImg.naturalWidth / srcImg.naturalHeight;
      const canvasAspect = offW / offH;
      let dw, dh, dx, dy;
      if (imgAspect > canvasAspect) {
        dh = offH; dw = offH * imgAspect;
        dx = Math.round((offW - dw) / 2); dy = 0;
      } else {
        dw = offW; dh = offW / imgAspect;
        dx = 0; dy = Math.round((offH - dh) / 2);
      }
      bgCtx.drawImage(srcImg, dx, dy, Math.round(dw), Math.round(dh));
    };

    // ── Resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      DPR = window.devicePixelRatio || 1;
      W   = window.innerWidth;
      H   = window.innerHeight;
      PW  = Math.round(W * DPR);
      PH  = Math.round(H * DPR);

      canvas.width        = PW;
      canvas.height       = PH;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      buildBg();
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Render loop ────────────────────────────────────────────────────────
    const draw = () => {
      t += SPEED;

      if (!bgReady) {
        ctx.fillStyle = '#f5f0e8';
        ctx.fillRect(0, 0, W, H);
        animId = requestAnimationFrame(draw);
        return;
      }

      // Re-assert every frame — transform reset can clear these
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.clearRect(0, 0, W, H);

      const stripH       = H / STRIPS;                   // logical px per strip
      const srcBaseX_px  = Math.round(MARGIN * DPR);     // physical px into bgOff centre

      for (let i = 0; i < STRIPS; i++) {
        const logY = i * stripH;

        const dx1     = AMP_MAIN      * Math.sin(i * 0.14 + t * 0.80);
        const dx2     = AMP_SECONDARY * Math.sin(i * 0.26 + t * 1.10 + 1.2);
        const totalDx = dx1 + dx2;
        const dy      = AMP_VERTICAL  * Math.sin(i * 0.10 + t * 0.55 + 0.8);

        // Integer-snap every source coordinate → no sub-pixel bilinear blur
        const srcX = Math.round(srcBaseX_px - totalDx * DPR);
        const srcY = Math.round(logY * DPR);
        const srcH = Math.round((stripH + 3) * DPR);   // +3px overlap, integer

        ctx.drawImage(
          bgOff,
          srcX,  srcY,        PW,  srcH,           // source  (physical px, integer)
          0,     logY + dy,   W,   stripH + 3      // dest    (logical  px)
        );
      }

      // ── Warm vignette ──────────────────────────────────────────────────
      const vignette = ctx.createRadialGradient(
        W * 0.5, H * 0.45, H * 0.15,
        W * 0.5, H * 0.45, H * 0.85
      );
      vignette.addColorStop(0,   'rgba(245,235,225, 0.00)');
      vignette.addColorStop(0.5, 'rgba(220,195,185, 0.07)');
      vignette.addColorStop(1,   'rgba(180,145,155, 0.25)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // ── Pulsing shimmer ────────────────────────────────────────────────
      const shimmer = 0.04 + 0.02 * Math.sin(t * 0.6);
      const grad    = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0,   `rgba(240,215,200, ${shimmer})`);
      grad.addColorStop(0.5, 'rgba(255,245,235, 0.00)');
      grad.addColorStop(1,   `rgba(210,175,170, ${shimmer})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

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
      style={{
        display: 'block',
        pointerEvents: 'none',
        imageRendering: '-webkit-optimize-contrast',
        ...style,
      }}
    />
  );
};

export default LightWaveCanvas;
