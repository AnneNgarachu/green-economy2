import React from "react";

interface ProjectImpactBadgeProps {
  impact: string;
}

type ImpactColorType = {
  [key: string]: string;  // This tells TypeScript the object can be indexed with strings
  high: string;
  medium: string;
  low: string;
}

export function ProjectImpactBadge({ impact }: ProjectImpactBadgeProps) {
  const impactColors: ImpactColorType = {
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
