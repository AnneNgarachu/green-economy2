// src/pages/data-input.tsx
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { supabase } from "@/utils/supabase"; // Changed import

interface ErpMetadata {
  tables: {
    name: string;
    fields: string[];
  }[];
}

const DataInputPage = () => {
  // ... [keep all existing state declarations] ...

  useEffect(() => {
    const fetchRecentEntries = async () => {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setRecentEntries(data || []);
    };

    // Real-time updates
    const subscription = supabase
      .channel('metrics')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'metrics' }, 
        () => fetchRecentEntries()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFacility || !selectedMetric || !selectedUnit || !value) {
      alert("Please fill in all fields.");
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
          notes,
        });

      if (error) throw error;

      setSuccessMessage("Metric saved successfully!");
      // Reset form fields
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
        alert("File processed successfully!");
      },
      error: (err) => {
        setIsProcessing(false);
        console.error("Error parsing file:", err);
      },
    });
  };

  // ... [keep all remaining code the same until recent entries display] ...

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
              {new Date(entry.created_at).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
    {/* ... [keep load more button] ... */}
  </div>
</div>
);
};

export default DataInputPage;