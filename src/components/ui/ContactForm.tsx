'use client'

import { useRef, useState, useTransition } from 'react'
import { sendContactAction } from '@/app/actions'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [, startTransition] = useTransition()
  const { t } = useLanguage()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMsg(t('form.error.fields'))
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
        setErrorMsg(result.error ?? t('form.error.generic'))
      }
    })
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-accent font-body text-[14px]">
        <CheckCircle2 className="w-5 h-5" />
        {t('form.success')}
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder={t('form.name')}
          required
          className="w-full px-4 py-3 bg-surface border border-edge rounded-lg text-heading text-[14px] font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder={t('form.email')}
          required
          className="w-full px-4 py-3 bg-surface border border-edge rounded-lg text-heading text-[14px] font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <textarea
        name="message"
        placeholder={t('form.message')}
        rows={4}
        required
        className="w-full px-4 py-3 bg-surface border border-edge rounded-lg text-heading text-[14px] font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-[14px] font-body font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {t('form.send')}
      </button>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-error text-[13px] font-mono">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </p>
      )}
    </form>
  )
}
