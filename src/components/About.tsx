import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, TrendingUp, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Zap,
      title: t("about.highlight1.title"),
      description: t("about.highlight1.desc"),
    },
    {
      icon: TrendingUp,
      title: t("about.highlight2.title"),
      description: t("about.highlight2.desc"),
    },
    {
      icon: Code2,
      title: t("about.highlight3.title"),
      description: t("about.highlight3.desc"),
    },
  ];

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
              {t("about.label")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.title.highlight")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
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
