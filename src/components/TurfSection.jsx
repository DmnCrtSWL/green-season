import React, { useEffect, useRef, useState } from 'react';
import TurfGalleryModal from './TurfGalleryModal';

const TurfSection = ({ id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const sectionStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // User requested fully white
    padding: '80px 20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    width: '100%',
  };

  const circleContainerStyle = (index) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.2}s`,
  });

  const circleStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-green-title)', // Elegant contrast for white icons
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'pointer',
  };

  const labelStyle = {
    fontFamily: 'var(--font-title)',
    fontSize: '1.5rem',
    color: 'var(--color-green-title)',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  };

  const iconStyle = {
    width: '80px',
    height: '80px',
    fill: '#ffffff', // White icons inside the colored circle
  };

  // SVG Icons
  const PetTurfIcon = () => (
    <svg viewBox="0 0 100 100" style={iconStyle} xmlns="http://www.w3.org/2000/svg">
      {/* Dog Body */}
      <path d="M 55 36 L 30 36 C 20 36, 12 30, 10 38 C 8 45, 16 46, 22 43 L 22 80 C 22 86, 34 86, 34 80 L 34 60 L 48 60 L 48 80 C 48 86, 60 86, 60 80 L 60 52 L 67 46 Z" fill="#ffffff" />
      {/* Dog Head */}
      <path d="M 70 45 L 80 43 L 88 43 C 96 43, 96 28, 88 28 L 78 28 L 68 12 L 64 28 L 61 33 Z" fill="#ffffff" />
      {/* Dog Eye */}
      <circle cx="78" cy="34" r="3.5" fill="var(--color-green-title)" />
    </svg>
  );

  const LandscapeTurfIcon = () => (
    <svg viewBox="0 0 100 100" style={iconStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 25 Q 50 33 80 25 A 8 8 0 0 1 88 33 L 88 67 A 8 8 0 0 1 80 75 Q 50 67 20 75 A 8 8 0 0 1 12 67 L 12 33 A 8 8 0 0 1 20 25 Z M 38 43 A 8 8 0 1 0 22 43 A 8 8 0 1 0 38 43 Z M 25 65 L 42 45 L 52 56 L 68 35 L 82 63 Q 50 56 25 65 Z" fill="#ffffff" fillRule="evenodd" />
    </svg>
  );

  const GreensIcon = () => (
    <svg viewBox="0 0 100 100" style={iconStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M 33 25 A 5 5 0 0 0 23 25 L 23 80 A 5 5 0 0 0 33 80 Z" fill="#ffffff" />
      <path d="M 28 30 C 44 20, 59 40, 79 30 A 5 5 0 0 1 84 34 L 84 64 A 5 5 0 0 1 79 68 C 59 78, 44 58, 28 68 Z" fill="#ffffff" />
    </svg>
  );

  const circles = [
    { id: 'pet', label: 'Pet Turf', Icon: PetTurfIcon },
    { id: 'landscape', label: 'Landscape Turf', Icon: LandscapeTurfIcon },
    { id: 'putting-greens', label: 'Putting Greens', Icon: GreensIcon },
  ];

  return (
    <section id={id} style={sectionStyle} ref={sectionRef}>
      <style>
        {`
          .turf-circle:hover {
            transform: translateY(-10px) scale(1.05) !important;
            box-shadow: 0 25px 45px rgba(0,0,0,0.2) !important;
          }
        `}
      </style>
      <div style={containerStyle}>
        {circles.map((circle, index) => (
          <div key={circle.id} style={circleContainerStyle(index)} onClick={() => setActiveGallery(circle.id)}>
            <div className="turf-circle" style={circleStyle}>
              <circle.Icon />
            </div>
            <div style={labelStyle}>{circle.label}</div>
          </div>
        ))}
      </div>
      <TurfGalleryModal activeGallery={activeGallery} onClose={() => setActiveGallery(null)} />
    </section>
  );
};

export default TurfSection;
