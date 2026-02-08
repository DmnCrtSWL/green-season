import React from 'react';

const FooterSection = ({ id }) => {
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
    color: 'white', // Explicitly white
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
    <footer style={sectionStyle} id={id}>
      <div style={containerStyle}>

        <div style={contentGridStyle} className="footer-grid">

          {/* LEFT COLUMN: Logo & Info */}
          <div style={columnStyle}>
            {/* LOGO ABOVE */}
            <img src="/logo.png" alt="Green Season" style={logoStyle} />

            <div style={textStyle}>
              <p style={{ marginBottom: '20px' }}>
                <strong>North Chicagoland's Trusted<br />Turf & Landscaping Experts.</strong>
              </p>
              <p><strong>Phone:</strong> <br /> +1 (555) 123-4567</p>
              <p><strong>Email:</strong> <br /> info@greenseason.com</p>
              <p><strong>Address:</strong> <br /> 123 Green way St.<br />North Chicagoland, IL 60062</p>
            </div>

            {/* Social Links Moved Here */}
            <div>
              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', color: '#888' }}>Social</h4>
              <div style={socialRowStyle}>
                {['Facebook', 'Twitter', 'Instagram', 'TikTok', 'WhatsApp', 'Email'].map((platform) => (
                  <div key={platform} style={socialIconStyle} title={platform}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {platform === 'Facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                      {platform === 'Twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                      {platform === 'Instagram' && (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </>
                      )}
                      {platform === 'TikTok' && <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>}
                      {platform === 'WhatsApp' && <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />}
                      {platform === 'Email' && (
                        <>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </>
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div style={{ ...columnStyle, marginTop: '40px' }}>
            <h2 style={headingStyle}>Send a Message</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>
              <input type="text" placeholder="Your Name" style={formInputStyle} />
              <input type="email" placeholder="Your Email" style={formInputStyle} />
              <input type="tel" placeholder="Phone Number (Optional)" style={formInputStyle} />
              <textarea rows="5" placeholder="How can we help?" style={{ ...formInputStyle, resize: 'none' }} />
              <button style={buttonStyle}>Submit Inquiry</button>
            </form>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div style={copyrightRowStyle}>
          <span>© 2026 Green Season Turf & Landscaping LLC. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }} className="footer-links">
            <a href="#" style={{ ...linkStyle, borderBottom: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ ...linkStyle, borderBottom: 'none' }}>Terms of Service</a>
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
             .footer-links {
               margin-bottom: 35px !important;
             }
          }
        `}
      </style>
    </footer>
  );
};

export default FooterSection;
