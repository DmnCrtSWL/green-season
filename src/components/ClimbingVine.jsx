import React, { useEffect, useState } from 'react';

const ClimbingVine = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage (0 to 1)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle = {
    position: 'fixed',
    bottom: 0, // Anchor to bottom
    left: '50px',
    width: '60px', // Adjust width based on asset
    // Masking magic: The container height grows, revealing the bottom-aligned image
    height: `${scrollProgress * 100}vh`, 
    zIndex: 900,
    pointerEvents: 'none',
    overflow: 'hidden', // Hide the parts of the image that don't fit
    transition: 'height 0.1s linear', // smooth growth
  };

  const imageStyle = {
    position: 'absolute',
    bottom: 0, // Keep image grounded
    left: 0,
    width: '100%',
    height: 'auto', 
    minHeight: '100vh', // Ensure image is tall enough to cover full screen when fully revealed
    objectFit: 'cover',
    objectPosition: 'bottom center', // Ensure visually we reveal from bottom up
  };

  return (
    <div style={containerStyle}>
      <img src="/vine.png" alt="Growing Vine" style={imageStyle} />
    </div>
  );
};

export default ClimbingVine;
