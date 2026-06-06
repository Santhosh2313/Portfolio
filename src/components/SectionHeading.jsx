import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SectionHeading({ number, title, subtitle }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Ghost number parallax
    gsap.to(el.querySelector('.ghost-number'), {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.3
      }
    });

    // Title reveal
    const chars = el.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.025,
        ease: "power3.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div ref={headingRef} className="relative mb-16" style={{ position: 'relative', marginBottom: '4rem' }}>
      {/* Ghost Number */}
      <div 
        className="ghost-number font-display font-bold"
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-20px',
          fontSize: '180px',
          lineHeight: 1,
          opacity: 0.03,
          color: '#fff',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        {number}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="font-display font-bold gradient-text" style={{ fontSize: '3rem', display: 'flex', flexWrap: 'wrap' }}>
          {title.split('').map((char, i) => (
            <span key={i} className="char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        {subtitle && <p className="text-secondary mt-2" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
    </div>
  );
}
