'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm hover:opacity-90 transition-opacity"
    >
      <Printer className="w-4 h-4" />
      Print Resume
    </button>
  )
}
