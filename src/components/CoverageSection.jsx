import React, { useState } from 'react';

const ZONES = [
  {
    label: 'Chicago Metro',
    // Using coordinate/place based query for embed
    query: 'Chicago, IL', 
    zoom: 10
  },
  {
    label: 'North Shore & Lake County',
    query: 'Lake Forest, IL', // Representative center for North Shore
    zoom: 10
  },
  {
    label: 'Southern Wisconsin',
    query: 'Kenosha, WI',
    zoom: 10
  },
];

const CoverageSection = () => {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  const handleZoneClick = (zone) => {
    setActiveZone(zone);
  };

  const sectionStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: '80px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Loading/fallback color
  };

  // Interactive Map Background
  const mapContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    border: 'none',
  };

  const cardStyle = {
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '30px 50px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'row',
    gap: '50px', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    maxWidth: '90%',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.5)',
  };

  const iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(activeZone.query)}&t=&z=${activeZone.zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <section style={sectionStyle} id="coverage">
      {/* Map Iframe */}
      <iframe
        title="Service Coverage Map"
        width="100%"
        height="100%"
        style={mapContainerStyle}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={iframeSrc}
      />
      
      {/* Transparent Overlay to block map interaction but allow scroll */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5, // Above map (0), below card (10)
        cursor: 'default',
      }} />
      
      {/* Interaction Card */}
      <div style={cardStyle}>
        {ZONES.map((zone, index) => (
          <ZoneItem 
            key={index} 
            item={zone} 
            isActive={activeZone.label === zone.label}
            onClick={() => handleZoneClick(zone)} 
          />
        ))}
      </div>
    </section>
  );
};

// Sub-component for Hover effects
const ZoneItem = ({ item, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Combine Active and Hover states
  const isActiveOrHovered = isActive || isHovered;

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        textAlign: 'center',
        width: '160px',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        opacity: isActive ? 1 : 0.7, // Dim inactive items slightly
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
         color: isActiveOrHovered ? 'var(--color-green-title)' : 'var(--color-green-light)',
         transition: 'color 0.3s ease',
         width: '40px',
         height: '40px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
      }}>
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill={isActiveOrHovered ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          {/* Ensure the "egg" (hole) stays visible by filling it white when the pin is filled */}
          <circle cx="12" cy="10" r="3" fill={isActiveOrHovered ? "white" : "none"} stroke={isActiveOrHovered ? "none" : "currentColor"}></circle>
        </svg>
      </div>
      
      <span style={{
         fontFamily: 'var(--font-title)',
         fontWeight: '700',
         fontStyle: 'italic',
         fontSize: '1.05rem',
         color: isActiveOrHovered ? 'var(--color-green-title)' : 'var(--color-text)',
         transition: 'color 0.3s ease',
         lineHeight: '1.2'
      }}>
        {item.label}
      </span>
    </div>
  );
};

export default CoverageSection;
