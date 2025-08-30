import Image from 'next/image';

export function ProfileHeader() {
  return (
    <section className="mb-12">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-42 h-42 mb-6">
          <Image
            src="/profile.jpg"
            alt="Firdous Alam"
            width={168}
            height={168}
            className="rounded-full object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Firdous Alam
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          SAP Integration Specialist & Middleware Expert
        </p>
        <p className="max-w-3xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Results-driven SAP integration specialist with 3+ years of experience designing and implementing seamless data integration solutions. Leveraging SAP Integration Suite, I specialize in creating scalable integration flows to ensure efficient data exchange across business-critical systems. Expert in middleware technologies, marketing automation, and enterprise procurement solutions.
        </p>
        
        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center text-neutral-600 dark:text-neutral-300">
          <a
            href="mailto:email@firdous.dev"
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="h-7 flex items-center">contact</span>
          </a>
          
          <a
            href="https://www.linkedin.com/in/firdous-alam/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="h-7 flex items-center">linkedin</span>
          </a>
        </div>
      </div>
    </section>
  );
}
