import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

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
            {t("tech.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("tech.title")}{" "}
            <span className="gradient-text">{t("tech.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tech.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-sm font-semibold mb-3 text-primary">Core</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>HTML5</li>
              <li>CSS/SCSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-sm font-semibold mb-3 text-primary">Frameworks</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React</li>
              <li>Vue.js</li>
              <li>Nuxt.js</li>
              <li>Next.js</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-sm font-semibold mb-3 text-primary">CMS / Ecommerce</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>WordPress</li>
              <li>WooCommerce</li>
              <li>Shopify</li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-sm font-semibold mb-3 text-primary">Herramientas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Git</li>
              <li>Figma</li>
              <li>Tailwind CSS</li>
              <li>PHP</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
