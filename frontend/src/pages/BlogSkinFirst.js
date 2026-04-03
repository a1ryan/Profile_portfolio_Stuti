import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

const ImgPlaceholder = ({ caption }) => (
  <div style={{ margin: '2.5rem 0' }}>
    <div style={{
      width: '100%', height: 320,
      background: 'rgba(255,255,255,0.04)',
      border: '1px dashed rgba(180,100,255,0.4)',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: SANS, fontSize: 12, fontWeight: 300,
        letterSpacing: '0.2em', color: 'rgba(180,100,255,0.4)',
        textTransform: 'uppercase',
      }}>Image Placeholder</span>
    </div>
    {caption && (
      <p style={{
        fontFamily: SANS, fontSize: 12, fontWeight: 300,
        color: 'rgba(180,100,255,0.6)', fontStyle: 'italic',
        textAlign: 'center', marginTop: 10, letterSpacing: '0.03em',
      }}>{caption}</p>
    )}
  </div>
);

const BlogSkinFirst = () => {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const h2Style = {
    fontFamily: SERIF, fontSize: isMobile ? '1.25rem' : '2.4rem', fontWeight: 700,
    color: fg(dark, 1), margin: isMobile ? '2rem 0 0.8rem' : '4rem 0 1.2rem',
    borderLeft: '3px solid #e040fb', paddingLeft: '0.9rem',
    lineHeight: 1.25,
  };

  const h3Style = {
    fontFamily: SERIF, fontSize: isMobile ? '1rem' : '1.45rem', fontWeight: 600,
    color: 'rgba(200,150,255,1)', margin: isMobile ? '1.5rem 0 0.5rem' : '2.5rem 0 0.8rem',
    lineHeight: 1.35,
  };

  const bodyStyle = {
    fontFamily: SANS, fontSize: isMobile ? '0.875rem' : '1.1rem', fontWeight: 300,
    color: fg(dark, 0.85), lineHeight: isMobile ? 1.75 : 2.0,
    letterSpacing: '0.01em', margin: isMobile ? '0 0 0.85rem' : '0 0 1.2rem',
  };

  const numberHeadStyle = {
    fontFamily: SERIF, fontSize: isMobile ? '1rem' : '1.3rem', fontWeight: 700,
    color: fg(dark, 0.9), margin: isMobile ? '1.5rem 0 0.5rem' : '2.5rem 0 0.8rem',
    lineHeight: 1.4,
  };

  const pullQuoteStyle = {
    fontFamily: SERIF, fontSize: isMobile ? '1rem' : '1.65rem', fontWeight: 300,
    fontStyle: 'italic', color: 'rgba(210,170,255,0.9)',
    textAlign: 'center', lineHeight: 1.55,
    padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
    borderTop: '0.5px solid rgba(224,64,251,0.3)',
    borderBottom: '0.5px solid rgba(224,64,251,0.3)',
    margin: isMobile ? '2rem 0' : '3.5rem 0',
  };

  const px = isMobile ? '16px' : '44px';

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>

      {/* ── Nav bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `18px ${px}`,
        background: dark ? 'rgba(11,0,14,0.85)' : 'rgba(244,243,239,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: `0.5px solid ${fg(dark, 0.06)}`,
      }}>
        <button
          onClick={() => navigate('/gallery')}
          style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 300,
            letterSpacing: '0.15em', color: fg(dark, 0.55),
            background: 'none', border: 'none', cursor: 'pointer',
            textTransform: 'uppercase', transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = fg(dark, 1)}
          onMouseLeave={e => e.currentTarget.style.color = fg(dark, 0.55)}
        >← Back</button>
        <span style={{
          fontFamily: SERIF, fontSize: 16, fontWeight: 700,
          color: fg(dark, 0.9), letterSpacing: '0.05em',
        }}>Stuti Jain</span>
        <div style={{ width: 60 }} />
      </div>

      {/* ── Hero ── */}
      <div style={{ padding: isMobile ? `28px ${px} 0` : '64px 44px 0', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 400,
          letterSpacing: '0.28em', color: 'rgba(224,64,251,0.9)',
          textTransform: 'uppercase', display: 'block', marginBottom: 20,
        }}>Beauty Innovation</span>

        <h1 style={{
          fontFamily: SERIF, fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.6rem)' : 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, color: fg(dark, 1),
          margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>The Skin-First Revolution</h1>

        <p style={{
          fontFamily: SANS, fontSize: '1.1rem', fontWeight: 300,
          color: 'rgba(210,170,255,0.95)', margin: '0 0 28px',
          lineHeight: 1.6, letterSpacing: '0.01em',
        }}>Why Makeup is Becoming Skincare</p>

        <div style={{ height: '0.5px', background: fg(dark, 0.12), marginBottom: 20 }} />

        <p style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 300,
          color: fg(dark, 0.75), letterSpacing: '0.1em',
          marginBottom: 40,
        }}>
          By Stuti Jain &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; 5 min read
        </p>

        {/* Cover image */}
        <div style={{
          width: '100%', height: isMobile ? 200 : 450, borderRadius: isMobile ? 10 : 16, overflow: 'hidden',
          marginBottom: isMobile ? 28 : 64,
        }}>
          <img src="/b2 cv.jpg" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? `0 ${px}` : '0 44px' }}>
        <div style={{
          background: dark ? 'rgba(10,0,18,0.7)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: isMobile ? 12 : 20,
          padding: isMobile ? '1.25rem' : '3rem',
        }}>

          {/* Intro */}
          <p style={{
            fontFamily: SANS, fontSize: '1.2rem', fontWeight: 300,
            color: fg(dark, 0.7), lineHeight: 1.9,
            fontStyle: 'italic', margin: '0 0 3rem',
          }}>
            For decades, the relationship between makeup and skincare was one of cause and effect:
            you applied skincare to prep the face and makeup to cover it up. Today, that boundary
            is getting dissolved. We are witnessing a massive shift toward hybrid beauty, where the
            primary goal isn't just to make skin look good with pigments but also to explore ways
            to make it look healthy through active ingredients.
          </p>

          {/* Section 1 */}
          <h2 style={h2Style}>From Coverage to Care</h2>
          <p style={bodyStyle}>
            The Clean Girl and Glass Skin aesthetics have traded heavy foundations for breathable,
            nutrient-rich formulas. According to market insights from Mintel, consumers are
            increasingly looking for hard-working products. They don't want a foundation that hides
            a blemish; they want a foundation that treats the blemish while they wear it.
          </p>
          <p style={bodyStyle}>
            Brands are re-engineering makeup using biomimetic technology, formulating products that
            mimic the skin's natural biological processes.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b2i4.webp" alt="Clean Girl & Glass Skin Aesthetic" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 2 */}
          <h2 style={h2Style}>The Innovation of Hybrid Formulas</h2>
          <p style={bodyStyle}>
            Innovation in this space is moving at breakneck speed. Brands are no longer adding a
            drop of Vitamin E for marketing; they are re-engineering makeup from the ground up.
          </p>

          <p style={numberHeadStyle}>1. Serum-Infused Bases & Molecular Weight</p>
          <p style={bodyStyle}>
            Products like Tinted Oleogels or Serum Foundations are now the industry standard.
            However, the true knowledge lies in the molecular weight of the ingredients used.
          </p>

          <h3 style={h3Style}>Hyaluronic Acid & Polyglutamic Acid</h3>
          <p style={bodyStyle}>
            While many brands use Hyaluronic Acid, top-tier hybrid products now incorporate
            polyglutamic acid, which holds 4× more moisture and creates a micro-filter on the skin
            that prevents pigment from settling into fine lines.
          </p>

          <h3 style={h3Style}>Niacinamide (Vitamin B3)</h3>
          <p style={bodyStyle}>
            Integrated at active percentages (usually 2–5%) to regulate sebum production and
            strengthen the lipid barrier while providing a blurred, soft-focus finish.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b2i1.jpg" alt="Hybrid Formula Ingredients" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          <p style={numberHeadStyle}>2. Advanced SPF & Environmental Shielding</p>
          <p style={bodyStyle}>
            While SPF in makeup isn't new, the innovation lies in Non-Nano Mineral Shields.
          </p>

          <h3 style={h3Style}>Non-Nano Mineral Technology</h3>
          <p style={bodyStyle}>
            New formulations use dispersed zinc oxide that provides broad-spectrum protection
            without the white cast or heavy feel of traditional sunscreens.
          </p>

          <h3 style={h3Style}>Blue Light Protection</h3>
          <p style={bodyStyle}>
            Beyond UV, these hybrids now include Iron Oxides and Lutein, which are scientifically
            proven to protect skin against the High Energy Visible (HEV) light emitted by our
            digital screens.
          </p>

          <p style={numberHeadStyle}>3. Barrier Repair</p>
          <p style={bodyStyle}>
            There is a rise of Cica (Centella Asiatica) and Ceramides in primers and setting sprays
            to protect the skin barrier against environmental stressors throughout the day. These
            ingredients actively repair the Acid Mantle — the skin's protective film. By using
            Micro-encapsulation technology, these actives are released slowly throughout the day,
            ensuring that the skin remains calm even under a full day of wear.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b2i1b.webp" alt="Barrier Repair & Active Ingredients" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 3 */}
          <h2 style={h2Style}>Why Health Trumps Perfection</h2>
          <p style={bodyStyle}>
            The shift is psychological as much as it is chemical. Post-pandemic, the no-makeup
            makeup look became a staple. People realized that healthy skin requires less coverage.
            Consequently, makeup has transitioned into the final step of a skincare routine rather
            than the first step of a transformation.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b2i7.jpg" alt="No-Makeup Makeup & Healthy Skin" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', filter: 'contrast(1.1) saturate(1.15) brightness(1.02)' }} />
          </div>

          {/* Closing */}
          <div style={{
            borderTop: `0.5px solid ${fg(dark, 0.1)}`,
            borderBottom: `0.5px solid ${fg(dark, 0.1)}`,
            padding: '2.5rem 0', margin: '3rem 0 2rem', textAlign: 'center',
          }}>
            <p style={{
              fontFamily: SANS, fontSize: '1.15rem', fontWeight: 300,
              color: 'rgba(220,180,255,0.9)', lineHeight: 1.9,
              fontStyle: 'italic', margin: 0,
            }}>
              "The future of beauty is 'biocompatible.' It's about products that mimic the skin's
              natural functions rather than sitting on top of them."
              <span style={{ display: 'block', marginTop: 12, fontSize: '0.9rem', color: 'rgba(180,120,255,0.6)', letterSpacing: '0.1em' }}>
                — Industry Insight, Business of Fashion
              </span>
            </p>
          </div>

        </div>

        {/* ── Article footer ── */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: '0.5px', background: fg(dark, 0.1), marginBottom: 32 }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(224,64,251,0.4), rgba(123,47,247,0.4))',
              border: '1px solid rgba(224,64,251,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: '#fff' }}>S</span>
            </div>
            <div>
              <p style={{
                fontFamily: SANS, fontSize: 13, fontWeight: 400,
                color: fg(dark, 1), margin: 0, letterSpacing: '0.05em',
              }}>Written by Stuti Jain</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {['#SkinFirst', '#HybridBeauty', '#BeautyInnovation', '#Skincare', '#MakeupTrends'].map(tag => (
              <span key={tag} style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 300,
                color: 'rgba(200,150,255,0.85)',
                border: '1px solid rgba(180,100,255,0.3)',
                borderRadius: 999, padding: '4px 14px',
                letterSpacing: '0.05em',
              }}>{tag}</span>
            ))}
          </div>

          <button
            onClick={() => navigate('/gallery')}
            style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 300,
              letterSpacing: '0.2em', color: fg(dark, 1),
              background: 'none', border: '1px solid #e040fb',
              borderRadius: 999, padding: '10px 24px',
              cursor: 'pointer',
              transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(224,64,251,0.7), rgba(123,47,247,0.7))';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(224,64,251,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >← Back to Portfolio</button>
        </div>
      </div>
    </div>
  );
};

export default BlogSkinFirst;
