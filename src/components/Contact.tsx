import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/aridevmx",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/aridevmx",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ariellozam.dev@gmail.com",
    },
    {
      icon: FileText,
      label: language === "es" ? "CV en PDF" : "PDF résumé",
      href: "/resume",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            {t("contact.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
            {t("contact.title")}{" "}
            <span className="gradient-text">{t("contact.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("contact.subtitle")}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card p-4 rounded-xl flex items-center justify-center gap-3 hover-lift text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
