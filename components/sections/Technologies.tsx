export function Technologies({ domains }: { domains: any[] }) {
  if (domains && domains.length > 0) {
    return (
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Tech Stack & Domain Knowledge</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {domains.map((domain: any) => {
            const colSpan = {
              'full': 'lg:col-span-12',
              '2/3': 'lg:col-span-8',
              '1/2': 'lg:col-span-6',
              '1/3': 'lg:col-span-4',
            }[domain.width as string] || 'lg:col-span-4';

            const isBlue = domain.colorTheme === 'blue';

            return (
              <div
                key={domain._id}
                className={`${colSpan} ${isBlue
                  ? 'bg-gradient-to-br from-[var(--color-electric-green)]/10 to-[var(--color-teal-blue)]/10 dark:from-[var(--color-electric-green)]/10 dark:to-[var(--color-teal-blue)]/10 border-[var(--color-electric-green)]/20 dark:border-[var(--color-electric-green)]/20'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                  } rounded-2xl p-8 border hover:border-[var(--color-electric-green)]/50 transition-colors group`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-3xl p-3 rounded-xl shadow-sm ${isBlue ? 'bg-white dark:bg-[var(--color-teal-blue)]/20' : 'bg-white dark:bg-black'}`}>
                    {domain.icon}
                  </span>
                  <h3 className={`text-xl font-bold ${isBlue ? 'text-[var(--color-teal-blue)] dark:text-[var(--color-electric-green)]' : 'text-neutral-900 dark:text-neutral-100'}`}>
                    {domain.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {domain.items && domain.items.map((item: string) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-lg text-sm border ${isBlue
                        ? 'bg-white/50 dark:bg-[var(--color-teal-blue)]/10 border-[var(--color-teal-blue)]/30 dark:border-[var(--color-teal-blue)]/30 text-teal-800 dark:text-[var(--color-lite-green)]'
                        : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}
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

  // Fallback Hardcoded Content
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Tech Stack & Domain Knowledge</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core SAP Expertise - Takes up full width on top */}
        <div className="lg:col-span-12 bg-gradient-to-br from-[#00B9F2]/10 to-[#1661BE]/10 dark:from-[#00B9F2]/10 dark:to-[#1661BE]/10 rounded-2xl p-8 border border-[#00B9F2]/20 dark:border-[#00B9F2]/20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl bg-white dark:bg-[#1661BE]/20 p-3 rounded-xl shadow-sm">
              🚀
            </span>
            <div>
              <h3 className="text-2xl font-bold text-[#1661BE] dark:text-[#00B9F2]">
                SAP Integration Ecosystem
              </h3>
              <p className="text-[#0C7ECF] dark:text-[#00B9F2]/80">
                Core Specialization & Enterprise Architecture
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-[#1661BE] dark:text-[#00B9F2] mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#00B9F2] mr-2"></span>
                Integration Suite
              </h4>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                <li>• SAP Cloud Integration (CPI)</li>
                <li>• API Management & Security</li>
                <li>• Open Connectors</li>
                <li>• Integration Advisor</li>
                <li>• Advanced Event Mesh</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1661BE] dark:text-[#00B9F2] mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#00B9F2] mr-2"></span>
                Cloud Administration
              </h4>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                <li>• SAP BTP Administration</li>
                <li>• Identity Auth (IAS/IPS)</li>
                <li>• Cloud Connector Config</li>
                <li>• Transport Management</li>
                <li>• Hybrid Landscapes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1661BE] dark:text-[#00B9F2] mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#00B9F2] mr-2"></span>
                Extended SAP Portfolio
              </h4>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                <li>• SAP Customer Data Platform</li>
                <li>• SAP Marketing Cloud</li>
                <li>• SAP Build Process Automation</li>
                <li>• SAP Commerce Cloud</li>
                <li>• SAP ERP / S/4HANA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Domain Expertise Columns */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[var(--color-electric-green)]/5 to-[var(--color-teal-blue)]/5 dark:from-[var(--color-electric-green)]/10 dark:to-[var(--color-teal-blue)]/10 rounded-2xl p-6 border border-[var(--color-electric-green)]/20 dark:border-[var(--color-electric-green)]/20 hover:border-[var(--color-electric-green)]/40 transition-colors">
          <h3 className="text-lg font-bold mb-4 flex items-center text-[var(--color-teal-blue)] dark:text-[var(--color-electric-green)]">
            <span className="mr-2">📢</span> Marketing Automation & CRM
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Adobe Marketo Engage",
              "Outreach.io Integration",
              "HubSpot API",
              "LinkedIn Ads API",
              "Google Search Console API",
              "Marketing Data Management",
              "Lead Scoring Models",
              "Campaign Orchestration"
            ].map(item => (
              <span key={item} className="px-3 py-1 bg-white/50 dark:bg-[var(--color-teal-blue)]/10 border border-[var(--color-teal-blue)]/30 dark:border-[var(--color-teal-blue)]/30 rounded-lg text-sm text-teal-800 dark:text-[var(--color-lite-green)]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-[var(--color-electric-green)]/5 to-[var(--color-teal-blue)]/5 dark:from-[var(--color-electric-green)]/10 dark:to-[var(--color-teal-blue)]/10 rounded-2xl p-6 border border-[var(--color-electric-green)]/20 dark:border-[var(--color-electric-green)]/20 hover:border-[var(--color-electric-green)]/40 transition-colors">
          <h3 className="text-lg font-bold mb-4 flex items-center text-[var(--color-teal-blue)] dark:text-[var(--color-electric-green)]">
            <span className="mr-2">🏢</span> Procurement & Supply Chain
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Enterprise Procurement",
              "Ivalua Integration",
              "Supply Chain Optimization",
              "B2B Integration (EDI)",
              "Vendor Management",
              "Purchase Order Workflows",
              "Invoice Processing",
              "ETL / EAI Processes"
            ].map(item => (
              <span key={item} className="px-3 py-1 bg-white/50 dark:bg-[var(--color-teal-blue)]/10 border border-[var(--color-teal-blue)]/30 dark:border-[var(--color-teal-blue)]/30 rounded-lg text-sm text-teal-800 dark:text-[var(--color-lite-green)]">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Versatility - Full Width Bottom */}
        <div className="lg:col-span-12 bg-gradient-to-br from-[var(--color-electric-green)]/5 to-[var(--color-teal-blue)]/5 dark:from-[var(--color-electric-green)]/10 dark:to-[var(--color-teal-blue)]/10 rounded-2xl p-6 border border-[var(--color-electric-green)]/20 dark:border-[var(--color-electric-green)]/20 hover:border-[var(--color-electric-green)]/40 transition-colors">
          <h3 className="text-lg font-bold mb-4 flex items-center text-[var(--color-teal-blue)] dark:text-[var(--color-electric-green)]">
            <span className="mr-2">💡</span> Technical Versatility & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Android App Development",
              "Gemini AI API",
              "Azure Administration",
              "Python Scripting",
              "Web Performance",
              "System Design",
              "Open Source Contributing",
              "Cloud Security"
            ].map(item => (
              <span key={item} className="px-3 py-1 bg-white/50 dark:bg-[var(--color-teal-blue)]/10 border border-[var(--color-teal-blue)]/30 dark:border-[var(--color-teal-blue)]/30 rounded-lg text-sm text-teal-800 dark:text-[var(--color-lite-green)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
