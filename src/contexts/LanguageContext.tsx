'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type Language = 'en' | 'es'

const translations: Record<string, Record<Language, string>> = {
  "nav.about": { en: "About", es: "Sobre mí" },
  "nav.stack": { en: "Stack", es: "Stack" },
  "nav.projects": { en: "Projects", es: "Proyectos" },
  "nav.experience": { en: "Experience", es: "Experiencia" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "nav.cv": { en: "Resume", es: "CV" },
  "hero.vision": { en: "with product vision.", es: "con visión de producto." },
  "hero.available": { en: "Available — Guadalajara, MX", es: "Disponible — Guadalajara, MX" },
  "hero.viewProjects": { en: "View projects", es: "Ver proyectos" },
  "hero.downloadCv": { en: "Download CV", es: "Descargar CV" },
  "about.label": { en: "About me", es: "Sobre mí" },
  "about.title": { en: "Who I am", es: "Quién soy" },
  "about.p1": { en: "I'm a frontend developer with 9+ years building for agencies and own products.", es: "Soy frontend developer con 9+ años construyendo para agencias y productos propios." },
  "about.p2": { en: "I founded Clipot, where I built WhatsApp bots, CRM integrations, and internal tools for Mexican SMEs. That taught me to think of code as a business tool, not just a technical deliverable.", es: "Fundé Clipot, donde construí bots de WhatsApp, integraciones CRM y herramientas internas para PYMEs mexicanas. Eso me enseñó a pensar el código como herramienta de negocio, no solo como entregable técnico." },
  "about.p3": { en: "Today I'm looking to join a team or project where I can build product long-term.", es: "Hoy busco sumarme a un equipo o proyecto donde pueda construir producto a largo plazo." },
  "stack.label": { en: "Tech stack", es: "Stack técnico" },
  "stack.title": { en: "Technologies", es: "Tecnologías" },
  "projects.label": { en: "Projects", es: "Proyectos" },
  "projects.title": { en: "Recent work", es: "Trabajo reciente" },
  "projects.viewMore": { en: "View more projects", es: "Ver más proyectos" },
  "experience.label": { en: "Experience", es: "Experiencia" },
  "experience.title": { en: "Career", es: "Trayectoria" },
  "contact.label": { en: "Contact", es: "Contacto" },
  "contact.title": { en: "Let's work together", es: "Trabajemos juntos" },
  "contact.subtitle": { en: "Open to full-time positions and freelance projects.", es: "Abierto a posiciones full-time y proyectos freelance." },
  "contact.sendEmail": { en: "Send email", es: "Enviar correo" },
  "form.name": { en: "Name", es: "Nombre" },
  "form.email": { en: "Email", es: "Email" },
  "form.message": { en: "Message", es: "Mensaje" },
  "form.send": { en: "Send message", es: "Enviar mensaje" },
  "form.success": { en: "Message sent. I'll reply soon.", es: "Mensaje enviado. Te respondo pronto." },
  "form.error.fields": { en: "Fill in all fields.", es: "Completa todos los campos." },
  "form.error.generic": { en: "Something went wrong. Try again.", es: "Hubo un error. Intenta de nuevo." },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = useCallback(
    (key: string): string => translations[key]?.[language] ?? key,
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
