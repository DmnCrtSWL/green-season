import React, { useRef, useEffect } from 'react';

const ParallaxText = ({ children, speed = 0.2, className, style }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    let rafId;
    
    const animate = () => {
      if (ref.current) {
        // Calculate offset based on scroll position
        // simple parallax: translateY = scrollY * speed
        // To make it relative to the section, we might want to use bounding rect, 
        // but global parallax is often smoother for "floating" feel.
        // Let's try global first.
        const yOffset = window.scrollY * speed;
        ref.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
};

export default ParallaxText;
