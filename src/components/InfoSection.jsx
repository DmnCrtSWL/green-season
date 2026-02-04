import React from 'react';
import ParallaxText from './ParallaxText';

const InfoSection = ({ title, text, image, reversed, backgroundColor = 'var(--color-white)', variant = 'split' }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Common Styles
  const sectionStyle = {
    position: 'relative',
    width: '100%',
    // Mobile: Auto height (to stack 2x 100vh). Desktop: 100vh fixed.
    height: isMobile ? 'auto' : '100vh', 
    display: 'flex',
    // Mobile: Column. Desktop: Row (or managed by variant).
    flexDirection: isMobile ? 'column' : (reversed ? 'row-reverse' : 'row'),
    backgroundColor: backgroundColor,
    overflow: 'hidden',
    justifyContent: (variant === 'overlay' && !isMobile) ? 'center' : 'flex-start',
    alignItems: (variant === 'overlay' && !isMobile) ? 'center' : 'stretch',
    transition: 'background-color 0.5s ease',
  };

  const textContainerStyle = isMobile ? {
    width: '100%',
    height: '100vh',
    order: 1, // First on mobile
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    paddingBottom: '30vh', // Push content up
    boxSizing: 'border-box',
    textAlign: 'center',
    position: 'relative',
    zIndex: 0, // Lower z-index so FloatingLeaves (z=1) show on top
  } : (variant === 'overlay' ? {
    width: '40%',
    height: '100%', 
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#ffffff',
    padding: '4rem',
    boxShadow: '0 0 40px rgba(0,0,0,0.2)', 
    borderRadius: '0', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
  } : {
    width: '40%',
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '30vh 5% 0 5%', 
    boxSizing: 'border-box',
  });

  const imageContainerStyle = isMobile ? {
    display: 'none', // Hide image on mobile per user request
    width: '100%',
    height: '100vh',
    order: 2, // Second on mobile
    position: 'relative',
    zIndex: 5,
  } : (variant === 'overlay' ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  } : {
    width: '60%',
    flex: 'none',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 5,
  });

  // Rest of styles
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const titleStyle = {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    // color handled by CSS global
  };

  const textStyle = {
    fontSize: '1.25rem',
    color: 'var(--color-text)',
    whiteSpace: 'pre-line',
    lineHeight: '1.8',
  };

  return (
    <section style={sectionStyle}>
      <div style={textContainerStyle}>
        {/* Helper ParallaxText wrapper. 
            Note: Global parallax might need offset adjustment per section, 
            but for "accompanying scroll", a constant subtle move is often enough. 
            Let's try a small speed factor. */}
        <ParallaxText speed={0.1}>
          <h2 style={titleStyle}>{title}</h2>
          <p style={textStyle} dangerouslySetInnerHTML={{ __html: text }}></p> 
        </ParallaxText>
      </div>
      <div style={imageContainerStyle}>
        <img src={image} alt={title} style={imgStyle} />
      </div>
    </section>
  );
};

export default InfoSection;
