import React from 'react';

const Header = ({ activeSection = 0, onNavigate }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
  // Renamed sections as requested
  const menuItems = [
    { name: 'Home', index: 0, target: 'top' },
    { name: 'About Us', index: 1, target: '#about' },
    { name: 'Services', index: 2, target: '#services' },
    { name: 'Gallery', index: 3, target: '#gallery' },
    { name: 'Quote', index: 4, target: '#quote' },
    { name: 'Contact', index: 5, target: '#contact' },
  ];

  // Brand Colors Cycle
  const brandColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-green-dark)',  // 3: Gallery
    'var(--color-beige)',       // 4: Quote
    '#ffffff', // 5: Footer Logo
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
    transition: 'background-color 0.8s ease, transform 0.5s ease, opacity 0.5s ease', // Elegant transition + hide animation
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    transform: activeSection === 5 ? 'translateY(-100%)' : 'translateY(0)', // Hide on Footer
    opacity: activeSection === 5 ? 0 : 1,
    pointerEvents: activeSection === 5 ? 'none' : 'auto',
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
        <>
          {/* Hamburger Icon */}
          <div style={hamburgerStyle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div style={{ ...burgerLineStyle, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ ...burgerLineStyle, opacity: isMenuOpen ? 0 : 1 }} />
            <div style={{ ...burgerLineStyle, transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </div>

          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1001, // Below drawer, above header content
              opacity: isMenuOpen ? 1 : 0,
              pointerEvents: isMenuOpen ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
            }}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Side Drawer */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '75%',
              maxWidth: '300px',
              height: '100vh',
              backgroundColor: '#ffffff',
              zIndex: 1002, // Above everything
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
              boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 20px 20px 20px', // Top padding for header space
              boxSizing: 'border-box',
            }}
          >
            {menuItems.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid #f0f0f0',
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--color-green-title)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (onNavigate) onNavigate(item.target || item.index);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </>
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
                onNavigate(item.target || item.index);
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
