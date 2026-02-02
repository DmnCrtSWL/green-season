import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ onSectionChange, targetSection }) => {
  const lenisRef = useRef(null);
  const isAnimating = useRef(false);
  const currentSection = useRef(0);
  const touchStartY = useRef(0);
  const lastWheelTime = useRef(0);
  const scrollToRef = useRef(null); // Ref to store the internal scroll function

  // Total sections: Hero + About + Services + Coverage + Quote + Footer = 6.
  // Indexes: 0 to 5.
  const TOTAL_SECTIONS = 6; 

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      smooth: true,
      smoothTouch: false, // We handle touch manually
    });
    lenisRef.current = lenis;

    // 2. Animation Loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 3. Scroll To Logic
    const scrollToSection = (index) => {
      // Clamp index
      if (index < 0) index = 0;
      if (index >= TOTAL_SECTIONS) index = TOTAL_SECTIONS - 1;

      // Only update if changed (or force it if needed, but better to be precise)
      if (currentSection.current !== index) {
          currentSection.current = index;
          if (onSectionChange) onSectionChange(index);
      }
      
      isAnimating.current = true;

      // Calculate target
      const target = index * window.innerHeight;

      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        lock: true, 
        onComplete: () => {
          isAnimating.current = false;
        }
      });
    };

    // Expose function to ref
    scrollToRef.current = scrollToSection;

    // 4. Event Handlers (Hijacking)

    const handleWheel = (e) => {
      // CRITICAL: Prevent default to stop native scroll since 'overflow' is technically on now
      e.preventDefault();

      if (isAnimating.current) return;

      // Simple Debounce for rapid wheel events (trackpads trigger many)
      const now = Date.now();
      if (now - lastWheelTime.current < 50) return;
      lastWheelTime.current = now;

      // Determine Scroll Direction
      const direction = Math.sign(e.deltaY);

      if (direction > 0) {
        scrollToSection(currentSection.current + 1);
      } else if (direction < 0) {
        scrollToSection(currentSection.current - 1);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.changedTouches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      // Threshold for swipe
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollToSection(currentSection.current + 1);
        } else {
          scrollToSection(currentSection.current - 1);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isAnimating.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection.current - 1);
      }
    };

    // Use { passive: false } to allow e.preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lenis.destroy();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      scrollToRef.current = null;
    };
  }, []);

  // Effect to handle prop-based navigation
  useEffect(() => {
    if (targetSection !== null && targetSection !== undefined && scrollToRef.current) {
       scrollToRef.current(targetSection);
    }
  }, [targetSection]);
  
  return null;
};

export default SmoothScroll;
