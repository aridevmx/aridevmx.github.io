import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "HTML5", category: "Core" },
  { name: "CSS/SCSS", category: "Core" },
  { name: "JavaScript", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "React", category: "Framework" },
  { name: "Vue.js", category: "Framework" },
  { name: "WordPress", category: "CMS" },
  { name: "WooCommerce", category: "E-commerce" },
  { name: "Shopify", category: "E-commerce" },
  { name: "PHP", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Tailwind CSS", category: "UI" },
  { name: "Figma", category: "Design" },
];

const categories = ["Core", "Framework", "CMS", "E-commerce", "Backend", "Tools", "UI", "Design"];

export const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Stack Tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Herramientas que uso{" "}
            <span className="gradient-text">a diario</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stack versátil que me permite adaptarme a diferentes tipos de proyectos 
            y entregar soluciones eficientes.
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-card px-5 py-3 rounded-xl hover-lift cursor-default group"
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
              <span className="text-xs text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-muted-foreground text-sm"
        >
          <p>
            + experiencia con Node.js, MySQL, PostgreSQL, Docker, CI/CD y metodologías ágiles
          </p>
        </motion.div>
      </div>
    </section>
  );
};
