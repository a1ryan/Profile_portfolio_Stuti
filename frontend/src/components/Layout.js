import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Mail, Menu, X } from 'lucide-react';
import { personalData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';

const SANS = "'Josefin Sans', sans-serif";

const Layout = ({ children }) => {
  const { dark: darkMode, setDark: setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME',       path: '/' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'EDUCATION',  path: '/education' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.background = '#131313';
      document.body.style.background = '#131313';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.background = '#f4f3ef';
      document.body.style.background = '#f4f3ef';
    }
    document.documentElement.style.transition = 'background 0.5s ease';
    document.body.style.transition = 'background 0.5s ease';
  }, [darkMode]);

  /* ── colour tokens ── */
  const bg       = darkMode ? '#131313'              : '#f4f3ef';
  const fgActive = darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(18,18,18,0.80)';
  const fgMuted  = darkMode ? 'rgba(255,255,255,0.30)' : 'rgba(18,18,18,0.28)';
  const fgHover  = darkMode ? 'rgba(255,255,255,0.62)' : 'rgba(18,18,18,0.55)';
  const toggleBg = darkMode ? '#272727'              : '#c8c8c4';
  const toggleFg = darkMode ? '#ffffff'              : '#1a1a1a';
  const divider  = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: fgActive,
        transition: 'background 0.5s ease, color 0.4s ease',
      }}
    >

      {/* ─ Theme toggle ─ top-right */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
        id="theme-toggle"
        style={{
          position: 'fixed', top: 26, right: 26, zIndex: 100,
          width: 42, height: 22, borderRadius: 11,
          background: toggleBg,
          display: 'flex', alignItems: 'center', padding: '0 3px',
          border: 'none', cursor: 'pointer',
          transition: 'background 0.35s ease',
        }}
      >
        <div
          style={{
            width: 16, height: 16, borderRadius: '50%',
            background: toggleFg,
            transform: darkMode ? 'translateX(20px)' : 'translateX(0px)',
            transition: 'transform 0.3s ease, background 0.3s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {/* ─ Mobile hamburger ─ */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          position: 'fixed', top: 22, left: 22, zIndex: 60,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: fgActive, display: 'none',
        }}
        className="md-hidden-toggle"
      >
        {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
      </button>

      {/* ─ Left sidebar ─ */}
      <aside
        style={{
          position: 'fixed', left: 0, top: 0, height: '100%',
          width: 154,
          zIndex: 50,
          background: bg,
          display: 'flex', flexDirection: 'column',
          paddingTop: 38,
          paddingLeft: 34,
          transition: 'background 0.5s ease',
        }}
        className={`sidebar-panel ${mobileMenuOpen ? 'sidebar-open' : ''}`}
      >
        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  fontWeight: 300,
                  letterSpacing: '0.20em',
                  color: active ? fgActive : fgMuted,
                  textDecoration: 'none',
                  padding: '6px 0 5px',
                  borderBottom: active ? `0.5px solid ${fgActive}` : '0.5px solid transparent',
                  display: 'inline-block',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = fgHover; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = fgMuted; }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Thin rule */}
        <div
          style={{
            width: 22, height: '0.5px',
            background: divider,
            margin: '28px 0',
          }}
        />

        {/* Social icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: fgMuted, transition: 'color 0.2s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = fgActive}
            onMouseLeave={e => e.currentTarget.style.color = fgMuted}
          >
            <Linkedin size={14} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            style={{ color: fgMuted, transition: 'color 0.2s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = fgActive}
            onMouseLeave={e => e.currentTarget.style.color = fgMuted}
          >
            <Mail size={14} strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      {/* ─ Main content area ─ */}
      <main className="main-content">
        {children}
      </main>

      {/* ─ Footer ─ */}
      <footer
        style={{
          position: 'fixed', bottom: 0, left: 0,
          padding: '14px 34px',
          fontFamily: SANS,
          fontSize: 9, fontWeight: 300,
          letterSpacing: '0.22em',
          color: fgMuted,
          zIndex: 10,
          pointerEvents: 'none',
          transition: 'color 0.4s ease',
        }}
      >
        © Stuti Jain
      </footer>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.55)',
          }}
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
