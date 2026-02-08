import React, { useEffect, useRef } from 'react';

const SocialSidebar = ({ activeSection = 0 }) => {
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Inertia State
  const lastScrollY = useRef(0);
  // Physics State
  // Refs moved to top level

  const springValY = useRef(0); // Displacement Y (Lag)
  const springVelY = useRef(0);

  // Start X on Right side to match default state (approx window width - 92px)
  // Window might not be fully accurate on first render in SSR/static but for client only it's fine-ish.
  // Better to check window if available.
  const initialX = typeof window !== 'undefined' ? (window.innerWidth - 60 - 32) : 0;
  const springValX = useRef(initialX);
  const springVelX = useRef(0);

  const rafRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Disable physics on mobile
    if (isMobile) return;

    // Animation Loop for Spring Physics "Lag & Bounce"
    // Y-Axis: Scroll Lag (Stay behind)
    // X-Axis: Position Transition (Left <-> Right)

    // Physics Tuning: Softer bounce
    const TENSION = 0.04;
    const FRICTION = 0.26; // Higher friction = less aggressive bounce
    const LAG_FACTOR = 0.6;

    const animate = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY.current;

      // --- Y-AXIS PHYSICS (Scroll Lag) ---
      // Impulse
      springVelY.current -= scrollDelta * LAG_FACTOR;

      // Spring Force (Target is 0 relative to center)
      const displacementY = springValY.current;
      const forceY = -TENSION * displacementY - FRICTION * springVelY.current;

      // Integrate Y
      springVelY.current += forceY;
      springValY.current += springVelY.current;


      // --- X-AXIS PHYSICS (Position Transition) ---
      // Determine Target X based on activeSection
      // Default (0, 1, 3, 4): RIGHT
      // Services (2): LEFT

      const sidebarWidth = 60;
      const margin = 32;

      const targetX = (activeSection === 2)
        ? margin // LEFT
        : (window.innerWidth - sidebarWidth - margin); // RIGHT

      const displacementX = springValX.current - targetX;
      const forceX = -TENSION * displacementX - FRICTION * springVelX.current;

      // Integrate X
      springVelX.current += forceX;
      springValX.current += springVelX.current;


      // --- RENDER ---
      if (sidebarRef.current) {
        // Y: translate(-50%) is for vertical centering. + springValY.
        // X: Just springValX.
        sidebarRef.current.style.transform = `translate(${springValX.current}px, calc(-50% + ${springValY.current}px))`;
      }

      lastScrollY.current = scrollY;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, activeSection]); // Re-run/update target when activeSection changes

  // Brand Colors Cycle
  const brandColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-beige)',
    'var(--color-green-title)',
  ];

  const currentBgColor = brandColors[activeSection] || brandColors[0];

  const sidebarStyle = isMobile ? {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    // height: '60px', // Optional fixed height or let padding define it
    display: activeSection === 4 ? 'none' : 'flex', // Hide on Footer
    flexDirection: 'row',
    justifyContent: 'center', // Center icons
    alignItems: 'center',
    gap: '30px', // Spacing between icons
    zIndex: 100,
    backgroundColor: currentBgColor, // Dynamic
    padding: '15px 0',
    boxShadow: '0 -4px 15px rgba(0,0,0,0.15)',
    borderRadius: '0', // No radius for bottom bar
    transition: 'background-color 0.5s ease',
  } : {
    position: 'fixed',
    left: 0, // Initial position, controlled by transform
    top: '50%',
    // transform set in animation loop
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Reduced gap (was 20)
    zIndex: 100,
    width: '60px', // Fixed width for calcs
    alignItems: 'center',

    // Pill Style
    backgroundColor: currentBgColor, // Dynamic
    padding: '16px 8px', // Reduced padding (was 20 10)
    borderRadius: '50px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    transition: 'background-color 0.5s ease, opacity 0.5s ease',
    willChange: 'transform',
    opacity: activeSection === 4 ? 0 : 1, // Hide on Footer
    pointerEvents: activeSection === 4 ? 'none' : 'auto', // Disable interaction
  };

  const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18px', // Reduced size (was 30) - roughly half surface area or linear? linear half is 15. let's go 18 for usability.
    height: '18px',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    opacity: 0.9,
  };

  // Icons: White Stroke/Fill based on design. 
  // User said "Outlined".
  // I will enforce "stroke: white" and "fill: none" where possible,
  // or "fill: white" for solid shapes but maybe make them smaller/cleaner.
  // Standardizing to White.

  const iconStyle = {
    width: '100%',
    height: '100%',
    color: '#ffffff', // Use currentColor
    fill: 'none',
    stroke: '#ffffff',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };



  return (
    <div style={sidebarStyle} ref={sidebarRef}>
      <a href="#" style={linkStyle} title="Facebook">
        {/* Outlined FB equivalent or just clean F */}
        <svg viewBox="0 0 24 24" style={iconStyle} fill="none" stroke="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>

      <a href="#" style={linkStyle} title="Twitter">
        {/* Twitter/X is usually solid. I'll use stroke for outline effect */}
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      </a>

      <a href="#" style={linkStyle} title="Instagram">
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>

      <a href="#" style={linkStyle} title="TikTok">
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      </a>

      <a href="#" style={linkStyle} title="WhatsApp">
        {/* Whatsapp is complex to outline simply, but let's try */}
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>

      <a href="#" style={linkStyle} title="Email">
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>
    </div>
  );
};

export default SocialSidebar;
