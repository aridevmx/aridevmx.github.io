'use client'

import { useRef, useState, useTransition } from 'react'
import { sendContactAction } from '@/app/actions'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMsg('Completa todos los campos.')
      return
    }

    setStatus('loading')

    startTransition(async () => {
      const result = await sendContactAction(formData)
      if (result.success) {
        setStatus('success')
        ref.current?.reset()
      } else {
        setStatus('error')
        setErrorMsg(result.error ?? 'Hubo un error. Intenta de nuevo.')
      }
    })
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-[#8B5CF6] font-body text-[14px]">
        <CheckCircle2 className="w-5 h-5" />
        Mensaje enviado. Te respondo pronto.
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Nombre"
          required
          className="w-full px-4 py-3 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#F0F0F8] text-[14px] font-body placeholder:text-[#7C7C94] focus:outline-none focus:border-[#8B5CF6] transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#F0F0F8] text-[14px] font-body placeholder:text-[#7C7C94] focus:outline-none focus:border-[#8B5CF6] transition-colors"
        />
      </div>
      <textarea
        name="message"
        placeholder="Mensaje"
        rows={4}
        required
        className="w-full px-4 py-3 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#F0F0F8] text-[14px] font-body placeholder:text-[#7C7C94] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white text-[14px] font-body font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Enviar mensaje
      </button>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-[#F87171] text-[13px] font-mono">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </p>
      )}
    </form>
  )
}
