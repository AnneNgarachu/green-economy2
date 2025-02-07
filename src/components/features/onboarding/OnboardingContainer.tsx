import React, { useState } from "react";
import FacilityDetails from "@/components/features/onboarding/FacilityDetails";
import BasicSetup from "@/components/features/onboarding/BasicSetup";
import GoalSetting from "@/components/features/onboarding/GoalSetting";
import ReviewSummary from "@/components/features/onboarding/ReviewSummary";
import { useRouter } from "next/router";
import OnboardingProgress from "@/components/features/onboarding/OnboardingProgress";

const OnboardingContainer: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  // Persistent formData state for all steps
  const [formData, setFormData] = useState({
    industry: "",
    size: "",
    facilityCount: 1,
    facilityNames: [],
    goals: [],
  });

  const handleNext = (data: Partial<typeof formData>) => {
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
    // Prevent duplicate alerts
    if (typeof window !== "undefined" && !window.onboardingAlertShown) {
      window.onboardingAlertShown = true; // Custom global flag
      alert("🎉 Onboarding Complete! Welcome to your dashboard!");
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
              onNext={(data) => handleNext(data)}
            />
          )}
          {step === 2 && (
            <FacilityDetails
              initialData={{
                facilityCount: formData.facilityCount,
                facilityNames: formData.facilityNames,
              }}
              onNext={(data) => handleNext(data)}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <GoalSetting
              initialData={{ goals: formData.goals }}
              onNext={(data) => handleNext(data)}
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
