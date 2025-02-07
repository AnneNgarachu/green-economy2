"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { chartOptions } from "@/lib/chartConfig"; // Ensure correct import

const DashboardContent: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");

  // Sample Data
  const metricData = {
    "24h": {
      energy: {
        current: "450 kWh",
        previous: "475 kWh",
        change: "+5.2%",
        peak: "525 kWh",
        average: "445 kWh",
        target: "400 kWh",
      },
      water: {
        current: "2000 L",
        previous: "1945 L",
        change: "-2.8%",
        peak: "2200 L",
        average: "1950 L",
        target: "1800 L",
      },
      waste: {
        current: "120 kg",
        previous: "131 kg",
        change: "+8.4%",
        peak: "145 kg",
        average: "125 kg",
        target: "100 kg",
      },
      carbon: {
        current: "25 tons",
        previous: "25.8 tons",
        change: "-3.1%",
        peak: "28 tons",
        average: "24.5 tons",
        target: "20 tons",
      },
    },
    "7d": {
      energy: {
        current: "3,200 kWh",
        previous: "3,500 kWh",
        change: "-8.6%",
        peak: "4,000 kWh",
        average: "3,300 kWh",
        target: "3,000 kWh",
      },
      water: {
        current: "15,000 L",
        previous: "14,800 L",
        change: "+1.4%",
        peak: "16,000 L",
        average: "15,200 L",
        target: "14,000 L",
      },
      waste: {
        current: "850 kg",
        previous: "900 kg",
        change: "-5.5%",
        peak: "950 kg",
        average: "875 kg",
        target: "800 kg",
      },
      carbon: {
        current: "180 tons",
        previous: "185 tons",
        change: "-2.7%",
        peak: "200 tons",
        average: "190 tons",
        target: "170 tons",
      },
    },
    "30d": {
      energy: {
        current: "13,000 kWh",
        previous: "13,500 kWh",
        change: "-3.7%",
        peak: "15,000 kWh",
        average: "13,200 kWh",
        target: "12,500 kWh",
      },
      water: {
        current: "60,000 L",
        previous: "63,000 L",
        change: "-4.8%",
        peak: "65,000 L",
        average: "61,000 L",
        target: "58,000 L",
      },
      waste: {
        current: "3,500 kg",
        previous: "3,700 kg",
        change: "-5.4%",
        peak: "4,000 kg",
        average: "3,600 kg",
        target: "3,300 kg",
      },
      carbon: {
        current: "750 tons",
        previous: "780 tons",
        change: "-3.8%",
        peak: "800 tons",
        average: "760 tons",
        target: "700 tons",
      },
    },
  };

  const currentMetrics = metricData[selectedTimeRange];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: [450, 400, 420, 410, 430, 400],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Water Usage (L)",
        data: [2000, 1800, 1900, 1950, 1820, 1800],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

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
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(currentMetrics).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold capitalize">{key}</h2>
              <span
                className={`text-sm font-medium ${
                  parseFloat(value.change) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {value.change}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold">{value.current}</p>
              <p className="text-sm text-gray-500">
                Previous: {value.previous}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Peak</p>
                <p className="text-sm font-medium">{value.peak}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average</p>
                <p className="text-sm font-medium">{value.average}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target</p>
                <p className="text-sm font-medium">{value.target}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div style={{ height: "400px", width: "100%" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
