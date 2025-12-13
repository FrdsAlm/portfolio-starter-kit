import { Navbar } from '../components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '../components/footer'

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-sm mx-auto px-4 mt-8 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-4 lg:px-6 xl:px-8">
                <Navbar />
                {children}
                <Footer />
                <Analytics />
                <SpeedInsights />
            </main>
        </div>
    )
}
