import React from "react";
import { Tag } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectMetrics } from "./ProjectMetrics";
import { ProjectImpactBadge } from "./ProjectImpactBadge";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    type: string;
    amount: number;
    date: string;
    status: "active" | "pending" | "completed";
    impact: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-base font-medium text-gray-900">
            {project.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <Tag size={14} className="text-gray-500" />
            <span className="text-sm text-gray-600">{project.type}</span>
          </div>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>
      <ProjectMetrics amount={project.amount} date={project.date} />
      <ProjectImpactBadge impact={project.impact} />
    </div>
  );
}
