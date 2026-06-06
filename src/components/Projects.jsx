import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: "Agentic Carbon AI",
    featured: true,
    stack: ["Python", "Agentic AI", "Multi-Agent", "Climate Analytics"],
    desc: "Full-stack Agentic AI platform analyzing climate trends, assessing environmental risks, guiding users via intelligent chatbot with persistent memory.",
    github: "https://github.com/Santhosh2313/Agentic-carbon-ai",
    badge: "Agentic AI",
    color: "#3B82F6" // Electric blue
  },
  {
    id: 2,
    title: "Health AI Hub",
    featured: true,
    stack: ["TypeScript", "Computer Vision", "Voice AI", "Predictive ML"],
    desc: "AI-driven wellness platform using vision, voice, and predictive intelligence to automate health tracking and forecast risks — proactive healthcare.",
    github: "https://github.com/Santhosh2313/Health-AI-HUB",
    badge: "Health AI",
    color: "#0D9488" // Teal
  },
  {
    id: 3,
    title: "AI Career Copilot",
    featured: true,
    stack: ["Python", "NLP", "Conversational AI"],
    desc: "AI-powered career guidance system with personalized job recommendations, resume analysis, and career planning via conversational AI.",
    github: "https://github.com/Santhosh2313/AI-Career-Copilot",
    badge: "Career AI",
    color: "#8B5CF6" // Purple
  },
  {
    id: 4,
    title: "Foodbyte",
    featured: false,
    stack: ["Python", "Flask", "SQLite", "REST API"],
    desc: "Flask restaurant reservation system with full CRUD, SQLite persistence, and direct DB management from the web UI.",
    github: "https://github.com/Santhosh2313/Foodbyte",
    badge: "Web App",
    color: "#F97316" // Orange
  },
  {
    id: 5,
    title: "MoneyMate",
    featured: false,
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    desc: "Full-stack personal finance site with dashboards, calculators, form validation, and third-party integrations.",
    github: "https://github.com/Santhosh2313/MoneyMate",
    badge: "FinTech",
    color: "#10B981" // Green
  },
  {
    id: 6,
    title: "AI Live Chatbot",
    featured: false,
    stack: ["Zoho SalesIQ", "Conversational AI"],
    desc: "Intelligent live chatbot for real-time automated customer interaction and query resolution.",
    github: "#",
    badge: "Chatbot",
    color: "#FB923C" // Coral
  }
];

export function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Staggered fade up
    const cards = el.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        ease: "power2.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="section container" ref={containerRef}>
      <SectionHeading number="04" title="Selected Works" subtitle="Featured Projects" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card glass-card group" 
            onMouseMove={handleMouseMove}
            style={{ 
              position: 'relative', 
              padding: '2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '--card-color': project.color,
            }}
          >
            {/* Holographic background shift */}
            <div 
              className="holo-bg"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.15), transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.3s',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
            
            {/* Animated border line on hover */}
            <div className="card-border" />

            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: `${project.color}22`, color: project.color }}>
                  {project.badge}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="hover:text-white">
                      <GithubIcon size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {project.title}
                {project.featured && <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem', backgroundColor: 'var(--accent-blue)', color: '#fff', borderRadius: '4px', verticalAlign: 'middle' }}>FEATURED</span>}
              </h3>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                {project.desc}
              </p>

              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.stack.map((tech, idx) => (
                  <span key={idx} className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {tech}{idx < project.stack.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>

              {/* View Project Button */}
              <div className="view-btn-container" style={{ overflow: 'hidden', height: '0', transition: 'height 0.3s ease, margin 0.3s ease' }}>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="view-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: project.color, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transform: 'translateY(100%)', transition: 'transform 0.3s ease' }}
                >
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <a 
          href="https://github.com/Santhosh2313" 
          target="_blank" 
          rel="noreferrer"
          className="glass-card"
          style={{ padding: '1rem 2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: 600, transition: 'all 0.3s ease' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(13, 31, 60, 0.6)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <GithubIcon size={20} />
          Explore all 26+ projects on GitHub
        </a>
      </div>

      <style>{`
        .project-card:hover {
          transform: scale(1.03);
        }
        .project-card:hover .holo-bg {
          opacity: 1;
        }
        .project-card:hover .tech-stack {
          transform: translateY(-4px);
        }
        .project-card:hover .view-btn-container {
          height: 'auto';
          margin-top: '1rem';
        }
        .project-card:hover .view-btn {
          transform: translateY(0);
        }
        .card-border {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 16px;
          padding: 2px;
          background: transparent;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover .card-border {
          opacity: 1;
          background: linear-gradient(var(--hue-rot, 0deg), var(--card-color), transparent 60%);
          animation: hueRotate 3s infinite linear;
        }
        @keyframes hueRotate {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(20deg); }
          100% { filter: hue-rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
