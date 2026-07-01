import type { EventParams } from './types'

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return

  if (window.dataLayer) {
    window.dataLayer.push({ event: name, ...params })
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
