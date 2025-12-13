import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
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
      <body className="antialiased text-black bg-white dark:text-white dark:bg-black">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
