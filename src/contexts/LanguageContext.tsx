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
    "hero.badge": "Disponible para nuevos proyectos",
    "hero.headline": "Desarrollo frontend que",
    "hero.headline.highlight": "impulsa resultados",
    "hero.headline.end": "de negocio",
    "hero.subheadline": "Especializado en crear experiencias web de alto rendimiento que convierten visitantes en clientes. WordPress, Shopify, React y herramientas internas para agencias y productos digitales.",
    "hero.cta.primary": "Hablemos de tu proyecto",
    "hero.cta.secondary": "Ver proyectos",
    "hero.stats.years": "Años de experiencia",
    "hero.stats.projects": "Proyectos entregados",
    "hero.stats.clients": "Clientes satisfechos",
    "hero.scroll": "Scroll",
    
    // About
    "about.label": "Sobre mí",
    "about.title": "Desarrollo web con",
    "about.title.highlight": "enfoque estratégico",
    "about.p1": "Soy un Frontend Developer con más de 5 años de experiencia construyendo productos web para agencias de marketing digital y empresas en crecimiento.",
    "about.p2": "Mi especialidad es transformar diseños en experiencias web funcionales y optimizadas: desde sitios corporativos y tiendas e-commerce hasta herramientas internas que automatizan procesos y ahorran horas de trabajo.",
    "about.p3": "Trabajo con equipos de diseño, marketing y negocio para asegurar que cada línea de código tenga un propósito claro y contribuya a los objetivos del proyecto.",
    "about.highlight1.title": "Performance First",
    "about.highlight1.desc": "Sitios que cargan rápido y rankean mejor en buscadores.",
    "about.highlight2.title": "Orientado a Conversión",
    "about.highlight2.desc": "Interfaces diseñadas para guiar usuarios hacia la acción.",
    "about.highlight3.title": "Código Mantenible",
    "about.highlight3.desc": "Arquitectura limpia que facilita iteraciones futuras.",
    
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
    "contact.title": "¿Tienes un proyecto en mente?",
    "contact.title.highlight": "Hablemos",
    "contact.subtitle": "Cuéntame sobre tu proyecto y cómo puedo ayudarte a hacerlo realidad.",
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
    "hero.badge": "Available for new projects",
    "hero.headline": "Frontend development that",
    "hero.headline.highlight": "drives business",
    "hero.headline.end": "results",
    "hero.subheadline": "Specialized in creating high-performance web experiences that convert visitors into customers. WordPress, Shopify, React and internal tools for agencies and digital products.",
    "hero.cta.primary": "Let's talk about your project",
    "hero.cta.secondary": "View projects",
    "hero.stats.years": "Years of experience",
    "hero.stats.projects": "Projects delivered",
    "hero.stats.clients": "Satisfied clients",
    "hero.scroll": "Scroll",
    
    // About
    "about.label": "About me",
    "about.title": "Web development with",
    "about.title.highlight": "strategic focus",
    "about.p1": "I'm a Frontend Developer with over 5 years of experience building web products for digital marketing agencies and growing companies.",
    "about.p2": "My specialty is transforming designs into functional and optimized web experiences: from corporate websites and e-commerce stores to internal tools that automate processes and save hours of work.",
    "about.p3": "I work with design, marketing, and business teams to ensure every line of code has a clear purpose and contributes to the project's objectives.",
    "about.highlight1.title": "Performance First",
    "about.highlight1.desc": "Sites that load fast and rank better in search engines.",
    "about.highlight2.title": "Conversion Oriented",
    "about.highlight2.desc": "Interfaces designed to guide users towards action.",
    "about.highlight3.title": "Maintainable Code",
    "about.highlight3.desc": "Clean architecture that facilitates future iterations.",
    
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
    "contact.title": "Have a project in mind?",
    "contact.title.highlight": "Let's talk",
    "contact.subtitle": "Tell me about your project and how I can help you make it happen.",
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
