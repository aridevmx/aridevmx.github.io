export interface AnalyticsConfig {
  gtmId?: string
  gaMeasurementId?: string
  clarityProjectId?: string
  googleSiteVerification?: string
}

export type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (command: string, ...args: unknown[]) => void
  }
}
