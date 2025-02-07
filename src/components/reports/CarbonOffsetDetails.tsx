import React from "react";
import { Filter } from "lucide-react";

const CarbonOffsetDetails = () => {
  const projects = [
    {
      name: "Forest Conservation Project",
      type: "Reforestation",
      amount: "50.5 tCO2e",
      date: "15/02/2024",
      status: "Active",
      impact: "Equivalent to planting 2,000 trees",
    },
    {
      name: "Solar Farm Initiative",
      type: "Renewable Energy",
      amount: "75.3 tCO2e",
      date: "10/02/2024",
      status: "Active",
      impact: "Reduces 150 tons of CO2 annually",
    },
    {
      name: "Wind Energy Project",
      type: "Renewable Energy",
      amount: "120 tCO2e",
      date: "01/02/2024",
      status: "Completed",
      impact: "Powers 1,000 households",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Carbon Offset Projects</h2>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select className="border rounded-md px-4 py-2">
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <a
            href="/projects"
            className="text-green-600 font-medium hover:underline"
          >
            View All Projects →
          </a>
        </div>
      </div>
      <div className="mt-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-b border-gray-200 py-4 last:border-none"
          >
            <div className="flex justify-between">
              <h4 className="text-lg font-semibold">{project.name}</h4>
              <span
                className={`text-sm font-bold ${
                  project.status === "Active"
                    ? "text-green-600"
                    : "text-blue-500"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{project.type}</p>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-sm text-gray-500">Offset Amount</p>
                <p className="text-md font-bold">{project.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purchase Date</p>
                <p className="text-md font-bold">{project.date}</p>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">{project.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarbonOffsetDetails;
