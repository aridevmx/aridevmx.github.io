'use client'

import { stack } from '@/data/stack'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import { TechTag } from '@/components/ui/TechTag'

export function Stack() {
  return (
    <section id="stack" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>Stack técnico</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#F0F0F8] mt-1">
          Tecnologías
        </h2>
      </FadeIn>

      <div className="mt-8 space-y-0">
        {stack.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.06}>
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-0 py-4 ${i > 0 ? 'border-t border-[#1E1E2E]' : ''}`}>
              <span className="font-body text-[13px] text-[#7C7C94] w-[140px] shrink-0">
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
