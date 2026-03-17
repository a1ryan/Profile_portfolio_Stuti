import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalData, skillsData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS = "'Josefin Sans', sans-serif";

/* ── colour helper ── */
const alpha = (dark, lightVal, darkVal) => dark ? darkVal : lightVal;

/* ── small uppercase section label + extending rule ── */
const SectionLabel = ({ children, dark }) => {
  const labelColor = 'rgba(255,255,255,0.8)';
  const lineColor = alpha(dark, 'rgba(18,18,18,0.10)', 'rgba(255,255,255,0.13)');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
      <span
        style={{
          fontFamily: SANS,
          fontSize: 22,
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,1)',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>

        {children}
      </span>
      <div style={{ flex: 1, height: '0.5px', background: lineColor, transition: 'background 0.4s ease' }} />
    </div>);

};

/* ── skill list group ── */
const SkillGroup = ({ title, items, dark }) => {
  const groupLabel = 'rgba(255,255,255,0.8)';
  const itemColor = 'rgba(255,255,255,0.8)';
  const itemHover = 'rgba(255,255,255,0.8)';
  return (
    <div>
      <p
        style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 400,
          letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase', marginBottom: 16,
        }}>

        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: -4 }}>
        {items.map((item) =>
          <span
            key={item}
            style={{
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 999,
              padding: '6px 16px',
              display: 'inline-block',
              margin: 4,
              background: 'transparent',
              cursor: 'default',
            }}>
            {item}
          </span>
        )}
      </div>
    </div>);

};

/* ══════════════════════════════════════════════════════════════ */
const Home = () => {
  const { dark } = useTheme();
  const nameRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // slight entrance delay for elegance
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (nameRef.current) {
        nameRef.current.style.transform = `translateX(-${y * 0.055}px)`;
        nameRef.current.style.opacity = Math.max(0, 1 - y / 460).toString();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* colour tokens */
  const nameColor = alpha(dark, 'rgba(18,18,18,0.88)', 'rgba(255,255,255,0.88)');
  const subtitleColor = 'rgba(255,255,255,0.8)';
  const emailColor = 'rgba(255,255,255,0.8)';
  const emailHover = 'rgba(255,255,255,0.8)';
  const aboutLabel = 'rgba(255,255,255,0.8)';
  const aboutLine = alpha(dark, 'rgba(18,18,18,0.14)', 'rgba(255,255,255,0.16)');
  const aboutBody = 'rgba(255,255,255,0.8)';
  const bodyText = 'rgba(255,255,255,0.8)';

  return (
    <div>

      {/* ════════════════════════════════════════
           HERO  ·  cinematic full-screen section
           ════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 580,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>


        {/* LEFT: name block + subtitle */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 44,
            /* push right edge away from the About panel */
            paddingRight: 'max(44px, 42%)',
            paddingTop: 32,
            paddingBottom: 0
          }}>

          {/* Name — parallax wrapper */}
          <div
            ref={nameRef}
            style={{
              willChange: 'transform, opacity',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1)'
            }}>

            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 100,
                fontSize: 'clamp(68px, 15vw, 248px)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
                color: nameColor,
                margin: 0,
                whiteSpace: 'nowrap',
                transition: 'color 0.4s ease'
              }}>

              {personalData.firstName}
            </h1>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 100,
                fontSize: 'clamp(68px, 15vw, 248px)',
                lineHeight: 0.88,
                letterSpacing: '-0.015em',
                color: nameColor,
                margin: 0,
                whiteSpace: 'nowrap',
                transition: 'color 0.4s ease'
              }}>

              {personalData.lastName}
            </h1>
          </div>

          {/* Role subtitle */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: 20,
              fontWeight: 300,
              letterSpacing: '0.28em',
              color: subtitleColor,
              marginTop: 30,
              marginLeft: 0,
              paddingLeft: 0,
              transition: 'color 0.4s ease'
            }}>

            {personalData.title}
          </p>
        </div>

        {/* BOTTOM-LEFT: email */}
        <div
          style={{
            paddingLeft: 44,
            paddingBottom: 52,
            flexShrink: 0
          }}>

          <p
            style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 300,
              color: emailColor, letterSpacing: '0.06em',
              marginBottom: 4,
              transition: 'color 0.4s ease'
            }}>

            For business inquiries, email me at
          </p>
          <a
            href={`mailto:${personalData.email}`}
            style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 300,
              color: emailColor, letterSpacing: '0.06em',
              textDecoration: 'none',
              transition: 'color 0.25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = emailHover}
            onMouseLeave={(e) => e.currentTarget.style.color = emailColor}>

            {personalData.email}
          </a>
        </div>

        {/* RIGHT PANEL: About Me — desktop only */}
        <div
          className="about-desktop"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '42%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 72,
            paddingLeft: 48
          }}>

          <div>

            {/* ABOUT ME heading */}
            <span
              style={{
                fontFamily: SANS, fontSize: 24, fontWeight: 300,
                letterSpacing: '0.25em', color: 'rgba(255,255,255,1)',
                textTransform: 'uppercase', display: 'block',
                marginBottom: 14,
              }}>
              ABOUT ME
            </span>

            {/* Horizontal divider after heading */}
            <div
              style={{
                width: '100%', height: '0.5px',
                background: 'rgba(255,255,255,0.4)',
                marginBottom: 24,
              }} />

            {/* About body */}
            <p
              style={{
                fontFamily: SANS, fontSize: 20, fontWeight: 300,
                lineHeight: 2.0, color: aboutBody,
                letterSpacing: '0.025em', margin: 0,
                transition: 'color 0.4s ease'
              }} className="!text-[rgba(255,255,255,0.8)]">
              {personalData.about}
            </p>

          </div>
        </div>

      </section>

      {/* ── About Me: mobile ── */}
      <section className="about-mobile" style={{ padding: '60px 44px' }}>
        <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 300, letterSpacing: '0.25em', color: 'rgba(255,255,255,1)', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
          ABOUT ME
        </span>
        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255,255,255,0.4)', marginBottom: 22 }} />
        <p style={{ fontFamily: SANS, fontSize: 20, fontWeight: 300, lineHeight: 2.0, color: aboutBody, letterSpacing: '0.02em', margin: 0 }}>
          {personalData.about}
        </p>
      </section>

      {/* ════════════════════════════════════════
           MOTIVATION + SKILLS  second screen
           ════════════════════════════════════════ */}
      <section
        style={{
          padding: '96px 44px 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: 72
        }}>

        {/* Top row: Motivation (55%) + Image placeholder (40%) */}
        <div style={{ display: 'flex', gap: '5%', alignItems: 'flex-start' }}>

          {/* Motivation */}
          <div style={{ width: '55%', minWidth: 0 }}>
            <SectionLabel dark={dark}>MOTIVATION</SectionLabel>
            <p
              style={{
                fontFamily: SANS, fontSize: 14, fontWeight: 300,
                lineHeight: 1.9, color: 'rgba(255,255,255,0.85)',
                letterSpacing: 0,
              }}>
              {personalData.motivation}
            </p>
          </div>

          {/* Image */}
          <div
            style={{
              width: '40%',
              aspectRatio: '16 / 9',
              borderRadius: 12,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}>
            <img
              src="/beauty-1.jpeg"
              alt="Beauty"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Skills — full width below */}
        <div style={{ width: '100%' }}>
          <SectionLabel dark={dark}>SKILLS</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            <SkillGroup dark={dark} title="MARKETING" items={skillsData.marketing} />
            <SkillGroup dark={dark} title="ANALYTICS" items={skillsData.analytics} />
            <SkillGroup dark={dark} title="TOOLS" items={skillsData.tools} />
          </div>
        </div>

      </section>

      {/* ── Bottom-right page navigation ── */}
      <div style={{
        position: 'fixed',
        bottom: 68,
        right: 26,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        zIndex: 10,
      }}>
        {[{ label: 'WORKS', path: '/works' }, { label: 'GALLERY', path: '/gallery' }].map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            {label} →
          </Link>
        ))}
      </div>

    </div>);

};

export default Home;