// components/LiquidGlassButton.js
// Liquid-glass style button with frosted refraction effect (pure CSS + SVG filter)

export default function LiquidGlassButton({ children, onClick, style, className = "" }) {
  return (
    <button
      className={`liquid-glass-btn ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* Frosted glass backdrop layer */}
      <span className="liquid-glass-backdrop" aria-hidden="true" />

      {/* Inner shadow ring for depth */}
      <span className="liquid-glass-ring" aria-hidden="true" />

      {/* Content sits above the glass */}
      <span className="liquid-glass-content">
        {children}
      </span>

      {/* SVG filter for the distortion — hidden, referenced by CSS */}
      <GlassFilter />
    </button>
  );
}

function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter
          id="liquid-glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="1"
            seed="2"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
