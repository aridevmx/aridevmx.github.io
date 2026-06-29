'use client'

import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>{t('about.label')}</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-heading mt-1">
          {t('about.title')}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start mt-8">
        <FadeIn>
          <div className="relative w-[200px] h-[200px] mx-auto md:mx-0 rounded-[12px] overflow-hidden border border-edge">
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
            <p className="font-body text-[16px] text-body leading-relaxed mb-4">
              {t('about.p1')}
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="font-body text-[16px] text-body leading-relaxed mb-4">
              {t('about.p2')}
            </p>
          </FadeIn>

          <FadeIn delay={0.26}>
            <p className="font-body text-[16px] text-body leading-relaxed">
              {t('about.p3')}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
