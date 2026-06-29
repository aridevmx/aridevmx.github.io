import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
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
    'Frontend Developer con 9+ años en React, TypeScript y WordPress. Disponible para posiciones y proyectos desde Guadalajara, MX.',
  openGraph: {
    title: 'Ariel Loza — Frontend Developer',
    description:
      'Frontend Developer con visión de producto. React, TypeScript, WordPress, Supabase.',
    images: [{ url: '/og/og-image.png', width: 1200, height: 630 }],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aridevmx',
    images: ['/og/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
