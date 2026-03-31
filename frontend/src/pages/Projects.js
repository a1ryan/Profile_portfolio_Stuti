import React, { useState, useEffect, useRef } from 'react';
import { projectsData, personalData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS  = "'Josefin Sans', sans-serif";
const MONO  = "'Courier New', Courier, monospace";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

const HL_STYLE = {
  color: 'rgba(210,170,255,0.95)',
  fontWeight: 700,
};

const HighlightText = ({ text, words = [] }) => {
  if (!words.length) return <>{text}</>;
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        words.some(w => w.toLowerCase() === part.toLowerCase())
          ? <span key={i} style={HL_STYLE}>{part}</span>
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
        position: 'relative', zIndex: 2,
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
        color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase',
        transition: 'color 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
      }}>explore</span>
      <span style={{
        fontSize: 18,
        color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.50)',
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

        {/* ── Background video ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 28%, black 60%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 28%, black 60%)',
          opacity: 0.55,
          filter: 'brightness(1.35) contrast(1.1) saturate(1.2)',
        }}>
          <video
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src="/bg 2.mp4" type="video/mp4" />
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
          A collection of projects and events — from AI-powered brand concepts
          to large-scale student activations.
        </p>
        <ExploreButton onClick={handleClick} visible={textIn} />
      </div>
    </>
  );
};

/* ── Link preview modal — always dark ── */
const toEmbedUrl = (url) => {
  const match = url && url.match(/\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const LinkModal = ({ project, onClose }) => {
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
      background: 'rgba(0,0,0,0.82)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.35s ease',
      backdropFilter: 'blur(8px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#111',
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        width: '100%', maxWidth: 900, height: '85vh',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 28px',
          borderBottom: '0.5px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: SERIF, fontSize: 20, fontWeight: 300,
            letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
          }}>{project.title}</span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: SANS, fontSize: 20, fontWeight: 300,
            color: 'rgba(255,255,255,0.35)', lineHeight: 1, padding: 4,
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >✕</button>
        </div>
        <iframe
          src={toEmbedUrl(project.link)}
          title={project.title}
          style={{ flex: 1, width: '100%', border: 'none', background: '#111' }}
          allow="autoplay"
        />
      </div>
    </div>
  );
};

/* ── Detail card modal — always dark ── */
const DetailCard = ({ project, onClose }) => {
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
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#111',
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        width: '100%', maxWidth: 680,
        maxHeight: '80vh', overflowY: 'auto',
        padding: '48px 52px',
        position: 'relative',
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        boxSizing: 'border-box',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 24, right: 28,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: SANS, fontSize: 20, fontWeight: 300,
          color: 'rgba(255,255,255,0.35)', lineHeight: 1, padding: 4,
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >✕</button>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {[project.period, project.category].filter(Boolean).map((label) => (
            <span key={label} style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 300,
              letterSpacing: '0.18em', color: 'rgba(255,255,255,0.70)',
              border: '0.5px solid rgba(255,255,255,0.18)',
              borderRadius: 999, padding: '4px 14px',
            }}>{label}</span>
          ))}
        </div>

        <h2 style={{
          fontFamily: SERIF, fontSize: 36, fontWeight: 300,
          letterSpacing: '0.04em', color: 'rgba(255,255,255,1)',
          textTransform: 'uppercase', lineHeight: 1.15, margin: '0 0 10px 0',
        }}>{project.title}</h2>

        <p style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 300,
          letterSpacing: '0.08em', color: 'rgba(255,255,255,0.70)',
          margin: '0 0 32px 0',
        }}>{project.location}</p>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255,255,255,0.1)', marginBottom: 28 }} />

        {project.description && (
          <p style={{
            fontFamily: SANS, fontSize: 16, fontWeight: 300,
            lineHeight: 1.85, color: 'rgba(255,255,255,0.90)',
            letterSpacing: 0, margin: '0 0 28px 0', fontStyle: 'italic',
          }}>
            <HighlightText text={project.description} words={project.highlights || []} />
          </p>
        )}

        {project.bullets && project.bullets.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {project.bullets.map((bullet, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{
                  marginTop: 8, width: 4, height: 4, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.35)', flexShrink: 0, display: 'inline-block',
                }} />
                <span style={{
                  fontFamily: SANS, fontSize: 14, fontWeight: 300,
                  lineHeight: 1.8, color: 'rgba(255,255,255,0.95)', letterSpacing: 0,
                }}>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {project.moodboards && project.moodboards.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, marginTop: 8 }}>
            {project.moodboards.map((mb, i) => (
              <div key={i}>
                <h3 style={{
                  fontFamily: SERIF, fontSize: 26, fontWeight: 300,
                  letterSpacing: '0.05em', color: 'rgba(255,255,255,1)',
                  textTransform: 'uppercase', lineHeight: 1.2,
                  margin: '0 0 20px 0',
                }}>{mb.title}</h3>

                <p style={{
                  fontFamily: SANS, fontSize: 15, fontWeight: 500,
                  letterSpacing: '0.22em', color: 'rgba(210,170,255,0.85)',
                  textTransform: 'uppercase', margin: '0 0 12px 0',
                }}>Context</p>
                <p style={{
                  fontFamily: SANS, fontSize: 16, fontWeight: 300,
                  lineHeight: 1.9, color: 'rgba(255,255,255,0.82)',
                  margin: '0 0 28px 0',
                }}>
                  <HighlightText text={mb.context} words={mb.highlights || []} />
                </p>

                <img
                  src={mb.image}
                  alt={mb.title}
                  style={{ width: '100%', display: 'block', borderRadius: 12, marginBottom: 28 }}
                />

                <p style={{
                  fontFamily: SANS, fontSize: 15, fontWeight: 500,
                  letterSpacing: '0.22em', color: 'rgba(210,170,255,0.85)',
                  textTransform: 'uppercase', margin: '0 0 12px 0',
                }}>Solution</p>
                <p style={{
                  fontFamily: SANS, fontSize: 16, fontWeight: 300,
                  lineHeight: 1.9, color: 'rgba(255,255,255,0.82)',
                  margin: 0,
                }}>
                  <HighlightText text={mb.solution} words={mb.highlights || []} />
                </p>
              </div>
            ))}
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            {project.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                style={{ width: '100%', display: 'block', borderRadius: 12 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main Projects page ── */
const Projects = () => {
  const { dark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [linkProject, setLinkProject] = useState(null);
  const [introGone, setIntroGone]     = useState(false);
  const prevIndex   = useRef(0);
  const sectionRefs = useRef([]);
  const total = projectsData.length;

  useEffect(() => {
    if (!introGone) return;
    window.scrollTo(0, 0);
    setActiveIndex(0);
    prevIndex.current = 0;

    const observers = sectionRefs.current.map((el, index) => {
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
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, [introGone]);

  const active = projectsData[activeIndex];
  const cardBg     = dark ? '#1a1a1a' : '#e8e7e3';
  const cardBorder = dark ? '#333'    : '#c0bfbb';
  const cardShadow = dark
    ? '0 8px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)'
    : '0 8px 64px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(18,18,18,0.06)';
  const cardShadowHover = dark
    ? '0 16px 80px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.10)'
    : '0 16px 80px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(18,18,18,0.12)';

  return (
    <>
      {!introGone && <IntroOverlay onDismiss={() => setIntroGone(true)} />}

      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* ── LEFT: scrollable image panels ── */}
        <div style={{ width: '55%', flexShrink: 0 }}>
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              ref={el => (sectionRefs.current[index] = el)}
              style={{
                height: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '48px 40px',
              }}
            >
              <div
                onClick={() => project.link ? setLinkProject(project) : setSelected(project)}
                style={{
                  width: 580, height: 340,
                  background: project.video ? 'transparent' : cardBg,
                  border: project.video ? 'none' : `1px solid ${cardBorder}`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: project.video ? 'none' : cardShadow,
                  flexShrink: 0, overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.4s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.015)';
                  e.currentTarget.style.boxShadow = cardShadowHover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = cardShadow;
                }}
              >
                {project.video ? (
                  <video
                    autoPlay loop muted playsInline
                    style={{
                      width: '130%', height: '130%', objectFit: 'cover',
                      position: 'absolute',
                      WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 55%, transparent 90%)',
                      maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 55%, transparent 90%)',
                    }}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, objectPosition: project.imagePosition || 'center' }}
                  />
                ) : (
                  <span style={{
                    fontFamily: SANS, fontSize: 11, fontWeight: 300,
                    letterSpacing: '0.3em', color: fg(dark, 0.18),
                    textTransform: 'uppercase',
                  }}>{project.title}</span>
                )}
                <div style={{
                  position: 'absolute', bottom: 16, right: 20,
                  fontFamily: SANS, fontSize: 10, fontWeight: 300,
                  letterSpacing: '0.2em', color: fg(dark, 0.68),
                  textTransform: 'uppercase', pointerEvents: 'none',
                }}>VIEW ↗</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: sticky info panel ── */}
        <div style={{
          width: '45%',
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          padding: '200px 44px 44px 40px',
          borderLeft: `0.5px solid ${fg(dark, 0.08)}`,
          boxSizing: 'border-box',
          transition: 'border-color 0.4s ease',
        }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{
              fontFamily: SANS, fontSize: 25, fontWeight: 300,
              letterSpacing: '0.42em', color: fg(dark, 0.9),
              textTransform: 'uppercase', transition: 'color 0.4s ease',
            }}>PROJECTS</span>
            <span style={{
              fontFamily: SANS, fontSize: 20, fontWeight: 300,
              letterSpacing: '0.06em', color: fg(dark, 0.28),
              transition: 'color 0.4s ease',
            }}>/{personalData.firstName.toLowerCase()}{personalData.lastName.toLowerCase()}</span>
          </div>

          <div style={{ width: '100%', height: '0.5px', background: fg(dark, 0.12), marginBottom: 0, flexShrink: 0, transition: 'background 0.4s ease' }} />

          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease',
          }}>
            <p style={{
              fontFamily: MONO, fontSize: 14, fontWeight: 400,
              letterSpacing: '0.15em', color: fg(dark, 0.88),
              margin: '0 0 36px 0', transition: 'color 0.4s ease',
            }}>
              [ {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
            </p>

            <h2 style={{
              fontFamily: SERIF, fontSize: 32, fontWeight: 300,
              letterSpacing: '0.05em', color: fg(dark, 1),
              textTransform: 'uppercase', lineHeight: 1.2,
              margin: '0 0 14px 0', transition: 'color 0.4s ease',
            }}>{active.title}</h2>

            <p style={{
              fontFamily: SANS, fontSize: 13, fontWeight: 300,
              letterSpacing: '0.08em', color: fg(dark, 0.68),
              margin: '0 0 32px 0', transition: 'color 0.4s ease',
            }}>
              {active.location}{active.category ? ` · ${active.category}` : ''}
            </p>

            {active.description && (
              <p style={{
                fontFamily: SANS, fontSize: 16, fontWeight: 300,
                lineHeight: 1.8, color: fg(dark, 0.95),
                letterSpacing: 0, margin: '0 0 28px 0', maxWidth: 360,
                transition: 'color 0.4s ease',
              }}>
                <HighlightText text={active.description} words={active.highlights || []} />
              </p>
            )}

            <button
              onClick={() => active.link ? setLinkProject(active) : setSelected(active)}
              style={{
                background: 'none', border: '1px solid #e040fb',
                borderRadius: 999, padding: '8px 20px',
                fontFamily: SANS, fontSize: 11, fontWeight: 300,
                letterSpacing: '0.2em', color: '#ffffff',
                cursor: 'pointer', alignSelf: 'flex-start',
                transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(224,64,251,0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >READ MORE →</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              border: `1px solid ${fg(dark, 0.18)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.4s ease',
            }}>
              <span style={{ color: fg(dark, 0.35), fontSize: 14, lineHeight: 1, transition: 'color 0.4s ease' }}>↓</span>
            </div>
          </div>

        </div>
      </div>

      {selected && <DetailCard project={selected} onClose={() => setSelected(null)} />}
      {linkProject && <LinkModal project={linkProject} onClose={() => setLinkProject(null)} />}
    </>
  );
};

export default Projects;
