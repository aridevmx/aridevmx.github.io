import Script from 'next/script'
import { getAnalyticsConfig } from '@/lib/analytics/config'

export function ClarityScript() {
  const { clarityProjectId } = getAnalyticsConfig()

  if (!clarityProjectId) return null

  return (
    <Script
      id="clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityProjectId}");`,
      }}
    />
  )
}
