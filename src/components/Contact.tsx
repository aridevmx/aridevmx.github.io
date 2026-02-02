import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensaje enviado",
      description: "Te responderé lo antes posible. ¡Gracias por contactarme!",
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
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
              ¿Listo para llevar tu proyecto al{" "}
              <span className="gradient-text">siguiente nivel?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Cuéntame sobre tu proyecto y te responderé en menos de 24 horas. 
              Podemos agendar una llamada para discutir los detalles y ver cómo puedo ayudarte.
            </p>

            {/* Quick benefits */}
            <div className="space-y-3 mb-8">
              {[
                "Respuesta en menos de 24 horas",
                "Primera consulta sin costo",
                "Propuesta detallada con timeline",
              ].map((benefit, index) => (
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
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Tu nombre"
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2"
                  >
                    Empresa (opcional)
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Tu empresa o agencia"
                    className="bg-background/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium mb-2"
                  >
                    Cuéntame sobre tu proyecto
                  </label>
                  <Textarea
                    id="project"
                    name="project"
                    required
                    placeholder="Describe brevemente qué necesitas: tipo de proyecto, plazos, tecnologías preferidas..."
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
                    "Enviando..."
                  ) : (
                    <>
                      Enviar mensaje
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
