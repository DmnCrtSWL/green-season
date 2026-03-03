import React, { useEffect, useState, useRef } from 'react';

const TurfGalleryModal = ({ activeGallery, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRef = useRef(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeGallery) {
      setSelectedImageIndex(0);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'auto';
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (window.lenis) window.lenis.start();
    };
  }, [activeGallery]);

  const getGalleryImages = (category) => {
    switch (category) {
      case 'pet':
        return [
          '/pet-01.jpeg', '/pet-02.jpeg', '/pet-03.jpeg', '/pet-04.jpeg',
          '/pet-05.jpeg', '/pet-06.jpeg', '/pet-07.jpeg', '/pet-08.jpeg',
          '/pet-09.jpeg', '/pet-10.jpeg'
        ];
      case 'landscape':
        return [
          '/landscape-01.jpeg', '/landscape-02.jpeg', '/landscape-03.jpeg',
          '/landscape-04.jpeg', '/landscape-05.jpeg', '/landscape-06.jpeg',
          '/landscape-07.jpeg', '/landscape-08.jpeg', '/landscape-09.jpeg',
          '/landscape-10.jpeg', '/landscape-11.jpeg', '/landscape-12.jpeg'
        ];
      case 'putting-greens':
        return [
          '/greens-01.jpeg', '/greens-02.jpeg', '/greens-03.jpeg', '/greens-04.jpeg',
          '/greens-05.jpeg', '/greens-06.jpeg', '/greens-07.jpeg', '/greens-08.jpeg'
        ];
      default:
        return [];
    }
  };

  const images = getGalleryImages(activeGallery);

  // --- HANDLERS ---

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (!activeGallery) return;
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Auto-scroll thumbnails when selection changes
  useEffect(() => {
    if (thumbnailRef.current && thumbnailRef.current.children[selectedImageIndex]) {
      const selectedThumb = thumbnailRef.current.children[selectedImageIndex];
      selectedThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedImageIndex, activeGallery]);

  if (!activeGallery) return null;

  // --- STYLES ---

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 9000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    opacity: 1,
    transition: 'opacity 0.3s ease',
  };

  const closeBtnStyle = {
    position: 'absolute',
    top: '30px',
    right: '40px',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '3rem',
    cursor: 'pointer',
    zIndex: 9002,
    transition: 'transform 0.3s ease',
  };

  const titleStyle = {
    position: 'absolute',
    top: '30px',
    left: '40px',
    fontFamily: 'var(--font-title)',
    color: '#ffffff',
    fontSize: '2rem',
    textTransform: 'capitalize',
    margin: 0,
    zIndex: 9002,
  };

  const carouselContainerStyle = {
    position: 'relative',
    width: '90%',
    height: '75%', // Allow space for thumbnails (75% height)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const mainImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    userSelect: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  };

  const navBtnStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontSize: '2rem',
    cursor: 'pointer',
    width: '50px',
    height: '50px',
    zIndex: 9001,
    borderRadius: '50%',
    display: images.length > 1 ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background 0.3s ease, transform 0.3s ease',
  };

  const thumbnailsWrapperStyle = {
    position: 'absolute',
    bottom: '20px',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  };

  const thumbnailsContainerStyle = {
    display: 'flex',
    gap: '15px',
    overflowX: 'auto',
    padding: '10px',
    maxWidth: '100%',
    scrollBehavior: 'smooth',
  };

  return (
    <>
      <style>
        {`
          .turf-thumbnails::-webkit-scrollbar {
            display: none;
          }
          .nav-btn:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: translateY(-50%) scale(1.1) !important;
          }
          .thumb-img {
            height: 80px;
            width: 120px;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
            transition: transform 0.3s ease, opacity 0.3s ease, border 0.3s ease;
            opacity: 0.6;
            border: 2px solid transparent;
          }
          .thumb-img:hover {
            opacity: 0.8;
          }
          .thumb-img.active {
            opacity: 1;
            transform: scale(1.05);
            border: 2px solid #ffffff;
          }
        `}
      </style>
      
      {/* Clicking anywhere on the background overlay closes the modal */}
      <div style={modalOverlayStyle} onClick={onClose}>
        
        <h2 style={titleStyle}>{activeGallery.replace('-', ' ')} Gallery</h2>
        
        <button 
          style={closeBtnStyle} 
          onClick={onClose}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
        >
          ×
        </button>

        {/* Carousel Container (90% width) - prevent clicking inside from closing modal */}
        <div style={carouselContainerStyle} onClick={(e) => e.stopPropagation()}>
          <button className="nav-btn" style={{ ...navBtnStyle, left: '0' }} onClick={handlePrev}>❮</button>
          
          <img 
            src={images[selectedImageIndex]} 
            style={mainImageStyle} 
            alt={`${activeGallery} gallery main`}
          />
          
          <button className="nav-btn" style={{ ...navBtnStyle, right: '0' }} onClick={handleNext}>❯</button>
        </div>

        {/* Thumbnails wrapper - prevent clicks on thumbnails from closing the modal */}
        <div style={thumbnailsWrapperStyle} onClick={(e) => e.stopPropagation()}>
          <div className="turf-thumbnails" style={thumbnailsContainerStyle} ref={thumbnailRef}>
            {images.map((src, index) => (
              <img 
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`thumb-img ${index === selectedImageIndex ? 'active' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default TurfGalleryModal;
