'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/lib/airtable'

const INITIAL_COUNT = 4

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT)
  const hasMore = projects.length > INITIAL_COUNT

  return (
    <>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#1E1E2E] text-[#C8C8D8] text-[14px] font-body rounded-lg hover:border-[#8B5CF6] transition-colors"
          >
            Ver más proyectos ({projects.length - INITIAL_COUNT})
          </button>
        </div>
      )}
    </>
  )
}
