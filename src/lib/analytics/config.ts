import type { AnalyticsConfig } from './types'

const analyticsConfig: AnalyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
}

export function getAnalyticsConfig(): AnalyticsConfig {
  return analyticsConfig
}
