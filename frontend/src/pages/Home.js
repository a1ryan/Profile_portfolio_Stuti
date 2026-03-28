import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalData, skillsData, educationData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';
import SplashPage from '../components/SplashPage';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

/* ── Education coursework popup ── */
const EduPopup = ({ edu, onClose }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 20); return () => clearTimeout(t); }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.3s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0f0015', border: '1px solid rgba(224,64,251,0.25)',
          borderRadius: 16, padding: '40px 48px', maxWidth: 560, width: '90%',
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 24,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: SANS, fontSize: 20, fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >✕</button>

        <h2 style={{
          fontFamily: SERIF, fontSize: 24, fontWeight: 700,
          color: '#ffffff', margin: '0 0 6px', letterSpacing: '-0.01em',
        }}>
          {edu.school}
        </h2>

        <p style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 300,
          letterSpacing: '0.22em', color: 'rgba(224,64,251,0.85)',
          textTransform: 'uppercase', margin: '0 0 24px',
        }}>
          {edu.popupSubheading || 'Relevant Coursework'}
        </p>

        {edu.popupSubheading && (
          <p style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 300,
            letterSpacing: '0.18em', color: 'rgba(255,182,213,0.85)',
            textTransform: 'uppercase', margin: '-18px 0 24px',
          }}>
            Relevant Coursework
          </p>
        )}

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />

        <p style={{
          fontFamily: SANS, fontSize: 15, fontWeight: 300,
          lineHeight: 1.9, color: 'rgba(255,255,255,0.85)',
          letterSpacing: '0.02em', margin: 0,
        }}>
          {edu.courses}
        </p>
      </div>
    </div>
  );
};

/* ── small uppercase section label + extending rule ── */
const SectionLabel = ({ children, dark }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
    <span style={{
      fontFamily: SANS, fontSize: 22, fontWeight: 300,
      letterSpacing: '0.2em', color: fg(dark, 1),
      textTransform: 'uppercase', flexShrink: 0,
      transition: 'color 0.4s ease',
    }}>
      {children}
    </span>
    <div style={{
      flex: 1, height: '0.5px',
      background: fg(dark, 0.13),
      transition: 'background 0.4s ease',
    }} />
  </div>
);

/* ── skill list group ── */
const SkillPill = ({ item, dark }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: SANS, fontSize: 13, fontWeight: 300,
        color: hovered ? '#ffffff' : fg(dark, 0.95),
        border: `1px solid ${hovered ? '#e040fb' : fg(dark, 0.25)}`,
        borderRadius: 999, padding: '6px 16px',
        display: 'inline-block', margin: 4,
        background: hovered ? 'linear-gradient(135deg, rgba(224,64,251,0.25), rgba(123,47,247,0.25))' : 'transparent',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 14px rgba(224,64,251,0.25)' : 'none',
        transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {item}
    </span>
  );
};

const SkillGroup = ({ title, items, dark }) => (
  <div>
    <p style={{
      fontFamily: SANS, fontSize: 15, fontWeight: 400,
      letterSpacing: '0.2em', color: fg(dark, 0.72),
      textTransform: 'uppercase', marginBottom: 16,
      transition: 'color 0.4s ease',
    }}>
      {title}
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: -4 }}>
      {items.map((item) => (
        <SkillPill key={item} item={item} dark={dark} />
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const Home = () => {
  const { dark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [eduPopup, setEduPopup] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <SplashPage />
      {eduPopup && <EduPopup edu={eduPopup} onClose={() => setEduPopup(null)} />}

      {/* ════════════════════════════════════════
           HERO — two-column layout
           ════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'flex-start',
        paddingLeft: 44, paddingRight: 44,
        paddingTop: 0, paddingBottom: 32,
        gap: '5%',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1)',
      }}>

        {/* ── LEFT COLUMN: ID card ── */}
        <div className="idcard-swing" style={{
          width: '45%', display: 'flex',
          justifyContent: 'center', alignItems: 'flex-start', flexShrink: 0,
        }}>
          <img
            src="/idcard.png"
            alt="ID Card"
            style={{ width: '100%', height: '100vh', objectFit: 'contain', objectPosition: 'top', display: 'block' }}
          />
        </div>

        {/* ── RIGHT COLUMN: text content ── */}
        <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>

          <h1 style={{
            fontFamily: SERIF, fontSize: 'clamp(32px, 3.8vw, 62px)',
            fontWeight: 700, letterSpacing: '-0.02em',
            whiteSpace: 'nowrap', color: '#B05575',
            margin: 0, lineHeight: 1.15,
          }}>
            Hi, I am Stuti JAIN !
          </h1>

          <div style={{
            width: '100%', height: '0.5px',
            background: fg(dark, 0.4),
            margin: '20px 0 24px',
            transition: 'background 0.4s ease',
          }} />

          <p style={{
            fontFamily: SANS, fontSize: 18, fontWeight: 300,
            lineHeight: 2.0, color: fg(dark, 0.95),
            letterSpacing: '0.025em', margin: 0, textAlign: 'justify',
            transition: 'color 0.4s ease',
          }}>
            An organized, proactive, and detail-oriented Master in Management candidate in France, currently seeking a 6-month end-of-studies internship in marketing. With 2 years of experience across beauty tech and premium retail, I have developed a strong interest in the beauty and luxury industries and enjoy working in fast-paced, diverse, and international environments.
          </p>

          <div style={{ marginTop: 40 }}>
            <SectionLabel dark={dark}>EDUCATION</SectionLabel>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {educationData.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {edu.link ? (
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 40, height: 40, flexShrink: 0,
                      border: `1px solid ${fg(dark, 0.25)}`,
                      background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, transition: 'border-color 0.2s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#B05575'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = fg(dark, 0.25)}
                  >
                    <span style={{
                      fontFamily: SANS, fontSize: 10, fontWeight: 400,
                      color: fg(dark, 0.72), letterSpacing: '0.05em',
                      textAlign: 'center', lineHeight: 1.2,
                      transition: 'color 0.4s ease',
                    }}>
                      {edu.school.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                    </span>
                  </a>
                ) : (
                  <div
                    onClick={() => edu.courses && setEduPopup(edu)}
                    style={{
                      width: 40, height: 40, flexShrink: 0,
                      border: `1px solid ${fg(dark, 0.25)}`,
                      background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, transition: 'border-color 0.2s ease',
                      cursor: edu.courses ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#B05575'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = fg(dark, 0.25)}
                  >
                    <span style={{
                      fontFamily: SANS, fontSize: 10, fontWeight: 400,
                      color: fg(dark, 0.72), letterSpacing: '0.05em',
                      textAlign: 'center', lineHeight: 1.2,
                      transition: 'color 0.4s ease',
                    }}>
                      {edu.school.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p style={{
                    fontFamily: SANS, fontSize: 14, fontWeight: 400,
                    color: fg(dark, 1.0), margin: 0, letterSpacing: '0.05em',
                    transition: 'color 0.4s ease',
                  }}>
                    {edu.link ? (
                      <a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(176,85,117,0.5)', transition: 'border-color 0.2s ease' }}
                        onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#B05575'}
                        onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(176,85,117,0.5)'}
                      >
                        {edu.school}
                      </a>
                    ) : (
                      <span
                        onClick={() => edu.courses && setEduPopup(edu)}
                        style={{ cursor: edu.courses ? 'pointer' : 'default', borderBottom: '1px solid rgba(176,85,117,0.5)', transition: 'border-color 0.2s ease' }}
                        onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#B05575'}
                        onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(176,85,117,0.5)'}
                      >
                        {edu.school}
                      </span>
                    )}
                  </p>
                  <p style={{
                    fontFamily: SANS, fontSize: 12, fontWeight: 300,
                    color: fg(dark, 0.70), margin: '4px 0 0', letterSpacing: '0.04em',
                    transition: 'color 0.4s ease',
                  }}>
                    {edu.degree} · {edu.period}
                  </p>
                  {edu.courses && (
                    <span
                      onClick={() => setEduPopup(edu)}
                      style={{
                        fontFamily: SANS, fontSize: 10, fontWeight: 300,
                        letterSpacing: '0.18em', color: 'rgba(255,182,213,0.85)',
                        textTransform: 'uppercase', cursor: 'pointer',
                        display: 'inline-block', marginTop: 6,
                        borderBottom: '1px solid rgba(255,182,213,0.4)',
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,182,213,1)'; e.currentTarget.style.borderBottomColor = 'rgba(255,182,213,0.8)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,182,213,0.85)'; e.currentTarget.style.borderBottomColor = 'rgba(255,182,213,0.4)'; }}
                    >
                      View Coursework →
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
           MOTIVATION + SKILLS  second screen
           ════════════════════════════════════════ */}
      <section style={{ padding: '96px 44px 150px', display: 'flex', flexDirection: 'column', gap: 72 }}>

        <div style={{ display: 'flex', gap: '5%', alignItems: 'center' }}>
          <div style={{ width: '55%', minWidth: 0, marginTop: '-60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{
                fontFamily: SANS, fontSize: 29, fontWeight: 300,
                letterSpacing: '0.2em', color: fg(dark, 1),
                textTransform: 'uppercase', flexShrink: 0,
                transition: 'color 0.4s ease',
              }}>
                My Philosophy
              </span>
              <div style={{ flex: 1, height: '0.5px', background: fg(dark, 0.13), transition: 'background 0.4s ease' }} />
            </div>
            <p style={{
              fontFamily: SANS, fontSize: 21, fontWeight: 300,
              lineHeight: 1.9, color: fg(dark, 1.0), letterSpacing: 0,
              transition: 'color 0.4s ease',
            }}>
              {personalData.motivation}
            </p>
          </div>
          <div style={{
            width: '28%', aspectRatio: '9 / 12',
            flexShrink: 0, marginLeft: '5%', marginTop: '-5%',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 80%)',
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/portfolio V1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span style={{
              fontFamily: SANS, fontSize: 29, fontWeight: 300,
              letterSpacing: '0.2em', color: fg(dark, 1),
              textTransform: 'uppercase', flexShrink: 0,
              transition: 'color 0.4s ease',
            }}>
              SKILLS
            </span>
            <div style={{ flex: 1, height: '0.5px', background: fg(dark, 0.13), transition: 'background 0.4s ease' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, fontSize: 15 }}>
            <SkillGroup title="MARKETING" items={skillsData.marketing} dark={dark} />
            <SkillGroup title="ANALYTICS" items={skillsData.analytics} dark={dark} />
            <SkillGroup title="TOOLS"     items={skillsData.tools}     dark={dark} />
          </div>
        </div>

      </section>

      {/* ── Bottom-right page navigation ── */}
      <div style={{
        position: 'fixed', bottom: 68, right: 26,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
        zIndex: 10,
      }}>
        {[{ label: 'WORKS', path: '/works' }, { label: 'PROJECTS', path: '/projects' }].map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            style={{
              fontFamily: SANS, fontSize: 14, fontWeight: 300,
              letterSpacing: '0.15em', color: fg(dark, 0.7),
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = fg(dark, 1)}
            onMouseLeave={e => e.currentTarget.style.color = fg(dark, 0.7)}
          >
            {label} →
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Home;
