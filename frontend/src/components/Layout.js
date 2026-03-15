import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { personalData } from '../data/mock';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'EDUCATION', path: '/education' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#141414] text-white' : 'bg-[#f5f5f0] text-[#141414]'}`}>
      {/* Dark mode toggle - top right */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 w-12 h-6 rounded-full transition-all duration-300 flex items-center px-1 ${
          darkMode ? 'bg-[#333]' : 'bg-[#ccc]'
        }`}
        aria-label="Toggle theme"
      >
        <div
          className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
            darkMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-[#141414]'
          }`}
        >
        </div>
      </button>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Left Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-[160px] z-40 flex flex-col py-10 px-8 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${darkMode ? 'bg-[#141414]' : 'bg-[#f5f5f0]'}`}
      >
        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xs font-light tracking-[0.2em] transition-opacity duration-200 py-1 ${
                isActive(item.path)
                  ? 'opacity-100 border-b border-current pb-1'
                  : 'opacity-40 hover:opacity-80'
              }`}
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex flex-col gap-4 mt-8">
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[160px] min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer
        className={`fixed bottom-0 left-0 py-4 px-8 text-[10px] opacity-40 tracking-widest`}
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        © Stuti Jain
      </footer>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
