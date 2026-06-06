import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Section tracking
      let current = '';
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      if (current) {
        const matchingItem = navItems.find(item => item.href.substring(1) === current);
        if (matchingItem) setActiveSection(matchingItem.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(2, 8, 23, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.1)' : '1px solid transparent',
          padding: '1.5rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo with Glitch */}
          <a href="#home" className="logo-glitch font-display font-bold text-2xl" style={{ position: 'relative', textDecoration: 'none', color: '#fff', fontSize: '1.5rem' }}>
            SANTHOSH
          </a>

          {/* Nav Links */}
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.name} style={{ position: 'relative' }}>
                <a 
                  href={item.href} 
                  className="nav-link"
                  style={{ 
                    color: activeSection === item.name ? '#fff' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '0.5rem 0'
                  }}
                >
                  {item.name}
                  {activeSection === item.name && (
                    <motion.div
                      layoutId="activeNavDot"
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-blue)',
                        boxShadow: '0 0 8px var(--accent-blue)'
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me CTA */}
          <a 
            href="mailto:7sandy4444@gmail.com"
            className="glass-card"
            style={{
              padding: '0.5rem 1.5rem',
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(13, 31, 60, 0.6)';
              e.currentTarget.style.color = 'var(--accent-blue)';
            }}
          >
            Hire Me
          </a>
        </div>
      </nav>

      <style>{`
        .logo-glitch {
          position: relative;
        }
        .logo-glitch:hover::before,
        .logo-glitch:hover::after {
          content: 'SANTHOSH.';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .logo-glitch:hover::before {
          left: -2px;
          text-shadow: -2px 0 #FF006E;
          animation: glitch-anim 0.2s linear infinite;
        }
        .logo-glitch:hover::after {
          left: 2px;
          text-shadow: 2px 0 #00FFD1;
          animation: glitch-anim 0.2s linear reverse infinite;
        }

        @keyframes glitch-anim {
          0% { clip-path: inset(10% 0 80% 0); }
          20% { clip-path: inset(80% 0 10% 0); }
          40% { clip-path: inset(40% 0 40% 0); }
          60% { clip-path: inset(20% 0 60% 0); }
          80% { clip-path: inset(60% 0 20% 0); }
          100% { clip-path: inset(10% 0 80% 0); }
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--accent-blue);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-blue) !important;
        }
        .nav-link:hover::before {
          width: 100%;
        }
      `}</style>
    </>
  );
}
