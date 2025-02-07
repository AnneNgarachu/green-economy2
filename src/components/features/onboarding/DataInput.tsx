import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onNext: (data: { energyUsage: number; waterUsage: number }) => void;
  onBack: () => void;
}

const DataInput: React.FC<Props> = ({ onNext, onBack }) => {
  const [energyUsage, setEnergyUsage] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);

  const handleNext = () => {
    if (energyUsage <= 0 || waterUsage <= 0) return alert("Please enter valid data");
    onNext({ energyUsage, waterUsage });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">Step 2: Sustainability Metrics</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Enter your organization's key metrics.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Energy Usage (kWh)
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={energyUsage}
            onChange={(e) => setEnergyUsage(Number(e.target.value))}
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Water Usage (Liters)
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={waterUsage}
            onChange={(e) => setWaterUsage(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button variant="default" size="lg" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataInput;
