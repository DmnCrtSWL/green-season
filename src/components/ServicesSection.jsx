import React, { useState } from 'react';

const servicesData = [
  {
    id: 0,
    title: 'Lawn Care',
    image: '/service-lawn-care.jpeg',
    description: 'Everything your lawn needs to stay healthy and clean.',
    items: ['Mulching', 'Weeding'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M12 12v9" />
        <path d="M19.5 12l-1.5-6H6L4.5 12" />
      </svg>
    )
  },
  {
    id: 1,
    title: 'Landscaping',
    image: '/service-landsaping.jpeg',
    description: 'Design, installation and transformation of outdoor spaces.',
    items: ['Sod Installation', 'Artificial Turf Installation', 'Land Leveling and Grading', 'Gardening'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18v-5a4 4 0 1 1 8 0v5" />
        <path d="M12 18v3" />
        <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M9 21h6" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Hardscape',
    image: '/service-hardscaping.jpeg',
    description: 'Durable outdoor structures built to last.',
    items: ['Concrete Installation', 'Brick or Stone Repair', 'Patio Remodel or Addition'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Seasonal',
    image: '/service-seasonal.jpeg',
    description: 'Year-round services for every season. Summer, Fall and Winter decorations and Winter pots.',
    items: ['Pressure Washing', 'Holiday Lighting Installation and Removal', 'Winter Decoration'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
];

const ServicesSection = ({ id }) => {
  const [activeServiceId, setActiveServiceId] = useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false); // Mobile Modal State
  const imagesRef = React.useRef([]);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    let rafId;
    const animate = () => {
      const offset = window.scrollY * 0.03;
      imagesRef.current.forEach(img => {
        if (img) {
          img.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const containerStyle = {
    display: 'flex',
    width: '100%',
    height: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 80px)', // Subtract header height
    minHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 80px)', // Enforce Min Height for proper flex behavior
    marginTop: isMobile ? '60px' : '80px', // Push down by header height
    overflow: 'hidden',
    paddingTop: 0,
    boxSizing: 'border-box',
    position: 'relative',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const imageContainerStyle = {
    width: isMobile ? '100%' : '50%',
    height: '100%',
    position: 'relative',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    zIndex: 1, // Stay above floating leaves
  };

  const menuContainerStyle = {
    width: isMobile ? '100%' : '50%',
    height: '100%',
    display: isMobile ? 'grid' : 'flex',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
    gap: isMobile ? '20px' : '0',
    flexDirection: 'column',
    position: isMobile ? 'relative' : 'static',
    zIndex: 1,
    backgroundColor: isMobile ? '#ffffff' : 'var(--color-white)',
    padding: isMobile ? '20px' : '0',
    justifyContent: isMobile ? 'center' : 'space-between',
    alignItems: isMobile ? 'center' : 'stretch',
    alignContent: isMobile ? 'center' : 'normal',
  };

  const mobileTitleStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centered, no rotation
    fontSize: '3.5rem',
    fontWeight: '700',
    fontFamily: 'var(--font-title)',
    fontStyle: 'italic',
    zIndex: 10,
    pointerEvents: 'none',
    textAlign: 'center',
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column', // Stack vertically
    lineHeight: '1',
  };

  const imageStyle = {
    width: '110%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease',
    willChange: 'transform',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    textAlign: 'right',
    padding: '4rem',
    paddingRight: '6rem',
    boxSizing: 'border-box',
    color: 'var(--color-white)',
    zIndex: 10,
    opacity: 0,
    animation: 'fadeIn 0.5s forwards',
  };

  const overlayTitleStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontFamily: 'var(--font-title)',
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'var(--color-white)',
  };

  const overlayDescStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    maxWidth: '80%',
  };

  const overlayListStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right', // Explicitly align text right
  };

  const overlayItemStyle = {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    gap: '10px',
  };

  const checkIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  // Desktop Button Style
  const buttonStyle = (isActive) => ({
    flex: 1,
    border: 'none',
    backgroundColor: isActive ? 'var(--color-green-light)' : 'var(--color-white)', // Active bg: light green
    color: isActive ? 'var(--color-white)' : 'var(--color-green-light)', // Idle text: light green
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 3rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    borderRadius: 0, // Square borders
  });

  // Mobile Grid Item Style
  const mobileGridItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const iconContainerStyle = {
    width: '50px',
    height: '50px',
    marginRight: isMobile ? '0' : '25px',
    marginBottom: isMobile ? '10px' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isMobile ? 'var(--color-green-light)' : 'inherit', // Always green light on mobile grid
  };

  const textStyle = {
    fontSize: isMobile ? '0.9rem' : '2rem', // Discrete size on mobile
    fontWeight: isMobile ? '600' : '700',
    fontFamily: isMobile ? 'var(--font-body)' : 'var(--font-title)', // Simple font for mobile text per request "discreto"
    fontStyle: 'italic', // Italic as requested
    letterSpacing: isMobile ? '0' : '0.05em',
    textTransform: isMobile ? 'none' : 'uppercase',
    color: isMobile ? '#333' : 'inherit', // Inherit color on desktop to match button state (white/green)
  };

  // Helper to handle click
  const handleServiceClick = (id) => {
    setActiveServiceId(id);
    if (isMobile) {
      setShowModal(true);
    }
  };

  return (
    <section id={id} style={containerStyle}>

      {/* MOBILE MODAL */}
      {showModal && isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          animation: 'fadeIn 0.3s ease'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '400px',
            width: '100%',
            position: 'relative',
            textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute', top: '15px', right: '15px',
                border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer'
              }}
            >✕</button>

            <div style={{ color: 'var(--color-green-title)', marginBottom: '15px', width: '60px', height: '60px', margin: '0 auto 15px auto' }}>
              {React.cloneElement(servicesData[activeServiceId].icon, { style: { width: '100%', height: '100%' } })}
            </div>

            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
              {servicesData[activeServiceId].title}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
              {servicesData[activeServiceId].description}
            </p>

            <div style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px' }}>
              {servicesData[activeServiceId].items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--color-green-light)', fontWeight: 'bold' }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEFT (Desktop) / TOP (Mobile): IMAGE & TITLE */}
      <div style={imageContainerStyle}>
        {/* MOBILE OVERLAY: Darken bg for text readability */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        )}

        {/* MOBILE TITLE: Inside Image Container */}
        {isMobile && (
          <div style={mobileTitleStyle}>
            <span style={{ color: '#ffffff' }}>Additional</span>
            <span style={{ color: '#a6cd3c' }}>Services</span>
          </div>
        )}

        <style>
          {`
             @keyframes fadeIn {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
             }
           `}
        </style>
        {servicesData.map((service) => (
          <img
            key={service.id}
            ref={el => imagesRef.current[service.id] = el}
            src={service.image}
            alt={service.title}
            style={{
              ...imageStyle,
              position: 'absolute',
              top: 0,
              left: '-5%',
              opacity: service.id === activeServiceId ? 1 : 0,
              zIndex: service.id === activeServiceId ? 1 : 0,
            }}
          />
        ))}
        {/* Overlay Content (Hidden on Mobile) */}
        {!isMobile && servicesData.map((service) => (
          <div
            key={service.id + '-overlay'}
            style={{
              ...overlayStyle,
              opacity: service.id === activeServiceId ? 1 : 0,
              visibility: service.id === activeServiceId ? 'visible' : 'hidden',
              transition: 'opacity 0.5s ease',
              animation: service.id === activeServiceId ? 'fadeIn 0.5s forwards' : 'none',
            }}
          >
            <h2 style={overlayTitleStyle}>{service.title}</h2>
            <p style={overlayDescStyle}>{service.description}</p>
            <ul style={overlayListStyle}>
              {service.items.map((item, i) => (
                <li key={i} style={overlayItemStyle}>
                  {checkIcon}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* RIGHT (Desktop) / BOTTOM (Mobile): MENU */}
      <div style={menuContainerStyle}>

        {/* Desktop Title (Hidden on Mobile) */}
        {!isMobile && (
          <div style={{
            flex: 1, // Takes equal space as buttons
            width: '100%',
            // padding: '2rem 3rem', // Removing padding to let space management handle it
            backgroundColor: 'var(--color-white)',
            fontFamily: 'var(--font-title)',
            fontStyle: 'italic',
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--color-green-light)',
            display: 'flex',
            alignItems: 'center', // Vertically center within the flex item
            justifyContent: 'center', // Horizontally center
            gap: '10px',
            borderBottom: '1px solid rgba(0,0,0,0.05)', // Match button borders if desired
          }}>
            <span style={{ color: '#ffffff', WebkitTextStroke: '1px #0e0e0e' }}>Additional</span> Services
          </div>
        )}

        {/* Buttons / Grid Items */}
        {servicesData.map((service) => (
          isMobile ? (
            // Mobile: Grid Item
            <div
              key={service.id}
              style={mobileGridItemStyle}
              onClick={() => handleServiceClick(service.id)}
            >
              <div style={iconContainerStyle}>
                {React.cloneElement(service.icon, {
                  style: { width: '100%', height: '100%' }
                })}
              </div>
              <span style={textStyle}>{service.title}</span>
            </div>
          ) : (
            // Desktop: Side Menu Button
            <button
              key={service.id}
              style={buttonStyle(service.id === activeServiceId)}
              onClick={() => handleServiceClick(service.id)}
              onMouseEnter={() => setActiveServiceId(service.id)}
            >
              <div style={iconContainerStyle}>
                {React.cloneElement(service.icon, {
                  style: { width: '100%', height: '100%' }
                })}
              </div>
              <span style={textStyle}>{service.title}</span>
            </button>
          )
        ))}

      </div>
    </section>
  );
};

export default ServicesSection;
