// components/CeremonyContributorBadge.js
"use client";
import collection from "../collection.config.js";

export default function CeremonyContributorBadge({ ceremony, langMode, isMobile }) {
  const isKhmer = langMode === "km";
  const contributorName = isKhmer ? (collection.curatorKhmer || collection.curator) : collection.curator;

  return (
    <p
      className={isKhmer ? "khmer-sans" : ""}
      style={{
        fontSize: isMobile ? 12.5 : 13,
        color: "#B4B4B4",
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      <strong
        style={{
          color: "#A8A8A8",
          fontStyle: "normal",
          fontWeight: 500,
        }}
      >
        {isKhmer ? "អ្នកចូលរួមចំណែក៖ " : "Contributor: "}
      </strong>
      <em
        style={{
          fontStyle: "italic",
          color: "#A8A8A8",
        }}
      >
        {contributorName}
      </em>
    </p>
  );
}
