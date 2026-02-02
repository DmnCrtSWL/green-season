import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import FloatingLeaves from './components/FloatingLeaves';
import SmoothScroll from './components/SmoothScroll';
import SocialSidebar from './components/SocialSidebar';
import ServicesSection from './components/ServicesSection';
import CoverageSection from './components/CoverageSection';
import QuoteCalculator from './components/QuoteCalculator';
import FooterSection from './components/FooterSection';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [targetSection, setTargetSection] = useState(null);

  const handleNavigate = (index) => {
    setTargetSection(index);
  };

  // Brand Colors Cycle (Same as Sidebar/Header)
  const brandColors = [
    'var(--color-green-title)',
    'var(--color-green-dark)',
    'var(--color-green-light)',
    'var(--color-beige)',       // 3: Coverage (Map/Light)
    'var(--color-green-title)', // 4: Quote (Green)
    '#0e0e0e',                  // 5: Footer (Very Dark Grey/Black)
  ];

  const currentThemeColor = brandColors[activeSection] || brandColors[0];

  return (
    <div style={{ '--dynamic-theme-color': currentThemeColor }}>
      <SmoothScroll 
        onSectionChange={setActiveSection} 
        targetSection={targetSection}
      />
      <Header 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
      />
      <SocialSidebar activeSection={activeSection} />
      
      {/* SECTION 0: HOME */}
      <Hero />
      
      <main>
        {/* SECTION 1: ABOUT US */}
        <InfoSection 
          title="About Us"
          text={`<strong>Green Season Turf & Landscaping LLC</strong> is an independent general contractor company based in the <strong>North Chicagoland area</strong>.
          
          <strong>Founded in 2009</strong>, we bring <strong>over 15 years of experience</strong> and knowledge in turf and landscaping services.
          
          Our commitment to <strong>quality and customer satisfaction</strong> has allowed us to build <strong>long-lasting relationships</strong> and a strong reputation in the area.`}
          image="https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2669&auto=format&fit=crop"
          variant="overlay" 
        />

        {/* SECTION 2: SERVICES */}
        <ServicesSection />

        {/* SECTION 2.5: COVERAGE */}
        <CoverageSection />

        {/* SECTION 3: QUOTE (Calculator) */}
        <QuoteCalculator />

        {/* SECTION 4: CONTACT & FOOTER */}
        <FooterSection />
      </main>

      <FloatingLeaves />
    </div>
  );
}

export default App;
