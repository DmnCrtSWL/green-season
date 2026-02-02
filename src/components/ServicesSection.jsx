import React, { useState } from 'react';

const servicesData = [
  {
    id: 0,
    title: 'Lawn Care',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2669&auto=format&fit=crop', 
    description: 'Everything your lawn needs to stay healthy and clean.',
    items: ['Lawn Mowing and Trimming', 'Full Service Lawn Care', 'Mulching', 'Weeding'],
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
    image: 'https://images.unsplash.com/photo-1621946002720-3023e3870845?q=80&w=2670&auto=format&fit=crop',
    description: 'Design, installation and transformation of outdoor spaces.',
    items: ['Outdoor Landscaping and Design', 'Sod Installation', 'Artificial Turf Installation', 'Land Leveling and Grading', 'Gardening'],
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
    title: 'Irrigation',
    image: 'https://images.unsplash.com/photo-1599690925058-90e1a0b555e6?q=80&w=2669&auto=format&fit=crop',
    description: 'Efficient watering solutions for your property.',
    items: ['Sprinkler and Irrigation System Installation', 'Sprinkler and Irrigation System Repair and Maintenance'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.74 9.94A6 6 0 1 1 6.26 12.63L12 2.69z" />
        <line x1="12" y1="14" x2="12" y2="17" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Hardscape',
    image: 'https://images.unsplash.com/photo-1589133469854-3e9a4c844111?q=80&w=2670&auto=format&fit=crop',
    description: 'Durable outdoor structures built to last.',
    items: ['Concrete Installation', 'Brick or Stone Repair', 'Patio Remodel or Addition', 'Fence Painting'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2669&auto=format&fit=crop',
    description: 'Year-round services for every season.',
    items: ['Gutter Cleaning and Maintenance', 'Pressure Washing', 'Holiday Lighting Installation and Removal', 'Snow Plowing'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'Cleanup',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2669&auto=format&fit=crop',
    description: 'Fast and responsible cleanup services.',
    items: ['Junk Removal', 'Tree Trimming and Removal', 'Shrub Trimming and Removal', 'Tree Planting'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    )
  },
];

const ServicesSection = () => {
  const [activeServiceId, setActiveServiceId] = useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    paddingTop: isMobile ? '60px' : '80px', // Prevent Header Overlap
    boxSizing: 'border-box',
  };

  const imageContainerStyle = {
    width: '60%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000', // fallback
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Gradient for elegance: Clear on left, Dark on right where text is
    background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end', // Align content to right
    textAlign: 'right',     // Align text to right
    padding: '4rem',
    paddingRight: '6rem',   // Extra padding from the menu edge
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
    alignItems: 'flex-end', // Ensure items align right
  };

  const overlayItemStyle = {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse', // Icon on the right
    gap: '10px',
  };

  const checkIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-green-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const menuContainerStyle = {
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle = (isActive) => ({
    flex: 1, // Equal height for all 6 rows
    border: 'none',
    backgroundColor: isActive ? 'var(--color-green-title)' : 'var(--color-white)',
    color: isActive ? 'var(--color-white)' : 'var(--color-green-title)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 3rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '0', // Square buttons (explicit)
  });

  const iconContainerStyle = {
    width: '50px', // Slightly larger icon area
    height: '50px',
    marginRight: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    fontSize: '2rem', // Larger text (was 1.5rem)
    fontWeight: '700',
    fontFamily: 'var(--font-title)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase', // Often looks better for "industrial" look, user didn't explicitly ask but "robust" implies it. Let's stick to larger first.
  };

  return (
    <section style={containerStyle}>
      {/* LEFT: IMAGE */}
      <div style={imageContainerStyle}>
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
             src={service.image} 
             alt={service.title} 
             style={{
               ...imageStyle,
               position: 'absolute',
               top: 0,
               left: 0,
               opacity: service.id === activeServiceId ? 1 : 0,
               zIndex: service.id === activeServiceId ? 1 : 0,
             }} 
           />
        ))}
        {/* Overlay Content */}
        {servicesData.map((service) => (
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

      {/* RIGHT: MENU */}
      <div style={menuContainerStyle}>
        {servicesData.map((service) => (
          <button
            key={service.id}
            style={buttonStyle(service.id === activeServiceId)}
            onClick={() => setActiveServiceId(service.id)}
            onMouseEnter={() => setActiveServiceId(service.id)} // Optional: Hover interaction
          >
            <div style={iconContainerStyle}>
               {React.cloneElement(service.icon, { 
                 style: { width: '100%', height: '100%' } 
               })}
            </div>
            <span style={textStyle}>{service.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
