import React from "react";

interface Props {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <div className="flex justify-between text-sm font-medium">
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
