// src/pages/data-input.tsx
'use client'

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { ManualInputForm } from "@/components/data-input/ManualInputForm";
import { FileUpload } from "@/components/data-input/FileUpload";
import { RecentEntries } from "@/components/data-input/RecentEntries";
import { MetricEntry, Metric } from "@/types/metrics";

export default function DataInputPage() {
  const [activeTab, setActiveTab] = useState("manual");
  const [recentEntries, setRecentEntries] = useState<MetricEntry[]>([]);
  const [visibleEntries, setVisibleEntries] = useState(5);
  const [selectedERPSystem, setSelectedERPSystem] = useState("");
  const [erpMetadata, setErpMetadata] = useState<any>(null);

  const facilities = [
    "Headquarters", "Manufacturing Plant", "Warehouse A", 
    "Data Center", "Research Lab A", "Retail Store", 
    "Distribution Center", "Office A", "Testing Facility"
  ];

  const metrics: Metric[] = [
    { name: "Energy Consumption", units: ["kWh", "MWh"] },
    { name: "Water Usage", units: ["L", "m³"] },
    { name: "Waste Generated", units: ["kg", "tons"] },
    { name: "Carbon Emissions", units: ["kgCO2", "tonsCO2"] }
  ];

  useEffect(() => {
    const fetchRecentEntries = async () => {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setRecentEntries(data);
    };

    const channel = supabase
      .channel('realtime-metrics')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'metrics'
      }, fetchRecentEntries)
      .subscribe();

    fetchRecentEntries();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleLoadMockMetadata = async () => {
    try {
      const response = await fetch("/api/erp-mock");
      const data = await response.json();
      setErpMetadata(data);
    } catch (error) {
      console.error("Error loading ERP mock data:", error);
    }
  };

  const handleFetchERPData = async () => {
    if (!selectedERPSystem) {
      alert("Please select an ERP system");
      return;
    }
    alert(`Fetching data from ${selectedERPSystem} (mock implementation)`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Record New Metrics</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("manual")} 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
            activeTab === "manual" 
              ? "bg-blue-600 text-white" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          Manual Input
        </button>
        <button 
          onClick={() => setActiveTab("file")} 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
            activeTab === "file" 
              ? "bg-blue-600 text-white" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          File Upload
        </button>
        <button 
          onClick={() => setActiveTab("erp")} 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
            activeTab === "erp" 
              ? "bg-blue-600 text-white" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          ERP Integration
        </button>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === "manual" && (
          <ManualInputForm facilities={facilities} metrics={metrics} />
        )}

        {activeTab === "file" && (
          <FileUpload onUploadComplete={() => {
            const fetchRecentEntries = async () => {
              const { data, error } = await supabase
                .from('metrics')
                .select('*')
                .order('created_at', { ascending: false });

              if (!error && data) setRecentEntries(data);
            };
            fetchRecentEntries();
          }} />
        )}

        {activeTab === "erp" && (
          <div className="space-y-4">
            <select
              value={selectedERPSystem}
              onChange={(e) => setSelectedERPSystem(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select ERP System</option>
              <option value="SAP">SAP</option>
              <option value="Oracle">Oracle</option>
              <option value="Microsoft Dynamics">Microsoft Dynamics</option>
            </select>

            <div className="flex space-x-4">
              <button
                onClick={handleFetchERPData}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Fetch Data
              </button>
              <button
                onClick={handleLoadMockMetadata}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Load Mock Data
              </button>
            </div>
          </div>
        )}

        {/* Recent Entries Section */}
        <RecentEntries 
          entries={recentEntries}
          visibleEntries={visibleEntries}
          onLoadMore={() => setVisibleEntries(prev => prev + 5)}
        />
      </div>
    </div>
  );
}