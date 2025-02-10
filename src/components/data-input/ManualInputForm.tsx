// src/components/data-input/ManualInputForm.tsx
'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { ManualInputFormProps } from '@/types/metrics';

export const ManualInputForm: React.FC<ManualInputFormProps> = ({ facilities, metrics }) => {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedFacility || !selectedMetric || !selectedUnit || !value) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('metrics')
        .insert({
          facility: selectedFacility,
          metric: selectedMetric,
          unit: selectedUnit,
          value: parseFloat(value),
          notes
        });

      if (error) throw error;

      setSuccessMessage("Metric saved successfully!");
      handleClear();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving metric:", error);
      alert("Failed to save metric. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFacility("");
    setSelectedMetric("");
    setSelectedUnit("");
    setValue("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Facility
            <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Metric
            <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Metric</option>
            {metrics.map((metric) => (
              <option key={metric.name} value={metric.name}>{metric.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Unit
            <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Unit</option>
            {metrics.find(m => m.name === selectedMetric)?.units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Value
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Add any additional notes here..."
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Metric"}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 mt-4 text-sm text-green-700 bg-green-100 rounded-md">
          {successMessage}
        </div>
      )}
    </form>
  );
};