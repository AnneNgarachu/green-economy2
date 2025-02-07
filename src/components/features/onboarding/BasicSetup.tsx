import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  initialData: { industry: string; size: string };
  onNext: (data: { industry: string; size: string }) => void;
}

const BasicSetup: React.FC<Props> = ({ initialData, onNext }) => {
  const [industry, setIndustry] = React.useState(initialData.industry || "");
  const [size, setSize] = React.useState(initialData.size || "");

  const industries = [
    "Agriculture",
    "Aviation",
    "Education",
    "Energy",
    "Finance",
    "Healthcare",
    "Hospitality",
    "Manufacturing",
    "Retail",
    "Technology",
  ];

  const sizeRanges = [
     "1-50 Employees",        // Small businesses
      "51-200 Employees",      // Small to medium-sized businesses (SMBs)
      "201-500 Employees",     // Medium-sized companies
      "501-1000 Employees",    // Large companies
      "1001-5000 Employees",   // Large enterprises
      "5001-20,000 Employees", // Very large enterprises
      "20,001+ Employees",     // Global corporations

  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-center">Step 1: Basic Setup</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Provide basic details about your organization.
      </p>

      <div className="mt-6 space-y-4 w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-700">
          Industry
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black p-2"
          >
            <option value="" disabled>
              Select Industry
            </option>
            {industries.sort().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Organization Size
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black p-2 mt-2"
          >
            <option value="" disabled>
              Select Size Range
            </option>
            {sizeRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        <Button
          variant="default"
          size="lg"
          onClick={() => onNext({ industry, size })}
          disabled={!industry || !size}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BasicSetup;
