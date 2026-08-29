// components/MagneticButton.js
"use client";
import { useRef, useState } from "react";

export default function MagneticButton({ children, onClick, href, className = "", style = {}, cursorLabel = "" }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    setPos({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPos({ x: 0, y: 0 });
  };

  const dynamicStyle = {
    ...style,
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition: isHovered ? "transform 100ms ease-out" : "transform 450ms cubic-bezier(0.175, 0.885, 0.32, 1.2)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const props = {
    ref: btnRef,
    className,
    style: dynamicStyle,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    "data-cursor": cursorLabel,
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
}
