'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    function onMove(e: PointerEvent) {
      bg?.style.setProperty('--mouse-x', String(e.clientX))
      bg?.style.setProperty('--mouse-y', String(e.clientY))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,30,46,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,30,46,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.15) 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 pt-20 text-center">
        <div className="hero-name">
          <h1 className="font-display text-[40px] sm:text-[64px] font-bold leading-[1.1] text-[#F0F0F8]">
            Ariel Loza
          </h1>
        </div>

        <div className="hero-role mt-2">
          <h1 className="font-display text-[32px] sm:text-[48px] font-bold leading-[1.1]">
            <span className="text-[#8B5CF6]">Frontend Developer</span>
          </h1>
        </div>

        <div className="hero-role mt-1">
          <h1 className="font-display text-[32px] sm:text-[48px] font-bold leading-[1.1] text-[#F0F0F8]">
            con visión de producto.
          </h1>
        </div>

        <div className="hero-stack mt-6">
          <p className="font-body text-[14px] sm:text-[16px] text-[#7C7C94]">
            React<span className="mx-1.5">·</span>TypeScript<span className="mx-1.5">·</span>Vue
            <br className="sm:hidden" />
            <span className="hidden sm:inline mx-1.5">·</span>
            WordPress<span className="mx-1.5">·</span>Supabase<span className="mx-1.5">·</span>Node.js
          </p>
        </div>

        <div className="hero-available mt-4">
          <span className="inline-flex items-center gap-2 font-mono text-[13px] text-[#7C7C94]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#8B5CF6] animate-ping opacity-75" />
              <span className="relative rounded-full w-2 h-2 bg-[#8B5CF6]" />
            </span>
            Disponible — Guadalajara, MX
          </span>
        </div>

        <div className="hero-ctas mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white text-[14px] font-body font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Ver proyectos
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="/cv"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#1E1E2E] text-[#C8C8D8] text-[14px] font-body font-medium rounded-lg hover:border-[#8B5CF6] transition-colors"
          >
            Descargar CV
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      <style>{`
        .hero-name { animation: heroFadeUp 0.35s ease-out 0.05s both; }
        .hero-role { animation: heroFadeUp 0.35s ease-out 0.12s both; }
        .hero-stack { animation: heroFadeUp 0.35s ease-out 0.20s both; }
        .hero-available { animation: heroFadeUp 0.35s ease-out 0.28s both; }
        .hero-ctas { animation: heroFadeUp 0.35s ease-out 0.35s both; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-name,
          .hero-role,
          .hero-stack,
          .hero-available,
          .hero-ctas { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
