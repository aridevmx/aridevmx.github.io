import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-commerce de Moda Premium",
    category: "Shopify + Custom Theme",
    problem: "Tienda con alta tasa de abandono de carrito y tiempo de carga superior a 6 segundos.",
    solution: "Rediseño completo del checkout, optimización de imágenes y lazy loading estratégico.",
    stack: ["Shopify", "Liquid", "JavaScript", "SCSS"],
    result: "+40% en tasa de conversión, tiempo de carga reducido a 2.1s",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    title: "Dashboard de Analytics Interno",
    category: "React + APIs",
    problem: "Equipo de marketing invirtiendo 10+ horas semanales en reportes manuales.",
    solution: "Dashboard con integración a múltiples fuentes de datos y reportes automatizados.",
    stack: ["React", "TypeScript", "Recharts", "REST APIs"],
    result: "Reducción del 80% en tiempo de generación de reportes",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    title: "Portal Inmobiliario",
    category: "WordPress + Custom Plugins",
    problem: "Sistema de búsqueda limitado que no filtraba correctamente las propiedades.",
    solution: "Plugin custom con filtros avanzados, mapas interactivos y sistema de favoritos.",
    stack: ["WordPress", "PHP", "JavaScript", "MySQL"],
    result: "+65% en engagement, más consultas cualificadas",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
  {
    title: "Plataforma de Cursos Online",
    category: "Vue.js + WooCommerce",
    problem: "Plataforma existente con UX confusa que dificultaba la compra y acceso a cursos.",
    solution: "Frontend completamente nuevo con Vue.js, manteniendo el backend de WooCommerce.",
    stack: ["Vue.js", "WooCommerce", "REST API", "Vimeo API"],
    result: "+120% en ventas de cursos en los primeros 3 meses",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Proyectos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Casos de estudio con{" "}
            <span className="gradient-text">resultados medibles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada proyecto tiene un problema real, una solución técnica y métricas 
            que demuestran el impacto en el negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 group-hover:text-primary transition-colors">
                  {project.title}
                  <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Problema: </span>
                    <span className="text-foreground/80">{project.problem}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Solución: </span>
                    <span className="text-foreground/80">{project.solution}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-primary font-medium">{project.result}</span>
                  </div>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">
              ¿Tienes un proyecto similar?
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
