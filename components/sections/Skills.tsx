export function Skills({ skills }: { skills: any[] }) {
  const fallbackRow1 = [
    { name: "SAP Integration Suite", icon: "🔗" },
    { name: "SAP CPI", icon: "☁️" },
    { name: "API Management", icon: "🛡️" },
    { name: "Cloud Connector", icon: "🔌" },
    { name: "Integration Advisor", icon: "🤖" },
    { name: "Advance Event Mesh", icon: "📨" },
  ];

  const fallbackRow2 = [
    { name: "REST APIs", icon: "🌐" },
    { name: "SOAP", icon: "📦" },
    { name: "OData", icon: "📊" },
    { name: "Groovy Scripting", icon: "📝" },
    { name: "XSLT Mapping", icon: "🔀" },
    { name: "Java", icon: "☕" },
  ];

  const fallbackRow3 = [
    { name: "OAuth 2.0", icon: "🔐" },
    { name: "SAML", icon: "🆔" },
    { name: "Certificate Auth", icon: "📜" },
    { name: "Postman", icon: "🚀" },
    { name: "Git", icon: "💻" },
    { name: "CI/CD", icon: "🔄" },
  ];

  const row1 = skills?.filter((s: any) => s.category === 'row1') || [];
  const row2 = skills?.filter((s: any) => s.category === 'row2') || [];
  const row3 = skills?.filter((s: any) => s.category === 'row3') || [];

  const finalRow1 = row1.length > 0 ? row1 : fallbackRow1;
  const finalRow2 = row2.length > 0 ? row2 : fallbackRow2;
  const finalRow3 = row3.length > 0 ? row3 : fallbackRow3;

  return (
    <section className="mb-20 overflow-hidden">
      <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>

      <div className="relative flex flex-col gap-8">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex overflow-hidden pause-on-hover">
          <div className="flex gap-4 animate-marquee min-w-full shrink-0 items-center justify-around px-2">
            {[...finalRow1, ...finalRow1, ...finalRow1].map((skill: any, i: number) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex overflow-hidden pause-on-hover">
          <div className="flex gap-4 animate-marquee-reverse min-w-full shrink-0 items-center justify-around px-2">
            {[...finalRow2, ...finalRow2, ...finalRow2].map((skill: any, i: number) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex overflow-hidden pause-on-hover">
          <div className="flex gap-4 animate-marquee min-w-full shrink-0 items-center justify-around px-2">
            {[...finalRow3, ...finalRow3, ...finalRow3].map((skill: any, i: number) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: { name: string; icon: string } }) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-sm whitespace-nowrap hover:border-blue-500 transition-colors cursor-default">
      <span className="text-xl">{skill.icon}</span>
      <span className="font-medium text-neutral-700 dark:text-neutral-200">{skill.name}</span>
    </div>
  );
}
