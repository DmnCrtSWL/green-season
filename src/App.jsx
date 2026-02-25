import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import FloatingLeaves from './components/FloatingLeaves';
import SmoothScroll from './components/SmoothScroll';
import SocialSidebar from './components/SocialSidebar';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import QuoteCalculator from './components/QuoteCalculator';
import FooterSection from './components/FooterSection';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [targetSection, setTargetSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (index) => {
    setTargetSection(index);
  };

  // DESKTOP: 0:Home, 1:About, 2:Services, 3:Gallery, 4:Quote, 5:Footer
  const desktopColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-green-dark)',  // 3: Gallery
    'var(--color-beige)',       // 4: Quote - BEIGE per user request
    '#0e0e0e',                  // 5: Footer 
  ];

  // MOBILE: 0:Home, 1:About, 2:Services, 3:Gallery, 4:Quote, 5:Footer
  const mobileColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-green-dark)',  // 3: Gallery
    'var(--color-beige)',       // 4: Quote - BEIGE per user request
    '#0e0e0e',                  // 5: Footer
  ];

  const brandColors = isMobile ? mobileColors : desktopColors;
  const currentThemeColor = brandColors[activeSection] || brandColors[0];

  return (
    <div style={{ '--dynamic-theme-color': currentThemeColor }}>
      <SmoothScroll
        onSectionChange={setActiveSection}
        targetSection={targetSection}
        isMobile={isMobile}
      />
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <SocialSidebar activeSection={activeSection} />

      {/* SECTION 0: HOME */}
      <Hero onNavigate={handleNavigate} />

      <main>
        {isMobile ? (
          // Mobile Order
          <>
            <InfoSection
              id="about"
              title="About Us"
              text={`<strong>Green Season Turf & Landscaping LLC</strong> is an independent general contractor company based in the <strong>North Chicagoland area</strong>.
              
              <strong>Founded in 2009</strong>, we bring <strong>over 15 years of experience</strong> and knowledge in turf and landscaping services.
              
              Our commitment to <strong>quality and customer satisfaction</strong> has allowed us to build <strong>long-lasting relationships</strong> and a strong reputation in the area.`}
              image="/about-us.jpeg"
              variant="overlay"
            />
            <ServicesSection id="services" />
            <GallerySection id="gallery" />
            <QuoteCalculator id="quote" />
            <FooterSection id="contact" />
          </>
        ) : (
          // Desktop Order
          <>
            <InfoSection
              id="about"
              title="About Us"
              text={`<strong>Green Season Turf & Landscaping LLC</strong> is an independent general contractor company based in the <strong>North Chicagoland area</strong>.
              
              <strong>Founded in 2009</strong>, we bring <strong>over 15 years of experience</strong> and knowledge in turf and landscaping services.
              
              Our commitment to <strong>quality and customer satisfaction</strong> has allowed us to build <strong>long-lasting relationships</strong> and a strong reputation in the area.`}
              image="/about-us.jpeg"
              variant="overlay"
            />
            <ServicesSection id="services" />
            <GallerySection id="gallery" />
            <QuoteCalculator id="quote" />
            <FooterSection id="contact" />
          </>
        )}
      </main>

      <FloatingLeaves />
    </div>
  );
}

export default App;
