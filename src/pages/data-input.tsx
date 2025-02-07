import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Papa from "papaparse";
import { db } from "@/lib/firebase/firebase";

interface ErpMetadata {
  tables: {
    name: string;
    fields: string[];
  }[];
}

const DataInputPage = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [recentEntries, setRecentEntries] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [erpMetadata, setErpMetadata] = useState<ErpMetadata | null>(null);
  const [visibleEntries, setVisibleEntries] = useState(5); // Number of entries to display initially
  const [selectedERPSystem, setSelectedERPSystem] = useState("");

  const facilities = [
    "Headquarters",
    "Manufacturing Plant",
    "Warehouse A",
    "Data Center",
    "Research Lab A",
    "Retail Store",
    "Distribution Center",
    "Office A",
    "Testing Facility",
  ];

  const metrics = [
    {
      name: "Energy Consumption",
      units: ["Kilowatt Hours (kWh)", "Megawatt Hours (MWh)"],
    },
    { name: "Water Usage", units: ["Liters (L)", "Cubic Meters (m³)"] },
    { name: "Waste Generated", units: ["Kilograms (kg)", "Tons (tons)"] },
    {
      name: "Carbon Emissions",
      units: ["Kilograms CO2 (kgCO2)", "Tons CO2 (tonsCO2)"],
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "metrics"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries: any[] = snapshot.docs.map((doc) => doc.data());
      setRecentEntries(entries);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFacility || !selectedMetric || !selectedUnit || !value) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "metrics"), {
        facility: selectedFacility,
        metric: selectedMetric,
        unit: selectedUnit,
        value,
        notes,
        timestamp: new Date(),
      });

      setSuccessMessage("Metric saved successfully!");
      setSelectedFacility("");
      setSelectedMetric("");
      setSelectedUnit("");
      setValue("");
      setNotes("");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving metric:", error);
    }
  };

  const handleClear = () => {
    setSelectedFacility("");
    setSelectedMetric("");
    setSelectedUnit("");
    setValue("");
    setNotes("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      step: async (row) => {
        const data = row.data;
        if (!data.facility || !data.metric || !data.unit || !data.value) {
          console.error("Invalid row:", data);
          return;
        }
        try {
          await addDoc(collection(db, "metrics"), {
            facility: data.facility,
            metric: data.metric,
            unit: data.unit,
            value: data.value,
            notes: data.notes || "",
            timestamp: new Date(),
          });
          setProgress((prev) => prev + 1);
        } catch (err) {
          console.error("Error saving row:", err);
        }
      },
      complete: () => {
        setIsProcessing(false);
        setProgress(100);
        setTimeout(() => setProgress(0), 3000);
        alert("File processed successfully!");
      },
      error: (err) => {
        setIsProcessing(false);
        console.error("Error parsing file:", err);
      },
    });
  };

  const handleLoadMockMetadata = async () => {
    try {
      const response = await fetch("/api/erp-mock");
      const data: ErpMetadata = await response.json();
      setErpMetadata(data);
    } catch (error) {
      console.error("Error loading ERP mock data:", error);
    }
  };

  const handleFetchERPData = async () => {
    if (!selectedERPSystem) {
      alert("Please select an ERP system to fetch data.");
      return;
    }
    alert(
      `Fetching data from ${selectedERPSystem} is a placeholder functionality.`,
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Record New Metrics</h2>
      <p className="mb-6 text-gray-600">
        Enter the latest sustainability measurements for your facility.
      </p>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("manual")}
        >
          Manual Input
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "file"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("file")}
        >
          File Upload
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "erp"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("erp")}
        >
          ERP Integration
        </button>
      </div>

      {/* Manual Input */}
      {activeTab === "manual" && (
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-semibold">Facility</label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select facility</option>
                {facilities.map((facility, index) => (
                  <option key={index} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold">Metric Type</label>
              <select
                value={selectedMetric}
                onChange={(e) => {
                  setSelectedMetric(e.target.value);
                  setSelectedUnit("");
                }}
                className="w-full border rounded p-2"
              >
                <option value="">Select metric</option>
                {metrics.map((metric, index) => (
                  <option key={index} value={metric.name}>
                    {metric.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold">Unit</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select unit</option>
                {metrics
                  .find((metric) => metric.name === selectedMetric)
                  ?.units.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter value"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-semibold">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Add any additional notes"
            ></textarea>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Metrics
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 text-green-600 font-semibold">
              {successMessage}
            </div>
          )}
        </form>
      )}

      {/* File Upload */}
      {activeTab === "file" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">File Upload</h3>
          <input
            type="file"
            className="w-full border rounded p-2 mb-4"
            onChange={handleFileUpload}
          />
          {isProcessing && (
            <div className="w-full bg-gray-200 h-2 rounded mb-4">
              <div
                className="bg-green-600 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Upload and Process File"}
          </button>
        </div>
      )}

      {/* ERP Integration */}
      {activeTab === "erp" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">ERP Integration</h3>
          <select
            className="w-full border rounded p-2 mb-4"
            value={selectedERPSystem}
            onChange={(e) => setSelectedERPSystem(e.target.value)}
          >
            <option value="">Select ERP System</option>
            <option value="SAP">SAP</option>
            <option value="Oracle">Oracle</option>
            <option value="Microsoft Dynamics">Microsoft Dynamics</option>
          </select>
          <div className="flex space-x-4">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={handleFetchERPData}
            >
              Fetch Data from ERP
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleLoadMockMetadata}
            >
              Load Mock ERP Metadata
            </button>
          </div>
          {erpMetadata && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Mock ERP Metadata:</h4>
              {erpMetadata.tables.map((table, index) => (
                <div key={index} className="mb-4">
                  <h5 className="font-bold">{table.name}</h5>
                  <ul className="list-disc pl-5">
                    {table.fields.map((field, idx) => (
                      <li key={idx}>{field}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Enter the most recent measurements for accurate tracking.</li>
          <li>Double-check units before submitting.</li>
          <li>Add notes for any unusual measurements.</li>
        </ul>
      </div>

      {/* Recent Entries */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
        <ul className="space-y-3">
          {recentEntries.slice(0, visibleEntries).map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded"
            >
              <div>
                <p className="font-semibold">{entry.facility}</p>
                <p className="text-sm text-gray-600">{entry.metric}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {entry.value} {entry.unit}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(entry.timestamp?.toDate()).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {visibleEntries < recentEntries.length && (
          <button
            onClick={() => setVisibleEntries((prev) => prev + 5)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default DataInputPage;
