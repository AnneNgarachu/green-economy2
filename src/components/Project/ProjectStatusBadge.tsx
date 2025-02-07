import React from "react";

interface ProjectStatusBadgeProps {
  status: "active" | "pending" | "completed";
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded ${statusColors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
