import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navbar
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.process": "Proceso",
    "nav.contact": "Contacto",
    
    // Hero
    "hero.badge": "Abierto a nuevas oportunidades",
    "hero.headline": "Frontend Developer para",
    "hero.headline.highlight": "productos digitales",
    "hero.headline.end": "",
    "hero.subheadline": "Desarrollo interfaces web con React, TypeScript y Vue. Experiencia en agencias digitales trabajando con WordPress, WooCommerce y Shopify.",
    "hero.cta.primary": "Ver proyectos",
    "hero.cta.secondary": "Contactar",
    "hero.stats.years": "Años de experiencia",
    "hero.stats.projects": "Proyectos entregados",
    "hero.stats.clients": "Clientes satisfechos",
    "hero.scroll": "Scroll",
    
    // About
    "about.label": "Sobre mí",
    "about.title": "Experiencia frontend en",
    "about.title.highlight": "proyectos reales",
    "about.p1": "Soy Frontend Developer con experiencia en agencias como Timbal, IT Nora y Applab, trabajando en sitios y tiendas en producción para distintas industrias.",
    "about.p2": "Me enfoco en construir interfaces claras, accesibles y mantenibles con React, TypeScript y WordPress, colaborando de cerca con diseño y backend.",
    "about.p3": "Busco un rol como Frontend Developer donde pueda aportar en productos digitales de largo plazo, dentro de equipos multidisciplinares.",
    "about.highlight1.title": "Experiencia en producción",
    "about.highlight1.desc": "Proyectos reales en producción, cuidando rendimiento, accesibilidad y estabilidad.",
    "about.highlight2.title": "Trabajo en equipo",
    "about.highlight2.desc": "Colaboración con diseño, backend y negocio para alinear el producto con los objetivos.",
    "about.highlight3.title": "Código mantenible",
    "about.highlight3.desc": "Uso de TypeScript, componentes reutilizables y buenas prácticas para facilitar el mantenimiento.",
    
    // Services
    "services.label": "Servicios",
    "services.title": "Soluciones adaptadas a tu",
    "services.title.highlight": "modelo de negocio",
    "services.subtitle": "Desde landing pages de alta conversión hasta plataformas e-commerce completas, cada proyecto se construye con un objetivo claro en mente.",
    "services.1.title": "Frontend para Productos Web",
    "services.1.desc": "Desarrollo de interfaces modernas y escalables con React y Vue. Componentes reutilizables, testing y documentación para equipos de producto.",
    "services.1.f1": "Arquitectura de componentes",
    "services.1.f2": "Design systems",
    "services.1.f3": "Performance optimization",
    "services.1.f4": "Integración con APIs",
    "services.2.title": "WordPress, WooCommerce & Shopify",
    "services.2.desc": "Tiendas online y sitios corporativos listos para producción. Temas custom, plugins personalizados y optimización para conversión.",
    "services.2.f1": "Temas personalizados",
    "services.2.f2": "Integración de pasarelas de pago",
    "services.2.f3": "Optimización de checkout",
    "services.2.f4": "Migraciones de plataforma",
    "services.3.title": "Automatización y Herramientas Internas",
    "services.3.desc": "Dashboards, paneles de administración y herramientas que automatizan procesos repetitivos y mejoran la eficiencia operativa.",
    "services.3.f1": "Dashboards personalizados",
    "services.3.f2": "Integración de APIs",
    "services.3.f3": "Automatización de reportes",
    "services.3.f4": "Sistemas de gestión interna",
    
    // Projects
    "projects.label": "Proyectos",
    "projects.title": "Trabajos",
    "projects.title.highlight": "destacados",
    "projects.subtitle": "Una selección de proyectos que demuestran mi enfoque en crear soluciones web que generan resultados medibles.",
    "projects.viewProject": "Ver proyecto",
    
    // Tech Stack
    "tech.label": "Stack Tecnológico",
    "tech.title": "Herramientas que",
    "tech.title.highlight": "domino",
    "tech.subtitle": "Tecnologías que uso diariamente para construir productos web de alta calidad.",
    
    // Work Process
    "process.label": "Proceso de Trabajo",
    "process.title": "Cómo colaboro con",
    "process.title.highlight": "equipos y clientes",
    "process.subtitle": "Proceso estructurado pero flexible, adaptado a la metodología de cada equipo: agencias, startups o equipos de producto.",
    "process.1.title": "Discovery",
    "process.1.desc": "Entiendo tu negocio, objetivos y restricciones. Defino el alcance técnico y propongo la mejor arquitectura para el proyecto.",
    "process.1.d1": "Análisis de requerimientos",
    "process.1.d2": "Definición de KPIs",
    "process.1.d3": "Propuesta técnica",
    "process.2.title": "Planificación",
    "process.2.desc": "Coordino con diseño y stakeholders para asegurar que el desarrollo se alinee con la visión del producto.",
    "process.2.d1": "Review de diseños",
    "process.2.d2": "Estimación de sprints",
    "process.2.d3": "Setup del proyecto",
    "process.3.title": "Desarrollo",
    "process.3.desc": "Desarrollo iterativo con entregas frecuentes. Cada sprint tiene objetivos claros y demos para validar avance.",
    "process.3.d1": "Sprints de 1-2 semanas",
    "process.3.d2": "Code reviews",
    "process.3.d3": "Testing continuo",
    "process.4.title": "Entrega y Soporte",
    "process.4.desc": "Deployment a producción con documentación completa. Soporte post-lanzamiento para resolver issues y optimizar.",
    "process.4.d1": "Deploy a producción",
    "process.4.d2": "Documentación técnica",
    "process.4.d3": "Soporte post-launch",
    
    // Contact
    "contact.label": "Contacto",
    "contact.title": "¿Quieres contactarme?",
    "contact.title.highlight": "",
    "contact.subtitle": "Si tienes una vacante de Frontend o quieres saber más sobre mi experiencia, podemos hablar por LinkedIn, GitHub o email.",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.send": "Enviar mensaje",
    "contact.success": "¡Mensaje enviado!",
    "contact.success.desc": "Te responderé lo antes posible.",
    
    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.process": "Process",
    "nav.contact": "Contact",
    
    // Hero
    "hero.badge": "Open to work",
    "hero.headline": "Frontend Developer for",
    "hero.headline.highlight": "digital products",
    "hero.headline.end": "",
    "hero.subheadline": "I build web interfaces with React, TypeScript, and Vue. Experience in digital agencies working with WordPress, WooCommerce, and Shopify.",
    "hero.cta.primary": "View projects",
    "hero.cta.secondary": "Contact",
    "hero.stats.years": "Years of experience",
    "hero.stats.projects": "Projects delivered",
    "hero.stats.clients": "Satisfied clients",
    "hero.scroll": "Scroll",
    
    // About
    "about.label": "About me",
    "about.title": "Frontend experience in",
    "about.title.highlight": "real projects",
    "about.p1": "I’m a Frontend Developer with experience in agencies like Timbal, IT Nora, and Applab, building production websites and online stores for different industries.",
    "about.p2": "I focus on building clear, accessible and maintainable interfaces with React, TypeScript and WordPress, working closely with design and backend teams.",
    "about.p3": "I’m looking for a Frontend Developer role where I can contribute to long-term digital products as part of a cross-functional team.",
    "about.highlight1.title": "Production experience",
    "about.highlight1.desc": "Real-world projects in production, with attention to performance, accessibility and stability.",
    "about.highlight2.title": "Team collaboration",
    "about.highlight2.desc": "Working with design, backend and business to align the product with goals.",
    "about.highlight3.title": "Maintainable code",
    "about.highlight3.desc": "Using TypeScript, reusable components and good practices to keep the codebase healthy.",
    
    // Services
    "services.label": "Services",
    "services.title": "Solutions tailored to your",
    "services.title.highlight": "business model",
    "services.subtitle": "From high-conversion landing pages to complete e-commerce platforms, each project is built with a clear goal in mind.",
    "services.1.title": "Frontend for Web Products",
    "services.1.desc": "Development of modern and scalable interfaces with React and Vue. Reusable components, testing and documentation for product teams.",
    "services.1.f1": "Component architecture",
    "services.1.f2": "Design systems",
    "services.1.f3": "Performance optimization",
    "services.1.f4": "API integration",
    "services.2.title": "WordPress, WooCommerce & Shopify",
    "services.2.desc": "Online stores and corporate sites ready for production. Custom themes, personalized plugins and conversion optimization.",
    "services.2.f1": "Custom themes",
    "services.2.f2": "Payment gateway integration",
    "services.2.f3": "Checkout optimization",
    "services.2.f4": "Platform migrations",
    "services.3.title": "Automation and Internal Tools",
    "services.3.desc": "Dashboards, admin panels and tools that automate repetitive processes and improve operational efficiency.",
    "services.3.f1": "Custom dashboards",
    "services.3.f2": "API integration",
    "services.3.f3": "Report automation",
    "services.3.f4": "Internal management systems",
    
    // Projects
    "projects.label": "Projects",
    "projects.title": "Featured",
    "projects.title.highlight": "work",
    "projects.subtitle": "A selection of projects that demonstrate my focus on creating web solutions that generate measurable results.",
    "projects.viewProject": "View project",
    
    // Tech Stack
    "tech.label": "Tech Stack",
    "tech.title": "Tools I",
    "tech.title.highlight": "master",
    "tech.subtitle": "Technologies I use daily to build high-quality web products.",
    
    // Work Process
    "process.label": "Work Process",
    "process.title": "How I collaborate with",
    "process.title.highlight": "teams and clients",
    "process.subtitle": "Structured but flexible process, adapted to each team's methodology: agencies, startups or product teams.",
    "process.1.title": "Discovery",
    "process.1.desc": "I understand your business, objectives and constraints. I define the technical scope and propose the best architecture for the project.",
    "process.1.d1": "Requirements analysis",
    "process.1.d2": "KPI definition",
    "process.1.d3": "Technical proposal",
    "process.2.title": "Planning",
    "process.2.desc": "I coordinate with design and stakeholders to ensure development aligns with the product vision.",
    "process.2.d1": "Design review",
    "process.2.d2": "Sprint estimation",
    "process.2.d3": "Project setup",
    "process.3.title": "Development",
    "process.3.desc": "Iterative development with frequent deliveries. Each sprint has clear objectives and demos to validate progress.",
    "process.3.d1": "1-2 week sprints",
    "process.3.d2": "Code reviews",
    "process.3.d3": "Continuous testing",
    "process.4.title": "Delivery & Support",
    "process.4.desc": "Production deployment with complete documentation. Post-launch support to resolve issues and optimize.",
    "process.4.d1": "Production deploy",
    "process.4.d2": "Technical documentation",
    "process.4.d3": "Post-launch support",
    
    // Contact
    "contact.label": "Contact",
    "contact.title": "Want to contact me?",
    "contact.title.highlight": "",
    "contact.subtitle": "If you have a Frontend role or want to know more about my experience, you can reach me via LinkedIn, GitHub or email.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send message",
    "contact.success": "Message sent!",
    "contact.success.desc": "I'll get back to you as soon as possible.",
    
    // Footer
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      return saved || "es";
    }
    return "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
