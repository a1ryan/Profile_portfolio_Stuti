import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalData, skillsData, educationData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';
import SplashPage from '../components/SplashPage';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

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
const SkillGroup = ({ title, items, dark }) => (
  <div>
    <p style={{
      fontFamily: SANS, fontSize: 15, fontWeight: 400,
      letterSpacing: '0.2em', color: fg(dark, 0.55),
      textTransform: 'uppercase', marginBottom: 16,
      transition: 'color 0.4s ease',
    }}>
      {title}
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: -4 }}>
      {items.map((item) => (
        <span key={item} style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 300,
          color: fg(dark, 0.8),
          border: `1px solid ${fg(dark, 0.25)}`,
          borderRadius: 999, padding: '6px 16px',
          display: 'inline-block', margin: 4,
          background: 'transparent', cursor: 'default',
          transition: 'color 0.4s ease, border-color 0.4s ease',
        }}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const Home = () => {
  const { dark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <SplashPage />

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
          width: '40%', display: 'flex',
          justifyContent: 'center', alignItems: 'flex-start', flexShrink: 0,
        }}>
          <img
            src="/idcard.png"
            alt="ID Card"
            style={{ width: '100%', height: '100vh', objectFit: 'contain', objectPosition: 'top', display: 'block' }}
          />
        </div>

        {/* ── RIGHT COLUMN: text content ── */}
        <div style={{ width: '55%', display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>

          <h1 style={{
            fontFamily: SANS, fontSize: 'clamp(18px, 2.8vw, 48px)',
            fontWeight: 300, letterSpacing: '0.1em',
            whiteSpace: 'nowrap', color: '#B05575',
            margin: 0, lineHeight: 1.1,
          }}>
            Hi, I am Stuti Jain
          </h1>

          <div style={{
            width: '100%', height: '0.5px',
            background: fg(dark, 0.4),
            margin: '20px 0 24px',
            transition: 'background 0.4s ease',
          }} />

          <p style={{
            fontFamily: SANS, fontSize: 20, fontWeight: 300,
            lineHeight: 2.0, color: fg(dark, 0.8),
            letterSpacing: '0.025em', margin: 0, textAlign: 'justify',
            transition: 'color 0.4s ease',
          }}>
            {personalData.about}
          </p>

          <div style={{ marginTop: 40 }}>
            <SectionLabel dark={dark}>EDUCATION</SectionLabel>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {educationData.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  border: `1px solid ${fg(dark, 0.25)}`,
                  background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 4, transition: 'border-color 0.4s ease',
                }}>
                  <span style={{
                    fontFamily: SANS, fontSize: 10, fontWeight: 400,
                    color: fg(dark, 0.55), letterSpacing: '0.05em',
                    textAlign: 'center', lineHeight: 1.2,
                    transition: 'color 0.4s ease',
                  }}>
                    {edu.school.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: SANS, fontSize: 14, fontWeight: 400,
                    color: fg(dark, 0.88), margin: 0, letterSpacing: '0.05em',
                    transition: 'color 0.4s ease',
                  }}>
                    {edu.school}
                  </p>
                  <p style={{
                    fontFamily: SANS, fontSize: 12, fontWeight: 300,
                    color: fg(dark, 0.5), margin: '4px 0 0', letterSpacing: '0.04em',
                    transition: 'color 0.4s ease',
                  }}>
                    {edu.degree} · {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
           MOTIVATION + SKILLS  second screen
           ════════════════════════════════════════ */}
      <section style={{ padding: '96px 44px 80px', display: 'flex', flexDirection: 'column', gap: 72 }}>

        <div style={{ display: 'flex', gap: '5%', alignItems: 'flex-start' }}>
          <div style={{ width: '55%', minWidth: 0 }}>
            <SectionLabel dark={dark}>MOTIVATION</SectionLabel>
            <p style={{
              fontFamily: SANS, fontSize: 18, fontWeight: 300,
              lineHeight: 1.9, color: fg(dark, 0.85), letterSpacing: 0,
              transition: 'color 0.4s ease',
            }}>
              {personalData.motivation}
            </p>
          </div>
          <div style={{
            width: '40%', aspectRatio: '16 / 9',
            borderRadius: 12, overflow: 'hidden', flexShrink: 0,
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}>
            <img src="/beauty-1.jpeg" alt="Beauty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <SectionLabel dark={dark}>SKILLS</SectionLabel>
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
