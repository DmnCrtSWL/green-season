import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ onSectionChange, targetSection, isMobile }) => {
  const lenisRef = useRef(null);
  const isAnimating = useRef(false);
  const currentSection = useRef(0);
  const lastWheelTime = useRef(0);
  const scrollToRef = useRef(null);

  const TOTAL_SECTIONS = 6;

  useEffect(() => {
    // 1. Initialize Lenis (Keep standard behavior)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: !isMobile, // Disable smooth lenis on mobile if preferred, or keep true. Usually native is best on mobile.
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis; // Expose globally to stop/start from other components

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 3. Scroll To Logic (API)
    const scrollToSection = (target) => {
      // Handle ID/Selector string
      if (typeof target === 'string') {
        isAnimating.current = true;

        // Convert string target to index to update activeSection state
        const sectionMap = {
          'top': 0,
          '#about': 1,
          '#services': 2,
          '#gallery': 3,
          '#quote': 4,
          '#contact': 5
        };

        if (sectionMap[target] !== undefined) {
          const newIndex = sectionMap[target];
          currentSection.current = newIndex;
          if (onSectionChange) onSectionChange(newIndex);
        }

        const HEADER_OFFSET = isMobile ? -60 : -80;

        if (target === 'top') {
          lenis.scrollTo(0, {
            lock: true,
            duration: 1.2,
            onComplete: () => { isAnimating.current = false; }
          });
        } else {
          lenis.scrollTo(target, { // e.g. '#about'
            offset: HEADER_OFFSET, // Offset for the fixed header
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lock: true,
            onComplete: () => { isAnimating.current = false; }
          });
        }
        return;
      }

      // Handle Numeric Index
      let index = Number(target);
      if (isNaN(index)) return; // Safety check
      if (index < 0) index = 0;
      if (index >= TOTAL_SECTIONS) index = TOTAL_SECTIONS - 1;

      if (currentSection.current !== index) {
        currentSection.current = index;
        if (onSectionChange) onSectionChange(index);
      }

      isAnimating.current = true;
      const scrollPos = index * window.innerHeight;

      lenis.scrollTo(scrollPos, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true,
        onComplete: () => {
          isAnimating.current = false;
        }
      });
    };

    scrollToRef.current = scrollToSection;

    // 4. Event Handlers (Snap Logic) - DESKTOP ONLY
    if (!isMobile) {
      const handleWheel = (e) => {
        e.preventDefault();
        if (isAnimating.current) return;

        const now = Date.now();
        if (now - lastWheelTime.current < 50) return;
        lastWheelTime.current = now;

        const direction = Math.sign(e.deltaY);
        if (direction > 0) scrollToSection(currentSection.current + 1);
        else if (direction < 0) scrollToSection(currentSection.current - 1);
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

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        lenis.destroy();
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
        scrollToRef.current = null;
      };
    } else {
      // Mobile: Just cleanup Lenis
      return () => {
        lenis.destroy();
        scrollToRef.current = null;
      };
    }
  }, [isMobile]); // Re-run if isMobile changes

  // Effect to handle prop-based navigation
  useEffect(() => {
    if (targetSection !== null && targetSection !== undefined && scrollToRef.current) {
      scrollToRef.current(targetSection);
    }
  }, [targetSection]);

  return null;
};

export default SmoothScroll;
