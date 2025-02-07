import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  initialData: { facilityCount: number; facilityNames: string[] };
  onNext: (data: { facilityCount: number; facilityNames: string[] }) => void;
  onBack: () => void;
}

const FacilityDetails: React.FC<Props> = ({ initialData, onNext, onBack }) => {
  const [facilityCount, setFacilityCount] = useState(
    initialData?.facilityCount || 1,
  );
  const [facilityNames, setFacilityNames] = useState<string[]>(
    initialData?.facilityNames || [],
  );

  const handleFacilityNameChange = (index: number, name: string) => {
    const updatedNames = [...facilityNames];
    updatedNames[index] = name;
    setFacilityNames(updatedNames);
  };

  const handleIncrement = () => {
    setFacilityCount((prev) => prev + 1);
    setFacilityNames((prev) => [...prev, ""]);
  };

  const handleDecrement = () => {
    if (facilityCount > 1) {
      setFacilityCount((prev) => prev - 1);
      setFacilityNames((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleNext = () => {
    const validNames = facilityNames.filter((name) => name.trim() !== "");
    if (validNames.length < facilityCount) {
      alert("Please ensure all facilities have unique names.");
      return;
    }
    onNext({
      facilityCount,
      facilityNames: validNames,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-center">
        Step 2: Facility Details
      </h2>
      <div className="relative text-sm text-gray-600 text-center mt-2">
        How many facilities does your organization have?{" "}
        <span className="ml-1 text-gray-500 cursor-pointer relative group">
          ℹ️
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-gray-800 text-white rounded-md px-2 py-1 shadow-lg">
            Facilities refer to your organization's operational locations, such
            as offices, branches, or plants. Example: Headquarters, East
            Factory.
          </span>
        </span>
      </div>

      <div className="mt-6 w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">
          Facility Count
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleDecrement}
              aria-label="Decrease facility count"
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={facilityCount}
              onChange={(e) => {
                const count = Math.max(1, parseInt(e.target.value) || 1);
                setFacilityCount(count);
                setFacilityNames((prev) => {
                  if (count > prev.length)
                    return [...prev, ...Array(count - prev.length).fill("")];
                  return prev.slice(0, count);
                });
              }}
              className="w-16 h-12 text-center border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            <button
              onClick={handleIncrement}
              aria-label="Increase facility count"
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </label>
      </div>

      <div className="mt-4 w-full max-w-lg">
        {facilityCount > 0 &&
          Array.from({ length: facilityCount }).map((_, index) => (
            <label
              key={index}
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Facility {index + 1} Name
              <input
                type="text"
                className="mt-1 block w-full h-12 rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                value={facilityNames[index] || ""}
                onChange={(e) =>
                  handleFacilityNameChange(index, e.target.value)
                }
                placeholder="e.g., Headquarters, East Factory"
              />
            </label>
          ))}
      </div>

      <div className="mt-6 flex justify-between w-full max-w-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNext({ facilityCount, facilityNames: [] })}
        >
          Skip for Now
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button variant="default" size="lg" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
