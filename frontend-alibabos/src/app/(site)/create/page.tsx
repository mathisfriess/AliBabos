"use client";

import { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Palette,
  Eye,
  Layout,
} from "lucide-react";
import { HeaderConnected } from "@/components/alibabos-ui/header";
import styles from "@/style/createPage.module.css";
import Step1TemplateSelection from "@/components/create-page/createPagePart1";
import Step2WebsiteName from "@/components/create-page/createPagePart2";
import Step3ContentManagement from "@/components/create-page/createPagePart3";
import { AuthGuard } from "@/lib/checkAuth";

interface Step1FormData {
  selectedTemplate: string | null;
}

interface Step2FormData {
  websiteName: string;
  logoUrl?: string;
  subdomain?: string;
  completedAt?: string;
}

interface ContentSection {
  id: string;
  type: string;
  content: string;
}

interface Step3FormData {
  sections: ContentSection[];
  selectedFont: string;
  completedAt?: string;
}

interface Step4FormData {
  confirmed: boolean;
}

interface FormData {
  selectedTemplate: string | null;
  siteName: string;
  sections: ContentSection[];
  customization: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
  };

  step1Data: Step1FormData | null;
  step2Data: Step2FormData | null;
  step3Data: Step3FormData | null;
  step4Data: Step4FormData | null;
}

const steps = [
  { id: 1, label: "Choose Template", icon: Layout },
  { id: 2, label: "Name Your Site", icon: FileText },
  { id: 3, label: "Customize", icon: Palette },
  { id: 4, label: "Preview", icon: Eye },
];

function CreatePageTemplate() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    selectedTemplate: null,
    siteName: "",
    sections: [],
    customization: {
      primaryColor: "#000000",
      secondaryColor: "#10b981",
      font: "Inter",
    },
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null,
  });

  // Handler to receive data from child components
  type StepData = Step1FormData | Step2FormData | Step3FormData | Step4FormData;
  const handleStepDataChange = useCallback(
    (stepNumber: number, data: StepData) => {
      setFormData((prev) => ({
        ...prev,
        [`step${stepNumber}Data`]: data,
        ...(stepNumber === 1 && {
          selectedTemplate: (data as Step1FormData).selectedTemplate,
        }),
        ...(stepNumber === 2 && {
          siteName: (data as Step2FormData).websiteName,
        }),
        ...(stepNumber === 3 && {
          sections: (data as Step3FormData).sections,
          customization: {
            ...prev.customization,
            font: (data as Step3FormData).selectedFont,
          },
        }),
      }));
    },
    []
  );

  const handleNext = () => {
    if (currentStep < 4 && canProceedToNextStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedTemplate !== null;
      case 2:
        return formData.siteName.trim() !== "";
      case 3:
        return true;
      case 4:
        return false;
      default:
        return false;
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", formData);
  };

  const handleExit = () => {
    console.log("Exiting...");
  };

  const progressPercentage = (currentStep / 4) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1TemplateSelection
            onDataChange={(data) => handleStepDataChange(1, data)}
            initialData={formData.step1Data || undefined}
          />
        );
      case 2:
        return (
          <Step2WebsiteName
            onDataChange={(data) => handleStepDataChange(2, data)}
            initialData={
              formData.step2Data
                ? {
                    ...formData.step2Data,
                    subdomain: formData.step2Data.subdomain ?? "",
                    logoUrl: formData.step2Data.logoUrl ?? "",
                    completedAt: formData.step2Data.completedAt ?? "",
                  }
                : undefined
            }
          />
        );
      case 3:
        return (
          <Step3ContentManagement
            onDataChange={(data) => handleStepDataChange(3, data)}
            initialData={formData.step3Data || undefined}
          />
        );
      case 4:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Step 4: Preview
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // <AuthGuard>
    <div className={styles.container}>
      <HeaderConnected />

      <section className={styles.progressBar}>
        <div className={styles.progressContent}>
          <div className={styles.progressHeader}>
            <h1 className="text-base font-normal text-neutral-800">
              Create Your Website
            </h1>
            <div className={styles.progressActions}>
              <button
                onClick={handleSaveDraft}
                className={styles.saveDraftButton}
              >
                Save Draft
              </button>
              <button onClick={handleExit} className={styles.exitButton}>
                Exit
              </button>
            </div>
          </div>

          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <nav className={styles.steps}>
            {steps.map((step, index) => (
              <div key={step.id} className={styles.step}>
                <div className={styles.stepContent}>
                  <div
                    className={`${styles.stepIcon} ${
                      currentStep === step.id
                        ? styles.stepIconActive
                        : styles.stepIconInactive
                    }`}
                  >
                    <step.icon
                      className="w-4 h-4"
                      color={
                        currentStep === step.id ? "white" : "rgb(120, 113, 108)"
                      }
                    />
                  </div>
                  <span
                    className={`text-base font-normal ${
                      currentStep === step.id ? "text-black" : "text-stone-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={styles.stepDivider} />
                )}
              </div>
            ))}
          </nav>
        </div>
      </section>

      <main className={styles.mainContent}>
        <div className={styles.contentInner}>
          {renderCurrentStep()}

          <nav className={styles.navigationButtons}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`${styles.navButton} ${styles.prevButton}`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === 4 || !canProceedToNextStep()}
              className={`${styles.navButton} ${styles.nextButton}`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

export default CreatePageTemplate;
