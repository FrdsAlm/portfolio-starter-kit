function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

export function WorkHistory({ jobs }: { jobs: any[] }) {
  const fallbackExperience = [
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

  const workExperience = (jobs && jobs.length > 0) ? jobs.map((job: any) => ({
    title: job.position,
    company: job.company,
    period: `${formatDate(job.startDate)} - ${job.isCurrent ? 'Present' : formatDate(job.endDate)}`,
    location: "", // Location is not in schema yet, can add later or omit
    description: job.description,
    technologies: job.technologies || []
  })) : fallbackExperience;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-12">
        {workExperience.map((job: any, index: number) => (
          <div key={index} className="relative pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 transition-colors duration-300 ring-4 ring-white dark:ring-black" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {job.title}
              </h3>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-500 whitespace-nowrap mt-1 sm:mt-0">
                {job.period}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-medium font-medium text-neutral-800 dark:text-neutral-200">
                {job.company}
              </p>
              {job.location && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {job.location}
                </p>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed max-w-2xl">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-800"
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
