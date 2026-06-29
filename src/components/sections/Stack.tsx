'use client'

import { stack } from '@/data/stack'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import { TechTag } from '@/components/ui/TechTag'
import { useLanguage } from '@/contexts/LanguageContext'

export function Stack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>{t('stack.label')}</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-heading mt-1">
          {t('stack.title')}
        </h2>
      </FadeIn>

      <div className="mt-8 space-y-0">
        {stack.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.06}>
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-0 py-4 ${i > 0 ? 'border-t border-edge' : ''}`}>
              <span className="font-body text-[13px] text-muted w-[140px] shrink-0">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <TechTag key={item} label={item} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
