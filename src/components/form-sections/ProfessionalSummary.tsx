import React from 'react';

interface ProfessionalSummaryProps {
  data: string;
  updateData: (data: string) => void;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
          Write a brief summary of your professional background and key qualifications
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={6}
          value={data || ''}
          onChange={(e) => updateData(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="e.g., Experienced software developer with 5+ years of expertise in web development..."
        />
      </div>
    </div>
  );
};