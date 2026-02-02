import React, { useState } from 'react';

// --- DATA & PRICING LOGIC ---
const AREA_RANGES = [
  { label: 'Extra small area (< 500 sq ft)', value: 250, modifier: 1 },
  { label: 'Small area (500-1,000 sq ft)', value: 750, modifier: 1 },
  { label: 'Medium area (1,000-5,000 sq ft)', value: 3000, modifier: 1 },
  { label: 'Large area (5,000-10,000 sq ft)', value: 7500, modifier: 0.9 },
  { label: 'Very large area (10,000-15,000 sq ft)', value: 12500, modifier: 0.85 },
];

const PROPERTY_TYPES = [
  { label: 'Residential', multiplier: 1, icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )},
  { label: 'Commercial', multiplier: 1.2, icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  )},
];

const SERVICES_DB = {
  'Lawn Care': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M12 12v9" />
        <path d="M19.5 12l-1.5-6H6L4.5 12" />
      </svg>
    ),
    services: [
      { name: 'Lawn Mowing', base: 40, perSqFt: 0.01 },
      { name: 'Mulching', base: 100, perSqFt: 0.15 },
      { name: 'Weeding', base: 50, perSqFt: 0.05 },
    ],
    types: ['Weekly', 'Bi-Weekly', 'One-time'],
  },
  'Landscaping': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18v-5a4 4 0 1 1 8 0v5" />
        <path d="M12 18v3" />
        <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M9 21h6" />
      </svg>
    ),
    services: [
      { name: 'Sod Installation', base: 200, perSqFt: 1.5 },
      { name: 'Artificial Turf', base: 500, perSqFt: 12 },
      { name: 'Gardening', base: 100, perSqFt: 0.5 },
    ],
    types: ['Standard', 'Premium', 'Native', 'Custom'],
  },
  'Irrigation': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.74 9.94A6 6 0 1 1 6.26 12.63L12 2.69z" />
        <line x1="12" y1="14" x2="12" y2="17" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    services: [
      { name: 'System Installation', base: 500, perSqFt: 0.8 },
      { name: 'Repair', base: 150, perSqFt: 0 },
    ],
    types: ['Drip', 'Sprinkler', 'Smart'],
  },
  'Hardscape': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    services: [
      { name: 'Patio/Pavers', base: 1000, perSqFt: 25 },
      { name: 'Concrete', base: 800, perSqFt: 12 },
    ],
    types: ['Pavers', 'Stone', 'Concrete'],
  },
  'Seasonal': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    services: [
      { name: 'Snow Plowing', base: 50, perSqFt: 0.02 },
      { name: 'Lighting', base: 300, perSqFt: 0.5 },
    ],
    types: ['Seasonal', 'Per Visit'],
  },
  'Cleanup': {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    ),
    services: [
      { name: 'Junk Removal', base: 150, perSqFt: 0.1 },
      { name: 'Cleanup', base: 200, perSqFt: 0.05 },
    ],
    types: ['Standard', 'Heavy'],
  },
};

const QuoteCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zip: '',
    category: '',
    service: '',
    areaIndex: 2, // Default to Medium (2)
    details: '', 
    property: '', // 'Residential' or 'Commercial'
  });

  const [quote, setQuote] = useState({ min: 0, max: 0 });

  const calculateQuote = () => {
    const { category, service, areaIndex, property } = formData;
    if (!category || !service || !property) return;

    const catData = SERVICES_DB[category];
    const servData = catData.services.find(s => s.name === service);
    const area = AREA_RANGES[areaIndex];
    const propertyData = PROPERTY_TYPES.find(p => p.label === property);
    
    if (!servData || !area || !propertyData) return;

    // Base Calculation
    let cost = servData.base + (area.value * servData.perSqFt * area.modifier);
    
    // Multipliers
    cost = cost * propertyData.multiplier;

    // Range +/- 20%
    const min = Math.round((cost * 0.8) / 10) * 10;
    const max = Math.round((cost * 1.2) / 10) * 10;

    setQuote({ min, max });
    setStep(4);
  };

  const activeCategory = SERVICES_DB[formData.category];
  // Determine active types: check if specific service has types, else fallback to category types
  const activeServiceData = activeCategory?.services.find(s => s.name === formData.service);
  const activeTypes = activeServiceData?.types || activeCategory?.types || [];

  // --- STYLES ---
  const sectionStyle = {
    width: '100%',
    height: '100vh',
    backgroundColor: '#ffffff', // White background so leaves show
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
    position: 'relative',
    // zIndex is low to let leaves (fixed, z:1) stay on top if structured that way.
  };

  const contentContainer = {
    width: '100%',
    maxWidth: '800px',
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)', // Slight backdrop for readability over leaves?
    backdropFilter: 'blur(5px)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
  };
  
  const titleStyle = {
    fontFamily: 'var(--font-title)',
    fontSize: '2rem',
    color: 'var(--color-green-title)',
    marginBottom: '30px',
    textAlign: 'center',
  };

  // State for input focus
  const [zipFocused, setZipFocused] = useState(false);

  // Helper Component for Category Button with Hover State
  const CategoryButton = ({ category, isSelected, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Determine dynamic styles
    const effectiveBg = isSelected || isHovered ? 'var(--color-green-title)' : 'white';
    const effectiveColor = isSelected || isHovered ? 'white' : 'var(--color-green-light)'; // Icon color
    const effectiveTextColor = isSelected || isHovered ? 'white' : 'var(--color-green-title)'; // Text color

    const style = {
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '15px 20px',
      border: 'none', 
      borderRadius: '12px',
      backgroundColor: effectiveBg,
      boxShadow: isSelected || isHovered ? '0 10px 20px rgba(60, 147, 67, 0.2)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      transform: isHovered ? 'translateY(-2px)' : 'none',
    };

    return (
      <div 
        style={style}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{...iconStyle, color: effectiveColor}}>
          {React.cloneElement(SERVICES_DB[category].icon, { width: '100%', height: '100%' })}
        </div>
        <span style={{...categoryTextStyle, color: effectiveTextColor}}>
          {category}
        </span>
      </div>
    );
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 Columns
    gap: '20px',
    marginTop: '20px',
  };

  const cardOptionStyle = (isSelected) => ({
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '15px 20px',
    border: 'none', 
    borderRadius: '12px',
    backgroundColor: isSelected ? 'var(--color-green-title)' : 'white', // Reuse logic for consistency
    color: isSelected ? 'white' : 'var(--color-text)',
    boxShadow: isSelected ? '0 10px 20px rgba(60, 147, 67, 0.2)' : 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  });

  const iconStyle = {
    width: '40px',
    height: '40px',
    marginRight: '15px', 
    flexShrink: 0,
    transition: 'color 0.3s ease',
  };

  const categoryTextStyle = {
    fontFamily: 'var(--font-title)',
    fontWeight: '700', 
    fontStyle: 'italic',
    fontSize: '1.1rem',
    lineHeight: '1.2',
    transition: 'color 0.3s ease',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem', // Match selectStyle
    borderRadius: '8px',
    border: (zipFocused || formData.zip) ? '1px solid var(--color-green-light)' : '1px solid #e0e0e0', // Subtle interaction
    backgroundColor: '#fff',
    marginTop: '10px',
    boxSizing: 'border-box',
    marginBottom: '30px',
    outline: 'none', 
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--color-text)',
    marginBottom: '10px',
    display: 'block',
  };

  const rangeContainer = {
    marginTop: '30px',
    marginBottom: '30px',
  };

  const selectStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem', // Discrete size
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    marginTop: '10px',
    boxSizing: 'border-box',
    marginBottom: '30px',
    outline: 'none',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#888',
    transition: 'color 0.2s',
  };

  const checkboxRowStyle = {
     display: 'flex',
     alignItems: 'center',
     gap: '12px',
     cursor: 'pointer',
     padding: '10px 0',
     borderBottom: '1px solid #f0f0f0',
  };

  const checkboxBoxStyle = (isSelected) => ({
    width: '20px',
    height: '20px',
    borderRadius: '4px', // Soft square
    border: isSelected ? '2px solid var(--color-green-title)' : '2px solid #ccc',
    display: 'flex',
    alignItems: 'center', // Center check
    justifyContent: 'center',
    transition: 'all 0.2s',
    backgroundColor: isSelected ? 'rgba(60, 147, 67, 0.1)' : 'transparent',
  });

  return (
    <section style={sectionStyle}>
      <div style={contentContainer}>
        
        {/* PROGRESS DOTS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          {[1,2,3,4].map(s => (
             <div key={s} style={{
               width: '10px', height: '10px', borderRadius: '50%',
               backgroundColor: s <= step ? 'var(--color-green-light)' : '#ddd',
               transition: 'all 0.3s ease'
             }}/>
          ))}
        </div>

        {/* STEP 1: ZIP & CATEGORY */}
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h2 style={titleStyle}>Where & What?</h2>
            
            <div style={{ marginBottom: '30px' }}>
               <label style={labelStyle}>1. Zip Code</label>
               <input 
                 type="text" 
                 placeholder="e.g. 60601" 
                 style={inputStyle}
                 value={formData.zip}
                 onChange={e => setFormData({...formData, zip: e.target.value})}
                 onFocus={() => setZipFocused(true)}
                 onBlur={() => setZipFocused(false)}
               />
            </div>

            <label style={labelStyle}>2. Service Category</label>
            <div style={gridStyle}>
              {Object.keys(SERVICES_DB).map(cat => (
                <CategoryButton 
                  key={cat}
                  category={cat}
                  isSelected={formData.category === cat}
                  onClick={() => setFormData({...formData, category: cat, service: ''})}
                />
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
              <button 
                onClick={() => setStep(2)}
                disabled={!formData.zip || !formData.category} 
                className="hero-button" 
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SERVICE & AREA */}
        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
             <h2 style={titleStyle}>Service & Size</h2>

             <label style={labelStyle}>3. Specific Service</label>
             <select 
               style={selectStyle} // Updated to discrete style
               value={formData.service}
               onChange={e => setFormData({...formData, service: e.target.value})}
             >
               <option value="">Select Service...</option>
               {activeCategory?.services.map(s => (
                 <option key={s.name} value={s.name}>{s.name}</option>
               ))}
             </select>

             <div style={rangeContainer}>
                <label style={labelStyle}>4. Area Size: <span style={{color: 'var(--color-green-light)'}}>{AREA_RANGES[formData.areaIndex].label}</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1"
                  value={formData.areaIndex}
                  onChange={e => setFormData({...formData, areaIndex: parseInt(e.target.value)})}
                  className="brand-range" // Class for custom CSS
                  style={{ width: '100%', marginTop: '15px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>
                   <span>Small</span>
                   <span>Large</span>
                </div>
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'center' }}>
                <button 
                  onClick={() => setStep(1)}
                  style={backButtonStyle}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!formData.service}
                  className="hero-button"
                >
                  Next
                </button>
             </div>
          </div>
        )}

        {/* STEP 3: TYPE & PROPERTY */}
        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
             <h2 style={titleStyle}>Final Details</h2>

             <label style={labelStyle}>5. Preference / Type</label>
             {/* Use a ref/class for media query or simple style override in CSS block below */}
             <div className="checkbox-grid"> 
               {activeTypes.map(type => (
                 <div
                   key={type}
                   style={checkboxRowStyle}
                   onClick={() => setFormData({...formData, details: type})}
                 >
                    <div style={checkboxBoxStyle(formData.details === type)}>
                       {formData.details === type && (
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green-title)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                           <polyline points="20 6 9 17 4 12" />
                         </svg>
                       )}
                    </div>
                    <span style={{ fontSize: '1rem', color: '#555', fontWeight: '500' }}>{type}</span>
                 </div>
               ))}
             </div>

             <div style={{ marginTop: '30px' }}>
               <label style={labelStyle}>6. Property Type</label>
               <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                 {PROPERTY_TYPES.map(p => (
                   <div 
                     key={p.label}
                     style={{
                        ...cardOptionStyle(formData.property === p.label),
                        flex: 1
                     }}
                     onClick={() => setFormData({...formData, property: p.label})}
                   >
                     <div style={{...iconStyle, color: formData.property === p.label ? 'white' : 'var(--color-green-light)'}}>
                       {React.cloneElement(p.icon, { width: '100%', height: '100%' })}
                     </div>
                     <span style={{ fontWeight: '600' }}>{p.label}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'center' }}>
                <button 
                  onClick={() => setStep(2)}
                  style={backButtonStyle}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back
                </button>
                <button 
                  onClick={() => calculateQuote()}
                  disabled={!formData.details || !formData.property}
                  className="hero-button"
                >
                  Get Quote
                </button>
             </div>
          </div>
        )}
        
        {/* STEP 4: RESULT */}
        {step === 4 && (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
            <h2 style={titleStyle}>Estimated Quote</h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Based on Chicago market rates for {formData.service}:</p>
            
            <div style={{ 
              fontSize: '4rem', 
              fontWeight: '900', 
              color: 'var(--color-green-dark)',
              margin: '30px 0'
            }}>
              ${quote.min} - ${quote.max}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#888' }}>
              *This is a preliminary estimate. Final price may vary based on site inspection.
            </p>
            
            <button 
              className="hero-button"
              style={{ marginTop: '30px' }}
              onClick={() => {
                setStep(1);
                setFormData({
                    zip: '',
                    category: '',
                    service: '',
                    areaIndex: 2,
                    details: '',
                    property: '',
                });
              }}
            >
              Start Over
            </button>
          </div>
        )}

      </div>
      
      {/* Animation & Custom Input CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Range Slider Styling */
          .brand-range {
            -webkit-appearance: none; /* Override default CSS styles */
            appearance: none;
            width: 100%; /* Full-width */
            height: 10px; /* Specified height */
            background: #d3d3d3; /* Grey background */
            outline: none; /* Remove outline */
            opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
            -webkit-transition: .2s; /* 0.2 seconds transition on hover */
            transition: opacity .2s;
            border-radius: 5px;
          }

          .brand-range:hover {
             opacity: 1;
          }

          .brand-range::-webkit-slider-thumb {
            -webkit-appearance: none; /* Override default look */
            appearance: none;
            width: 25px; /* Set a specific slider handle width */
            height: 25px; /* Slider handle height */
            background: var(--color-green-title); /* Green background */
            cursor: pointer; /* Cursor on hover */
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
          }

          .brand-range::-moz-range-thumb {
            width: 25px;
            height: 25px;
            background: var(--color-green-title);
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
          }

          /* Responsive Checkbox Grid */
          .checkbox-grid {
             display: grid;
             grid-template-columns: repeat(4, 1fr); /* 4 Columns Desktop */
             gap: 15px;
             margin-top: 10px;
          }

          @media (max-width: 768px) {
             .checkbox-grid {
                grid-template-columns: 1fr; /* 1 Column Mobile */
                display: flex;
                flex-direction: column;
                gap: 0; /* List style */
             }
          }
        `}
      </style>
    </section>
  );
};

export default QuoteCalculator;
