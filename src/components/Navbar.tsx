import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#stack", label: "Stack" },
    { href: "#process", label: t("nav.process") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3" : "py-5"
      }`}
    >
      <nav className="container-narrow flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight font-mono">
          <span className="text-muted-foreground">&lt;</span>
          <span className="text-primary">Aridev</span>
          <span className="text-muted-foreground"> /&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" asChild aria-label="Ver CV">
            <a href="/resume" target="_blank" rel="noopener noreferrer">
              <FileText className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild>
            <a href="#contact">{t("nav.contact")}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-card mt-2 mx-4 rounded-lg p-4"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex items-center justify-between">
              <LanguageSwitcher />
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild aria-label="Ver CV">
                  <a href="/resume" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t("nav.contact")}
                  </a>
                </Button>
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};
