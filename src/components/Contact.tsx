import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

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
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/523311153802",
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

          <form
            className="mt-10 text-left space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setSending(true);
              try {
                const res = await fetch("/api/crm", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, phone, email, message }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error ?? "Error enviando mensaje");
                setName("");
                setPhone("");
                setEmail("");
                setMessage("");
                toast({ title: t("contact.success"), description: t("contact.success.desc") });
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                toast({ title: "Error", description: msg, variant: "destructive" });
              } finally {
                setSending(false);
              }
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">{t("contact.name")}</div>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">{t("contact.phone")}</div>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">{t("contact.email")}</div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">{t("contact.message")}</div>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} />
            </div>
            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {t("contact.send")}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
