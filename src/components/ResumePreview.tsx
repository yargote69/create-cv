import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type React from 'react';

interface Personal {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface Experience {
  title: string;
  company?: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  description?: string;
  achievements?: string[];
  projects?: Array<{
    name: string;
    url?: string;
    description?: string;
  }>;
  certificates?: Array<{
    name: string;
    url?: string;
    issuer?: string;
    date?: string;
  }>;
}

interface Education {
  degree: string;
  institution?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  description?: string;
}

interface ResumePreviewProps {
  data: {
    personal: Personal;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: {
      technical: string[];
      soft: string[];
      languages: string[];
    };
  };
  onBack: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onBack }) => {
  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Back to Edit
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <div id="resume-preview" className="bg-white p-8 shadow-lg max-w-[816px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <div className="text-sm mt-2 space-x-2">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>• {data.personal.phone}</span>}
            {data.personal.location && <span>• {data.personal.location}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2 pb-1">Professional Summary</h2>
            <p className="text-sm">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2 pb-1">Experience</h2>
            {data.experience.map((exp) => (
              <div key={`${exp.title}-${exp.company || 'no-company'}`} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{exp.title}</span>
                    {exp.company && (
                      <span className="font-semibold">
                        {' '}
                        at{' '}
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && <div className="text-sm italic">{exp.location}</div>}
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-sm">
                    {exp.achievements.map((achievement) => (
                      <li key={`achievement-${achievement}`} className="mb-1">{achievement}</li>
                    ))}
                  </ul>
                )}

                {/* Projects */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Key Projects:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {exp.projects.map((project) => (
                        <li key={`project-${project.name}`} className="mb-1">
                          {project.url ? (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {project.name}
                            </a>
                          ) : (
                            project.name
                          )}
                          {project.description && `: ${project.description}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certificates */}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Certificates:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {exp.certificates.map((cert) => (
                        <li key={`cert-${cert.name}`} className="mb-1">
                          {cert.url ? (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {cert.name}
                            </a>
                          ) : (
                            cert.name
                          )}
                          {cert.issuer && ` - ${cert.issuer}`}
                          {cert.date && ` (${cert.date})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2 pb-1">Education</h2>
            {data.education.map((edu) => (
              <div key={`${edu.degree}-${edu.institution || 'no-institution'}`} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{edu.degree}</span>
                    {edu.institution && <span className="font-semibold">, {edu.institution}</span>}
                  </div>
                  <div className="text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                {edu.location && <div className="text-sm italic">{edu.location}</div>}
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2 pb-1">Skills</h2>
          <div className="grid grid-cols-1 gap-4">
            {data.skills.technical.length > 0 && (
              <div>
                <span className="font-bold">Technical Skills: </span>
                <span className="text-sm">{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <span className="font-bold">Soft Skills: </span>
                <span className="text-sm">{data.skills.soft.join(', ')}</span>
              </div>
            )}
            {data.skills.languages.length > 0 && (
              <div>
                <span className="font-bold">Languages: </span>
                <span className="text-sm">{data.skills.languages.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};