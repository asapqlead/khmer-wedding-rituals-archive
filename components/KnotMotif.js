// components/KnotMotif.js
// Sacred red-and-gold thread knot motif (representing Ksae Chang Dai)

export default function KnotMotif({ width = 160, variant = "horizontal" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        margin: "16px auto",
        color: "var(--gold-500)",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          flex: 1,
          maxWidth: width / 2,
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--gold-500))",
        }}
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="16" cy="16" r="14" stroke="var(--gold-500)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
        <path
          d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16Z"
          stroke="var(--sacred-red)"
          strokeWidth="1.75"
        />
        <path
          d="M8 8C11 11 21 21 24 24M24 8C21 11 11 21 8 24"
          stroke="var(--gold-600)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2.5" fill="var(--sacred-red)" />
      </svg>
      <div
        style={{
          flex: 1,
          maxWidth: width / 2,
          height: 1,
          background: "linear-gradient(90deg, var(--gold-500), transparent)",
        }}
      />
    </div>
  );
}
