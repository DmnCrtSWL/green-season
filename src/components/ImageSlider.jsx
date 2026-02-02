import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Init value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const sliderStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyle = (index, url) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%), url("${url}")`,
    opacity: index === currentIndex ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
  });

  /* Mobile Text Styling */
  const textContainerStyle = isMobile ? {
    position: 'absolute',
    bottom: '60px',
    left: '12px', // Slight visual correction (was 20px) to align "line-height box" with dots
    display: 'flex',
    alignItems: 'baseline',
    gap: '15px',
    zIndex: 2,
    pointerEvents: 'none',
    transform: 'rotate(-90deg) translateY(100%)', 
    transformOrigin: 'bottom left',
    whiteSpace: 'nowrap',
  } : {
    position: 'absolute',
    bottom: '35px', 
    left: '20px', 
    display: 'flex',
    alignItems: 'baseline',
    gap: '15px',
    zIndex: 2,
    pointerEvents: 'none',
  };

  const dotsContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px', // Pegado a la izquierda
    display: 'flex',
    flexDirection: 'row', // Horizontal
    gap: '12px',
    zIndex: 10,
  };

  const dotStyle = (index) => ({
    width: '8px', 
    height: '8px',
    borderRadius: '50%',
    backgroundColor: index === currentIndex ? 'var(--color-green-light)' : 'var(--color-white)', 
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: 'none',
    boxShadow: 'none', 
    padding: 0,
  });

  return (
    <div style={sliderStyle}>
      {images.map((imgData, index) => (
        <div key={index} style={imageStyle(index, imgData.url)}>
           <div style={textContainerStyle}>
             {/* Slide Numbering */}
             <span style={{
                color: 'var(--color-white)',
                fontFamily: 'var(--font-title)',
                fontSize: isMobile ? '4rem' : '6rem', // Smaller on mobile to fit
                fontWeight: '900', 
                fontStyle: 'italic',
                lineHeight: 0.8,
             }}>
                {(index + 1).toString().padStart(2, '0')}
             </span>

             {/* City Title */}
             <span style={{
                color: 'var(--color-green-light)', 
                fontFamily: 'var(--font-title)',
                fontSize: isMobile ? '4rem' : '6rem', // Smaller on mobile
                fontWeight: '900', 
                fontStyle: 'italic',
                textTransform: 'uppercase',
             }}>
                {imgData.title}
             </span>
           </div>
        </div>
      ))}
      <div style={dotsContainerStyle}>
        {images.map((_, index) => (
          <button
            key={index}
            style={dotStyle(index)}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
