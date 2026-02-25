import React, { useEffect, useRef } from 'react';

const FloatingLeaves = () => {
  // Config
  const leavesConfig = [
    { src: "/hoja-1.png", initialTop: 10, initialLeft: 5, speed: 0.15, rotationSpeed: 0.05, scale: 0.8, mouseInfluence: 0.02 },
    { src: "/hoja-2.png", initialTop: 40, initialLeft: 90, speed: -0.1, rotationSpeed: -0.08, scale: 0.6, mouseInfluence: -0.03 },
    { src: "/hoja-3.png", initialTop: 70, initialLeft: 15, speed: 0.2, rotationSpeed: 0.03, scale: 0.9, mouseInfluence: 0.02 },
    { src: "/hoja-1.png", initialTop: 120, initialLeft: 80, speed: -0.12, rotationSpeed: 0.06, scale: 0.7, mouseInfluence: -0.02 },
    { src: "/hoja-3.png", initialTop: 30, initialLeft: 45, speed: 0.08, rotationSpeed: -0.04, scale: 0.5, mouseInfluence: 0.04 }, // Extra leaf for depth
  ];

  const leafRefs = useRef([]);
  const requestRef = useRef();

  // Physics state refs (mutable)
  const stateRef = useRef({
    scrollY: 0,
    targetScrollY: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    time: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      stateRef.current.targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates (-1 to 1) for easier math
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      const state = stateRef.current;

      // Update Physics (Lerp for smoothness)
      // High factor = fast response, Low factor = heavy/smooth feel
      state.scrollY = lerp(state.scrollY, state.targetScrollY, 0.05);
      state.mouseX = lerp(state.mouseX, state.targetMouseX, 0.05);
      state.mouseY = lerp(state.mouseY, state.targetMouseY, 0.05);
      state.time += 0.01; // Time progression for sine waves

      // Update each leaf
      leafRefs.current.forEach((leaf, index) => {
        if (!leaf) return;
        const config = leavesConfig[index];

        // 1. Scroll Position Interaction
        // Only move relative to scroll interaction, but keep fixed base position
        const yScrollOffset = state.scrollY * config.speed;

        // 2. Mouse Interaction
        // Leaves shift slightly based on mouse position
        const xMouseOffset = state.mouseX * window.innerWidth * config.mouseInfluence;
        const yMouseOffset = state.mouseY * window.innerHeight * config.mouseInfluence;

        // 3. Ambient Floating (Sine Wave)
        // Add random phase offset so they don't bob in sync (index * 1.5)
        const floatY = Math.sin(state.time + index * 1.5) * 15;
        const floatRotate = Math.sin(state.time * 0.5 + index) * 5;

        // 4. Continuous Rotation
        const scrollRotation = state.scrollY * config.rotationSpeed;

        // Combine transforms
        const finalY = yScrollOffset + yMouseOffset + floatY;
        const finalX = xMouseOffset;
        const finalRotate = scrollRotation + floatRotate;

        // Apply via transform3d for GPU acceleration
        leaf.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) rotate(${finalRotate}deg) scale(${config.scale})`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0, // Lowered behind images
    overflow: 'hidden',
  };

  const initialLeafStyle = (top, left) => ({
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    width: '200px', // Base size, scaled down by transform
    height: 'auto',
    opacity: 0.9,
    willChange: 'transform', // Hint to browser for optimization
  });

  return (
    <div style={containerStyle}>
      {leavesConfig.map((leaf, index) => (
        <img
          key={index}
          ref={el => leafRefs.current[index] = el}
          src={leaf.src}
          alt="Decorative leaf"
          style={initialLeafStyle(leaf.initialTop, leaf.initialLeft)}
        />
      ))}
    </div>
  );
};

export default FloatingLeaves;
