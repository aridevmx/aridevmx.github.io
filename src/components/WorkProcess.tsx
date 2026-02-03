import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WorkProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquare,
      title: t("process.1.title"),
      description: t("process.1.desc"),
      details: [t("process.1.d1"), t("process.1.d2"), t("process.1.d3")],
    },
    {
      icon: Lightbulb,
      title: t("process.2.title"),
      description: t("process.2.desc"),
      details: [t("process.2.d1"), t("process.2.d2"), t("process.2.d3")],
    },
    {
      icon: Code,
      title: t("process.3.title"),
      description: t("process.3.desc"),
      details: [t("process.3.d1"), t("process.3.d2"), t("process.3.d3")],
    },
    {
      icon: Rocket,
      title: t("process.4.title"),
      description: t("process.4.desc"),
      details: [t("process.4.d1"), t("process.4.d2"), t("process.4.d3")],
    },
  ];

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
            {t("process.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("process.title")}{" "}
            <span className="gradient-text">{t("process.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("process.subtitle")}
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
