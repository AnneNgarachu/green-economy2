import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  initialData: { goals: string[] };
  onNext: (data: { goals: string[] }) => void;
  onBack: () => void;
}

const availableGoals = [
  "Reduce Carbon Emissions",
  "Optimize Energy Efficiency",
  "Minimize Waste",
  "Enhance Water Conservation",
  "Improve Sustainability Reporting",
  "Empower Employees with Sustainability Training",
];

const GoalSetting: React.FC<Props> = ({ initialData, onNext, onBack }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    initialData?.goals || [],
  );

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals((prev) => prev.filter((g) => g !== goal));
    } else {
      setSelectedGoals((prev) => [...prev, goal]);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) {
      alert("Please select at least one goal before proceeding.");
      return;
    }
    onNext({ goals: selectedGoals });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-center">
        Step 3: Set Your Goals
      </h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Select the sustainability goals your organization wants to focus on.
      </p>

      <div className="mt-6 space-y-4 w-full max-w-lg">
        {availableGoals.map((goal) => (
          <label
            key={goal}
            className="flex items-center gap-2 cursor-pointer text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedGoals.includes(goal)}
              onChange={() => toggleGoal(goal)}
              className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            {goal}
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-between w-full max-w-lg">
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

export default GoalSetting;
