import React from 'react';

interface WorkExperienceEntry {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  linkedinUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  projects?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  media?: Array<{
    title: string;
    url: string;
    type: 'press' | 'publication' | 'coverage';
  }>;
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
}

interface WorkExperienceProps {
  data: WorkExperienceEntry[];
  updateData: (data: WorkExperienceEntry[]) => void;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ data = [], updateData }) => {
  const addEntry = () => {
    const newEntry: WorkExperienceEntry = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
      projects: [],
      media: [],
      certificates: []
    };
    updateData([...data, newEntry]);
  };

  const updateEntry = (index: number, field: keyof WorkExperienceEntry, value: any) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    updateData(updatedData);
  };

  const updateAchievement = (entryIndex: number, achievementIndex: number, value: string) => {
    const updatedData = [...data];
    updatedData[entryIndex].achievements[achievementIndex] = value;
    updateData(updatedData);
  };

  const addAchievement = (entryIndex: number) => {
    const updatedData = [...data];
    updatedData[entryIndex].achievements.push('');
    updateData(updatedData);
  };

  const removeAchievement = (entryIndex: number, achievementIndex: number) => {
    const updatedData = [...data];
    updatedData[entryIndex].achievements.splice(achievementIndex, 1);
    updateData(updatedData);
  };

  const addProject = (entryIndex: number) => {
    const updatedData = [...data];
    if (!updatedData[entryIndex].projects) {
      updatedData[entryIndex].projects = [];
    }
    updatedData[entryIndex].projects?.push({
      name: '',
      url: '',
      description: ''
    });
    updateData(updatedData);
  };

  const updateProject = (entryIndex: number, projectIndex: number, field: string, value: string) => {
    const updatedData = [...data];
    if (updatedData[entryIndex].projects?.[projectIndex]) {
      updatedData[entryIndex].projects![projectIndex] = {
        ...updatedData[entryIndex].projects![projectIndex],
        [field]: value
      };
    }
    updateData(updatedData);
  };

  const removeProject = (entryIndex: number, projectIndex: number) => {
    const updatedData = [...data];
    updatedData[entryIndex].projects?.splice(projectIndex, 1);
    updateData(updatedData);
  };

  const addCertificate = (entryIndex: number) => {
    const updatedData = [...data];
    if (!updatedData[entryIndex].certificates) {
      updatedData[entryIndex].certificates = [];
    }
    updatedData[entryIndex].certificates?.push({
      name: '',
      issuer: '',
      date: '',
      url: ''
    });
    updateData(updatedData);
  };

  const updateCertificate = (entryIndex: number, certIndex: number, field: string, value: string) => {
    const updatedData = [...data];
    if (updatedData[entryIndex].certificates?.[certIndex]) {
      updatedData[entryIndex].certificates![certIndex] = {
        ...updatedData[entryIndex].certificates![certIndex],
        [field]: value
      };
    }
    updateData(updatedData);
  };

  const removeCertificate = (entryIndex: number, certIndex: number) => {
    const updatedData = [...data];
    updatedData[entryIndex].certificates?.splice(certIndex, 1);
    updateData(updatedData);
  };

  const removeEntry = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    updateData(updatedData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
      
      {data.map((entry, index) => (
        <div key={entry.id} className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Position {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                value={entry.title}
                onChange={(e) => updateEntry(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={entry.company}
                onChange={(e) => updateEntry(index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input
                type="url"
                value={entry.companyUrl}
                onChange={(e) => updateEntry(index, 'companyUrl', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company LinkedIn</label>
              <input
                type="url"
                value={entry.linkedinUrl}
                onChange={(e) => updateEntry(index, 'linkedinUrl', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={entry.location}
                onChange={(e) => updateEntry(index, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                value={entry.startDate}
                onChange={(e) => updateEntry(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                value={entry.endDate}
                disabled={entry.current}
                onChange={(e) => updateEntry(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id={`current-${entry.id}`}
                checked={entry.current}
                onChange={(e) => updateEntry(index, 'current', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-${entry.id}`} className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Role Overview</label>
              <textarea
                rows={2}
                value={entry.description}
                onChange={(e) => updateEntry(index, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Brief overview of your role and responsibilities..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
              {entry.achievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Describe a key achievement or responsibility..."
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(index, achievementIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAchievement(index)}
                className="mt-2 text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Achievement
              </button>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
              {entry.projects?.map((project, projectIndex) => (
                <div key={projectIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, projectIndex, 'name', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Project name"
                    />
                    <input
                      type="url"
                      value={project.url}
                      onChange={(e) => updateProject(index, projectIndex, 'url', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Project URL"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, projectIndex, 'description', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Project description"
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => removeProject(index, projectIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Project
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addProject(index)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Project
              </button>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificates</label>
              {entry.certificates?.map((cert, certIndex) => (
                <div key={certIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertificate(index, certIndex, 'name', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Certificate name"
                    />
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertificate(index, certIndex, 'issuer', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Issuing organization"
                    />
                    <input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertificate(index, certIndex, 'date', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    <input
                      type="url"
                      value={cert.url}
                      onChange={(e) => updateCertificate(index, certIndex, 'url', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Certificate URL"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertificate(index, certIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Certificate
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addCertificate(index)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Certificate
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Add Work Experience
      </button>
    </div>
  );
};