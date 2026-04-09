import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { experienceData, personalData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS  = "'Josefin Sans', sans-serif";
const MONO  = "'Courier New', Courier, monospace";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

const BoldText = ({ text, words = [] }) => {
  const { dark } = useTheme();
  if (!words.length) return <>{text}</>;
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        words.some(w => w.toLowerCase() === part.toLowerCase())
          ? <span key={i} style={{ color: dark ? 'rgba(210,170,255,0.95)' : 'rgba(184,146,42,0.95)', fontWeight: 700 }}>{part}</span>
          : part
      )}
    </>
  );
};

const ExploreButton = ({ onClick, visible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <span style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 300,
        letterSpacing: '0.35em',
        color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase',
        transition: 'color 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
      }}>explore</span>
      <span style={{
        fontSize: 18,
        color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.39)',
        animation: 'bounce-arrow 1.6s ease-in-out infinite',
        display: 'inline-block',
        transition: 'color 0.25s ease',
      }}>↓</span>
    </div>
  );
};

/* ── Intro overlay — always dark ── */
const IntroOverlay = ({ onDismiss }) => {
  const [textIn, setTextIn] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTextIn(true), 80);
    document.body.style.overflow = 'hidden';

    const dismiss = () => {
      if (fading) return;
      setFading(true);
      document.body.style.overflow = '';
      setTimeout(onDismiss, 650);
    };

    window.addEventListener('wheel',     dismiss, { passive: true, once: true });
    window.addEventListener('touchmove', dismiss, { passive: true, once: true });

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      window.removeEventListener('wheel',     dismiss);
      window.removeEventListener('touchmove', dismiss);
    };
  }, [fading, onDismiss]);

  const handleClick = () => {
    if (fading) return;
    setFading(true);
    document.body.style.overflow = '';
    setTimeout(onDismiss, 650);
  };

  return (
    <>
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: '#0b000e',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 10vw',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.65s ease',
        pointerEvents: fading ? 'none' : 'auto',
        overflow: 'hidden',
      }}>

        {/* ── Background video — split left + right, fades at edges and centre ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          display: 'flex',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 28%, black 60%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 28%, black 60%)',
          opacity: 0.55,
          filter: 'brightness(1.35) contrast(1.1) saturate(1.2)',
        }}>
          <video
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src="/background video 2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark vignette over video to protect text readability */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(11,0,14,0.82) 0%, rgba(11,0,14,0.3) 100%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          position: 'relative', zIndex: 2,
          fontFamily: SANS, fontSize: 20, fontWeight: 300,
          lineHeight: 1.85, letterSpacing: '0.04em',
          color: 'rgba(255,255,255,1.0)',
          textAlign: 'center', maxWidth: 720,
          margin: '0 0 52px 0',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}>
          I have had the opportunities to work with various prestige beauty brands
          in my career — have a look at the works I have done so far.
        </p>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <ExploreButton onClick={handleClick} visible={textIn} />
        </div>
      </div>
    </>
  );
};

/* ── Background video with optional time-range loop ── */
const BgVideo = ({ src, startTime = 0, endTime, opacity }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMeta = () => { el.currentTime = startTime; };
    const onUpdate = () => {
      if (endTime && el.currentTime >= endTime) {
        el.currentTime = startTime;
      }
    };

    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('timeupdate', onUpdate);
    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('timeupdate', onUpdate);
    };
  }, [startTime, endTime]);

  return (
    <video
      ref={ref}
      autoPlay muted loop playsInline
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        opacity,
        transition: 'opacity 0.3s ease',
        borderRadius: 16,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

/* ── Shared lightbox — rendered via portal to escape any transform stacking context ── */
const Lightbox = ({ onClose, children }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999,
        animation: 'lbFadeIn 0.22s ease forwards',
        cursor: 'pointer',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: -36, right: 0,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', fontSize: 22, lineHeight: 1,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >✕</button>
      </div>
      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbPop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
};

/* ── PulpoAR card gallery ── */
const CardGallery = ({ cards }) => {
  const { dark } = useTheme();
  const [selected, setSelected] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={{ marginTop: 32 }}>
      <p style={{
        fontFamily: SANS, fontSize: 22, fontWeight: 400,
        letterSpacing: '0.28em', color: dark ? 'rgba(224,64,251,0.85)' : 'rgba(184,146,42,0.85)',
        textTransform: 'uppercase', marginBottom: 16,
      }}>Works</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
      }}>
        {cards.map((card, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              onClick={() => card.src && setSelected(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                border: `1px solid ${isHovered ? (dark ? 'rgba(192,132,252,0.8)' : 'rgba(184,146,42,0.8)') : (dark ? 'rgba(180,100,255,0.3)' : 'rgba(184,146,42,0.3)')}`,
                borderRadius: 16,
                padding: '2rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12,
                cursor: card.src ? 'pointer' : 'default',
                boxShadow: isHovered ? (dark ? '0 0 30px rgba(192,132,252,0.3)' : '0 0 30px rgba(184,146,42,0.3)') : 'none',
                transition: 'all 0.3s ease',
                minHeight: 140,
                overflow: 'hidden',
                background: card.src && card.mediaType === 'image'
                  ? `url(${encodeURI(card.src)}) center/cover no-repeat`
                  : 'rgba(255,255,255,0.04)',
              }}
            >
              {/* Dark tint overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isHovered ? 'rgba(10,0,18,0.55)' : 'rgba(10,0,18,0.72)',
                borderRadius: 16,
                transition: 'background 0.3s ease',
              }} />

              {/* Video background for video cards */}
              {card.src && card.mediaType === 'video' && (
                <BgVideo
                  src={card.src}
                  startTime={card.startTime || 0}
                  endTime={card.endTime}
                  opacity={isHovered ? 0.45 : 0.28}
                />
              )}

              {/* Content sits above background */}
              <span style={{ fontSize: '2rem', lineHeight: 1, position: 'relative', zIndex: 1 }}>{card.icon}</span>
              <span style={{
                fontFamily: SANS,
                fontSize: '1.4rem', fontWeight: 600,
                color: dark ? '#c084fc' : '#C49A2A',
                textShadow: dark ? '0 0 20px rgba(192,132,252,0.8), 0 0 40px rgba(192,132,252,0.4), 0 0 60px rgba(192,132,252,0.2)' : '0 0 20px rgba(184,146,42,0.8), 0 0 40px rgba(184,146,42,0.4)',
                letterSpacing: '0.05em',
                textAlign: 'center',
                lineHeight: 1.3,
                position: 'relative', zIndex: 1,
              }}>{card.title}</span>
            </div>
          );
        })}
      </div>

      {selected !== null && cards[selected].src && (
        <Lightbox onClose={() => setSelected(null)}>
          {cards[selected].mediaType === 'video' ? (
            <video
              autoPlay muted loop playsInline
              onLoadedMetadata={e => {
                if (cards[selected].startTime) e.target.currentTime = cards[selected].startTime;
              }}
              style={{
                maxWidth: '82vw', maxHeight: '82vh',
                width: 'auto', height: 'auto',
                objectFit: 'contain', borderRadius: 12,
                boxShadow: '0 0 60px rgba(192,132,252,0.35)',
                animation: 'lbPop 0.25s cubic-bezier(0.22,1,0.36,1) forwards',
              }}
            >
              <source src={cards[selected].src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={cards[selected].src}
              alt={cards[selected].title}
              style={{
                maxWidth: '82vw', maxHeight: '82vh',
                width: 'auto', height: 'auto',
                objectFit: 'contain', borderRadius: 12,
                boxShadow: '0 0 60px rgba(192,132,252,0.35)',
                animation: 'lbPop 0.25s cubic-bezier(0.22,1,0.36,1) forwards',
              }}
            />
          )}
        </Lightbox>
      )}
    </div>
  );
};

/* ── Moodboard photo grid ── */
const rotations = [-2, 1.5, -1, 2, -1.5, 1];
const GalleryGrid = ({ images }) => {
  const { dark } = useTheme();
  const [selected, setSelected] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const cols = images.length === 4 ? 2 : 3;

  return (
    <div style={{ marginTop: 32, padding: '20px 0 40px' }}>
      <p style={{
        fontFamily: SANS, fontSize: 22, fontWeight: 400,
        letterSpacing: '0.28em', color: dark ? 'rgba(224,64,251,0.85)' : 'rgba(184,146,42,0.85)',
        textTransform: 'uppercase', marginBottom: 16,
      }}>Works</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 12,
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              aspectRatio: '4/3',
              borderRadius: 8,
              overflow: 'hidden',
              transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
              opacity: hovered !== null && hovered !== i ? 0.4 : 1,
              cursor: 'pointer',
              transform: hovered === i ? `rotate(${rotations[i] || 0}deg) scale(1.04)` : `rotate(${rotations[i] || 0}deg)`,
              boxShadow: hovered === i ? (dark ? '0 8px 28px rgba(192,132,252,0.35)' : '0 8px 28px rgba(184,146,42,0.35)') : '0 4px 14px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src={src}
              alt={`gallery ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {selected !== null && (
        <Lightbox onClose={() => setSelected(null)}>
          <img
            src={images[selected]}
            alt={`gallery ${selected + 1}`}
            style={{
              maxWidth: '82vw', maxHeight: '82vh',
              width: 'auto', height: 'auto',
              objectFit: 'contain', borderRadius: 12,
              boxShadow: '0 0 60px rgba(192,132,252,0.35)',
              animation: 'lbPop 0.25s cubic-bezier(0.22,1,0.36,1) forwards',
            }}
          />
        </Lightbox>
      )}
    </div>
  );
};

/* ── Interactive bullet card ── */
const BulletCard = ({ text }) => {
  const { dark } = useTheme();
  const [hovered, setHovered] = React.useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? (dark ? 'linear-gradient(135deg, rgba(123,47,247,0.18) 0%, rgba(224,64,251,0.10) 100%)' : 'linear-gradient(135deg, rgba(184,146,42,0.12) 0%, rgba(196,154,42,0.08) 100%)')
          : dark ? 'rgba(255,255,255,0.04)' : 'rgba(18,18,18,0.04)',
        border: `1px solid ${hovered ? (dark ? 'rgba(224,64,251,0.45)' : 'rgba(184,146,42,0.45)') : fg(dark, 0.09)}`,
        borderLeft: `3px solid ${hovered ? (dark ? '#e040fb' : '#B8922A') : (dark ? '#7b2ff7' : '#C49A2A')}`,
        borderRadius: 10,
        padding: '14px 20px',
        marginBottom: 10,
        fontFamily: SANS,
        fontSize: 15,
        fontWeight: 300,
        lineHeight: 1.85,
        color: fg(dark, hovered ? 1 : 0.92),
        transform: hovered ? 'translateX(5px)' : 'translateX(0)',
        boxShadow: hovered ? (dark ? '0 4px 24px rgba(224,64,251,0.18), inset 0 0 0 1px rgba(224,64,251,0.1)' : '0 4px 24px rgba(184,146,42,0.18), inset 0 0 0 1px rgba(184,146,42,0.1)') : 'none',
        transition: 'all 0.22s ease',
        cursor: 'default',
      }}
    >{text}</li>
  );
};

/* ── Detail modal — always dark ── */
const DetailCard = ({ exp, onClose }) => {
  const { dark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.72)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.35s ease',
      backdropFilter: 'blur(6px)',
      cursor: 'pointer',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: dark ? '#111' : '#ffffff',
        border: `0.5px solid ${fg(dark, 0.12)}`,
        borderRadius: 16,
        width: '100%', maxWidth: 680,
        maxHeight: '80vh', overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        padding: '48px 52px',
        position: 'relative',
        cursor: 'auto',
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        boxSizing: 'border-box',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 24, right: 28,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: SANS, fontSize: 20, fontWeight: 300,
          color: fg(dark, 0.35), lineHeight: 1, padding: 4,
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.color = fg(dark, 0.9)}
          onMouseLeave={e => e.currentTarget.style.color = fg(dark, 0.35)}
        >✕</button>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <span style={{
            fontFamily: SANS, fontSize: '0.78rem', fontWeight: 500,
            color: '#fff',
            background: 'linear-gradient(135deg, #3b0080 0%, #7b2ff7 100%)',
            borderRadius: 20, padding: '6px 18px',
            letterSpacing: '0.08em',
            boxShadow: '0 2px 12px rgba(123,47,247,0.45)',
          }}>{exp.period}</span>
          <span style={{
            fontFamily: SANS, fontSize: '0.78rem', fontWeight: 500,
            color: '#fff',
            background: dark ? 'linear-gradient(135deg, #a0009a 0%, #e040fb 100%)' : 'linear-gradient(135deg, #8a6a10 0%, #B8922A 100%)',
            borderRadius: 20, padding: '6px 18px',
            letterSpacing: '0.08em',
            boxShadow: dark ? '0 2px 12px rgba(224,64,251,0.40)' : '0 2px 12px rgba(184,146,42,0.40)',
          }}>{exp.type}</span>
        </div>

        <h2 style={{
          fontFamily: SERIF, fontSize: 36, fontWeight: 300,
          letterSpacing: '0.04em', color: fg(dark, 1),
          textTransform: 'uppercase', lineHeight: 1.15,
          margin: '0 0 10px 0',
        }}>{exp.role}</h2>

        <p style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 300,
          letterSpacing: '0.08em', color: fg(dark, 0.70),
          margin: '0 0 32px 0',
        }}>{exp.company} · {exp.location}</p>

        <div style={{ width: '100%', height: '0.5px', background: fg(dark, 0.1), marginBottom: 28 }} />

        <p style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 300,
          lineHeight: 1.85, color: dark ? 'rgba(210,170,255,0.95)' : 'rgba(100,50,140,0.95)',
          letterSpacing: 0, margin: '0 0 28px 0', fontStyle: 'italic',
        }}><BoldText text={exp.description} words={exp.descHighlights || []} /></p>

        {exp.galleryCards && exp.galleryCards.length > 0 && (
          <CardGallery cards={exp.galleryCards} />
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0' }}>
          {exp.bullets.map((bullet, i) => (
            <BulletCard key={i} text={bullet} />
          ))}
        </ul>

        {exp.closing && (
          <p style={{
            fontFamily: SANS, fontSize: 16, fontWeight: 300,
            lineHeight: 1.85, color: dark ? 'rgba(210,170,255,0.95)' : 'rgba(100,50,140,0.95)',
            letterSpacing: 0, fontStyle: 'italic',
            margin: '20px 0 0', borderTop: `0.5px solid ${fg(dark, 0.1)}`,
            paddingTop: 16,
          }}>{exp.closing}</p>
        )}

        {exp.gallery && exp.gallery.length > 0 && (
          <GalleryGrid images={exp.gallery} />
        )}
      </div>
    </div>
  );
};

/* ── Main Works page ── */
const Works = () => {
  const { dark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [introGone, setIntroGone]     = useState(false);
  const [isMobile, setIsMobile]       = useState(window.innerWidth < 768);
  const prevIndex   = useRef(0);
  const sectionRefs = useRef([]);
  const total = experienceData.length;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!introGone) return;
    window.scrollTo(0, 0);
    setActiveIndex(0);
    prevIndex.current = 0;

    let observers = [];
    const timer = setTimeout(() => {
      observers = sectionRefs.current.map((el, index) => {
        if (!el) return null;
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && index !== prevIndex.current) {
                setVisible(false);
                setTimeout(() => {
                  setActiveIndex(index);
                  prevIndex.current = index;
                  setVisible(true);
                }, 220);
              }
            });
          },
          { threshold: 0.5 }
        );
        obs.observe(el);
        return obs;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      observers.forEach(obs => obs && obs.disconnect());
    };
  }, [introGone]);

  const active = experienceData[activeIndex];
  const cardBg     = dark ? '#1a1a1a' : '#e8e7e3';
  const cardBorder = dark ? '#333'    : '#c0bfbb';
  const cardShadow = dark
    ? '0 8px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)'
    : '0 8px 64px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(18,18,18,0.06)';
  const cardShadowHover = dark
    ? '0 16px 80px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.10)'
    : '0 16px 80px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(18,18,18,0.12)';

  /* ── Card renderer ── */
  const renderExpCard = (exp) => (
    <div
      onClick={() => setSelected(exp)}
      style={{
        width: isMobile ? '100%' : 580,
        height: isMobile ? 220 : 340,
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: cardShadow,
        flexShrink: 0, overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.4s ease',
        position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.015)'; e.currentTarget.style.boxShadow = cardShadowHover; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = cardShadow; }}
    >
      {exp.image ? (
        <img src={exp.image} alt={exp.role} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, objectPosition: exp.id === 1 ? 'center 55%' : exp.id === 2 ? 'center top' : exp.id === 3 ? 'center 70%' : 'center' }} />
      ) : (
        <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 300, letterSpacing: '0.3em', color: fg(dark, 0.18), textTransform: 'uppercase' }}>{exp.role}</span>
      )}
      <div style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: SANS, fontSize: 10, fontWeight: 300, letterSpacing: '0.2em', color: fg(dark, 0.68), textTransform: 'uppercase', pointerEvents: 'none' }}>VIEW ↗</div>
    </div>
  );

  return (
    <>
      {!introGone && <IntroOverlay onDismiss={() => setIntroGone(true)} />}

      {isMobile ? (
        /* ── MOBILE: stacked list layout ── */
        <div style={{ padding: '16px 0 60px' }}>
          <div style={{ padding: '0 20px 24px', borderBottom: `0.5px solid ${fg(dark, 0.08)}`, marginBottom: 8 }}>
            <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 300, letterSpacing: '0.3em', color: fg(dark, 0.9), textTransform: 'uppercase' }}>WORK EXPERIENCE</span>
          </div>
          {experienceData.map((exp, index) => (
            <div key={exp.id} ref={el => (sectionRefs.current[index] = el)} style={{ padding: '32px 20px' }}>
              {renderExpCard(exp)}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontFamily: MONO, fontSize: 12, fontWeight: 400, letterSpacing: '0.15em', color: fg(dark, 0.55), margin: '0 0 10px 0' }}>
                  [ {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
                </p>
                <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 300, letterSpacing: '0.05em', color: fg(dark, 1), textTransform: 'uppercase', lineHeight: 1.2, margin: '0 0 8px 0' }}>{exp.role}</h2>
                <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 300, letterSpacing: '0.08em', color: fg(dark, 0.68), margin: '0 0 16px 0' }}>{exp.company} · {exp.type}</p>
                <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: fg(dark, 0.90), margin: '0 0 20px 0' }}>
                  <BoldText text={exp.description} words={exp.descHighlights || []} />
                </p>
                <button
                  onClick={() => setSelected(exp)}
                  style={{ background: 'none', border: `1px solid ${dark ? '#e040fb' : '#B8922A'}`, borderRadius: 999, padding: '8px 20px', fontFamily: SANS, fontSize: 11, fontWeight: 300, letterSpacing: '0.2em', color: fg(dark, 1), cursor: 'pointer' }}
                >READ MORE →</button>
              </div>
              {index < experienceData.length - 1 && (
                <div style={{ width: '100%', height: '0.5px', background: fg(dark, 0.08), marginTop: 32 }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        /* ── DESKTOP: side-by-side layout ── */
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* LEFT: scrollable image panels */}
          <div style={{ width: '55%', flexShrink: 0 }}>
            {experienceData.map((exp, index) => (
              <div key={exp.id} ref={el => (sectionRefs.current[index] = el)} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' }}>
                {renderExpCard(exp)}
              </div>
            ))}
          </div>

          {/* RIGHT: sticky info panel */}
          <div style={{ width: '45%', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', padding: '200px 44px 44px 40px', borderLeft: `0.5px solid ${fg(dark, 0.08)}`, boxSizing: 'border-box', transition: 'border-color 0.4s ease' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: SANS, fontSize: 25, fontWeight: 300, letterSpacing: '0.42em', color: fg(dark, 0.9), textTransform: 'uppercase', transition: 'color 0.4s ease' }}>WORK EXPERIENCE</span>
              <span style={{ fontFamily: SANS, fontSize: 20, fontWeight: 300, letterSpacing: '0.06em', color: fg(dark, 0.28), transition: 'color 0.4s ease' }}>/{personalData.firstName.toLowerCase()}{personalData.lastName.toLowerCase()}</span>
            </div>
            <div style={{ width: '100%', height: '0.5px', background: fg(dark, 0.12), marginBottom: 0, flexShrink: 0, transition: 'background 0.4s ease' }} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              <p style={{ fontFamily: MONO, fontSize: 14, fontWeight: 400, letterSpacing: '0.15em', color: fg(dark, 0.88), margin: '0 0 36px 0', transition: 'color 0.4s ease' }}>
                [ {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 300, letterSpacing: '0.05em', color: fg(dark, 1), textTransform: 'uppercase', lineHeight: 1.2, margin: '0 0 14px 0', transition: 'color 0.4s ease' }}>{active.role}</h2>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 300, letterSpacing: '0.08em', color: fg(dark, 0.68), margin: '0 0 32px 0', transition: 'color 0.4s ease' }}>{active.company} · {active.type}</p>
              <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: fg(dark, 0.95), letterSpacing: 0, margin: '0 0 28px 0', maxWidth: 360, transition: 'color 0.4s ease' }}>
                <BoldText text={active.description} words={active.descHighlights || []} />
              </p>
              <button
                onClick={() => setSelected(active)}
                style={{ background: 'none', border: `1px solid ${dark ? '#e040fb' : '#B8922A'}`, borderRadius: 999, padding: '8px 20px', fontFamily: SANS, fontSize: 11, fontWeight: 300, letterSpacing: '0.2em', color: fg(dark, 1), cursor: 'pointer', alignSelf: 'flex-start', transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = dark ? 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))' : 'linear-gradient(135deg, rgba(184,146,42,0.7), rgba(196,154,42,0.7))'; e.currentTarget.style.boxShadow = dark ? '0 8px 25px rgba(224,64,251,0.4)' : '0 8px 25px rgba(184,146,42,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >READ MORE →</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
              <div
                onClick={() => { const nextIndex = Math.min(activeIndex + 1, total - 1); sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                style={{ width: 42, height: 42, borderRadius: '50%', border: `1px solid ${fg(dark, 0.18)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s ease, background 0.2s ease', cursor: activeIndex < total - 1 ? 'pointer' : 'default', opacity: activeIndex < total - 1 ? 1 : 0.3 }}
                onMouseEnter={e => { if (activeIndex < total - 1) { e.currentTarget.style.borderColor = dark ? '#e040fb' : '#B8922A'; e.currentTarget.style.background = dark ? 'rgba(224,64,251,0.1)' : 'rgba(184,146,42,0.1)'; }}}
                onMouseLeave={e => { e.currentTarget.style.borderColor = fg(dark, 0.18); e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ color: fg(dark, 0.35), fontSize: 14, lineHeight: 1, transition: 'color 0.4s ease' }}>↓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selected && <DetailCard exp={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default Works;
