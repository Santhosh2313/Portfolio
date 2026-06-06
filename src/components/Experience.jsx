import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';

const experiences = [
  {
    role: "Applied AI Intern",
    company: "CSRBOX x AICTE x IBM SkillsBuild",
    period: "2025 · 6 Weeks",
    color: "#3B82F6", // Electric blue
    bullets: [
      "Designed AI apps using IBM watsonx and multi-agent frameworks",
      "Built conversational AI chatbot with IBM watsonx Assistant + prompt engineering",
      "Applied ethical AI and responsible design across all deliverables",
      "Earned IBM credentials in Agentic AI, RAG, and Multiagent Systems"
    ]
  },
  {
    role: "Python Developer Intern",
    company: "Internship Program",
    period: "2025",
    color: "#10B981", // Green
    bullets: [
      "Built Python apps covering data structures, OOP, and automation scripting",
      "Delivered back-end solutions for real-world use cases"
    ]
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Internship Program",
    period: "2025",
    color: "#8B5CF6", // Purple
    bullets: [
      "Applied classification, prediction, and AI tool integration to real problems",
      "Hands-on model training, evaluation, and deployment"
    ]
  }
];

export function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Connector line stroke-dashoffset animation
    const line = el.querySelector('.timeline-line');
    gsap.fromTo(line,
      { height: 0 },
      {
        height: '100%',
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true
        }
      }
    );

    // Entries slide in
    const entries = el.querySelectorAll('.timeline-entry');
    entries.forEach((entry, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(entry,
        { x: isLeft ? -80 : 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
            onEnter: () => {
              // Role badge glow
              const badge = entry.querySelector('.role-badge');
              gsap.fromTo(badge, 
                { boxShadow: "0 0 0px transparent" },
                { boxShadow: `0 0 20px ${experiences[i].color}`, duration: 0.5, yoyo: true, repeat: 1 }
              );
            }
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="section container" ref={containerRef}>
      <SectionHeading number="02" title="Experience" />

      <div className="timeline-container" style={{ position: 'relative', marginTop: '3rem', padding: '2rem 0' }}>
        {/* Glow connector line background */}
        <div className="timeline-bg-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'var(--border)', transform: 'translateX(-50%)', zIndex: 0 }} />
        {/* Animated connector line */}
        <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, width: '2px', backgroundColor: 'var(--accent-blue)', transform: 'translateX(-50%)', zIndex: 1, boxShadow: '0 0 8px var(--accent-blue)' }} />

        {experiences.map((exp, i) => (
          <div key={i} className={`timeline-entry ${i % 2 === 0 ? 'flex-row-reverse' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', width: '100%', position: 'relative', zIndex: 2 }}>
            <div className="spacer-div" style={{ width: '45%' }} />
            
            {/* Timeline dot */}
            <div className="timeline-dot" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: exp.color, border: '4px solid var(--bg-primary)', boxShadow: `0 0 10px ${exp.color}`, zIndex: 3 }} />
            
            <div className="glass-card timeline-card" style={{ width: '45%', padding: '2rem', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
              <span className="role-badge" style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, color: exp.color, backgroundColor: `${exp.color}22`, marginBottom: '1rem' }}>
                {exp.period}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{exp.role}</h3>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{exp.company}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                {exp.bullets.map((bullet, j) => (
                  <li key={j} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .timeline-entry { flex-direction: column !important; align-items: flex-start !important; padding-left: 2rem; }
          .spacer-div { display: none; }
          .timeline-card { width: 100% !important; text-align: left !important; }
          .timeline-card ul { text-align: left !important; }
          .timeline-bg-line, .timeline-line { left: 0 !important; transform: none !important; }
          .timeline-dot { left: -8px !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
