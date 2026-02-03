import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: t("contact.success"),
      description: t("contact.success.desc"),
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contacto@ejemplo.com",
    },
  ];

  const benefits = language === "es" 
    ? [
        "Respuesta en menos de 24 horas",
        "Primera consulta sin costo",
        "Propuesta detallada con timeline",
      ]
    : [
        "Response within 24 hours",
        "Free initial consultation",
        "Detailed proposal with timeline",
      ];

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
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

            {/* Quick benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card hover-lift text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder={language === "es" ? "Tu nombre" : "Your name"}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={language === "es" ? "tu@email.com" : "your@email.com"}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2"
                  >
                    {language === "es" ? "Empresa (opcional)" : "Company (optional)"}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder={language === "es" ? "Tu empresa o agencia" : "Your company or agency"}
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="project"
                    name="project"
                    required
                    placeholder={language === "es" 
                      ? "Describe brevemente qué necesitas: tipo de proyecto, plazos, tecnologías preferidas..." 
                      : "Briefly describe what you need: project type, deadlines, preferred technologies..."}
                    rows={5}
                    className="bg-background/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    language === "es" ? "Enviando..." : "Sending..."
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
