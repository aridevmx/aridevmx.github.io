import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { GtmScript, GtmNoscript } from '@/components/analytics/GtmScript'
import { ClarityScript } from '@/components/analytics/ClarityScript'
import { PageViewTracker } from '@/components/analytics/PageViewTracker'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aridevmx.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ariel Loza — Frontend Developer',
  description:
    'Frontend Developer with 9+ years in React, TypeScript and WordPress. Available for positions and projects from Guadalajara, MX.',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'Ariel Loza — Frontend Developer',
    description:
      'Frontend Developer with product vision. React, TypeScript, WordPress, Supabase.',
    images: [{ url: '/og/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aridevmx',
    images: ['/og/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ariel Fernando Loza Mendoza',
              url: siteUrl,
              jobTitle: 'Frontend Developer',
              sameAs: [
                'https://github.com/aridevmx',
                'https://linkedin.com/in/aridevmx',
              ],
            }),
          }}
        />
      </head>
      <body className="font-body">
        <GtmNoscript />
        <GtmScript />
        <ClarityScript />
        <PageViewTracker />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
