// src/components/data-input/FileUpload.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '@/utils/supabase';
import { FileUploadProps } from '@/types/metrics';

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      step: async (row) => {
        const data = row.data as any;
        try {
          const { error } = await supabase
            .from('metrics')
            .insert({
              facility: data.facility,
              metric: data.metric,
              unit: data.unit,
              value: parseFloat(data.value),
              notes: data.notes || "",
            });

          if (error) throw error;
          setProgress((prev) => prev + 1);
        } catch (err) {
          console.error("Error saving row:", err);
        }
      },
      complete: () => {
        setIsProcessing(false);
        setProgress(100);
        setTimeout(() => setProgress(0), 3000);
        if (onUploadComplete) onUploadComplete();
        alert("File processed successfully!");
      },
      error: (err) => {
        setIsProcessing(false);
        console.error("Error parsing file:", err);
      },
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="w-full p-2 border rounded"
      />
      
      {isProcessing && (
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Upload CSV"}
      </button>
    </div>
  );
};