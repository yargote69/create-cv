import type React from 'react';

export interface SkillsData {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface SkillsProps {
  data: SkillsData;
  updateData: (data: SkillsData) => void;
}

export const Skills: React.FC<SkillsProps> = ({ data = { technical: [], soft: [], languages: [] }, updateData }) => {
  const handleSkillChange = (type: keyof SkillsData, value: string) => {
    // Only split into array when saving or previewing
    updateData({
      ...data,
      [type]: value.split(',').map(skill => skill.trim()).filter(Boolean)
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Skills & Languages</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="technicalSkills" className="block text-sm font-medium text-gray-700 mb-2">
            Technical Skills
          </label>
          <textarea
            rows={3}
            defaultValue={data.technical.join(', ')}
            onBlur={(e) => handleSkillChange('technical', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., JavaScript, React, Node.js, Python..."
          />
          <p className="mt-1 text-sm text-gray-500">Separate skills with commas</p>
        </div>

        <div>
          <label htmlFor="softSkills" className="block text-sm font-medium text-gray-700 mb-2">
            Soft Skills
          </label>
          <textarea
            rows={3}
            defaultValue={data.soft.join(', ')}
            onBlur={(e) => handleSkillChange('soft', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Leadership, Communication, Problem Solving..."
          />
          <p className="mt-1 text-sm text-gray-500">Separate skills with commas</p>
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
            Languages
          </label>
          <textarea
            rows={3}
            defaultValue={data.languages.join(', ')}
            onBlur={(e) => handleSkillChange('languages', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., English (Native), Spanish (Fluent), French (Intermediate)..."
          />
          <p className="mt-1 text-sm text-gray-500">Separate languages with commas</p>
        </div>
      </div>
    </div>
  );
};