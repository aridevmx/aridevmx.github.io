import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layout, ShoppingCart, Settings } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Frontend para Productos Web",
    description:
      "Desarrollo de interfaces modernas y escalables con React y Vue. Componentes reutilizables, testing y documentación para equipos de producto.",
    features: [
      "Arquitectura de componentes",
      "Design systems",
      "Performance optimization",
      "Integración con APIs",
    ],
  },
  {
    icon: ShoppingCart,
    title: "WordPress, WooCommerce & Shopify",
    description:
      "Tiendas online y sitios corporativos listos para producción. Temas custom, plugins personalizados y optimización para conversión.",
    features: [
      "Temas personalizados",
      "Integración de pasarelas de pago",
      "Optimización de checkout",
      "Migraciones de plataforma",
    ],
  },
  {
    icon: Settings,
    title: "Automatización y Herramientas Internas",
    description:
      "Dashboards, paneles de administración y herramientas que automatizan procesos repetitivos y mejoran la eficiencia operativa.",
    features: [
      "Dashboards personalizados",
      "Integración de APIs",
      "Automatización de reportes",
      "Sistemas de gestión interna",
    ],
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Soluciones adaptadas a tu{" "}
            <span className="gradient-text">modelo de negocio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde landing pages de alta conversión hasta plataformas e-commerce completas, 
            cada proyecto se construye con un objetivo claro en mente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover-lift group"
            >
              <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
