import React, { useState, useEffect } from "react";
import { Routes, useLocation } from "react-router-dom";
import PageTransitionLoader from "./PageTransitionLoader";

const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      // Wait for the loader to fade in, then update the actual route rendered
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 500); // 500ms delay to switch route behind the curtain
      
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation.pathname]);

  return (
    <>
      <PageTransitionLoader isLoading={isTransitioning} />
      <Routes location={displayLocation}>
        {children}
      </Routes>
    </>
  );
};

export default AnimatedRoutes;
