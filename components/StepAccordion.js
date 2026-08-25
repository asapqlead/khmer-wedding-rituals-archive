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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 className="khmer-title" style={{ fontSize: 18, color: "var(--oxblood-800)" }}>
          {langMode === "km" ? "លំដាប់លម្អិតនៃពិធី និងអត្ថន័យ" : "Step-by-Step Sequence & Meaning"}
        </h3>
        <span style={{ fontSize: 12, color: "var(--ink-500)" }}>
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
