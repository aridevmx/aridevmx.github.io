'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.dataLayer?.push({
      event: 'page_view',
      page: pathname ?? '/',
      page_title: document.title,
    })
  }, [pathname])

  return null
}
