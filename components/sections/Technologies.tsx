const fallbackDomains = [
  {
    _id: 'sap',
    title: 'SAP Integration Ecosystem',
    icon: '🚀',
    width: 'full',
    colorTheme: 'blue',
    items: [
      'SAP Cloud Integration (CPI)',
      'API Management & Security',
      'Open Connectors',
      'Integration Advisor',
      'Advanced Event Mesh',
      'SAP BTP Administration',
      'Identity Auth (IAS/IPS)',
      'Cloud Connector Config',
      'Transport Management',
      'Hybrid Landscapes',
      'SAP Customer Data Platform',
      'SAP Marketing Cloud',
      'SAP Build Process Automation',
      'SAP Commerce Cloud',
      'SAP ERP / S/4HANA',
    ],
  },
  {
    _id: 'cdp',
    title: 'SAP Customer Data Platform',
    icon: '🧩',
    width: 'full',
    items: [
      'Data Integration & Schema Design',
      'Identity Resolution',
      'Customer Segmentation & Insights',
      'Data Orchestration & Activation',
      'Privacy & Compliance',
      'API Integration',
      'Administration & Monitoring',
    ],
  },
  {
    _id: 'marketing',
    title: 'Marketing Automation & CRM',
    icon: '📢',
    width: '1/2',
    items: [
      'Adobe Marketo Engage',
      'Outreach.io Integration',
      'HubSpot API',
      'LinkedIn Ads API',
      'Google Search Console API',
      'Marketing Data Management',
      'Lead Scoring Models',
      'Campaign Orchestration',
    ],
  },
  {
    _id: 'procurement',
    title: 'Procurement & Supply Chain',
    icon: '🏢',
    width: '1/2',
    items: [
      'Enterprise Procurement',
      'Ivalua Integration',
      'Ivalua Certified',
      'Supply Chain Optimization',
      'B2B Integration (EDI)',
      'Vendor Management',
      'Purchase Order Workflows',
      'Invoice Processing',
      'ETL / EAI Processes',
    ],
  },
  {
    _id: 'versatility',
    title: 'Technical Versatility & Interests',
    icon: '💡',
    width: 'full',
    items: [
      'Android App Development',
      'Gemini AI API',
      'Azure Administration',
      'Python Scripting',
      'Web Performance',
      'System Design',
      'Open Source Contributing',
      'Cloud Security',
    ],
  },
];

export function Technologies({ domains }: { domains: any[] }) {
  const items = domains && domains.length > 0 ? domains : fallbackDomains;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Tech Stack & Domain Knowledge</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((domain: any) => {
          // Two-column grid: full-width cards span both columns, everything else takes one
          const isWide = domain.width === 'full';
          const isFeatured = domain.colorTheme === 'blue';

          return (
            <div
              key={domain._id}
              className={`${isWide ? 'md:col-span-2' : ''} ${isFeatured ? 'bg-[var(--color-accent-bg)]' : ''} group rounded-xl border border-[var(--border-color)] p-6 hover:border-[var(--color-electric-green)] transition-colors duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                {domain.icon && (
                  <span className="text-lg leading-none" aria-hidden="true">
                    {domain.icon}
                  </span>
                )}
                <h3 className={`text-lg font-semibold transition-colors ${isFeatured ? 'text-[var(--text-highlight)]' : 'text-[var(--text-primary)] group-hover:text-[var(--text-highlight)]'}`}>
                  {domain.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {domain.items?.map((item: string) => (
                  <span
                    key={item}
                    className="px-2.5 py-0.5 text-xs font-medium bg-[var(--bg-subtle)] text-[var(--text-muted)] rounded-md border border-[var(--border-color)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
