"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Zap, Droplet, Trash2, Leaf } from "lucide-react";

interface Metric {
  title: string;
  current: string;
  previous: string;
  change: string;
  isPositive: boolean;
  peak: string;
  average: string;
  target: string;
  timeRange: string;
}

const DashboardContent: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [filteredMetrics, setFilteredMetrics] = useState<Metric[]>([]);

  // Sample Metrics Data
  const mockMetrics: Metric[] = [
    {
      title: "Energy Consumption",
      current: "450 kWh",
      previous: "475 kWh",
      change: "+5.2%",
      isPositive: true,
      peak: "525 kWh",
      average: "445 kWh",
      target: "400 kWh",
      timeRange: "24h",
    },
    {
      title: "Energy Consumption",
      current: "3200 kWh",
      previous: "3400 kWh",
      change: "-5.9%",
      isPositive: false,
      peak: "3600 kWh",
      average: "3300 kWh",
      target: "3000 kWh",
      timeRange: "7d",
    },
    {
      title: "Energy Consumption",
      current: "12500 kWh",
      previous: "13000 kWh",
      change: "-3.8%",
      isPositive: false,
      peak: "14000 kWh",
      average: "12750 kWh",
      target: "12000 kWh",
      timeRange: "30d",
    },
    // Add similar data for Water, Waste, and Carbon...
  ];

  const sustainabilityActions = [
    {
      title: "Installed solar panels",
      description: "Reduced energy dependency by 15%",
      timestamp: "2024-01-12",
    },
    {
      title: "Implemented water recycling system",
      description: "Decreased water usage by 10%",
      timestamp: "2024-01-05",
    },
    {
      title: "Switched to biodegradable packaging",
      description: "Reduced plastic waste by 20%",
      timestamp: "2024-01-02",
    },
  ];

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: [450, 420, 400, 390, 380, 370],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Water Usage (L)",
        data: [2000, 1950, 1900, 1850, 1800, 1750],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  useEffect(() => {
    const filtered = mockMetrics.filter(
      (metric) => metric.timeRange === selectedTimeRange,
    );
    setFilteredMetrics(filtered);
  }, [selectedTimeRange]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sustainability Dashboard</h1>
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{metric.title}</h2>
              <span
                className={`text-sm font-medium ${
                  metric.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <p className="text-3xl font-bold">{metric.current}</p>
            <p className="text-sm text-gray-500">Previous: {metric.previous}</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Peak</p>
                <p className="font-medium">{metric.peak}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average</p>
                <p className="font-medium">{metric.average}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target</p>
                <p className="font-medium">{metric.target}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div style={{ height: "400px", width: "100%" }}>
          <Line data={chartData} />
        </div>
      </div>

      {/* Sustainability Actions Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Recent Sustainability Actions
        </h2>
        <ul className="space-y-4">
          {sustainabilityActions.map((action, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold">{action.title}</h3>
              <p className="text-gray-600">{action.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(action.timestamp).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardContent;
