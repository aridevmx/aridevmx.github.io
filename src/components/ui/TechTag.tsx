import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal'
import VuejsLine from 'devicons-react/lib/icons/VuejsLine'
import NextjsLine from 'devicons-react/lib/icons/NextjsLine'
import TypescriptOriginal from 'devicons-react/lib/icons/TypescriptOriginal'
import TailwindcssOriginal from 'devicons-react/lib/icons/TailwindcssOriginal'
import Html5Original from 'devicons-react/lib/icons/Html5Original'
import WordpressPlain from 'devicons-react/lib/icons/WordpressPlain'
import WoocommerceOriginal from 'devicons-react/lib/icons/WoocommerceOriginal'
import NodejsLine from 'devicons-react/lib/icons/NodejsLine'
import SupabaseOriginal from 'devicons-react/lib/icons/SupabaseOriginal'
import PostgresqlOriginal from 'devicons-react/lib/icons/PostgresqlOriginal'
import GitOriginal from 'devicons-react/lib/icons/GitOriginal'
import FigmaOriginal from 'devicons-react/lib/icons/FigmaOriginal'
import VercelLine from 'devicons-react/lib/icons/VercelLine'

const iconMap: Record<string, React.ComponentType<{ size?: number | string }>> = {
  React: ReactOriginal,
  Vue: VuejsLine,
  'Next.js': NextjsLine,
  TypeScript: TypescriptOriginal,
  Tailwind: TailwindcssOriginal,
  'HTML/CSS': Html5Original,
  WordPress: WordpressPlain,
  WooCommerce: WoocommerceOriginal,
  'Node.js': NodejsLine,
  Supabase: SupabaseOriginal,
  PostgreSQL: PostgresqlOriginal,
  Git: GitOriginal,
  Figma: FigmaOriginal,
  Vercel: VercelLine,
}

export function TechTag({ label }: { label: string }) {
  const Icon = iconMap[label]

  return (
    <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] text-[13px] font-mono text-body bg-accent-dim border border-edge rounded-[6px] hover:border-accent transition-colors duration-150">
      {Icon ? (
        <Icon size={14} />
      ) : (
        <span className="w-[6px] h-[6px] rounded-sm bg-muted shrink-0" />
      )}
      {label}
    </span>
  )
}
