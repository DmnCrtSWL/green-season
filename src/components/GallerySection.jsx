import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const GallerySection = ({ id }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Lock scroll when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        }
        return () => {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }, [selectedImage]);

    const galleryImages = [
        '/gallery-1.jpeg',
        '/gallery-2.jpeg',
        '/gallery-3.jpeg',
        '/gallery-4.jpeg',
        '/gallery-5.jpeg',
        '/gallery-6.jpeg',
        '/gallery-7.jpeg',
        '/gallery-8.jpeg',
        '/gallery-9.jpeg',
    ];

    const HEADER_HEIGHT = isMobile ? 60 : 80;

    return (
        <section
            id={id}
            style={{
                position: 'relative',
                width: '100%',
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                marginTop: `${HEADER_HEIGHT}px`,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: '3px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxSizing: 'border-box',
                zIndex: 2,
            }}
        >
            <style>{`
        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #e0e0e0;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
          opacity: 0.88;
        }
        .gallery-item:hover img {
          transform: scale(1.07);
          opacity: 1;
        }
        .gallery-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(166, 205, 60, 0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .gallery-item:hover::after {
          opacity: 1;
        }
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpImage {
          from { transform: scale(0.93); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .lightbox-close-btn {
          position: absolute;
          top: ${HEADER_HEIGHT + 20}px;
          right: 20px;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 10001;
          line-height: 1;
        }
        .lightbox-close-btn:hover {
          background: rgba(255,255,255,0.25);
          transform: scale(1.1);
        }
      `}</style>

            {galleryImages.map((src, index) => (
                <div
                    key={index}
                    className="gallery-item"
                    onClick={() => setSelectedImage(src)}
                >
                    <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
                </div>
            ))}

            {/* Render Lightbox via Portal so it escapes stacking context problems */}
            {selectedImage && typeof document !== 'undefined'
                ? createPortal(
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999, // Below Header (1000) but above everything else
                            padding: '20px',
                            paddingTop: `${HEADER_HEIGHT + 30}px`, // Center image below header
                            boxSizing: 'border-box',
                            animation: 'fadeInLightbox 0.3s ease',
                            cursor: 'zoom-out',
                            overflow: 'hidden', // Extra protection against scroll
                        }}
                        onClick={() => setSelectedImage(null)}
                        onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    >
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            style={{
                                maxHeight: `calc(100vh - ${HEADER_HEIGHT + 70}px)`,
                                maxWidth: '90vw',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                                animation: 'scaleUpImage 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                                cursor: 'default',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="lightbox-close-btn"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                    </div>,
                    document.body
                )
                : null}
        </section>
    );
};

export default GallerySection;
