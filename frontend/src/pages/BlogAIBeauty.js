import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

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

const BlogAIBeauty = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const h2Style = {
    fontFamily: SERIF, fontSize: isMobile ? '1.25rem' : '2.4rem', fontWeight: 700,
    color: '#ffffff', margin: isMobile ? '2rem 0 0.8rem' : '4rem 0 1.2rem',
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
    color: 'rgba(255,255,255,0.85)', lineHeight: isMobile ? 1.75 : 2.0,
    letterSpacing: '0.01em', margin: isMobile ? '0 0 0.85rem' : '0 0 1.2rem',
  };

  const numberHeadStyle = {
    fontFamily: SERIF, fontSize: isMobile ? '1rem' : '1.3rem', fontWeight: 700,
    color: 'rgba(210,170,255,0.95)', margin: isMobile ? '1.5rem 0 0.5rem' : '2.5rem 0 0.8rem',
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
        background: 'rgba(11,0,14,0.85)', backdropFilter: 'blur(14px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}>
        <button
          onClick={() => navigate('/gallery')}
          style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 300,
            letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)',
            background: 'none', border: 'none', cursor: 'pointer',
            textTransform: 'uppercase', transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
        >← Back</button>
        <span style={{
          fontFamily: SERIF, fontSize: 16, fontWeight: 700,
          color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em',
        }}>Stuti Jain</span>
        <div style={{ width: 60 }} />
      </div>

      {/* ── Hero ── */}
      <div style={{ padding: isMobile ? `28px ${px} 0` : '64px 44px 0', maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 400,
          letterSpacing: '0.28em', color: 'rgba(224,64,251,0.9)',
          textTransform: 'uppercase', display: 'block', marginBottom: 20,
        }}>Beauty Tech</span>

        <h1 style={{
          fontFamily: SERIF, fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.6rem)' : 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, color: '#ffffff',
          margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>The Algorithmic Atelier</h1>

        <p style={{
          fontFamily: SANS, fontSize: '1.1rem', fontWeight: 300,
          color: 'rgba(210,170,255,0.95)', margin: '0 0 28px',
          lineHeight: 1.6, letterSpacing: '0.01em',
        }}>Why AI is the New Frontier of Beauty Retail</p>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.12)', marginBottom: 20 }} />

        <p style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 300,
          color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em',
          marginBottom: 40,
        }}>
          By Stuti Jain &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; 6 min read
        </p>

        {/* Cover image */}
        <div style={{
          width: '100%', height: isMobile ? 200 : 450, borderRadius: isMobile ? 10 : 16, overflow: 'hidden',
          marginBottom: isMobile ? 28 : 64,
        }}>
          <img src="/b3cv1.jpg" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? `0 ${px}` : '0 44px' }}>
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: isMobile ? 12 : 20,
          padding: isMobile ? '1.25rem' : '3rem',
        }}>

          {/* Intro */}
          <p style={{
            fontFamily: SANS, fontSize: '1.2rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.7)', lineHeight: 1.9,
            fontStyle: 'italic', margin: '0 0 3rem',
          }}>
            For years, the holy grail of e-commerce was bridging the gap between the tactile
            experience of a physical store and the convenience of digital. In 2026, e-commerce is
            not just bridging it; it's erasing it. Artificial intelligence has transformed the
            online market from a static catalog into a living, conversational ecosystem that
            handles everything from the first discovery to the final purchase.
          </p>

          {/* Section 1 */}
          <h2 style={h2Style}>Beyond the Filter: Hyper-Realistic Virtual Try-Ons (VTO)</h2>
          <p style={bodyStyle}>
            Today's VTO technology maps the hex code of the product against the unique undertones
            and texture of the user's face.
          </p>

          <p style={numberHeadStyle}>The Reality Engine</p>
          <p style={bodyStyle}>
            High-fidelity AI now simulates how a matte vs. dewy texture actually reflects light on
            the specific skin grain. This feels like the product is physically on the face.
          </p>

          <p style={numberHeadStyle}>The Confidence Multiplier</p>
          <p style={bodyStyle}>
            By allowing consumers to test products on their own skin tones and facial structures in
            real-time (digitally), brands are seeing a 30% to 40% increase in conversion rates.
          </p>

          <p style={numberHeadStyle}>The Psychological Safety Net</p>
          <p style={bodyStyle}>
            This is the Death of Guess-and-Buy. By eliminating the anxiety associated with
            shade-matching online, brands are seeing a massive reduction in product returns, saving
            in logistics and reducing environmental waste.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b312.jpg" alt="Virtual Try-On Technology" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 2 */}
          <h2 style={h2Style}>The AI Consultant: Diagnostic Discovery</h2>
          <p style={bodyStyle}>
            Discovery has evolved from searching to scanning. Modern AI can now scan a user's face
            to provide a real-time skin analysis, identifying concerns like dehydration, redness,
            or hyperpigmentation.
          </p>

          <h3 style={h3Style}>Precision Recommendation</h3>
          <p style={bodyStyle}>
            Instead of a user scrolling through 500 moisturizers, the AI suggests the exact three
            products required for their current skin state. It turns the discovery phase into a
            personalized consultation, helping consumers decide with expert-level certainty.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b3i3.jpeg" alt="AI Skin Diagnostic" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 3 */}
          <h2 style={h2Style}>The Sephora × ChatGPT Breakthrough: Conversational Commerce</h2>
          <p style={bodyStyle}>
            The most disruptive shift is the move toward a unified AI cart journey. Sephora's
            integration into the ChatGPT ecosystem represents a fundamental change in the consumer
            funnel.
          </p>

          <h3 style={h3Style}>The New Layer of Commerce</h3>
          <p style={bodyStyle}>
            Previously, a user would search a product, read reviews, and manually add to a cart.
            Now, the AI is not just a supporting factor; it is the e-commerce platform.
          </p>

          <h3 style={h3Style}>Frictionless Flow</h3>
          <p style={bodyStyle}>
            From the moment a user asks for a vegan blush matching their cool undertone to the
            moment they add the option to their cart, the entire journey happens within the AI
            interface. The AI has moved from a search tool to a transaction agent.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b3i5.jpeg" alt="Conversational Commerce & AI Cart Journey" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 4 */}
          <h2 style={h2Style}>The SEO Revolution: From Keywords to Answer Engine Optimization (AEO)</h2>
          <p style={bodyStyle}>
            This shift is breaking traditional SEO. The world is entering the market of Generative
            Engine Optimization (GEO). Consumers are no longer just Googling "best red lipstick";
            they are asking OpenAI, Perplexity, and other AI agents for specific solutions.
          </p>

          <h3 style={h3Style}>The New Strategy</h3>
          <p style={bodyStyle}>
            Companies should not only focus on being number one on a search page; they should also
            try to be the cited answer provided by an AI agent.
          </p>

          <h3 style={h3Style}>Marketing Through AI</h3>
          <p style={bodyStyle}>
            Brands must now pivot toward AEO. This means providing structured, machine-readable
            data so that when an AI reasons through a consumer's query, your brand is the logical
            conclusion it presents.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b3i6.png" alt="AEO & Generative Engine Optimization" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Closing */}
          <div style={{
            borderTop: '0.5px solid rgba(255,255,255,0.1)',
            borderBottom: '0.5px solid rgba(255,255,255,0.1)',
            padding: '2.5rem 0', margin: '3rem 0 2rem', textAlign: 'center',
          }}>
            <p style={{
              fontFamily: SANS, fontSize: '1.15rem', fontWeight: 300,
              color: 'rgba(220,180,255,0.9)', lineHeight: 1.9,
              fontStyle: 'italic', margin: 0,
            }}>
              "AI is no longer an e-commerce support button; it is the platform itself. If your
              brand is not searchable by an AI agent's reasoning engine, you are effectively
              invisible to the modern consumer."
              <span style={{ display: 'block', marginTop: 12, fontSize: '0.9rem', color: 'rgba(180,120,255,0.6)', letterSpacing: '0.1em' }}>
                — The Verdict
              </span>
            </p>
          </div>

        </div>

        {/* ── Article footer ── */}
        <div style={{ marginTop: 48 }}>
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', marginBottom: 32 }} />

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
                color: '#ffffff', margin: 0, letterSpacing: '0.05em',
              }}>Written by Stuti Jain</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {['#AIBeauty', '#BeautyTech', '#VirtualTryOn', '#ConversationalCommerce', '#AEO', '#BeautyRetail'].map(tag => (
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
              letterSpacing: '0.2em', color: '#ffffff',
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

export default BlogAIBeauty;
