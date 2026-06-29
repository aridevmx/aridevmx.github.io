import { getProjects } from '@/lib/airtable'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectsClient } from '@/components/ui/ProjectsClient'

export async function Projects() {
  let projects

  try {
    projects = await getProjects()
  } catch (e) {
    console.error('Projects fetch error:', e)
    projects = []
  }

  const delivered = projects
    .filter((p) => p.status === 'delivered')
    .sort((a, b) => {
      if (a.order && b.order) return a.order - b.order
      if (a.order) return -1
      if (b.order) return 1
      return 0
    })

  if (delivered.length === 0) return null

  return (
    <section id="projects" className="max-w-[1100px] mx-auto px-4 sm:px-6 py-[140px] scroll-mt-20">
      <SectionLabel>Proyectos</SectionLabel>
      <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#F0F0F8] mt-1">
        Trabajo reciente
      </h2>
      <ProjectsClient projects={delivered} />
    </section>
  )
}
