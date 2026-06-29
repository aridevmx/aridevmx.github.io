import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { PrintButton } from '@/components/ui/PrintButton'

export default async function CvPage() {
  const filePath = path.join(process.cwd(), 'public', 'cv', 'aridevmx.md')
  let content: string

  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch {
    return (
      <div className="min-h-screen bg-white text-black p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <p className="text-red-500">Error loading resume.</p>
        </div>
      </div>
    )
  }

  const lines = content.split('\n')

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-12 print:p-0">
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm text-black hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
        <PrintButton />
      </div>

      <article className="max-w-4xl mx-auto prose prose-slate prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-li:text-gray-700 print:max-w-none">
        {lines.map((line, i) => {
          if (line.startsWith('# ')) {
            const text = line.replace(/^# /, '')
            return <h1 key={i} className="text-4xl font-bold mb-2">{text}</h1>
          }
          if (line.startsWith('## ')) {
            const text = line.replace(/^## /, '')
            return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{text}</h2>
          }
          if (line.startsWith('### ')) {
            const text = line.replace(/^### /, '')
            return <h3 key={i} className="text-xl font-bold mt-6 mb-2">{text}</h3>
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            const text = line.replace(/^\*\*/, '').replace(/\*\*$/, '')
            return <p key={i} className="font-semibold text-gray-900">{text}</p>
          }
          if (line.startsWith('- ')) {
            const text = line.replace(/^- /, '')
            return <li key={i} className="text-gray-700 ml-4">{text}</li>
          }
          if (line.trim() === '') {
            return <br key={i} />
          }
          return <p key={i} className="text-gray-700">{line}</p>
        })}
      </article>

      <style>{`
        @media print {
          @page { margin: 1.5cm; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
