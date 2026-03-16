import React, { useEffect, useRef, useState } from 'react';
import { personalData, skillsData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS = "'Josefin Sans', sans-serif";

/* ── colour helper ── */
const alpha = (dark, lightVal, darkVal) => dark ? darkVal : lightVal;

/* ── small uppercase section label + extending rule ── */
const SectionLabel = ({ children, dark }) => {
  const labelColor = alpha(dark, 'rgba(18,18,18,0.45)', 'rgba(255,255,255,0.48)');
  const lineColor = alpha(dark, 'rgba(18,18,18,0.10)', 'rgba(255,255,255,0.13)');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
      <span
        style={{
          fontFamily: SANS,
          fontSize: 9,
          fontWeight: 300,
          letterSpacing: '0.42em',
          color: labelColor,
          textTransform: 'uppercase',
          flexShrink: 0,
          transition: 'color 0.4s ease'
        }}>

        {children}
      </span>
      <div style={{ flex: 1, height: '0.5px', background: lineColor, transition: 'background 0.4s ease' }} />
    </div>);

};

/* ── skill list group ── */
const SkillGroup = ({ title, items, dark }) => {
  const groupLabel = alpha(dark, 'rgba(18,18,18,0.22)', 'rgba(255,255,255,0.22)');
  const itemColor = alpha(dark, 'rgba(18,18,18,0.42)', 'rgba(255,255,255,0.42)');
  const itemHover = alpha(dark, 'rgba(18,18,18,0.80)', 'rgba(255,255,255,0.80)');
  return (
    <div>
      <p
        style={{
          fontFamily: SANS, fontSize: 8, fontWeight: 300,
          letterSpacing: '0.34em', color: groupLabel,
          textTransform: 'uppercase', marginBottom: 14,
          transition: 'color 0.4s ease'
        }}>

        {title}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map((item) =>
        <li
          key={item}
          style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 300,
            color: itemColor, letterSpacing: '0.04em',
            cursor: 'default', transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = itemHover}
          onMouseLeave={(e) => e.currentTarget.style.color = itemColor}>

            {item}
          </li>
        )}
      </ul>
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
  const subtitleColor = alpha(dark, 'rgba(18,18,18,0.38)', 'rgba(255,255,255,0.40)');
  const emailColor = alpha(dark, 'rgba(18,18,18,0.28)', 'rgba(255,255,255,0.26)');
  const emailHover = alpha(dark, 'rgba(18,18,18,0.70)', 'rgba(255,255,255,0.72)');
  const aboutLabel = alpha(dark, 'rgba(18,18,18,0.48)', 'rgba(255,255,255,0.48)');
  const aboutLine = alpha(dark, 'rgba(18,18,18,0.14)', 'rgba(255,255,255,0.16)');
  const aboutBody = alpha(dark, 'rgba(18,18,18,0.42)', 'rgba(255,255,255,0.40)');
  const bodyText = alpha(dark, 'rgba(18,18,18,0.42)', 'rgba(255,255,255,0.40)');

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
              fontSize: 11,
              fontWeight: 300,
              letterSpacing: '0.28em',
              color: subtitleColor,
              marginTop: 30,
              marginLeft: 3,
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
              fontFamily: SANS, fontSize: 10, fontWeight: 300,
              color: emailColor, letterSpacing: '0.06em',
              marginBottom: 4,
              transition: 'color 0.4s ease'
            }}>

            For business inquiries, email me at
          </p>
          <a
            href={`mailto:${personalData.email}`}
            style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 300,
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

            {/* ABOUT ME + horizontal rule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
              <span
                style={{
                  fontFamily: SANS, fontSize: 9, fontWeight: 300,
                  letterSpacing: '0.44em', color: aboutLabel,
                  textTransform: 'uppercase', flexShrink: 0,
                  transition: 'color 0.4s ease'
                }}>

                ABOUT ME
              </span>
              <div
                style={{
                  flex: 1, height: '0.5px',
                  background: aboutLine,
                  transition: 'background 0.4s ease'
                }} />

            </div>

            {/* About body */}
            <p
              style={{
                fontFamily: SANS, fontSize: 12.5, fontWeight: 300,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ fontFamily: SANS, fontSize: 9, fontWeight: 300, letterSpacing: '0.42em', color: aboutLabel, textTransform: 'uppercase', flexShrink: 0 }}>
            ABOUT ME
          </span>
          <div style={{ flex: 1, height: '0.5px', background: aboutLine }} />
        </div>
        <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 300, lineHeight: 2.0, color: aboutBody, letterSpacing: '0.02em', margin: 0 }}>
          {personalData.about}
        </p>
      </section>

      {/* ════════════════════════════════════════
           MOTIVATION + SKILLS  second screen
           ════════════════════════════════════════ */}
      <section
        className="motivation-section"
        style={{
          minHeight: '100vh',
          padding: '96px 44px 80px',
          display: 'flex',
          gap: 80
        }}>

        {/* Motivation */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionLabel dark={dark}>MOTIVATION</SectionLabel>
          <p
            style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 300,
              lineHeight: 2.2, color: bodyText,
              letterSpacing: '0.025em', maxWidth: 420,
              transition: 'color 0.4s ease'
            }}>

            {personalData.motivation}
          </p>
        </div>

        {/* Skills */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionLabel dark={dark}>SKILLS</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
            <SkillGroup dark={dark} title="MARKETING" items={skillsData.marketing} />
            <SkillGroup dark={dark} title="ANALYTICS" items={skillsData.analytics} />
            <SkillGroup dark={dark} title="TOOLS" items={skillsData.tools} />
          </div>
        </div>
      </section>

    </div>);

};

export default Home;