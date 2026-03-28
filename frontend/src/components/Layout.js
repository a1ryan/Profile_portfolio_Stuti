import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Instagram, Github, Mail, Menu, X } from 'lucide-react';
import { personalData } from '../data/mock';
import { useTheme } from '../context/ThemeContext';
import HoloCanvas from './HoloCanvas';

const SANS = "'Josefin Sans', sans-serif";

const NavItem = ({ item, active, fgActive, fgMuted, fgHover, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to={item.path}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: SANS,
        fontSize: 17,
        fontWeight: 300,
        letterSpacing: '0.20em',
        color: active ? fgActive : (hovered ? fgHover : fgMuted),
        textDecoration: 'none',
        padding: '6px 0 5px',
        borderBottom: active ? `0.5px solid ${fgActive}` : '0.5px solid transparent',
        display: 'inline-block',
        transform: (active && hovered) ? 'translateY(-3px)' : 'translateY(0)',
        textShadow: (active && hovered)
          ? '0 2px 6px rgba(163,32,179,0.55), 0 4px 12px rgba(0,0,0,0.4)'
          : 'none',
        transition: 'color 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1), text-shadow 0.25s ease',
      }}
    >
      {item.label}
    </Link>
  );
};

const Layout = ({ children }) => {
  const { dark: darkMode, setDark: setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME',        path: '/' },
    { label: 'WORKS',       path: '/works' },
    { label: 'PROJECTS',    path: '/projects' },
    { label: 'BLOGS',        path: '/gallery' },
    { label: 'GET IN TOUCH', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      /* canvas handles the animated background; html just needs a dark base
         so there's no white flash before the canvas first paints */
      document.documentElement.style.backgroundColor = '#0b000e';
      document.documentElement.style.backgroundImage = '';
      document.documentElement.style.backgroundSize = '';
      document.documentElement.style.animation = '';
      document.body.style.background = 'transparent';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f4f3ef';
      document.documentElement.style.backgroundImage = '';
      document.documentElement.style.backgroundSize = '';
      document.documentElement.style.animation = '';
      document.body.style.background = '#f4f3ef';
    }
    document.documentElement.style.transition = 'background 0.5s ease';
    document.body.style.transition = 'background 0.5s ease';
  }, [darkMode]);

  /* ── colour tokens ── */
  const bg       = darkMode ? 'transparent'          : '#f4f3ef';
  const fgActive = darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(18,18,18,0.80)';
  const fgMuted  = darkMode ? 'rgba(255,255,255,0.65)' : 'rgba(18,18,18,0.55)';
  const fgHover  = darkMode ? 'rgba(255,255,255,0.62)' : 'rgba(18,18,18,0.55)';
  const toggleBg = darkMode ? 'rgba(255,255,255,0.12)' : '#c8c8c4';
  const sidebarBg = darkMode ? 'rgba(10,10,18,0.72)'  : '#f4f3ef';
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
      {/* Fabric/linen texture — z-index -1, beneath everything */}
      <div className="bg-texture" />

      {/* Canvas background — z-index 0, behind all content */}
      {darkMode && (
        <HoloCanvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      )}

      {/* Grain texture overlay */}
      {darkMode && <div className="holo-noise" />}

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
          background: sidebarBg,
          backdropFilter: darkMode ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: darkMode ? 'blur(14px)' : 'none',
          display: 'flex', flexDirection: 'column',
          paddingTop: 38,
          paddingLeft: 34,
          transition: 'background 0.5s ease',
        }}
        className={`sidebar-panel ${mobileMenuOpen ? 'sidebar-open' : ''}`}
      >
        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavItem
                key={item.path}
                item={item}
                active={active}
                fgActive={fgActive}
                fgMuted={fgMuted}
                fgHover={fgHover}
                onClick={() => setMobileMenuOpen(false)}
              />
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
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a
            href={personalData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: fgMuted, transition: 'color 0.2s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = fgActive}
            onMouseLeave={e => e.currentTarget.style.color = fgMuted}
          >
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: fgMuted, transition: 'color 0.2s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = fgActive}
            onMouseLeave={e => e.currentTarget.style.color = fgMuted}
          >
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            style={{ color: fgMuted, transition: 'color 0.2s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = fgActive}
            onMouseLeave={e => e.currentTarget.style.color = fgMuted}
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      {/* ─ Main content area ─ */}
      {/* position:relative + zIndex:1 lifts content above the z-index:0 canvas */}
      <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
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
