import { useEffect, useState, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GlobalEffects() {
  // Lenis Smooth Scroll
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Custom Cursor
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovered(true);
        setHoverText("");
      } else if (e.target.closest('.project-card')) {
        setIsHovered(true);
        setHoverText("VIEW");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Scroll Progress Bar
  const [scrollProgress, setScrollProgress] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: scrollProgress,
          backgroundColor: '#3B82F6',
          boxShadow: '0 0 8px #3B82F6',
          zIndex: 9999,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* Custom Cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: 8,
          height: 8,
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: isHovered ? 60 : 40,
          height: isHovered ? 60 : 40,
          border: '1px solid #3B82F6',
          backgroundColor: isHovered ? 'rgba(59,130,246,0.15)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          x: '-50%',
          y: '-50%',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}
      >
        {hoverText}
      </motion.div>

      {/* Ambient Background Blobs */}
      <div className="ambient-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </>
  );
}
