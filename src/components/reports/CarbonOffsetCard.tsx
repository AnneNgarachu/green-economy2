import React from "react";
import { Leaf, Balance } from "lucide-react";

const CarbonOffsetCard = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Carbon Offset Tracking</h2>
        <Leaf size={24} className="text-green-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <p className="text-3xl font-bold">245.8</p>
          <p className="text-sm text-gray-500">Total Offsets</p>
          <p className="text-sm text-green-500">+12.5%</p>
        </div>
        <div>
          <p className="text-3xl font-bold">$25.30</p>
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-sm text-green-500">+2.3%</p>
        </div>
        <div>
          <p className="text-3xl font-bold">-180.2</p>
          <p className="text-sm text-gray-500">Net Impact</p>
          <p className="text-sm text-blue-500">-8.7%</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Progress to Goal</p>
        <div className="bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: "65%" }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600 mt-1">65%</p>
      </div>
    </div>
  );
};

export default CarbonOffsetCard;
