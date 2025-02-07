import React from "react";

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  arrow?: React.ReactNode; // Add arrow prop
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  icon,
  arrow,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-green-100">{icon}</div>
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {arrow && <div>{arrow}</div>} {/* Render the arrow */}
    </div>
  );
};
