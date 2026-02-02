import React from 'react';

const FooterSection = () => {
  const sectionStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#0e0e0e', // Very Dark Grey/Black
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '80px 40px 40px 40px',
    boxSizing: 'border-box',
    color: 'white',
    fontFamily: 'var(--font-body)',
  };

  const containerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // 2 Columns
    gap: '60px',
    width: '100%',
    alignItems: 'start', // Align to top
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  };

  const logoStyle = {
    width: '240px', // Larger
    marginBottom: '20px',
    filter: 'brightness(0) invert(1)', // White logo
  };

  const headingStyle = {
    fontFamily: 'var(--font-title)',
    fontSize: '2rem',
    marginBottom: '10px',
    fontWeight: '700',
    fontStyle: 'italic',
  };

  const textStyle = {
    fontSize: '1.2rem', // Slightly larger for readability
    lineHeight: '1.8',
    color: '#e0e0e0', // Soft white
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    paddingBottom: '2px',
    transition: 'opacity 0.2s',
    cursor: 'pointer',
  };

  // Form Styles
  const formInputStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'rgba(255,255,255,0.05)', // Increased transparency
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px', // Sharper corners for modern look
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    marginBottom: '15px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    padding: '15px 40px',
    backgroundColor: 'var(--color-green-title)', // Brand Green
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.3s',
    marginTop: '10px',
    alignSelf: 'flex-start',
  };

  const copyrightRowStyle = {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    marginTop: '60px',
    paddingTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    opacity: 0.6,
    flexWrap: 'wrap',
    gap: '20px',
  };

  // Social Icons Style
  const socialRowStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
  };

  const socialIconStyle = {
    width: '24px',
    height: '24px',
    color: 'white',
    opacity: 0.8,
    transition: 'opacity 0.2s, color 0.2s',
    cursor: 'pointer',
  };

  return (
    <footer style={sectionStyle} id="footer">
      <div style={containerStyle}>
        
        <div style={contentGridStyle} className="footer-grid">
          
          {/* LEFT COLUMN: Logo & Info */}
          <div style={columnStyle}>
            {/* LOGO ABOVE */}
            <img src="/logo.png" alt="Green Season" style={logoStyle} />
            
            <div style={textStyle}>
               <p style={{ marginBottom: '20px' }}>
                 <strong>North Chicagoland's Trusted<br/>Turf & Landscaping Experts.</strong>
               </p>
               <p><strong>Phone:</strong> <br/> +1 (555) 123-4567</p>
               <p><strong>Email:</strong> <br/> info@greenseason.com</p>
               <p><strong>Address:</strong> <br/> 123 Green way St.<br/>North Chicagoland, IL 60062</p>
            </div>

            {/* Social Links Moved Here */}
            <div>
               <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', color: '#888' }}>Social</h4>
               <div style={socialRowStyle}>
                  {['Facebook', 'Twitter', 'Instagram', 'TikTok', 'WhatsApp', 'Email'].map((platform) => (
                    <div key={platform} style={socialIconStyle} title={platform}>
                       {/* Placeholder Circles/Icons */}
                       <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="10"></circle>
                         {/* Simple internal detail to mimic icon variery */}
                         {platform === 'Facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                         {platform === 'Instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>}
                       </svg>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div style={columnStyle}>
            <h2 style={headingStyle}>Send a Message</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>
               <input type="text" placeholder="Your Name" style={formInputStyle} />
               <input type="email" placeholder="Your Email" style={formInputStyle} />
               <input type="tel" placeholder="Phone Number (Optional)" style={formInputStyle} />
               <textarea rows="5" placeholder="How can we help?" style={{...formInputStyle, resize: 'none'}} />
               <button style={buttonStyle}>Submit Inquiry</button>
            </form>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div style={copyrightRowStyle}>
           <span>© 2026 Green Season Turf & Landscaping LLC. All rights reserved.</span>
           <div style={{ display: 'flex', gap: '20px' }}>
             <a href="#" style={{...linkStyle, borderBottom: 'none'}}>Privacy Policy</a>
             <a href="#" style={{...linkStyle, borderBottom: 'none'}}>Terms of Service</a>
           </div>
        </div>

      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
             .footer-grid {
                grid-template-columns: 1fr !important;
                gap: 50px !important;
             }
             img[alt="Green Season"] {
                width: 180px !important;
             }
             #footer {
               padding-top: 60px !important;
               height: auto !important; 
               min-height: 100vh;
             }
          }
        `}
      </style>
    </footer>
  );
};

export default FooterSection;
