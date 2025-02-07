import React from "react";
import {
  TrendingUp,
  Calendar,
  Info,
  Leaf,
  Zap,
  Recycle,
  Droplet,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const Reports = () => {
  const projects = [
    {
      name: "Forest Conservation Project",
      type: "Reforestation",
      amount: "50.5 tCO₂e",
      date: "15/02/2024",
      impact: "Equivalent to planting 2,000 trees",
    },
    {
      name: "Solar Farm Initiative",
      type: "Renewable Energy",
      amount: "75.3 tCO₂e",
      date: "10/02/2024",
      impact: "Reduces 150 tons of CO2 annually",
    },
    {
      name: "Wind Energy Project",
      type: "Renewable Energy",
      amount: "120 tCO₂e",
      date: "01/02/2024",
      impact: "Powers 1,000 households",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sustainability Reports
        </h1>
        <p className="text-gray-600 mt-2">
          Analyze your sustainability data and generate detailed reports.
        </p>
      </div>

      {/* Carbon Offset Tracking */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 relative">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">Carbon Offset Tracking</h3>
          <Leaf size={24} className="text-green-600" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-3xl font-bold">245.8</p>
            <p className="text-sm text-gray-500">Total Offsets</p>
            <p className="text-sm text-green-600 flex items-center justify-center gap-1">
              <TrendingUp size={16} /> +12.5%
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">$25.30</p>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-sm text-green-600 flex items-center justify-center gap-1">
              <TrendingUp size={16} /> +2.3%
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">-180.2</p>
            <p className="text-sm text-gray-500">Net Impact</p>
            <p className="text-sm text-blue-600 flex items-center justify-center gap-1">
              <Info size={16} /> -8.7%
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full relative">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Progress to Goal</span>
            <span>65%</span>
          </div>
        </div>
      </div>

      {/* Carbon Offset Projects */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold">Carbon Offset Projects</h3>
        <p className="text-sm text-gray-600 mt-2">
          Track and manage your carbon offset initiatives
        </p>
        <div className="mt-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-4 last:border-none"
            >
              <h4 className="text-lg font-semibold">{project.name}</h4>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Leaf size={16} /> {project.type}
              </p>
              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Offset Amount</p>
                    <p className="text-md font-bold">{project.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Purchase Date</p>
                    <p className="text-md font-bold">{project.date}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                <Info size={16} /> {project.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/carbon-emissions" passHref>
          <div className="bg-white shadow rounded-lg p-6 h-48 cursor-pointer hover:bg-gray-50 transition flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Leaf size={24} className="text-green-600" />
              <ChevronRight className="text-gray-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Carbon Emissions</h4>
              <p className="text-sm text-gray-600 mt-2">
                Analyze emissions data and identify areas for improvement.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/energy-consumption" passHref>
          <div className="bg-white shadow rounded-lg p-6 h-48 cursor-pointer hover:bg-gray-50 transition flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Zap size={24} className="text-green-600" />
              <ChevronRight className="text-gray-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Energy Consumption</h4>
              <p className="text-sm text-gray-600 mt-2">
                View detailed insights into energy usage across all facilities.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/waste-management" passHref>
          <div className="bg-white shadow rounded-lg p-6 h-48 cursor-pointer hover:bg-gray-50 transition flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Recycle size={24} className="text-green-600" />
              <ChevronRight className="text-gray-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Waste Management</h4>
              <p className="text-sm text-gray-600 mt-2">
                Track waste generation and recycling efforts.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/water-usage" passHref>
          <div className="bg-white shadow rounded-lg p-6 h-48 cursor-pointer hover:bg-gray-50 transition flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <Droplet size={24} className="text-blue-500" />
              <ChevronRight className="text-gray-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Water Usage</h4>
              <p className="text-sm text-gray-600 mt-2">
                Monitor water consumption across facilities to promote
                sustainability.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Reports;
