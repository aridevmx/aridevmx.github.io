'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/contexts/LanguageContext'

const links = [
  { href: '#about', key: 'nav.about' },
  { href: '#stack', key: 'nav.stack' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#contact', key: 'nav.contact' },
]

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-ink/85 backdrop-blur-[16px]'
          : 'py-5'
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tight">
          <span className="text-muted">&lt;</span>
          <span className="text-accent">Aridev</span>
          <span className="text-muted"> /&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body text-muted hover:text-heading transition-colors duration-150"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-sm font-mono text-muted hover:text-heading transition-colors px-2 py-1.5 border border-edge rounded-md hover:border-accent"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 text-muted hover:text-heading transition-colors border border-edge rounded-md hover:border-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <a
            href="/cv"
            className="text-sm font-body text-body px-3 py-1.5 border border-edge rounded-md hover:border-accent transition-colors duration-150"
          >
            {t('nav.cv')} ↓
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-xs font-mono text-muted hover:text-heading transition-colors px-2 py-1.5 border border-edge rounded-md"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 text-muted hover:text-heading transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-body"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden bg-surface border-t border-edge mt-2 mx-4 rounded-lg p-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-2 text-sm text-muted hover:text-heading transition-colors"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-edge">
              <a
                href="/cv"
                onClick={() => setIsMobileOpen(false)}
                className="block py-2 text-sm text-body hover:text-accent transition-colors"
              >
                {t('nav.cv')} ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
