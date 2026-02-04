import React from "react";
import ImageSlider from "./ImageSlider";
import ParallaxText from "./ParallaxText";

const Hero = ({ backgroundColor = "var(--color-white)" }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroStyle = {
    height: isMobile ? "auto" : "100vh", // Auto on mobile to fit stacked 100vh sections
    width: "100%",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    backgroundColor: backgroundColor,
    overflow: "hidden",
    position: "relative",
    transition: "background-color 0.5s ease",
  };

  const leftColumnStyle = {
    width: isMobile ? "100%" : "40%",
    height: isMobile ? "100vh" : "100%", // Full screen height on mobile
    flex: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: isMobile ? "20px" : "0 5%",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  };

  const rightColumnStyle = {
    width: isMobile ? "100%" : "60%",
    height: isMobile ? "100vh" : "100%", // Full screen height on mobile
    flex: "none",
    backgroundColor: "#f0f0f0",
    position: "relative",
    zIndex: 5,
  };

  const subtitleStyle = {
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
  };

  const buttonStyle = {
    // backgroundColor: 'var(--color-green-light)', // Handled by CSS
    // color: 'var(--color-white)', // Handled by CSS
    fontSize: "1rem",
    padding: "14px 28px",
    alignSelf: "center", // Changed from flex-start to center
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  };

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2664&auto=format&fit=crop",
      title: "NASHVILLE",
    },
    {
      url: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=2669&auto=format&fit=crop",
      title: "DENVER",
    },
    {
      url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2669&auto=format&fit=crop",
      title: "AUSTIN",
    },
  ];

  return (
    <section style={heroStyle}>
      <div style={leftColumnStyle}>
        <ParallaxText speed={0.15}>
          <img
            src="/logo-verde.png"
            alt="Green Season Turf & Landscaping LLC"
            style={{ maxWidth: "300px", marginBottom: "1.5rem" }}
          />
          <p style={subtitleStyle}>
            We specialize in professional synthetic grass and turf installation,
            transforming spaces with high-quality materials and expert
            workmanship. Our greatest reward is seeing our clients enjoy a
            flawless, worry-free lawn they can be proud of.
          </p>
          <button style={buttonStyle} className="hero-button">
            Get a Quote
          </button>
        </ParallaxText>
      </div>
      <div style={rightColumnStyle}>
        <ImageSlider images={sliderImages} />
      </div>
    </section>
  );
};

export default Hero;
