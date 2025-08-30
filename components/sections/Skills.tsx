export function Skills() {
  const skills = [
    {
      name: "SAP Integration Suite",
      icon: "🔗",
      description: "CPI, API Management, Cloud Connector"
    },
    {
      name: "Integration Patterns",
      icon: "🔄",
      description: "REST, SOAP, OData, IDocs"
    },
    {
      name: "Mapping & Scripting",
      icon: "📝",
      description: "Graphical, XSLT, Groovy scripting"
    },
    {
      name: "Authentication",
      icon: "🔐",
      description: "OAuth, SAML, Certificate, Basic Auth"
    },
    {
      name: "SAP Customer Data Platform",
      icon: "📊",
      description: "Data integration, segmentation, insights"
    },
    {
      name: "Marketing Automation",
      icon: "📧",
      description: "Adobe Marketo, Outreach.io APIs"
    },
    {
      name: "API Testing",
      icon: "🧪",
      description: "Postman scripting & automation"
    },
    {
      name: "Middleware Technologies",
      icon: "⚙️",
      description: "MuleSoft, enterprise integration"
    }
  ];

  const skillCategories = [
    {
      category: "SAP Integration",
      icon: "🔗",
      skills: ["SAP CPI", "API Management", "Cloud Connector", "Integration Advisor", "Advance Event Mesh"]
    },
    {
      category: "Integration Protocols", 
      icon: "🔄",
      skills: ["REST", "SOAP", "OData", "IDocs", "OAuth", "SAML", "Certificate Auth"]
    },
    {
      category: "Data & Automation",
      icon: "📊", 
      skills: ["Adobe Marketo", "Outreach.io", "SAP CDP", "Postman", "XSLT", "Groovy"]
    },
    {
      category: "Enterprise Skills",
      icon: "🏢",
      skills: ["Middleware Design", "System Integration", "Process Automation", "API Testing", "Data Orchestration"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.category} className="group">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{category.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {category.category}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
