import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';
import * as Tabs from '@radix-ui/react-tabs';

const certifications = [
  // IBM SkillsBuild
  { id: 1, title: "Make Agentic AI Work for You (Digital Credential)", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 2, title: "The Rise of Multiagent Systems", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 3, title: "Unleashing the Power of AI Agents", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 4, title: "Introduction to Retrieval Augmented Generation (RAG)", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 5, title: "Prompt Engineering: Shaping Better AI Responses", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 6, title: "Ethical Considerations for Generative AI", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 7, title: "Build Your First Chatbot + IBM watsonx Assistant Lab", category: "IBM SkillsBuild", issuer: "IBM" },
  { id: 8, title: "Use Generative AI for Software Development", category: "IBM SkillsBuild", issuer: "IBM" },
  // AI and Data Science
  { id: 9, title: "Introduction to Deep Learning", category: "AI and Data Science", issuer: "IBM" },
  { id: 10, title: "Introduction to Natural Language Processing", category: "AI and Data Science", issuer: "IBM" },
  { id: 11, title: "Computer Vision 101", category: "AI and Data Science", issuer: "IBM" },
  { id: 12, title: "Introduction to Data Science", category: "AI and Data Science", issuer: "IBM" },
  { id: 13, title: "Python for Data Science and Machine Learning", category: "AI and Data Science", issuer: "IBM" },
  { id: 14, title: "AI in Cyber: Mastering AI in Real-World Scenarios", category: "AI and Data Science", issuer: "IBM" },
  { id: 15, title: "Introduction to Artificial Intelligence (Basic Level)", category: "AI and Data Science", issuer: "IBM" },
  // Leadership and Employability
  { id: 16, title: "Applied AI Internship - CSRBOX x AICTE x IBM SkillsBuild (6 weeks)", category: "Leadership", issuer: "CSRBOX" },
  { id: 17, title: "Leadership and Management - Advanced", category: "Leadership", issuer: "IBM" },
  { id: 18, title: "Strategic Management - Advanced", category: "Leadership", issuer: "IBM" },
  { id: 19, title: "Problem Solving and Innovation - Advanced", category: "Leadership", issuer: "IBM" },
];

const categories = ["All", "IBM SkillsBuild", "AI and Data Science", "Leadership"];

const categoryColors = {
  "IBM SkillsBuild": "#3B82F6",
  "AI and Data Science": "#8B5CF6",
  "Leadership": "#10B981"
};

export function Certifications() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");

  const filteredCerts = activeTab === "All" 
    ? certifications 
    : certifications.filter(c => c.category === activeTab);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const badges = el.querySelectorAll('.cert-badge');
    
    // Initial scatter position
    gsap.set(badges, {
      x: () => (Math.random() - 0.5) * 400,
      y: () => (Math.random() - 0.5) * 400,
      opacity: 0
    });

    // Animate to grid
    gsap.to(badges, {
      x: 0,
      y: 0,
      opacity: 1,
      stagger: 0.03,
      ease: "elastic.out(1, 0.75)",
      duration: 1.2,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      }
    });
  }, [activeTab]);

  return (
    <section id="certifications" className="section container dot-grid" ref={containerRef}>
      <SectionHeading number="05" title="Certifications" subtitle="Credentials & Achievements" />

      <Tabs.Root defaultValue="All" onValueChange={setActiveTab} style={{ marginTop: '3rem' }}>
        <Tabs.List style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <Tabs.Trigger 
              key={cat} 
              value={cat}
              className="tab-trigger"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                background: activeTab === cat ? 'rgba(59,130,246,0.15)' : 'rgba(13, 31, 60, 0.6)',
                color: activeTab === cat ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', minHeight: '300px' }}>
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id} 
              className="cert-badge glass-card"
              style={{ 
                padding: '1rem 1.5rem', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 10px 20px ${categoryColors[cert.category]}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
              }}
              title={cert.issuer}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: categoryColors[cert.category] }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{cert.title}</span>
            </div>
          ))}
        </div>
      </Tabs.Root>

      <style>{`
        .tab-trigger:hover {
          border-color: var(--accent-blue) !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
