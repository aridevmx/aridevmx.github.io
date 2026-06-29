export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[13px] text-muted uppercase tracking-wider mb-2">
      {children}
    </p>
  )
}
