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
    try {
      // Create a temporary URL for the resume content
      const resumeContent = document.getElementById('resume-preview')?.innerHTML;
      if (!resumeContent) return;

      // Create a blob with the HTML content
      const blob = new Blob([resumeContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Create a temporary iframe to render the content
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      // Wait for the content to load
      await new Promise(resolve => {
        iframe.onload = resolve;
      });

      // Get the content window
      const contentWindow = iframe.contentWindow;
      if (!contentWindow) return;

      // Create a new window with the content
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      // Copy the styles from the main document
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            return '';
          }
        })
        .join('\n');

      // Write the content to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              ${styles}
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                  background: white;
                }
                #resume-preview {
                  box-shadow: none;
                  padding: 0;
                }
                @page {
                  margin-top: 0;
                  margin-bottom: 0;
                  size: auto;
                }
              }
            </style>
          </head>
          <body>
            ${resumeContent}
          </body>
        </html>
      `);

      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 100));

      // Print the content
      printWindow.print();

      // Clean up
      printWindow.close();
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
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
          className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md bg-gray-100 border border-gray-200 hover:bg-gray-200"
          aria-label="Back to editor"
        >
          Back to Editor
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          aria-label="Download Resume"
        >
          Download Resume
        </button>
      </div>

      <article
        id="resume-preview"
        className="bg-white p-8 max-w-[816px] mx-auto"
        itemScope
        itemType="http://schema.org/Resume"
      >
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" itemProp="name">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <div className="text-sm" itemProp="contactPoint">
            {data.personal.location && <span itemProp="address">{data.personal.location}</span>}
            {data.personal.location && (data.personal.email || data.personal.phone) && <span> · </span>}
            {data.personal.email && (
              <a href={`mailto:${data.personal.email}`} className="text-blue-600 hover:underline" itemProp="email">
                {data.personal.email}
              </a>
            )}
            {data.personal.email && data.personal.phone && <span> · </span>}
            {data.personal.phone && <span itemProp="telephone">{data.personal.phone}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="mb-6" aria-label="Professional Summary">
            <p className="italic" itemProp="description">{data.summary}</p>
          </section>
        )}

        <section className="mb-6" aria-label="Work Experience">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">
            Experiencia Profesional
          </h2>
          {data.experience.map((exp) => (
            <div
              key={`${exp.title}-${exp.company || 'no-company'}-${exp.startDate}`}
              className="mb-6"
              itemScope
              itemType="http://schema.org/WorkPosition"
            >
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 className="font-bold inline" itemProp="jobTitle">{exp.title}</h3>
                  {exp.company && (
                    <div className="inline" itemProp="worksFor" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name"> · {exp.company}</span>
                      {exp.companyUrl && (
                        <>
                          <span> · </span>
                          <a href={exp.companyUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" itemProp="url">
                            Website
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {exp.location && <div itemProp="location">{exp.location}</div>}
                  <div>
                    <time itemProp="startDate">{exp.startDate}</time>
                    {exp.endDate && !exp.current &&
                      <time itemProp="endDate">–{exp.endDate}</time>
                    }
                    {exp.current && "–Present"}
                  </div>
                </div>
              </div>
              {exp.description && (
                <p className="mt-2" itemProp="description">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {exp.achievements.map((achievement) => (
                    <li key={`${achievement.substring(0, 20)}`} className="mb-1">{achievement}</li>
                  ))}
                </ul>
              )}
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold">Projects:</h4>
                  <ul className="list-disc list-inside">
                    {exp.projects.map((project) => (
                      <li key={project.name} className="mb-1">
                        {project.name}
                        {project.url && (
                          <>
                            <span> · </span>
                            <a href={project.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              View Project
                            </a>
                          </>
                        )}
                        {project.description && <div className="ml-4">{project.description}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.certificates && exp.certificates.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-semibold">Certificates:</h4>
                  <ul className="list-disc list-inside">
                    {exp.certificates.map((cert) => (
                      <li key={cert.name} className="mb-1">
                        {cert.name}
                        {cert.url && (
                          <>
                            <span> · </span>
                            <a href={cert.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              View Certificate
                            </a>
                          </>
                        )}
                        {cert.issuer && <span> · {cert.issuer}</span>}
                        {cert.date && <span> · {cert.date}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6" aria-label="Education">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">
            Educación
          </h2>
          {data.education.map((edu) => (
            <div
              key={`${edu.degree}-${edu.institution || 'no-institution'}-${edu.startDate}`}
              className="mb-4"
              itemScope
              itemType="http://schema.org/EducationalOccupationalProgram"
            >
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold" itemProp="programName">{edu.degree}</h3>
                  {edu.institution && (
                    <div itemProp="provider" itemScope itemType="http://schema.org/EducationalOrganization">
                      <span itemProp="name">{edu.institution}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {edu.location && <div>{edu.location}</div>}
                  <div>
                    <time itemProp="startDate">{edu.startDate}</time>
                    {edu.endDate && !edu.current &&
                      <time itemProp="endDate">–{edu.endDate}</time>
                    }
                    {edu.current && "–Present"}
                  </div>
                </div>
              </div>
              {edu.description && (
                <p className="mt-2" itemProp="description">{edu.description}</p>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6" aria-label="Additional Skills">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">
            Skills Adicionales
          </h2>
          <div className="space-y-2">
            {data.skills.technical.length > 0 && (
              <div>
                <h3 className="font-bold inline">Technical: </h3>
                <span itemProp="knowsAbout">{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <h3 className="font-bold inline">Soft Skills: </h3>
                <span itemProp="knowsAbout">{data.skills.soft.join(', ')}</span>
              </div>
            )}
            {data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-bold inline">Languages: </h3>
                <span itemProp="knowsLanguage">{data.skills.languages.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};