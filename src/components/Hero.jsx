import React, { useEffect, useRef, lazy, Suspense } from 'react';
// import { Navbar } from './components/Navbar';
import Typewriter from 'typewriter-effect';
import gsap from 'gsap';

const NeuralBackground = lazy(() => import('./NeuralBackground'));

export function Hero() {
  const nameRef = useRef(null);

  // Neural background logic moved to NeuralBackground component.
  // This useEffect has been removed to improve initial load performance.

  // GSAP Animations
  useEffect(() => {
    // Page load sequence
    const tl = gsap.timeline();
    
    // 0.3s Name Reveal
    const letters = nameRef.current.querySelectorAll('.letter');
    tl.to(letters, {
      y: 0,
      stagger: 0.05,
      ease: "power4.out",
      duration: 0.8,
      delay: 0.3
    });

    // Fade up CTA buttons
    tl.to('.hero-cta', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");
    
    // Scroll Indicator Bounce is handled by CSS mostly, but we can set initial opacity
    tl.to('.scroll-indicator', {
      opacity: 1,
      duration: 0.5
    }, "-=0.2");

  }, []);

  const name = "SANTHOSH B";

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center section">
      {/* Lazy-loaded Neural Background */}
      <Suspense fallback={null}>
        <NeuralBackground />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ zIndex: 10 }}>
        
        {/* Name Reveal */}
        <h1 
          ref={nameRef}
          className="font-display font-bold gradient-text" 
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '1rem', overflow: 'hidden', display: 'flex' }}
        >
          {name.split('').map((char, index) => (
            <span key={index} style={{ overflow: 'hidden', display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : (
                <span className="letter" style={{ display: 'inline-block', transform: 'translateY(110%)' }}>
                  {char}
                </span>
              )}
            </span>
          ))}
        </h1>

        {/* Typing Animation */}
        <div className="font-mono text-xl md:text-2xl text-blue-400 mb-12" style={{ color: 'var(--accent-blue)', height: '40px' }}>
          <Typewriter
            options={{
              strings: [
                'I build Agentic AI Systems',
                'I build Full-Stack Web Apps',
                'I build Intelligent Solutions',
                'I turn ideas into AI products'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              cursor: '|'
            }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { text: "View My Work", href: "#projects", primary: true },
            { text: "LinkedIn", href: "https://www.linkedin.com/in/santhosh2313/", primary: false },
            { text: "GitHub", href: "https://github.com/Santhosh2313", primary: false }
          ].map((btn, i) => (
            <a 
              key={i}
              href={btn.href} 
              className={`hero-cta glass-card px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${btn.primary ? 'bg-blue-600 border-blue-500' : ''}`}
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)',
                textDecoration: 'none',
                padding: '12px 24px',
                background: btn.primary ? 'var(--accent-blue)' : 'rgba(13, 31, 60, 0.6)',
                color: '#fff',
                borderRadius: '9999px',
                border: `1px solid ${btn.primary ? 'transparent' : 'var(--border)'}`,
                display: 'inline-block'
              }}
              target={btn.href.startsWith('http') ? "_blank" : undefined}
              rel={btn.href.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              {btn.text}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="scroll-indicator"
        style={{ 
          position: 'absolute', 
          bottom: '40px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          opacity: 0,
          animation: 'bounce 2s infinite'
        }}
      >
        <div style={{ width: '24px', height: '40px', border: '2px solid var(--text-secondary)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
          <div style={{ width: '4px', height: '8px', backgroundColor: 'var(--text-secondary)', borderRadius: '2px', animation: 'scrollWheel 2s infinite' }} />
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
          40% { transform: translateY(-10px) translateX(-50%); }
          60% { transform: translateY(-5px) translateX(-50%); }
        }
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
