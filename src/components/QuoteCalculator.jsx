import React, { useState } from 'react';

// --- DATA ---
// Aligned with ServicesSection.jsx
const ADDITIONAL_SERVICES_DB = {
  'Lawn Care': ['Mulching', 'Weeding'],
  'Landscaping': ['Sod Installation', 'Land Leveling and Grading', 'Gardening'],
  'Hardscape': ['Concrete Installation', 'Brick or Stone Repair', 'Patio Remodel or Addition'],
  'Seasonal': ['Pressure Washing', 'Holiday Lighting Installation and Removal', 'Winter Decoration'],
};

// --- RENDER HELPERS ---
const Progress = ({ step }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '30px' }}>
    {[1, 2, 3, 4, 5, 6, 7].map(s => (
      <div key={s} style={{
        width: s === step ? '25px' : '8px',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: s <= step ? 'var(--color-beige)' : '#eee',
        transition: 'all 0.3s ease'
      }} />
    ))}
  </div>
);

const QuoteCalculator = () => {
  // Step 1: Zip
  // Step 2: Measurements & Photos
  // Step 3: Process Knowledge
  // Step 4: Turf Type (Pet vs Realistic)
  // Step 5: Additional Services
  // Step 6: Budget
  // Step 7: Contact & Privacy
  // Step 8: Success
  const [step, setStep] = useState(1);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const [formData, setFormData] = useState({
    zip: '',
    measurements: '', // Text input
    photos: [], // Array of URLs
    processKnowledge: '', // Yes/No
    turfType: '', // Pet or Realistic
    selectedServices: [],
    budget: '',
    name: '',
    contact: '', // Email or Phone
    privacyAccepted: false,
  });

  const toggleService = (serviceName) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(serviceName);
      if (exists) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== serviceName) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, serviceName] };
      }
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const currentCount = formData.photos.length;
    const remainingSlots = 5 - currentCount;
    if (remainingSlots <= 0) return;
    const newFiles = files.slice(0, remainingSlots);
    const newPhotos = newFiles.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
  };

  const [errors, setErrors] = useState({});

  const validateAndSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.contact) newErrors.contact = true;
    if (!formData.privacyAccepted) newErrors.privacy = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // In a real app, this would send data to backend/email
      console.log("Form Submitted:", formData);
      setStep(8);
    }
  };

  // --- STYLES ---
  const sectionStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
  };

  const contentContainer = {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  };

  const titleStyle = {
    fontFamily: 'var(--font-title)',
    fontSize: '2.2rem',
    color: 'var(--color-beige)',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '700',
    fontStyle: 'italic',
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '40px',
    fontSize: '1.1rem',
    lineHeight: '1.5',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    marginBottom: '20px',
    fontFamily: 'inherit',
  };

  const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    alignItems: 'center'
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
  };

  const cardStyle = (isSelected) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px',
    border: isSelected ? '2px solid var(--color-beige)' : '2px solid transparent',
    borderRadius: '16px',
    backgroundColor: isSelected ? 'rgba(194, 175, 62, 0.05)' : '#fff', // Beige tint
    boxSizing: 'border-box',
    boxShadow: isSelected ? '0 10px 25px rgba(194, 175, 62, 0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isSelected ? 'translateY(-5px)' : 'none',
    width: '100%',
    boxSizing: 'border-box',
  });

  return (
    <section style={sectionStyle}>
      <div style={contentContainer}>
        {step < 8 && <Progress step={step} />}

        {/* STEP 1: ZIP CODE */}
        {step === 1 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Let's Get Started!</h2>
            <p style={subtitleStyle}>Please enter your Zip Code to verify availability.</p>

            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Zip Code"
                style={{ ...inputStyle, textAlign: 'center' }}
                value={formData.zip}
                onChange={e => setFormData({ ...formData, zip: e.target.value })}
              />
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => setStep(2)}
                  disabled={formData.zip.length < 4}
                  className="hero-button"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MEASUREMENTS & PHOTOS */}
        {step === 2 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Measurements of the area?</h2>
            <p style={subtitleStyle}>If you don't know the exact size, please provide a few photos.</p>

            <input
              type="text"
              placeholder="e.g. 500 sq ft, 20x25, or 'Unsure'"
              style={inputStyle}
              value={formData.measurements}
              onChange={e => setFormData({ ...formData, measurements: e.target.value })}
            />

            {/* PHOTO UPLOAD */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <label style={{
                border: '2px dashed var(--color-beige)',
                borderRadius: '12px',
                padding: '30px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9',
                display: 'block',
                marginBottom: '20px'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📷</div>
                <span style={{ color: '#666', fontWeight: '500' }}>Attach Photos (Max 5)</span>
              </label>

              {formData.photos.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                  {formData.photos.map((src, i) => (
                    <div key={i} style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                      <img src={src} alt={`upload-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={buttonRowStyle}>
              <button onClick={() => setStep(1)} style={backButtonStyle}>← Back</button>
              <button onClick={() => setStep(3)} className="hero-button">Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESS KNOWLEDGE */}
        {step === 3 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Do you know the process?</h2>
            <p style={subtitleStyle}>Are you familiar with how the installation process works?</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div
                style={cardStyle(formData.processKnowledge === 'Yes')}
                onClick={() => setFormData({ ...formData, processKnowledge: 'Yes' })}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Yes, I do</span>
              </div>
              <div
                style={cardStyle(formData.processKnowledge === 'No')}
                onClick={() => setFormData({ ...formData, processKnowledge: 'No' })}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>No, tell me more</span>
              </div>
            </div>

            <div style={buttonRowStyle}>
              <button onClick={() => setStep(2)} style={backButtonStyle}>← Back</button>
              <button onClick={() => setStep(4)} disabled={!formData.processKnowledge} className="hero-button">Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 4: TURF TYPE */}
        {step === 4 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Which type of turf?</h2>
            <p style={subtitleStyle}>Select the style that best fits your needs.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div
                style={cardStyle(formData.turfType === 'Pet Turf')}
                onClick={() => setFormData({ ...formData, turfType: 'Pet Turf' })}
              >
                <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🐾</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Pet Turf</span>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>Durable & Easy to Clean</p>
              </div>
              <div
                style={cardStyle(formData.turfType === 'Realistic Turf')}
                onClick={() => setFormData({ ...formData, turfType: 'Realistic Turf' })}
              >
                <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🌿</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Realistic Turf</span>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>Natural Look & Feel</p>
              </div>
            </div>

            <div style={buttonRowStyle}>
              <button onClick={() => setStep(3)} style={backButtonStyle}>← Back</button>
              <button onClick={() => setStep(5)} disabled={!formData.turfType} className="hero-button">Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 5: ADDITIONAL SERVICES */}
        {step === 5 && (
          <div className="fade-in" style={{ height: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            {/* HEADER: Takes 1/5 of space */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '20px' }}>
              <h2 style={{ ...titleStyle, marginBottom: '5px' }}>Additional Services</h2>
              <p style={{ ...subtitleStyle, marginBottom: '0' }}>Select any other services you might be interested in.</p>
            </div>

            {/* CATEGORIES: Takes 4/5 of space */}
            <div style={{ flex: '4', display: 'flex', flexDirection: 'column', margin: '0 -40px' }}>
              {Object.entries(ADDITIONAL_SERVICES_DB).map(([category, services], idx) => {
                const isHovered = hoveredCategory === category;
                return (
                  <div
                    key={category}
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '0 40px',
                      backgroundColor: isHovered ? 'var(--color-beige)' : 'transparent',
                      transition: 'all 0.3s ease',
                      borderTop: '1px solid #eee', // Always have a top border for separation
                      cursor: 'default'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '700',
                        fontStyle: 'italic',
                        fontSize: '1.5rem',
                        color: isHovered ? '#ffffff' : 'var(--color-beige)',
                        margin: 0,
                        transition: 'color 0.3s ease'
                      }}>
                        {category}
                      </h3>

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {services.map(srv => {
                          const isSelected = formData.selectedServices.includes(srv);
                          return (
                            <div
                              key={srv}
                              onClick={(e) => { e.stopPropagation(); toggleService(srv); }}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: isSelected
                                  ? (isHovered ? '#fff' : 'var(--color-beige)')
                                  : (isHovered ? 'rgba(255,255,255,0.2)' : '#f5f5f5'),
                                color: isSelected
                                  ? (isHovered ? 'var(--color-beige)' : '#fff')
                                  : (isHovered ? '#fff' : '#333'),
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: isHovered ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent'
                              }}
                            >
                              {isSelected && <span style={{ marginRight: '6px' }}>✓</span>}
                              {srv}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ ...buttonRowStyle, marginTop: '20px', padding: '0 40px' }}>
              <button onClick={() => setStep(4)} style={backButtonStyle}>← Back</button>
              <button onClick={() => setStep(6)} className="hero-button">Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 6: BUDGET */}
        {step === 6 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Do you have a budget?</h2>
            <p style={subtitleStyle}>This helps us recommend the best options for you.</p>

            <input
              type="text"
              placeholder="e.g. $5,000 - $10,000"
              style={inputStyle}
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
            />

            <div style={buttonRowStyle}>
              <button onClick={() => setStep(5)} style={backButtonStyle}>← Back</button>
              <button onClick={() => setStep(7)} className="hero-button">Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 7: CONTACT & PRIVACY */}
        {step === 7 && (
          <div className="fade-in">
            <h2 style={titleStyle}>Almost Done!</h2>
            <p style={subtitleStyle}>How can we reach you with your proposal?</p>

            <input
              type="text"
              placeholder="Full Name"
              style={{ ...inputStyle, border: errors.name ? '1px solid red' : '1px solid #e0e0e0' }}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email or Phone Number"
              style={{ ...inputStyle, border: errors.contact ? '1px solid red' : '1px solid #e0e0e0' }}
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />

            {/* PRIVACY CHECKBOX */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', marginTop: '20px' }}
              onClick={() => {
                setFormData(prev => ({ ...prev, privacyAccepted: !prev.privacyAccepted }));
                if (errors.privacy) setErrors(prev => ({ ...prev, privacy: false }));
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                border: errors.privacy ? '2px solid red' : (formData.privacyAccepted ? '2px solid var(--color-beige)' : '2px solid #ccc'),
                backgroundColor: formData.privacyAccepted ? 'var(--color-beige)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.2s'
              }}>
                {formData.privacyAccepted && <span style={{ color: 'white', fontSize: '16px' }}>✓</span>}
              </div>
              <span style={{ fontSize: '0.9rem', color: errors.privacy ? 'red' : '#555' }}>
                I acknowledge that I have read the Privacy Policy of Green Seasons.
              </span>
            </div>
            {errors.privacy && (
              <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '5px', paddingLeft: '40px' }}>
                Please accept the terms to continue.
              </div>
            )}

            <div style={buttonRowStyle}>
              <button onClick={() => setStep(6)} style={backButtonStyle}>← Back</button>
              <button
                onClick={validateAndSubmit}
                className="hero-button"
              >
                Send Request
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: SUCCESS */}
        {step === 8 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={titleStyle}>Thank You!</h2>
            <p style={{ ...subtitleStyle, maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
              We have received your project details. <br />
              Our team will review your information and contact you shortly to discuss next steps.
            </p>

            <button
              className="hero-button"
              style={{ marginTop: '50px' }}
              onClick={() => {
                setStep(1);
                setFormData({
                  zip: '', measurements: '', photos: [], processKnowledge: '',
                  turfType: '', selectedServices: [], budget: '', name: '', contact: '', privacyAccepted: false
                });
              }}
            >
              Back to Home
            </button>
          </div>
        )}

      </div>

      <style>
        {`
          .fade-in { animation: fadeIn 0.5s ease forwards; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default QuoteCalculator;
