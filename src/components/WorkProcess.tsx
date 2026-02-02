import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description:
      "Entiendo tu negocio, objetivos y restricciones. Defino el alcance técnico y propongo la mejor arquitectura para el proyecto.",
    details: ["Análisis de requerimientos", "Definición de KPIs", "Propuesta técnica"],
  },
  {
    icon: Lightbulb,
    title: "Planificación",
    description:
      "Coordino con diseño y stakeholders para asegurar que el desarrollo se alinee con la visión del producto.",
    details: ["Review de diseños", "Estimación de sprints", "Setup del proyecto"],
  },
  {
    icon: Code,
    title: "Desarrollo",
    description:
      "Desarrollo iterativo con entregas frecuentes. Cada sprint tiene objetivos claros y demos para validar avance.",
    details: ["Sprints de 1-2 semanas", "Code reviews", "Testing continuo"],
  },
  {
    icon: Rocket,
    title: "Entrega y Soporte",
    description:
      "Deployment a producción con documentación completa. Soporte post-lanzamiento para resolver issues y optimizar.",
    details: ["Deploy a producción", "Documentación técnica", "Soporte post-launch"],
  },
];

export const WorkProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Proceso de Trabajo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Cómo colaboro con{" "}
            <span className="gradient-text">equipos y clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proceso estructurado pero flexible, adaptado a la metodología de cada 
            equipo: agencias, startups o equipos de producto.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-6 rounded-2xl h-full hover-lift">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-1">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
