export function WorkHistory() {
  const workExperience = [
    {
      title: "Senior Software Engineer",
      company: "Volkswagen Group Technology Solutions India",
      period: "Feb 2025 - Present",
      location: "Pune, Maharashtra, India · Hybrid",
      description: "Leading SAP integration initiatives and middleware solutions for automotive enterprise systems.",
      technologies: ["SAP Integration Suite", "API Management", "Cloud Integration", "Enterprise Systems"]
    },
    {
      title: "Packaged App Development Senior Analyst",
      company: "Accenture",
      period: "Dec 2024 - Feb 2025",
      location: "Bengaluru, Karnataka, India",
      description: "Specialized in SAP Cloud Integration, API Management, and enterprise application development. Worked on complex integration patterns and middleware solutions.",
      technologies: ["SAP CPI", "API Management", "REST", "SOAP", "OData"]
    },
    {
      title: "Application Development Analyst",
      company: "Accenture",
      period: "Dec 2022 - Feb 2025",
      location: "Bengaluru, Karnataka, India",
      description: "Designed and implemented SAP integration solutions using Cloud Integration Platform. Developed scalable integration flows for business-critical systems with expertise in mapping techniques and authentication protocols.",
      technologies: ["SAP Cloud Integration", "API Management", "XSLT", "Groovy", "OAuth", "SAML"]
    },
    {
      title: "Associate Software Engineer",
      company: "Accenture",
      period: "Sep 2021 - Dec 2022",
      location: "Bengaluru, Karnataka, India",
      description: "Started career in SAP integration development, working on data integration solutions and learning enterprise middleware technologies.",
      technologies: ["SAP Cloud Integration", "API Management", "REST APIs", "Data Integration"]
    },
    {
      title: "Graphic Designer",
      company: "Social Dukan",
      period: "Apr 2020 - Jun 2020",
      location: "Internship",
      description: "Worked on making UI assets and components for android application.",
      technologies: ["UI Design", "Android", "Graphic Design"]
    },
    {
      title: "Intern",
      company: "Wipro Enterprises Limited",
      period: "Jun 2019 - Jul 2019",
      location: "Karnataka, India",
      description: "Worked on increasing productivity and reducing scrap in soap plant. Collected data on scrap generation from different machines in production line.",
      technologies: ["Data Analysis", "Process Optimization", "Manufacturing"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {workExperience.map((job, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400 md:ml-4">
                {job.period}
              </span>
            </div>
            <p className="text-lg text-blue-600 dark:text-blue-400 mb-1">
              {job.company}
            </p>
            {job.location && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {job.location}
              </p>
            )}
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
