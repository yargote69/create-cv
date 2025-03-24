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
          className="text-gray-600 hover:text-gray-800"
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
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
        itemScope 
        itemType="http://schema.org/Resume"
      >
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2" itemProp="name">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <div className="text-gray-600 space-y-1">
            {data.personal.email && (
              <div itemProp="email">
                <span className="sr-only">Email: </span>
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div itemProp="telephone">
                <span className="sr-only">Phone: </span>
                {data.personal.phone}
              </div>
            )}
            {data.personal.location && (
              <div itemProp="address">
                <span className="sr-only">Location: </span>
                {data.personal.location}
              </div>
            )}
          </div>
        </header>

        <section className="mb-6" aria-label="Professional Summary">
          <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>
          <p itemProp="description">{data.summary}</p>
        </section>

        <section className="mb-6" aria-label="Work Experience">
          <h2 className="text-xl font-semibold mb-3">Experience</h2>
          {data.experience.map((exp) => (
            <div 
              key={`${exp.title}-${exp.company || 'no-company'}-${exp.startDate}`}
              className="mb-4"
              itemScope 
              itemType="http://schema.org/WorkPosition"
            >
              <h3 className="font-semibold" itemProp="jobTitle">{exp.title}</h3>
              {exp.company && (
                <div itemProp="worksFor" itemScope itemType="http://schema.org/Organization">
                  <span itemProp="name">{exp.company}</span>
                  {exp.companyUrl && (
                    <link itemProp="url" href={exp.companyUrl} />
                  )}
                </div>
              )}
              <div className="text-gray-600">
                <time itemProp="startDate">{exp.startDate}</time>
                {exp.endDate && !exp.current && 
                  <time itemProp="endDate"> - {exp.endDate}</time>
                }
                {exp.current && " - Present"}
                {exp.location && ` | ${exp.location}`}
              </div>
              {exp.description && (
                <p className="mt-2" itemProp="description">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {exp.achievements.map((achievement) => (
                    <li key={`${achievement.substring(0, 20)}`}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6" aria-label="Education">
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          {data.education.map((edu) => (
            <div 
              key={`${edu.degree}-${edu.institution || 'no-institution'}-${edu.startDate}`}
              className="mb-4"
              itemScope 
              itemType="http://schema.org/EducationalOccupationalProgram"
            >
              <h3 className="font-semibold" itemProp="programName">{edu.degree}</h3>
              {edu.institution && (
                <div itemProp="provider" itemScope itemType="http://schema.org/EducationalOrganization">
                  <span itemProp="name">{edu.institution}</span>
                </div>
              )}
              <div className="text-gray-600">
                <time itemProp="startDate">{edu.startDate}</time>
                {edu.endDate && !edu.current && 
                  <time itemProp="endDate"> - {edu.endDate}</time>
                }
                {edu.current && " - Present"}
                {edu.location && ` | ${edu.location}`}
              </div>
              {edu.description && (
                <p className="mt-2" itemProp="description">{edu.description}</p>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6" aria-label="Skills">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <ul className="list-disc list-inside">
                {data.skills.technical.map((skill) => (
                  <li key={`tech-${skill}`} itemProp="knowsAbout">{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Soft Skills</h3>
              <ul className="list-disc list-inside">
                {data.skills.soft.map((skill) => (
                  <li key={`soft-${skill}`} itemProp="knowsAbout">{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
              <ul className="list-disc list-inside">
                {data.skills.languages.map((language) => (
                  <li key={`lang-${language}`} itemProp="knowsLanguage">{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};