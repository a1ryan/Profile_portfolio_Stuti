import React, { useState, useEffect, useRef } from 'react';
import { experienceData, personalData } from '../data/mock';

const SERIF = "'Cormorant Garamond', 'Georgia', serif";
const SANS  = "'Josefin Sans', sans-serif";
const MONO  = "'Courier New', Courier, monospace";

const Works = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prevIndex = useRef(0);
  const sectionRefs = useRef([]);
  const total = experienceData.length;

  /* ── Intersection Observer ── */
  useEffect(() => {
    const observers = sectionRefs.current.map((el, index) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && index !== prevIndex.current) {
              /* fade out → swap content → fade in */
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
  }, []);

  const active = experienceData[activeIndex];

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>

      {/* ══════════════════════════════════
           LEFT — scrollable image panels
          ══════════════════════════════════ */}
      <div style={{ width: '55%', flexShrink: 0 }}>
        {experienceData.map((exp, index) => (
          <div
            key={exp.id}
            ref={el => (sectionRefs.current[index] = el)}
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 40px',
            }}
          >
            {/* Image placeholder */}
            <div style={{
              width: 580,
              height: 340,
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04)',
              flexShrink: 0,
              overflow: 'hidden',
            }}>
              {exp.image ? (
                <img
                  src={exp.image}
                  alt={exp.role}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
              ) : (
                <span style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 300,
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.18)',
                  textTransform: 'uppercase',
                }}>
                  {exp.role}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════
           RIGHT — sticky info panel
          ══════════════════════════════════ */}
      <div style={{
        width: '45%',
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '200px 44px 44px 40px',
        borderLeft: '0.5px solid rgba(255,255,255,0.08)',
        boxSizing: 'border-box',
      }}>

        {/* ── Top bar: WORKS label + handle ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
          <span style={{
            fontFamily: SANS,
            fontSize: 25,
            fontWeight: 300,
            letterSpacing: '0.42em',
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
          }}>
            WORKS
          </span>
          <span style={{
            fontFamily: SANS,
            fontSize: 20,
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.28)',
          }}>
            /{personalData.firstName.toLowerCase()}{personalData.lastName.toLowerCase()}
          </span>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '0.5px',
          background: 'rgba(255,255,255,0.12)',
          marginBottom: 0,
          flexShrink: 0,
        }} />

        {/* ── Animated content block ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>

          {/* Counter */}
          <p style={{
            fontFamily: MONO,
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 36px 0',
          }}>
            [ {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
          </p>

          {/* Project title */}
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,1)',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            margin: '0 0 14px 0',
          }}>
            {active.role}
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 32px 0',
          }}>
            {active.company} · {active.type}
          </p>

          {/* Description */}
          <p style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: 0,
            margin: 0,
            maxWidth: 360,
          }}>
            {active.description}
          </p>

        </div>

        {/* ── Scroll indicator ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: 14,
              lineHeight: 1,
            }}>
              ↓
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Works;
