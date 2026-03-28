import React, { useEffect, useRef, useState } from 'react';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";

const SplashPage = () => {
  const splashRef      = useRef(null);
  const activeRef      = useRef(true);   // true = splash is intercepting scroll
  const transitionRef  = useRef(false);  // true = mid-animation, ignore inputs
  const virtualScroll  = useRef(0);
  const rafId          = useRef(null);
  const touchStartY    = useRef(0);

  const [imgVisible,  setImgVisible]  = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  /* ── entrance animations ── */
  useEffect(() => {
    const t1 = setTimeout(() => setImgVisible(true),  60);
    const t2 = setTimeout(() => setTextVisible(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── scroll control ── */
  useEffect(() => {
    const el = () => splashRef.current;

    const lockScroll   = () => { document.body.style.overflow = 'hidden'; };
    const unlockScroll = () => { document.body.style.overflow = ''; };

    /* slide splash off-screen upward, then unlock page scroll */
    const dismiss = () => {
      if (transitionRef.current) return;
      transitionRef.current = true;
      el().style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
      el().style.transform  = 'translateY(-100vh)';
      el().style.opacity    = '0';
      setTimeout(() => {
        unlockScroll();
        activeRef.current     = false;
        transitionRef.current = false;
        virtualScroll.current = 0;
      }, 820);
    };

    /* slide splash back down from top, relock page scroll */
    const returnSplash = () => {
      if (transitionRef.current) return;
      transitionRef.current = true;
      lockScroll();
      activeRef.current = true;
      el().style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
      el().style.transform  = 'translateY(0)';
      el().style.opacity    = '1';
      setTimeout(() => { transitionRef.current = false; }, 820);
    };

    /* rAF update — drives the parallax while actively scrolling */
    const update = () => {
      rafId.current = null;
      if (!el() || !activeRef.current) return;

      const threshold = Math.min(window.innerHeight * 0.55, 320);
      const progress  = Math.min(virtualScroll.current / threshold, 1);

      if (progress >= 1) { dismiss(); return; }

      el().style.transition = 'none';
      el().style.transform  = `translateY(${-(progress * window.innerHeight * 1.05)}px)`;
      el().style.opacity    = String(Math.max(0, 1 - progress * 1.4));
    };

    const handleWheel = (e) => {
      if (activeRef.current) {
        /* splash is active — intercept scroll */
        e.preventDefault();
        virtualScroll.current = Math.max(0, virtualScroll.current + e.deltaY);
        if (!rafId.current) rafId.current = requestAnimationFrame(update);
      } else if (e.deltaY < 0 && window.scrollY === 0) {
        /* user scrolling up at the very top of the homepage */
        returnSplash();
      }
    };

    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };

    const handleTouchMove = (e) => {
      if (!activeRef.current) return;
      e.preventDefault();
      const delta = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      virtualScroll.current = Math.max(0, virtualScroll.current + delta);
      if (!rafId.current) rafId.current = requestAnimationFrame(update);
    };

    lockScroll();
    window.addEventListener('wheel',      handleWheel,      { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true  });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false });

    return () => {
      window.removeEventListener('wheel',      handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      unlockScroll();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={splashRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: '#131313',
        zIndex: 1000,
        overflow: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      {/* ── Avatar ── */}
      <img
        src="/avatar-final.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: 0, left: '50%',
          transform: imgVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(80px)',
          height: '100vh',
          objectFit: 'contain',
          objectPosition: 'bottom',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          zIndex: 1,
          opacity: imgVisible ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease-out',
        }}
      />

      {/* ── Text ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '12vh',
          paddingLeft: 24,
          paddingRight: 24,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 1.4s ease-in',
        }}
      >
        {/* Container width = PORTFOLIO text width, centered on page */}
        <div className="splash-container">

          {/* PORTFOLIO — centered */}
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 18vw, 280px)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              lineHeight: 0.88,
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            PORTFOLIO
          </h1>

          {/* Row below: STUTI JAIN left, quote right */}
          <div className="splash-bottom-row">
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(20px, 3vw, 42px)',
                fontWeight: 100,
                letterSpacing: '-0.015em',
                color: 'rgba(255,255,255,0.88)',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              STUTI JAIN
            </p>

            <p
              className="splash-quote"
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 200,
                color: '#B05575',
                letterSpacing: '-0.015em',
                lineHeight: 1.2,
                textAlign: 'right',
              }}
            >
              True Beauty is not in the face<br />It is a light in the Heart
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SplashPage;
