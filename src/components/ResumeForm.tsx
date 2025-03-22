import React, { useState } from 'react';
import { PersonalInfo } from './form-sections/PersonalInfo';
import { ProfessionalSummary } from './form-sections/ProfessionalSummary';
import { WorkExperience } from './form-sections/WorkExperience';
import { Education } from './form-sections/Education';
import { Skills } from './form-sections/Skills';
import { ResumePreview } from './ResumePreview';

const steps = [
  { id: 'personal', name: 'Personal Information', component: PersonalInfo },
  { id: 'summary', name: 'Professional Summary', component: ProfessionalSummary },
  { id: 'experience', name: 'Work Experience', component: WorkExperience },
  { id: 'education', name: 'Education', component: Education },
  { id: 'skills', name: 'Skills & Languages', component: Skills },
];

export const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    personal: {},
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], soft: [], languages: [] }
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

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  if (showPreview) {
    return <ResumePreview data={formData} onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Steps */}
      <nav aria-label="Progress" className="mb-8">
        <ol role="list" className="flex items-center">
          {steps.map((step, index) => (
            <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
              <div className="flex items-center">
                <span className={`h-9 w-9 rounded-full flex items-center justify-center ${
                  index < currentStep ? 'bg-primary-600' : 
                  index === currentStep ? 'border-2 border-primary-600' : 
                  'border-2 border-gray-300'
                }`}>
                  <span className={`text-sm ${
                    index < currentStep ? 'text-white' : 
                    index === currentStep ? 'text-primary-600' : 
                    'text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                </span>
                {index !== steps.length - 1 && (
                  <div className={`absolute top-4 w-full h-0.5 ${
                    index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
              <span className="absolute -bottom-6 w-max text-sm font-medium text-gray-500">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <CurrentStepComponent 
          data={formData[steps[currentStep].id]} 
          updateData={(data: any) => updateFormData(steps[currentStep].id, data)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {currentStep === steps.length - 1 ? 'Preview Resume' : 'Next'}
        </button>
      </div>
    </div>
  );
};