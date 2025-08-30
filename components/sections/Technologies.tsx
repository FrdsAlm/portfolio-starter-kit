export function Technologies() {
  const technologies = [
    {
      category: "SAP Integration Suite",
      items: ["SAP Cloud Integration", "API Management", "Cloud Connector", "Integration Advisor", "Advance Event Mesh"]
    },
    {
      category: "Integration Technologies",
      items: ["REST APIs", "SOAP", "OData", "IDocs", "GraphQL", "Webhooks"]
    },
    {
      category: "Authentication & Security",
      items: ["OAuth 2.0", "SAML", "Certificate Authentication", "Basic Auth", "JWT", "API Keys"]
    },
    {
      category: "Data & Scripting",
      items: ["XSLT", "Groovy", "JSON", "XML", "JavaScript", "Postman"]
    },
    {
      category: "Marketing & CRM",
      items: ["Adobe Marketo", "SAP Customer Data Platform", "Outreach.io", "Salesforce", "HubSpot"]
    },
    {
      category: "Enterprise & Cloud",
      items: ["MuleSoft", "Azure", "SAP Cloud", "Enterprise Procurement", "Middleware Design"]
    },
    {
      category: "Interests",
      items: ["Open Source", "Web Performance", "Developer Tools", "AI/ML", "System Design"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Technologies & Interests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((section) => (
          <div key={section.category} className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {section.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full border border-blue-200 dark:border-blue-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
