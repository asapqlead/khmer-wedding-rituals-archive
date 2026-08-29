// components/StepAccordion.js
// Collapsible sequence of ritual steps allowing individual step expansion
import { useState } from "react";
import StepAccordionItem from "./StepAccordionItem.js";

export default function StepAccordion({ steps, langMode }) {
  const [openStep, setOpenStep] = useState(1);

  const toggleStep = (stepNumber) => {
    setOpenStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border-light)" }}>
        <h3 className="khmer-title" style={{ fontSize: 20, color: "var(--text-primary)", margin: 0 }}>
          {langMode === "km" ? "លំដាប់លម្អិតនៃពិធី និងអត្ថន័យ" : "Step-by-Step Sequence & Meaning"}
        </h3>
        <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 500, paddingBottom: 4 }}>
          {steps.length} {langMode === "km" ? "ជំហានបន្តបន្ទាប់" : "Sequential Steps"}
        </span>
      </div>

      <div>
        {steps.map((step) => (
          <StepAccordionItem
            key={step.stepNumber}
            step={step}
            isOpen={openStep === step.stepNumber}
            onToggle={() => toggleStep(step.stepNumber)}
            langMode={langMode}
          />
        ))}
      </div>
    </div>
  );
}
