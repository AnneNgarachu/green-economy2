// src/components/data-input/RecentEntries.tsx
import React from 'react';
import { MetricEntry } from '@/types/metrics';

interface RecentEntriesProps {
  entries: MetricEntry[];
  visibleEntries: number;
  onLoadMore: () => void;
}

export const RecentEntries = ({ 
  entries, 
  visibleEntries, 
  onLoadMore 
}: RecentEntriesProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
      <div className="space-y-3">
        {entries.slice(0, visibleEntries).map((entry) => (
          <div key={entry.id} className="p-4 bg-gray-50 rounded flex justify-between">
            <div>
              <p className="font-medium">{entry.facility}</p>
              <p className="text-sm text-gray-600">{entry.metric}</p>
            </div>
            <div>
              <p className="font-medium">{entry.value} {entry.unit}</p>
              <p className="text-sm text-gray-600">
                {new Date(entry.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visibleEntries < entries.length && (
        <button
          onClick={onLoadMore}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      )}
    </div>
  );
};