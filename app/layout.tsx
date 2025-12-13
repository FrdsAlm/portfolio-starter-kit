import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Firdous Alam - Portfolio',
    template: '%s | Firdous Alam',
  },
  description: 'Software Developer & Tech Enthusiast passionate about creating efficient, scalable solutions.',
  openGraph: {
    title: 'Firdous Alam - Portfolio',
    description: 'Software Developer & Tech Enthusiast passionate about creating efficient, scalable solutions.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(
        'antialiased',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="max-w-sm mx-auto px-4 mt-8 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <ThemeProvider>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-4 lg:px-6 xl:px-8">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
