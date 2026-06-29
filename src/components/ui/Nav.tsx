'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact', label: 'Contacto' },
]

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[rgba(10,10,15,0.85)] backdrop-blur-[16px]'
          : 'py-5'
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tight">
          <span className="text-[#7C7C94]">&lt;</span>
          <span className="text-[#8B5CF6]">Aridev</span>
          <span className="text-[#7C7C94]"> /&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body text-[#7C7C94] hover:text-[#F0F0F8] transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="/cv"
            className="text-sm font-body text-[#C8C8D8] px-3 py-1.5 border border-[#1E1E2E] rounded-md hover:border-[#8B5CF6] transition-colors duration-150"
          >
            CV ↓
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-[#C8C8D8]"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden bg-[#111118] border-t border-[#1E1E2E] mt-2 mx-4 rounded-lg p-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-2 text-sm text-[#7C7C94] hover:text-[#F0F0F8] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-[#1E1E2E]">
              <a
                href="/cv"
                onClick={() => setIsMobileOpen(false)}
                className="block py-2 text-sm text-[#C8C8D8] hover:text-[#8B5CF6] transition-colors"
              >
                CV ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
