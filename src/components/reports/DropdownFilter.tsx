import React from 'react';

export const DropdownFilter = () => {
  return (
    <div className="flex items-center gap-4">
      <select className="border rounded-md px-4 py-2">
        <option value="all">All Projects</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <a href="/projects" className="text-green-600 font-medium hover:underline">
        View All Projects →
      </a>
    </div>
  );
};
