import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';

const skillsData = [
  {
    id: "01",
    title: "AI and Machine Learning",
    badge: "CORE FOCUS",
    tags: [
      "Generative AI", "Agentic AI", "Multi-Agent Systems",
      "Retrieval Augmented Generation (RAG)",
      "Deep Learning", "NLP", "Computer Vision",
      "Machine Learning", "IBM watsonx"
    ]
  },
  {
    id: "02",
    title: "Programming and Web",
    badge: "FULL STACK",
    tags: [
      "Python (Primary)", "Flask",
      "HTML", "CSS", "JavaScript", "TypeScript",
      "PHP", "Bootstrap", "SQL / SQLite"
    ]
  },
  {
    id: "03",
    title: "Tools and Platforms",
    badge: "TOOLCHAIN",
    tags: [
      "Git", "GitHub (26+ repos)",
      "IBM SkillsBuild", "Credly",
      "Zoho SalesIQ", "Prompt Engineering",
      "Data Structures and Algorithms"
    ]
  }
];

export function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // 3D flip animation
    const cards = el.querySelectorAll('.skill-card');
    gsap.fromTo(cards,
      { rotateY: 90, opacity: 0 },
      {
        rotateY: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.2)",
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="skills" className="section container" ref={containerRef}>
      <SectionHeading number="03" title="My Expertise" subtitle="Skills and Technologies" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem', perspective: '1000px' }}>
        {skillsData.map((skill) => (
          <div key={skill.id} className="skill-card glass-card" style={{ padding: '2rem', transformStyle: 'preserve-3d', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
              const badge = e.currentTarget.querySelector('.skill-badge');
              if (badge) badge.style.boxShadow = '0 0 15px var(--accent-blue)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
              const badge = e.currentTarget.querySelector('.skill-badge');
              if (badge) badge.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="font-mono text-muted" style={{ color: 'var(--text-muted)' }}>ID: {skill.id}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#10B981' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulse 1.5s infinite' }}></span>
                ONLINE
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{skill.title}</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {skill.tags.map((tag, idx) => (
                <span key={idx} className="font-mono" style={{ padding: '0.25rem 0.75rem', backgroundColor: 'rgba(59,130,246,0.1)', color: 'var(--text-secondary)', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>STATUS</span>
              <strong className="skill-badge" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent-blue)', color: '#fff', borderRadius: '9999px', transition: 'box-shadow 0.3s ease' }}>
                {skill.badge}
              </strong>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
