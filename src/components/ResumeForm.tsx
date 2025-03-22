import type React from "react";
import { useState } from "react";
import { ResumePreview } from "./ResumePreview";
import { Education, type EducationEntry } from "./form-sections/Education";
import { PersonalInfo } from "./form-sections/PersonalInfo";
import { ProfessionalSummary } from "./form-sections/ProfessionalSummary";
import { Skills, type SkillsData } from "./form-sections/Skills";
import {
  WorkExperience,
  type WorkExperienceEntry,
} from "./form-sections/WorkExperience";

type Personal = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
};

type FormData = {
  personal: Personal;
  summary: string;
  experience: WorkExperienceEntry[];
  education: EducationEntry[];
  skills: SkillsData;
};

type Step =
  | {
    id: "personal";
    name: string;
    component: React.ComponentType<{
      data: Personal;
      updateData: (data: Personal) => void;
    }>;
  }
  | {
    id: "summary";
    name: string;
    component: React.ComponentType<{
      data: string;
      updateData: (data: string) => void;
    }>;
  }
  | {
    id: "experience";
    name: string;
    component: React.ComponentType<{
      data: WorkExperienceEntry[];
      updateData: (data: WorkExperienceEntry[]) => void;
    }>;
  }
  | {
    id: "education";
    name: string;
    component: React.ComponentType<{
      data: EducationEntry[];
      updateData: (data: EducationEntry[]) => void;
    }>;
  }
  | {
    id: "skills";
    name: string;
    component: React.ComponentType<{
      data: SkillsData;
      updateData: (data: SkillsData) => void;
    }>;
  };

const steps: Step[] = [
  { id: "personal", name: "Personal Information", component: PersonalInfo },
  {
    id: "summary",
    name: "Professional Summary",
    component: ProfessionalSummary,
  },
  { id: "experience", name: "Work Experience", component: WorkExperience },
  { id: "education", name: "Education", component: Education },
  { id: "skills", name: "Skills & Languages", component: Skills },
];

export const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: { technical: [], soft: [], languages: [] },
  });

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setShowPreview(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = <T extends keyof FormData>(
    section: T,
    data: FormData[T],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  if (showPreview) {
    return (
      <ResumePreview data={formData} onBack={() => setShowPreview(false)} />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Steps */}
      <nav aria-label="Progress" className="mb-12">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="relative flex flex-col items-center"
            >
              <div className="flex items-center">
                {index !== 0 && (
                  <div
                    className={`absolute left-[-100%] top-1/2 w-full h-0.5 -translate-y-1/2 ${index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                      }`}
                  />
                )}
                <span
                  className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center ${index < currentStep
                    ? "bg-blue-600"
                    : index === currentStep
                      ? "border-2 border-blue-600 bg-white"
                      : "border-2 border-gray-300 bg-white"
                    }`}
                >
                  <span
                    className={`text-sm font-medium ${index < currentStep
                      ? "text-white"
                      : index === currentStep
                        ? "text-blue-600"
                        : "text-gray-500"
                      }`}
                  >
                    {index + 1}
                  </span>
                </span>
              </div>
              <span className="absolute top-14 text-sm font-medium text-gray-900 whitespace-nowrap">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <CurrentStepComponent
          data={formData[steps[currentStep].id] as FormData[typeof steps[number]["id"]]}
          updateData={(data) => updateFormData(steps[currentStep].id, data)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {currentStep === steps.length - 1 ? "Preview Resume" : "Next"}
        </button>
      </div>
    </div>
  );
};
