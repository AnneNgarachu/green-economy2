"use client";

import React, { useEffect, useState } from "react";
import { Zap, Droplet, Trash2, Leaf } from "lucide-react";
import { fetchMetrics, Metric } from "@/lib/services/metricsService";

const DashboardContent: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const fetchedMetrics = await fetchMetrics();
        setMetrics(fetchedMetrics);
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading metrics...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sustainability Dashboard</h1>
        <select className="border border-gray-300 rounded-md px-4 py-2">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div
        className="grid grid-cols-2 gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Energy Usage</h2>
              </div>
              <span className="text-green-500 text-sm font-medium">
                {metric.energyUsage} kWh
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Timestamp: {metric.timestamp.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
