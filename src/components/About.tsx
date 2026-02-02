import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, TrendingUp, Code2 } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "Performance First",
    description: "Sitios que cargan rápido y rankean mejor en buscadores.",
  },
  {
    icon: TrendingUp,
    title: "Orientado a Conversión",
    description: "Interfaces diseñadas para guiar usuarios hacia la acción.",
  },
  {
    icon: Code2,
    title: "Código Mantenible",
    description: "Arquitectura limpia que facilita iteraciones futuras.",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text content */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Sobre mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
              Desarrollo web con{" "}
              <span className="gradient-text">enfoque estratégico</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Soy un Frontend Developer con más de 5 años de experiencia construyendo 
                productos web para agencias de marketing digital y empresas en crecimiento.
              </p>
              <p>
                Mi especialidad es transformar diseños en experiencias web funcionales 
                y optimizadas: desde sitios corporativos y tiendas e-commerce hasta 
                herramientas internas que automatizan procesos y ahorran horas de trabajo.
              </p>
              <p>
                Trabajo con equipos de diseño, marketing y negocio para asegurar que 
                cada línea de código tenga un propósito claro y contribuya a los 
                objetivos del proyecto.
              </p>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
