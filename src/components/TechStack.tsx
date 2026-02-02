import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { 
    name: "HTML5", 
    category: "Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  { 
    name: "CSS/SCSS", 
    category: "Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  { 
    name: "JavaScript", 
    category: "Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  { 
    name: "TypeScript", 
    category: "Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  { 
    name: "React", 
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  { 
    name: "Vue.js", 
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
  },
  { 
    name: "WordPress", 
    category: "CMS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg"
  },
  { 
    name: "WooCommerce", 
    category: "E-commerce",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg"
  },
  { 
    name: "Shopify", 
    category: "E-commerce",
    logo: "https://cdn.simpleicons.org/shopify/7AB55C"
  },
  { 
    name: "PHP", 
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
  },
  { 
    name: "REST APIs", 
    category: "Backend",
    logo: "https://cdn.simpleicons.org/fastapi/009688"
  },
  { 
    name: "Git", 
    category: "Tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  { 
    name: "Tailwind CSS", 
    category: "UI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
  },
  { 
    name: "Figma", 
    category: "Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  },
];

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
              className="glass-card px-5 py-3 rounded-xl hover-lift cursor-default group flex items-center gap-3"
            >
              <img 
                src={tech.logo} 
                alt={`${tech.name} logo`}
                className="w-6 h-6 object-contain"
              />
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
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
