import React from 'react';

const Header = ({ activeSection = 0, onNavigate }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerStyle = {
    position: 'fixed', 
    top: 0,
    left: 0, 
    width: '100%', 
    height: isMobile ? '60px' : '80px', // Mobile 60px, Desktop 80px
    backgroundColor: isMobile ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
    background: isMobile ? 'linear-gradient(90deg, var(--color-green-title) 50%, #ffffff 50%)' : 'rgba(255, 255, 255, 0.95)',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    padding: '0 2rem', // Adjusted padding
    display: 'flex',
    justifyContent: isMobile ? 'space-between' : 'flex-end', // Push nav to the right since logo is absolute left
    alignItems: 'center',
    backdropFilter: isMobile ? 'none' : 'blur(5px)',
  };

  const navStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    height: '100%', // Match header
  };

  // Renamed sections as requested
  const menuItems = [
    { name: 'Home', index: 0 },
    { name: 'About Us', index: 1 },
    { name: 'Services', index: 2 },
    { name: 'Zones', index: 3 }, // Added Coverage Zone link 
    { name: 'Quote', index: 4 },
    { name: 'Contact', index: 5 },
  ];

  // Brand Colors Cycle
  // 0: Green Title (Standard)
  // 1: Green Dark (Depth)
  // 2: Green Light (Vibrancy)
  // 3: Beige (Contrast)
  // 4: Green Title (Return to Standard)
  const brandColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-beige)',
    'var(--color-green-title)',
  ];

  const currentLogoColor = brandColors[activeSection] || brandColors[0];

  // Pennant Logo Style
  const pennantStyle = isMobile ? {
      position: 'relative',
      left: 0,
      width: 'auto', // Allow width to adjust based on height
      height: '100%', // Fill container
      display: 'flex',
      alignItems: 'center',
      zIndex: 1001,
  } : {
    position: 'absolute',
    top: 0, // Hang from top
    left: '50px', // Distance from left edge
    width: '120px',
    height: '140px', // Taller than header (80px) to "hang"
    backgroundColor: currentLogoColor, // Dynamic Color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)', // Deep shadow
    zIndex: 1001, // Above header
    transition: 'background-color 0.8s ease', // Elegant transition
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  };

  // Mobile Hamburger Style
  const hamburgerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '30px',
      height: '25px',
      cursor: 'pointer',
      zIndex: 1002,
  };

  const burgerLineStyle = {
      width: '100%',
      height: '3px',
      backgroundColor: 'var(--color-green-title)',
      borderRadius: '2px',
      transition: 'all 0.3s linear',
  };

  return (
    <header style={headerStyle}>
      <a href="#" style={pennantStyle}>
        <img 
            src="/logo.png" 
            alt="Green Season" 
            style={{ 
                width: 'auto', 
                height: isMobile ? '40px' : 'auto', // Fixed 40px height on mobile
                maxWidth: isMobile ? 'none' : '80%', // Remove max-width constraint on mobile
                objectFit: 'contain',
                filter: isMobile ? 'brightness(0) invert(1)' : 'none' 
            }} 
        />
      </a>
      
      {isMobile ? (
          <div style={hamburgerStyle} onClick={() => console.log('Toggle Menu')}>
              <div style={burgerLineStyle} />
              <div style={burgerLineStyle} />
              <div style={burgerLineStyle} />
          </div>
      ) : (
          <nav style={navStyle}>
            {menuItems.map((item, i) => {
              const isActive = activeSection >= item.index;
              
              const itemStyle = {
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
                color: isActive ? 'var(--color-green-title)' : '#d1d1d1',
                transition: 'color 0.5s ease',
                cursor: 'pointer', // Ensure it looks clickable
                display: 'flex',
                alignItems: 'center',
              };

              // Logic for the connecting line
              const isLastItem = i === menuItems.length - 1;
              const isLineActive = activeSection >= i + 1;

              const lineStyle = {
                width: '40px', // Length of the connector
                height: '2px',
                backgroundColor: isLineActive ? 'var(--color-green-title)' : '#d1d1d1',
                margin: '0 10px',
                transition: 'background-color 0.5s ease',
              };

              const handleClick = (e) => {
                e.preventDefault(); // Good practice
                if (onNavigate) {
                   onNavigate(item.index);
                }
              };

              return (
                <React.Fragment key={item.name}>
                  <span 
                    style={itemStyle} 
                    onClick={handleClick}
                  >
                    {item.name}
                  </span>
                  {!isLastItem && <div style={lineStyle} />}
                </React.Fragment>
              );
            })}
          </nav>
      )}
    </header>
  );
};

export default Header;
