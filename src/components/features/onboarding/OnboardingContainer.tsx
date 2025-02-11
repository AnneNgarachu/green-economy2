// src/components/features/onboarding/OnboardingContainer.tsx
import React, { useState } from "react";
import FacilityDetails from "./FacilityDetails";
import BasicSetup from "./BasicSetup";
import GoalSetting from "./GoalSetting";
import ReviewSummary from "./ReviewSummary";
import { useRouter } from "next/router";
import OnboardingProgress from "./OnboardingProgress";
import { FormData } from "@/types/forms";

const OnboardingContainer: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    industry: "",
    size: "",  // Initialize with empty string
    facilityCount: 1,
    facilityNames: [],
    goals: [],
  });

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEdit = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFinish = () => {
    if (typeof window !== "undefined" && !localStorage.getItem('onboardingAlertShown')) {
      localStorage.setItem('onboardingAlertShown', 'true');
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/sustainability-bg.jpg')" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />

          {step === 1 && (
            <BasicSetup
              initialData={{
                industry: formData.industry,
                size: formData.size,
              }}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <FacilityDetails
              initialData={{
                facilityCount: formData.facilityCount,
                facilityNames: formData.facilityNames,
              }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <GoalSetting
              initialData={{ goals: formData.goals }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && (
            <ReviewSummary
              formData={formData}
              onBack={handleBack}
              onEdit={handleEdit}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;