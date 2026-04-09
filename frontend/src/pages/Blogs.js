import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SERIF = "'Raleway', 'Josefin Sans', sans-serif";
const SANS  = "'Josefin Sans', sans-serif";

const fg = (dark, a) => dark ? `rgba(255,255,255,${a})` : `rgba(18,18,18,${a})`;

const BlogCard = ({ post }) => {
  const { dark } = useTheme();
  const [hovered, setHovered] = React.useState(false);
  const [linkHovered, setLinkHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(post.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dark ? 'rgba(15,0,25,0.6)' : 'rgba(248,245,255,0.95)',
        border: `1px solid ${hovered ? (dark ? 'rgba(224,64,251,0.5)' : 'rgba(184,146,42,0.5)') : fg(dark, 0.08)}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? (dark ? '0 16px 48px rgba(224,64,251,0.25), 0 4px 16px rgba(0,0,0,0.5)' : '0 16px 48px rgba(184,146,42,0.25), 0 4px 16px rgba(0,0,0,0.5)')
          : '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Cover image */}
      <div style={{
        width: '100%', height: 200,
        background: 'linear-gradient(135deg, #1a0035 0%, #4a0080 50%, #1a0035 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {post.image ? (
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }} />
            <span style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 300,
              letterSpacing: '0.3em', color: 'rgba(200,150,255,0.6)',
              textTransform: 'uppercase', position: 'relative', zIndex: 1,
            }}>Cover Image</span>
          </>
        )}
      </div>

      {/* Card content */}
      <div style={{ padding: '24px 28px 28px' }}>
        <span style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 400,
          letterSpacing: '0.28em', color: dark ? 'rgba(224,64,251,0.9)' : 'rgba(184,146,42,0.9)',
          textTransform: 'uppercase', display: 'block', marginBottom: 12,
        }}>
          {post.category}
        </span>

        <h3 style={{
          fontFamily: SERIF, fontSize: 22, fontWeight: 700,
          color: fg(dark, 1), margin: '0 0 8px', lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}>
          {post.title}
        </h3>

        <p style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 300,
          color: fg(dark, 0.55), margin: '0 0 20px',
          lineHeight: 1.6, letterSpacing: '0.01em',
        }}>
          {post.subtitle}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: `0.5px solid ${fg(dark, 0.08)}`, paddingTop: 16,
        }}>
          <span style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 300,
            color: fg(dark, 0.35), letterSpacing: '0.08em',
          }}>
            {post.date} · {post.readTime}
          </span>
          <span
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 300,
              letterSpacing: '0.15em', color: linkHovered ? fg(dark, 1) : (dark ? 'rgba(255,182,213,0.85)' : 'rgba(180,80,120,0.9)'),
              textTransform: 'uppercase',
              borderBottom: `1px solid ${linkHovered ? fg(dark, 0.6) : 'rgba(255,182,213,0.3)'}`,
              transform: linkHovered ? 'translateY(-3px)' : 'translateY(0)',
              display: 'inline-block',
              transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Read Article →
          </span>
        </div>
      </div>
    </div>
  );
};

const blogPosts = [
  {
    category: 'Beauty Marketing',
    title: 'How Brands Can Win Gen Z',
    subtitle: 'Strategies to Engage the Most Influential Generation',
    readTime: '8 min read',
    date: 'March 2026',
    path: '/blog/gen-z-beauty',
    image: '/b1 cv.jpg',
  },
  {
    category: 'Beauty Innovation',
    title: 'The Skin-First Revolution',
    subtitle: 'Why Makeup is Becoming Skincare',
    readTime: '5 min read',
    date: 'March 2026',
    path: '/blog/skin-first-revolution',
    image: '/b2 cv.jpg',
  },
  {
    category: 'Beauty Tech',
    title: 'The Algorithmic Atelier',
    subtitle: 'Why AI is the New Frontier of Beauty Retail',
    readTime: '6 min read',
    date: 'March 2026',
    path: '/blog/ai-beauty-retail',
    image: '/b3cv1.jpg',
  },
];

const Blogs = () => {
  const { dark } = useTheme();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const px = isMobile ? 20 : 44;

  return (
    <div style={{ minHeight: '100vh', paddingLeft: px, paddingRight: px, paddingTop: isMobile ? 16 : 80, paddingBottom: 120 }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 300,
          letterSpacing: '0.3em', color: dark ? 'rgba(224,64,251,0.8)' : 'rgba(184,146,42,0.8)',
          textTransform: 'uppercase', display: 'block', marginBottom: 16,
        }}>
          Beauty · Marketing · Insights
        </span>
        <h1 style={{
          fontFamily: SERIF, fontSize: isMobile ? 'clamp(22px, 6vw, 28px)' : 'clamp(36px, 5vw, 72px)',
          fontWeight: 700, color: fg(dark, 1),
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          Blogs
        </h1>
        <div style={{ width: '100%', height: '0.5px', background: fg(dark, 0.1), marginTop: 24 }} />
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 32 }}>
        {blogPosts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>

    </div>
  );
};

export default Blogs;
