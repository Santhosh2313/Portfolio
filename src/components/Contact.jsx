import React, { useRef } from 'react';
import { SectionHeading } from './SectionHeading';
import { Mail, MapPin, Phone } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Contact() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const emailBody = `Name: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0AMessage: ${formData.get('message')}`;
    window.location.href = `mailto:7sandy4444@gmail.com?subject=Portfolio Contact&body=${emailBody}`;
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient hue shift */}
      <div 
        className="contact-bg"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, #020817, #1E1B4B)',
          zIndex: 0,
          animation: 'hueShift 20s infinite alternate'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading number="06" title="Get In Touch" subtitle="Let's build something together" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
          
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Contact Information</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>EMAIL</div>
                  <a href="mailto:7sandy4444@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>7sandy4444@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PHONE</div>
                  <a href="tel:+919150566936" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>+91 9150566936</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION</div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Chennai, India</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
              <a href="https://github.com/Santhosh2313" target="_blank" rel="noreferrer" className="social-icon" style={{ color: 'var(--text-secondary)' }}>
                <GithubIcon size={24} />
              </a>
              <a href="https://www.linkedin.com/in/santhosh2313/" target="_blank" rel="noreferrer" className="social-icon linkedin" style={{ color: 'var(--text-secondary)' }}>
                <LinkedinIcon size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div className="input-group">
                <input type="text" name="name" id="name" required />
                <label htmlFor="name">Your Name</label>
                <div className="underline"></div>
              </div>

              <div className="input-group">
                <input type="email" name="email" id="email" required />
                <label htmlFor="email">Your Email</label>
                <div className="underline"></div>
              </div>

              <div className="input-group">
                <textarea name="message" id="message" rows="4" required></textarea>
                <label htmlFor="message">Message</label>
                <div className="underline"></div>
              </div>

              <button type="submit" className="send-btn font-display">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hueShift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(40deg); }
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 31, 60, 0.6);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }
        .social-icon:hover {
          transform: scale(1.2) rotate(10deg);
          color: #fff !important;
          box-shadow: 0 0 15px rgba(255,255,255,0.5);
          border-color: #fff;
        }
        .social-icon.linkedin:hover {
          color: #0A66C2 !important;
          box-shadow: 0 0 15px rgba(10, 102, 194, 0.5);
          border-color: #0A66C2;
        }

        .input-group {
          position: relative;
          width: 100%;
        }
        .input-group input, .input-group textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--text-muted);
          padding: 0.5rem 0;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          outline: none;
        }
        .input-group textarea {
          resize: vertical;
        }
        .input-group label {
          position: absolute;
          left: 0;
          top: 0.5rem;
          color: var(--text-muted);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .input-group input:focus ~ label,
        .input-group input:valid ~ label,
        .input-group textarea:focus ~ label,
        .input-group textarea:valid ~ label {
          top: -1rem;
          font-size: 0.75rem;
          color: var(--accent-blue);
        }
        .input-group .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: var(--accent-blue);
          transition: width 0.3s ease;
        }
        .input-group input:focus ~ .underline,
        .input-group textarea:focus ~ .underline {
          width: 100%;
        }

        .send-btn {
          position: relative;
          padding: 1rem 2rem;
          background: var(--accent-blue);
          color: #fff;
          font-weight: 600;
          border-radius: 8px;
          overflow: hidden;
          cursor: none; /* Let global custom cursor handle it */
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .send-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59,130,246,0.3);
        }
        .send-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
        }
        .send-btn:hover::after {
          animation: shimmer 1s ease;
        }
        @keyframes shimmer {
          100% { left: 200%; }
        }
      `}</style>
    </section>
  );
}
