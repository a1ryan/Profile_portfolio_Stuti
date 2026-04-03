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

const BlogGenZ = () => {
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
        }}>Beauty Marketing</span>

        <h1 style={{
          fontFamily: SERIF, fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.6rem)' : 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, color: fg(dark, 1),
          margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>How Brands Can Win Gen Z</h1>

        <p style={{
          fontFamily: SANS, fontSize: '1.1rem', fontWeight: 300,
          color: 'rgba(210,170,255,0.95)', margin: '0 0 28px',
          lineHeight: 1.6, letterSpacing: '0.01em',
        }}>Strategies to Engage the Most Influential Generation</p>

        <div style={{ height: '0.5px', background: fg(dark, 0.12), marginBottom: 20 }} />

        <p style={{
          fontFamily: SANS, fontSize: 12, fontWeight: 300,
          color: fg(dark, 0.75), letterSpacing: '0.1em',
          marginBottom: 40,
        }}>
          By Stuti Jain &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; 8 min read
        </p>

        {/* Cover image */}
        <div style={{
          width: '100%', height: isMobile ? 200 : 450, borderRadius: isMobile ? 10 : 16, overflow: 'hidden',
          marginBottom: isMobile ? 28 : 64,
        }}>
          <img src="/b1 cv.jpg" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            Generation Z has become one of the most important consumer groups in beauty and personal care.
            Their influence extends well beyond purchasing behavior. They shape product discovery, drive
            trend cycles, influence online conversations, and set new expectations for what brands should
            look like and stand for. For beauty companies, Gen Z is not simply another audience segment.
            It is a generation actively reshaping the category.
          </p>

          {/* Section 1 */}
          <h2 style={h2Style}>Why Does Gen Z Spend So Much on Personal Care?</h2>
          <p style={bodyStyle}>
            Personal care holds a strong place in Gen Z's everyday life. The category fits naturally
            into their routines, their online behavior, and the way they express identity. Beauty products
            are visible, accessible, and easy to experiment with, which makes them a frequent point of
            engagement. For many consumers in this group, spending on personal care feels relevant and
            immediate in a way that other categories may not.
          </p>

          <h3 style={h3Style}>Self-Care Culture and Mental Health</h3>
          <p style={bodyStyle}>
            Gen Z has grown up in a culture where self-care is treated as part of everyday well-being.
            Skincare, makeup, and wellness products often sit inside routines that bring comfort, structure,
            and a sense of control. This gives beauty a role that goes beyond grooming. Brands that
            understand this mindset tend to communicate more effectively, because they speak to the place
            these products hold in daily life.
          </p>

          <h3 style={h3Style}>Social Media Influence</h3>
          <p style={bodyStyle}>
            Social media has changed the speed and scale of beauty discovery. TikTok, Instagram, and
            YouTube function as product search engines, review platforms, and trend accelerators all at
            once. Consumers watch tutorials, compare routines, follow creator recommendations, and form
            opinions quickly. A product can gain visibility through a campaign, but it often gains
            relevance through conversation.
          </p>

          <h3 style={h3Style}>Inclusivity and Representation</h3>
          <p style={bodyStyle}>
            Gen Z pays close attention to who a brand includes and how that inclusion is reflected.
            Representation across skin tones, identities, and styles carries real weight in beauty.
            Consumers want to see themselves in the category and are quick to notice when a brand
            presents a narrow or outdated view of beauty. Inclusive communication is no longer a
            differentiator by itself. It is part of baseline credibility.
          </p>

          <h3 style={h3Style}>Experimentation and Identity</h3>
          <p style={bodyStyle}>
            Beauty gives Gen Z room to explore identity in a visible and flexible way. Makeup, skincare,
            hair, and product layering all offer opportunities to test moods, looks, and preferences.
            This generation approaches beauty with curiosity. Many are willing to try new textures, niche
            ingredients, and hybrid products if the brand feels relevant and the experience feels engaging.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/brand marketing.jpg" alt="Brand Marketing" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', display: 'block' }} />
          </div>

          {/* Section 2 */}
          <h2 style={h2Style}>What Does Gen Z Look for in Beauty Brands?</h2>
          <p style={bodyStyle}>
            Gen Z looks for brands that feel current, trustworthy, and self-aware. Product quality matters,
            but so does the wider brand experience. Consumers pay attention to tone, values, representation,
            transparency, and how well the digital journey works. Brand perception is shaped across many
            touchpoints, not just through the product itself.
          </p>

          <h3 style={h3Style}>Authenticity Over Perfection</h3>
          <p style={bodyStyle}>
            Highly polished brand imagery does not always build trust with Gen Z. Consumers respond more
            strongly to brands that feel believable and grounded. They notice when communication feels
            overly staged or disconnected from real usage. Honest reviews, visible results, real creators,
            and a more natural tone tend to land better than perfection-driven messaging.
          </p>

          <h3 style={h3Style}>Purpose-Driven Branding</h3>
          <p style={bodyStyle}>
            Gen Z expects brands to have a clear point of view. Social and environmental issues often
            influence how a company is judged, especially in categories tied closely to identity and
            lifestyle. Consumers do not expect every brand to speak on everything, but they do notice
            when values appear inconsistent or purely promotional. A strong stance has more impact when
            it is reflected in actions, partnerships, and internal consistency.
          </p>

          <h3 style={h3Style}>Transparency and Sustainability</h3>
          <p style={bodyStyle}>
            Ingredient awareness, packaging choices, sourcing, and ethical claims have become more visible
            to Gen Z consumers. Many take time to research before buying, especially when a product enters
            their regular routine. Clear information builds confidence. Vague language and broad
            sustainability claims tend to create doubt. The brands that come across best are often the ones
            that explain their choices clearly and avoid overstating them.
          </p>

          <h3 style={h3Style}>Personalization and Tech Integration</h3>
          <p style={bodyStyle}>
            Technology has become part of how Gen Z expects to shop beauty. Shade finders, skin
            diagnostics, virtual try-ons, and recommendation tools help reduce guesswork and make the
            experience more relevant. These features matter most when they are easy to use and genuinely
            useful. Good tech improves confidence and decision-making. Bad tech feels gimmicky very quickly.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b1i2.jpg" alt="Brand Values" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Section 3 */}
          <h2 style={h2Style}>How to Make Your Beauty Brand Attractive to Gen Z?</h2>
          <p style={bodyStyle}>
            Brands that connect well with Gen Z usually build more than visibility. They build relevance.
            That means understanding where attention comes from, what builds trust, and how to make the
            consumer experience feel intuitive from the first interaction onward.
          </p>

          <h3 style={h3Style}>Embrace a Mobile-First Strategy</h3>
          <p style={bodyStyle}>
            For Gen Z, the phone is the main point of contact with a brand. Discovery, research, reviews,
            social browsing, and purchase decisions often happen on the same device. A slow or cluttered
            mobile experience weakens interest immediately. A strong mobile journey signals ease, clarity,
            and brand quality.
          </p>

          <h3 style={h3Style}>Create Interactive Experiences</h3>
          <p style={bodyStyle}>
            Interactive formats tend to perform well because they make beauty easier to explore. Virtual
            try-ons, quizzes, shade tools, and personalized recommendation journeys invite users to
            participate rather than scroll past. They also create a stronger bridge between curiosity and
            conversion. In beauty, interactivity often works best when it supports decision-making instead
            of distracting from it.
          </p>

          <h3 style={h3Style}>Leverage User-Generated Content</h3>
          <p style={bodyStyle}>
            User-generated content remains one of the strongest trust signals for Gen Z. Consumers often
            place more weight on peer reviews, routine videos, and creator demonstrations than on formal
            brand campaigns. This kind of content makes products feel tested, visible, and socially
            validated. It also helps brands build community without relying entirely on polished messaging.
          </p>

          <h3 style={h3Style}>Partner with the Right Influencers</h3>
          <p style={bodyStyle}>
            Influencer marketing still matters, but fit matters more than fame. Gen Z tends to respond
            better to creators who feel consistent, specific, and believable in the category. Smaller
            creators often perform well because their recommendations feel closer to real-life use. A
            strong partnership looks natural. A weak one looks transactional.
          </p>

          <h3 style={h3Style}>Commit to Inclusivity — In Practice, Not Just in Message</h3>
          <p style={bodyStyle}>
            Inclusivity has to show up across the full brand system. Product shade ranges, visual casting,
            creator partnerships, copy, and community response all shape whether a brand feels genuinely
            inclusive. Consumers notice when inclusivity appears only in campaigns and disappears elsewhere.
            Consistency is what makes the message believable.
          </p>

          <h3 style={h3Style}>Offer Value, Not Just Discounts</h3>
          <p style={bodyStyle}>
            Price matters, but value is broader than discounting. Gen Z responds well to product education,
            thoughtful loyalty systems, early access, samples, bundles, and personalized recommendations.
            These features make the brand experience feel more useful and considered. Constant promotion
            may drive short-term response, but it does not always create preference.
          </p>

          <div style={{ margin: '2.5rem 0', borderRadius: 12, overflow: 'hidden', height: 400 }}>
            <img src="/b1i3c.jpg" alt="Brand Strategy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
              Gen Z has changed the way beauty brands need to think about relevance. The strongest brands
              in this space understand that attention alone is not enough. Consumers are looking for trust,
              clarity, usability, and a brand experience that feels aligned with how they already live and
              shop. In beauty, that combination is what turns interest into loyalty.
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
                color: fg(dark, 1), margin: '0 0 4px', letterSpacing: '0.05em',
              }}>Written by Stuti Jain</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {['#BeautyMarketing', '#GenZ', '#BrandStrategy', '#Beauty'].map(tag => (
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

export default BlogGenZ;
