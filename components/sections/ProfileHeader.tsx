import Image from 'next/image';
import SanityImage from '@/app/components/SanityImage';
import { InteractiveGradientText } from '@/components/ui/InteractiveGradientText';
import { InteractiveHoverBackground } from '@/components/ui/InteractiveHoverBackground';

export function ProfileHeader({ profile }: { profile: any }) {
  // Fallback data
  const data = {
    name: profile?.name || "Firdous Alam",
    headline: profile?.headline || "SAP Integration Specialist & Middleware Expert",
    shortBio: profile?.shortBio || "Results-driven specialist with 3+ years of experience designing seamless data integration solutions. Expert in SAP Integration Suite, middleware technologies, and enterprise architecture.",
    email: profile?.email || "email@firdous.dev",
    linkedin: profile?.linkedin || "https://www.linkedin.com/in/firdous-alam/",
    profileImage: profile?.profileImage,
  };

  return (
    <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
      <div className="flex flex-col items-center text-center mb-8">

        <InteractiveHoverBackground
          className="rounded-full p-24 -mt-24 -mx-24 -mb-16"
          gradientClassName="w-48 h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full"
          gradientSize={250}
          activeClassName="opacity-60"
        >
          <div className="relative w-48 h-48">
            {data.profileImage ? (
              <SanityImage
                asset={data.profileImage}
                alt={data.name}
                fill
                className="rounded-full object-cover border-4 border-white dark:border-black shadow-2xl relative z-10"
                priority
              />
            ) : (
              <Image
                src="/profile.jpg"
                alt={data.name}
                fill
                className="rounded-full object-cover border-4 border-white dark:border-black shadow-2xl relative z-10"
                priority
              />
            )}
          </div>
        </InteractiveHoverBackground>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white cursor-default">
          <InteractiveGradientText>
            {data.name}
          </InteractiveGradientText>
        </h1>
        <p className="text-2xl font-medium text-neutral-800 dark:text-neutral-200 mb-6">
          {data.headline}
        </p>
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
          {data.shortBio}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <a
            href={`mailto:${data.email}`}
            className="flex items-center justify-center w-[144px] h-[40px] text-sm rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-medium border border-transparent hover:scale-105 hover:bg-[var(--color-electric-green)] hover:text-black transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Me
          </a>

          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-40 h-11 text-sm rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-transparent hover:border-[var(--color-electric-green)] hover:text-[var(--color-electric-green)] font-medium hover:scale-105 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
