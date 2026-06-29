'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactForm } from '@/components/ui/ContactForm'
import { ExternalLink, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>Contacto</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#F0F0F8] mt-1">
          Trabajemos juntos
        </h2>
      </FadeIn>

      <div className="flex flex-col items-center text-center mt-8">
        <FadeIn delay={0.08}>
          <p className="font-body text-[16px] text-[#C8C8D8] mb-8 max-w-[500px]">
            Abierto a posiciones full-time y proyectos freelance.
          </p>
        </FadeIn>

        <div className="w-full max-w-[500px] text-left">
          <FadeIn delay={0.16}>
            <ContactForm />
          </FadeIn>
        </div>

        <FadeIn delay={0.24}>
          <div className="mt-8 pt-6 border-t border-[#1E1E2E] w-full max-w-[500px]">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] font-mono text-[#7C7C94]">
              <a
                href="mailto:aridevmx@outlook.com"
                className="hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                Enviar correo
              </a>
              <a
                href="https://linkedin.com/in/aridevmx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/aridevmx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
