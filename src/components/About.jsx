import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';

export function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Text lines reveal with horizontal clip
    const lines = el.querySelectorAll('.about-line');
    gsap.fromTo(lines, 
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    // Stats/badges scale bounce
    const badges = el.querySelectorAll('.about-badge');
    gsap.fromTo(badges,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        ease: "back.out(1.5)",
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="about" className="section container" ref={containerRef}>
      <SectionHeading number="01" title="About Me" subtitle="AI Engineering Student & Developer" />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginTop: '2rem' }}>
        <div className="about-text" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <div className="about-line" style={{ marginBottom: '1.5rem', display: 'block', backgroundColor: 'transparent' }}>
            I'm Santhosh — an AI Engineering student at Panimalar Engineering College, Chennai (B.Tech CSBS, CGPA 8.12). I build Agentic AI systems, full-stack web apps, and intelligent tools powered by Python and Generative AI.
          </div>
          <div className="about-line" style={{ marginBottom: '1.5rem', display: 'block', backgroundColor: 'transparent' }}>
            I completed the CSRBOX x AICTE x IBM SkillsBuild Applied AI Internship and hold IBM SkillsBuild credentials in Agentic AI, RAG, and multi-agent systems.
          </div>
          <div className="about-line" style={{ display: 'block', backgroundColor: 'transparent' }}>
            I maintain 26+ projects on GitHub and I am actively seeking roles in AI engineering and intelligent systems.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="about-badge glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>LOCATION</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Chennai, India</span>
          </div>
          <div className="about-badge glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>STATUS</span>
            <span style={{ fontWeight: 500, color: 'var(--accent-blue)' }}>Available for Internship / Full-time</span>
          </div>
          <div className="about-badge glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>EDUCATION</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>CGPA: 8.12 · Panimalar Engineering College</span>
          </div>
        </div>
      </div>
    </section>
  );
}
