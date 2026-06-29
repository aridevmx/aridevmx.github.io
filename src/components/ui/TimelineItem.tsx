'use client'

import { motion } from 'framer-motion'

type Props = {
  period: string
  company: string
  role: string
  description: string
  isLatest: boolean
  index: number
}

export function TimelineItem({ period, company, role, description, isLatest, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-[#1E1E2E] last:hidden" />
      <div
        className={`absolute left-[7px] top-[6px] w-[10px] h-[10px] rounded-full border-2 ${
          isLatest
            ? 'bg-[#8B5CF6] border-[#8B5CF6]'
            : 'bg-[#1E1E2E] border-[#1E1E2E]'
        }`}
      />

      <p className="font-mono text-[13px] text-[#7C7C94] mb-1">{period}</p>
      <h3 className="font-display text-[18px] text-[#F0F0F8] mb-0.5">{company}</h3>
      <p className="font-body text-[14px] text-[#7C7C94] mb-1.5">{role}</p>
      <p className="font-body text-[14px] text-[#C8C8D8] leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
