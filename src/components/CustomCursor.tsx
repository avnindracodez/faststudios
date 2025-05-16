import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  let location;
try {
  location = useLocation();
} catch (err) {
  // Not inside router yet
  location = null;
}


  useEffect(() => {
    const addHoverListeners = () => {
      const elements = document.querySelectorAll("a, button, .cursor-pointer");

      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });

      // Return cleanup function to remove listeners to avoid duplicates
      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", () => setIsHovering(true));
          el.removeEventListener("mouseleave", () => setIsHovering(false));
        });
      };
    };

    const cleanup = addHoverListeners();

    return cleanup;
  }, [location]); // re-run effect on route change

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
          transition: "transform 0.2s ease-out",
        }}
        className="pointer-events-none fixed z-[9999] w-6 h-6 rounded-full border border-vorld-blue bg-transparent mix-blend-difference"
      />

      {/* Inner dot */}
      <div
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
        className="pointer-events-none fixed z-[9999] w-2 h-2 rounded-full bg-vorld-blue"
      />
    </>
  );
};

export default CustomCursor;
