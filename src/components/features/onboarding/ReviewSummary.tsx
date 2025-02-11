import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  formData: {
    industry: string;
    size: string;  // Changed from number to string to match BasicSetup
    facilityCount: number;
    facilityNames?: string[];
    goals?: string[];
  };
  onBack: () => void;
  onEdit: (field: string, value: any) => void;
  onFinish: () => void;
}

const ReviewSummary: React.FC<Props> = ({
  formData,
  onBack,
  onEdit,
  onFinish,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

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
    "1-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1000 Employees",
    "1001-5000 Employees",
    "5001-20,000 Employees",
    "20,001+ Employees",
  ];

  const handleEditStart = (field: string, currentValue: any) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleEditSave = () => {
    if (editingField) {
      onEdit(editingField, editValue);
      setEditingField(null);
      setEditValue("");
    }
  };

  const renderEditableField = (
    field: string,
    label: string,
    currentValue: any,
    type: "text" | "number" = "text",
    isDropdown: boolean = false,
    options: string[] = []
  ) => (
    <div className="flex items-center justify-between w-full">
      <span className="font-medium">{label}:</span>
      {editingField === field ? (
        <div className="flex gap-2">
          {isDropdown ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          )}
          <Button variant="default" size="sm" onClick={handleEditSave}>
            Save
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>{currentValue || "Not provided"}</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEditStart(field, currentValue)}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-center">Step 4: Review</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Please review your details before proceeding.
      </p>

      <div className="mt-6 space-y-4 w-full max-w-lg">
        {renderEditableField(
          "industry",
          "Industry",
          formData.industry,
          "text",
          true,
          industries
        )}
        {renderEditableField(
          "size",
          "Organization Size",
          formData.size,
          "text",
          true,
          sizeRanges
        )}

        <div className="flex flex-col gap-2">
          <span className="font-medium">Facilities:</span>
          {formData.facilityNames?.length ? (
            formData.facilityNames.map((name, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>
                  Facility {index + 1}: {name || "Not named"}
                </span>
                {editingField === `facility-${index}` ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                    <Button variant="default" size="sm" onClick={handleEditSave}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditStart(`facility-${index}`, name || "")}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))
          ) : (
            <span className="text-gray-500">No facilities provided</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Goals:</span>
          {formData.goals?.length ? (
            formData.goals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>
                  Goal {index + 1}: {goal}
                </span>
                {editingField === `goal-${index}` ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                    <Button variant="default" size="sm" onClick={handleEditSave}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditStart(`goal-${index}`, goal || "")}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))
          ) : (
            <span className="text-gray-500">No goals provided</span>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between w-full max-w-lg">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button variant="default" size="lg" onClick={onFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ReviewSummary;