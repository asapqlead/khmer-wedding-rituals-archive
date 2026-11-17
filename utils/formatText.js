// utils/formatText.js
// Lightweight text formatting without external dependencies.
// Complies with AGENTS.md rules: pure React/JS only.

export function formatItalics(text) {
  if (!text || typeof text !== "string" || !text.includes("*")) {
    return text;
  }

  // Splits on asterisk pairs, e.g. "tether (*Ksae Chamroeun*) of health"
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((chunk, index) => {
    if (chunk.startsWith("*") && chunk.endsWith("*") && chunk.length > 2) {
      return (
        <em key={index} style={{ fontStyle: "italic" }}>
          {chunk.slice(1, -1)}
        </em>
      );
    }
    return chunk;
  });
}
