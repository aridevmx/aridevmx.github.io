import { getExperience } from '@/lib/airtable'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import { TimelineItem } from '@/components/ui/TimelineItem'

export async function Experience() {
  let experience

  try {
    experience = await getExperience()
  } catch (e) {
    console.error('Experience fetch error:', e)
    experience = []
  }

  if (experience.length === 0) return null

  return (
    <section id="experience" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <FadeIn>
        <SectionLabel>Experiencia</SectionLabel>
        <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#F0F0F8] mt-1">
          Trayectoria
        </h2>
      </FadeIn>

      <div className="mt-8">
        {experience.map((item, i) => (
          <TimelineItem
            key={item.id}
            {...item}
            isLatest={i === 0}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
