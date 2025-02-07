import React from "react";

interface ProjectMetricsProps {
  amount: number;
  date: string;
}

export function ProjectMetrics({ amount, date }: ProjectMetricsProps) {
  // Ensure consistent date formatting
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
      <p>
        Amount:{" "}
        <span className="font-medium text-gray-800">
          ${amount.toLocaleString()}
        </span>
      </p>
      <p>
        Date: <span className="font-medium text-gray-800">{formattedDate}</span>
      </p>
    </div>
  );
}
