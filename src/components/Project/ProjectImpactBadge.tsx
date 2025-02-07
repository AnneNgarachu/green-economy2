import React from "react";

interface ProjectImpactBadgeProps {
  impact: string;
}

export function ProjectImpactBadge({ impact }: ProjectImpactBadgeProps) {
  const impactColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${impactColors[impact.toLowerCase()] || "bg-gray-100 text-gray-700"}`}
    >
      Impact: {impact}
    </span>
  );
}
