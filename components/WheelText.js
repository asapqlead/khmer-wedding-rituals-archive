// components/WheelText.js
"use client";
import { useState, useEffect, useRef } from "react";

export default function WheelText({ text, direction = 1, className = "", style = {}, as: Tag = "h1" }) {
  const [displayed, setDisplayed] = useState(text);
  const [outgoing, setOutgoing] = useState(null);
  const [dir, setDir] = useState(direction);
  const [isRolling, setIsRolling] = useState(false);
  const timerRef = useRef(null);
  const prevTextRef = useRef(text);

  useEffect(() => {
    if (text === prevTextRef.current) return;
    setDir(direction);
    setOutgoing(prevTextRef.current);
    setDisplayed(text);
    setIsRolling(false);
    prevTextRef.current = text;

    let rAF1, rAF2;
    rAF1 = requestAnimationFrame(() => {
      rAF2 = requestAnimationFrame(() => {
        setIsRolling(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setOutgoing(null);
          setIsRolling(false);
        }, 650);
      });
    });

    return () => { 
      cancelAnimationFrame(rAF1);
      cancelAnimationFrame(rAF2);
      if (timerRef.current) clearTimeout(timerRef.current); 
    };
  }, [text, direction]);

  const words = (str) => (str ? str.split(" ") : []);
  const dispWords = words(displayed);
  const outWords = words(outgoing);

  const getWordStyle = (i, isOut) => {
    const delay = `0ms`;
    const ease = "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 500ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 500ms cubic-bezier(0.2, 0.8, 0.2, 1)";
    if (isOut) {
      return {
        display: "inline-block",
        transform: isRolling
          ? (dir === 1 ? "translateY(-120%) rotateX(65deg) translateZ(-45px)" : "translateY(120%) rotateX(-65deg) translateZ(-45px)")
          : "translateY(0%) rotateX(0deg) translateZ(0px)",
        opacity: isRolling ? 0 : 1,
        filter: isRolling ? "blur(2px)" : "blur(0px)",
        transition: isRolling ? ease : "none",
        transitionDelay: delay,
        willChange: "transform, opacity, filter",
        marginRight: "0.28em",
      };
    }
    return {
      display: "inline-block",
      transform: outgoing
        ? (isRolling ? "translateY(0%) rotateX(0deg) translateZ(0px)" : (dir === 1 ? "translateY(120%) rotateX(-65deg) translateZ(-45px)" : "translateY(-120%) rotateX(65deg) translateZ(-45px)"))
        : "translateY(0%) rotateX(0deg) translateZ(0px)",
      opacity: outgoing ? (isRolling ? 1 : 0) : 1,
      filter: outgoing ? (isRolling ? "blur(0px)" : "blur(2px)") : "blur(0px)",
      transition: isRolling ? ease : "none",
      transitionDelay: delay,
      willChange: "transform, opacity, filter",
      marginRight: "0.28em",
    };
  };

  return (
    <div className="wheel-stage" style={{ 
      position: "relative", 
      display: "inline-grid", 
      placeItems: "center", 
      padding: "0.6em 0", 
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 0.6em, black calc(100% - 0.6em), transparent 100%)",
      maskImage: "linear-gradient(to bottom, transparent 0, black 0.6em, black calc(100% - 0.6em), transparent 100%)",
      ...style 
    }}>
      {outgoing && (
        <Tag className={`${className} wheel-item`} style={{ ...style, position: "relative", gridArea: "1 / 1", inset: "auto", margin: 0, pointerEvents: "none", flexWrap: "wrap", alignContent: "center" }}>
          {outWords.map((w, i) => (
            <span key={`${w}-${i}`} style={getWordStyle(i, true)}>{w}</span>
          ))}
        </Tag>
      )}
      <Tag className={`${className} wheel-item`} style={{ ...style, position: "relative", gridArea: "1 / 1", inset: "auto", margin: 0, flexWrap: "wrap", alignContent: "center" }}>
        {dispWords.map((w, i) => (
          <span key={`${w}-${i}`} style={getWordStyle(i, false)}>{w}</span>
        ))}
      </Tag>
    </div>
  );
}
