import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjectsForLanguage, type ProjectCardData } from "@/data/projects";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const [remoteProjects, setRemoteProjects] = useState<ProjectCardData[] | null>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);

  let fallbackError: string | null = null;
  let fallbackProjects: ProjectCardData[] = [];
  try {
    fallbackProjects = getProjectsForLanguage(language);
  } catch (err) {
    fallbackError = err instanceof Error ? err.message : String(err);
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/projects", { method: "GET" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Error cargando proyectos");

        const asRecord = (value: unknown): Record<string, unknown> | null =>
          typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

        const asStringArray = (value: unknown): string[] => {
          if (!Array.isArray(value)) return [];
          return value.filter((x): x is string => typeof x === "string").map((x) => x.trim()).filter(Boolean);
        };

        const projects = Array.isArray(data?.projects) ? (data.projects as unknown[]) : [];
        const mapped: ProjectCardData[] = projects
          .map((p) => {
            const record = asRecord(p);
            if (!record) return null;

            const id = String(record.id ?? "");
            const name = String(record.name ?? "");
            const category = String(record.category ?? "");
            const publishedAt = String(record.publishedAt ?? "");
            const image = String(record.image ?? "");
            const demoUrl = String(record.demoUrl ?? "");
            const githubUrl = typeof record.githubUrl === "string" ? record.githubUrl : null;
            const technologies = asStringArray(record.technologies);
            const languagesList = asStringArray(record.languages);
            const statusValue = record.status;
            const status = statusValue === "in_progress" || statusValue === "delivered" ? statusValue : "delivered";
            const client = typeof record.client === "string" ? record.client : null;

            const summaryRecord = asRecord(record.summary);
            const summary = language === "es" ? String(summaryRecord?.es ?? "") : String(summaryRecord?.en ?? "");

            const detailsRecord = asRecord(record.details);
            const localizedDetails = detailsRecord ? asRecord(detailsRecord[language]) : null;
            const details = localizedDetails ? localizedDetails : undefined;

            if (!id || !name || !category || !summary) return null;

            return {
              id,
              name,
              client,
              category,
              summary,
              details,
              technologies,
              languages: languagesList,
              demoUrl,
              githubUrl,
              status,
              publishedAt,
              image,
            } satisfies ProjectCardData;
          })
          .filter((x): x is ProjectCardData => x !== null);

        if (!cancelled) {
          setRemoteProjects(mapped);
          setRemoteError(null);
        }
      } catch (err) {
        if (!cancelled) setRemoteError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [language]);

  const projects = remoteProjects ?? fallbackProjects;
  const projectsError = remoteError ?? fallbackError;

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            {t("projects.label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("projects.title")}{" "}
            <span className="gradient-text">{t("projects.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {projectsError && (
          <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {projectsError}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 group-hover:text-primary transition-colors">
                  {project.name}
                  <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>

                <div className="space-y-3 text-sm">
                  <p className="text-foreground/80">{project.summary}</p>
                  {project.details?.problem && (
                    <div>
                      <span className="text-muted-foreground">{language === "es" ? "Problema" : "Problem"}: </span>
                      <span className="text-foreground/80">{project.details.problem}</span>
                    </div>
                  )}
                  {project.details?.solution && (
                    <div>
                      <span className="text-muted-foreground">{language === "es" ? "Solución" : "Solution"}: </span>
                      <span className="text-foreground/80">{project.details.solution}</span>
                    </div>
                  )}
                  {project.details?.result && (
                    <div className="pt-2">
                      <span className="text-primary font-medium">{project.details.result}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.githubUrl || project.demoUrl) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4 mr-2" />
                          {language === "es" ? "Código" : "Code"}
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {language === "es" ? "Demo" : "Live demo"}
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
