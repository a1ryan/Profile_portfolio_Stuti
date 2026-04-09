import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HoloCanvas from './HoloCanvas';
import LightWaveCanvas from './LightWaveCanvas';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const PremiumButton = ({ children, onClick, dark = true }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  let background = 'transparent';
  let boxShadow  = 'none';
  let transform  = 'translateY(0px)';
  let transition = 'all 0.3s ease';
  let border     = '1px solid #e040fb';

  if (pressed) {
    background = 'linear-gradient(135deg, rgba(240,111,255,0.7), rgba(155,79,255,0.7))';
    boxShadow  = '0 4px 15px rgba(224,64,251,0.6)';
    transform  = 'translateY(-1px)';
    transition = 'all 0.15s ease';
    border     = '1px solid #e040fb';
  } else if (hovered) {
    background = 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))';
    boxShadow  = '0 8px 25px rgba(224,64,251,0.4)';
    transform  = 'translateY(-3px)';
    border     = '1px solid #e040fb';
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: SANS,
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: dark ? '#ffffff' : 'rgba(18,18,18,0.9)',
        background,
        border,
        padding: '12px 28px',
        borderRadius: '12px',
        cursor: 'pointer',
        transform,
        boxShadow,
        transition,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
};

const SplashPage = () => {
  const { dark }      = useTheme();
  const splashRef     = useRef(null);
  const activeRef     = useRef(true);
  const transitionRef = useRef(false);
  const virtualScroll = useRef(0);
  const rafId         = useRef(null);
  const touchStartY   = useRef(0);
  const navigate      = useNavigate();

  const [imgVisible,  setImgVisible]  = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isMobile,    setIsMobile]    = useState(window.innerWidth < 768);

  /* entrance animations */
  useEffect(() => {
    const t1 = setTimeout(() => setImgVisible(true),  60);
    const t2 = setTimeout(() => setTextVisible(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* dismiss — slides splash off upward */
  const dismiss = useCallback(() => {
    const el = splashRef.current;
    if (!el || transitionRef.current) return;
    transitionRef.current = true;
    el.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
    el.style.transform  = 'translateY(-100vh)';
    el.style.opacity    = '0';
    setTimeout(() => {
      document.body.style.overflow = '';
      activeRef.current     = false;
      transitionRef.current = false;
      virtualScroll.current = 0;
    }, 820);
  }, []);

  /* scroll control */
  useEffect(() => {
    const el = () => splashRef.current;

    const lockScroll   = () => { document.body.style.overflow = 'hidden'; };
    const unlockScroll = () => { document.body.style.overflow = ''; };

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
        e.preventDefault();
        virtualScroll.current = Math.max(0, virtualScroll.current + e.deltaY);
        if (!rafId.current) rafId.current = requestAnimationFrame(update);
      } else if (e.deltaY < 0 && window.scrollY === 0) {
        returnSplash();
      }
    };

    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchMove  = (e) => {
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
  }, [dismiss]);

  return (
    <div
      ref={splashRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: dark ? '#0b000e' : '#f5f0e8',
        zIndex: 1000,
        overflow: 'hidden',
        willChange: 'transform, opacity',
      }}
    >

      {/* ── Canvas background — z-index 0, behind avatar and panels ── */}
      {dark
        ? <HoloCanvas      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
        : <LightWaveCanvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      }

      {/* ── Avatar ── */}
      <img
        src="/avatar-final.png"
        alt=""
        style={isMobile ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center center',
          transform: imgVisible ? 'translateY(0)' : 'translateY(40px)',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          zIndex: 3,
          opacity: imgVisible ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease-out',
          filter: !dark
            ? 'drop-shadow(0 0 2px rgba(210,168,110,1.0)) drop-shadow(0 0 10px rgba(210,168,110,0.80)) drop-shadow(0 0 40px rgba(228,188,138,0.40))'
            : undefined,
        } : {
          position: 'absolute',
          bottom: 0,
          left: 'calc(49vw + 77px)',
          transform: imgVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(80px)',
          height: '121vh',
          objectFit: 'contain',
          objectPosition: 'bottom',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
          zIndex: 1,
          opacity: imgVisible ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease-out',
          // Light mode: tight warm glow covers dark edge fringing
          filter: !dark
            ? 'drop-shadow(0 0 2px rgba(210,168,110,1.0)) drop-shadow(0 0 10px rgba(210,168,110,0.80)) drop-shadow(0 0 40px rgba(228,188,138,0.40))'
            : undefined,
        }}
      />

      {/* ── Mobile layout ── */}
      {isMobile && (
        <>
          {/* Top gradient */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '32%',
            background: dark
              ? 'linear-gradient(to bottom, rgba(11,0,14,0.97) 0%, rgba(11,0,14,0.7) 65%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(245,240,235,0.96) 0%, rgba(245,240,235,0.65) 65%, transparent 100%)',
            zIndex: 4, pointerEvents: 'none',
          }} />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '34%',
            background: dark
              ? 'linear-gradient(to top, rgba(11,0,14,0.98) 0%, rgba(11,0,14,0.75) 60%, transparent 100%)'
              : 'linear-gradient(to top, rgba(245,240,235,0.97) 0%, rgba(245,240,235,0.70) 60%, transparent 100%)',
            zIndex: 4, pointerEvents: 'none',
          }} />

          {/* Title — top center */}
          <div style={{
            position: 'absolute', top: '6vh', left: 0, right: 0,
            textAlign: 'center', zIndex: 5, pointerEvents: 'none',
            opacity: textVisible ? 1 : 0,
            transition: 'opacity 1.4s ease-in',
            padding: '0 24px',
          }}>
            <p style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 400,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: dark ? 'rgba(224,64,251,0.9)' : 'rgba(184,146,42,0.9)', margin: '0 0 10px',
            }}>
              Marketing · Beauty
            </p>
            <h2 style={{
              fontFamily: SERIF, fontSize: 'clamp(22px, 6vw, 28px)',
              fontWeight: 700, color: dark ? 'rgba(255,255,255,0.97)' : 'rgba(18,18,18,0.97)',
              margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.02em',
            }}>
              Welcome to<br />my portfolio!
            </h2>
            <p style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 300,
              color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(18,18,18,0.65)',
              margin: 0, letterSpacing: '0.04em', lineHeight: 1.5,
            }}>
              A Marketing Professional seeking an{' '}
              <span style={{ color: 'rgba(160,80,200,0.9)', fontWeight: 600 }}>internship</span>
              {' '}in the beauty industry.
            </p>
          </div>

          {/* Quote + buttons — bottom */}
          <div style={{
            position: 'absolute', bottom: 54, left: 20, right: 20,
            zIndex: 5,
            opacity: textVisible ? 1 : 0,
            transition: 'opacity 1.4s ease-in',
          }}>
            <p style={{
              fontFamily: SERIF, fontSize: 14, fontWeight: 300,
              color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(18,18,18,0.85)',
              margin: '0 0 18px', lineHeight: 1.6, letterSpacing: '-0.01em',
              textAlign: 'center',
            }}>
              Curious about how{' '}
              <span style={{ color: dark ? '#e040fb' : '#B8922A', fontWeight: 700, fontSize: 16 }}>Beauty</span>
              {' '}creates experiences that feel more{' '}
              <span style={{ fontWeight: 700 }}>personal, thoughtful, and impactful.</span>
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <PremiumButton dark={dark} onClick={() => navigate('/projects')}>Projects</PremiumButton>
              <PremiumButton dark={dark} onClick={() => { dismiss(); navigate('/'); }}>Learn More</PremiumButton>
            </div>
          </div>
        </>
      )}

      {/* ── Desktop: Left + Right panels ── */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft: 154,
            paddingRight: 0,
            paddingTop: '22vh',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: textVisible ? 1 : 0,
            transition: 'opacity 1.4s ease-in',
          }}
        >
          {/* LEFT */}
          <div style={{
            width: '34%',
            paddingLeft: 'calc(28px + 3vw)',
            paddingRight: 20,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
          }}>
            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(32px, 3.8vw, 62px)',
              fontWeight: 700,
              color: dark ? 'rgba(255,255,255,0.97)' : 'rgba(18,18,18,0.97)',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              Welcome to<br />my portfolio!
            </h2>
            <p style={{
              fontFamily: SANS,
              fontSize: 'clamp(16px, 1.4vw, 22px)',
              fontWeight: 300,
              color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(18,18,18,0.85)',
              margin: 0,
              letterSpacing: '0.02em',
              lineHeight: 1.6,
            }}>
              A <span style={{ fontWeight: 700 }}>Marketing Professional</span> seeking an{' '}
              <span style={{
                color: dark ? 'rgba(210,170,255,0.95)' : 'rgba(140,60,180,0.95)',
                background: dark ? 'rgba(123,47,247,0.18)' : 'rgba(180,100,200,0.12)',
                borderRadius: 6,
                padding: '1px 8px',
                fontWeight: 700,
              }}>internship</span>
              {' '}in the beauty industry.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
              <PremiumButton dark={dark} onClick={() => navigate('/projects')}>Projects</PremiumButton>
              <PremiumButton dark={dark} onClick={() => { dismiss(); navigate('/'); }}>Learn More</PremiumButton>
            </div>
          </div>

          {/* CENTER spacer */}
          <div style={{ flex: 1 }} />

          {/* RIGHT */}
          <div style={{
            width: '34%',
            paddingRight: 'calc(48px + 1vw)',
            paddingLeft: 20,
            paddingTop: 60,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
          }}>
            <p style={{
              fontFamily: SERIF,
              fontSize: '1.85rem',
              fontWeight: 300,
              color: dark ? '#ffffff' : 'rgba(18,18,18,0.95)',
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>
              Curious about how{' '}
              <span style={{
                color: dark ? '#e040fb' : '#B8922A',
                fontWeight: 900,
                fontStyle: 'normal',
                fontSize: '2.1rem',
              }}>Beauty</span>
              <br />
              creates experiences that feel more{' '}
              <span style={{ fontWeight: 900 }}>personal, thoughtful, and impactful.</span>
            </p>
            <div style={{ marginTop: 6 }}>
              <PremiumButton dark={dark} onClick={() => navigate('/cv-request')}>Request my CV</PremiumButton>
            </div>
          </div>
        </div>
      )}

      {/* ── STUTI JAIN — bottom ── */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: isMobile ? 0 : 182,
        right: isMobile ? 0 : 'auto',
        textAlign: isMobile ? 'center' : 'left',
        zIndex: isMobile ? 6 : 3,
        pointerEvents: 'none',
        opacity: textVisible ? 1 : 0,
        transition: 'opacity 1.4s ease-in',
      }}>
        <p style={{
          fontFamily: SERIF,
          fontSize: 'clamp(12px, 1.3vw, 18px)',
          fontWeight: 100,
          letterSpacing: '0.22em',
          color: dark ? 'rgba(255,255,255,0.95)' : 'rgba(18,18,18,0.85)',
          margin: 0,
          textTransform: 'uppercase',
        }}>
          Stuti Jain
        </p>
      </div>


    </div>
  );
};

export default SplashPage;
