import { useState, useEffect, useRef } from 'react';

const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Trigger only once when it comes into view
      if (entry.isIntersecting) {
        setIsInView(true);
        // Optional: Disconnect if we only want the animation to happen once
        // observer.unobserve(entry.target);
      } else {
         // Optional: Reset if we want it to animate every time
         setIsInView(false); 
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

export default useInView;
