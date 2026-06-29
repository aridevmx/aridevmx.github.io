import Image from 'next/image'
import { TechTag } from './TechTag'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/airtable'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-[#111118] border border-[#1E1E2E] rounded-[12px] overflow-hidden hover:border-[#8B5CF6] hover:-translate-y-1 transition-all duration-200">
      <div className="aspect-video relative bg-[#1E1E2E] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#7C7C94] font-display text-lg">
            {project.name}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-[20px] font-semibold text-[#F0F0F8] mb-1">
          {project.name}
        </h3>
        {project.category && (
          <p className="font-mono text-[12px] text-[#7C7C94] mb-2">{project.category}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>

        <p className="font-body text-[14px] text-[#C8C8D8] leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] text-white text-[13px] font-body font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}
