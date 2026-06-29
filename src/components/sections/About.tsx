'use client'

import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'

export function About() {
  return (
    <section id="about" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>Sobre mí</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#F0F0F8] mt-1">
          Quién soy
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start mt-8">
        <FadeIn>
          <div className="relative w-[200px] h-[200px] mx-auto md:mx-0 rounded-[12px] overflow-hidden border border-[#1E1E2E]">
            <Image
              src="/foto.png"
              alt="Ariel Loza"
              fill
              className="object-cover"
              sizes="200px"
              priority
            />
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.1}>
            <p className="font-body text-[16px] text-[#C8C8D8] leading-relaxed mb-4">
              Soy frontend developer con 9+ años construyendo para agencias y productos propios.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="font-body text-[16px] text-[#C8C8D8] leading-relaxed mb-4">
              Fundé Clipot, donde construí bots de WhatsApp, integraciones CRM y herramientas
              internas para PYMEs mexicanas. Eso me enseñó a pensar el código como herramienta de
              negocio, no solo como entregable técnico.
            </p>
          </FadeIn>

          <FadeIn delay={0.26}>
            <p className="font-body text-[16px] text-[#C8C8D8] leading-relaxed">
              Hoy busco sumarme a un equipo o proyecto donde pueda construir producto a largo plazo.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
