import projectsRaw from "./projects.json";
import { validateProjectsData, getLocalizedValue } from "./projectsSchema";

type Language = "es" | "en";

export type ProjectCardData = {
  id: string;
  name: string;
  client: string | null;
  category: string;
  summary: string;
  details?: {
    problem?: string;
    solution?: string;
    result?: string;
  };
  technologies: string[];
  languages: string[];
  demoUrl: string;
  githubUrl: string | null;
  status: "in_progress" | "delivered";
  publishedAt: string;
  image: string;
};
let cachedProjectsData: ReturnType<typeof validateProjectsData> | null = null;

const getProjectsData = () => {
  if (cachedProjectsData) return cachedProjectsData;
  cachedProjectsData = validateProjectsData(projectsRaw, { allowCredentialsInBundle: false });
  return cachedProjectsData;
};

const compareByPublishedAtDesc = (a: ProjectCardData, b: ProjectCardData) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

export const getProjectsForLanguage = (language: Language): ProjectCardData[] => {
  const projectsData = getProjectsData();

  return projectsData.projects
    .map((p) => ({
      id: p.id,
      name: p.name,
      client: p.client,
      category: p.category,
      summary: getLocalizedValue(p.summary, language),
      details: p.details ? p.details[language] : undefined,
      image: p.image,
      technologies: p.technologies,
      languages: p.languages,
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      status: p.status,
      publishedAt: p.publishedAt,
    }))
    .sort(compareByPublishedAtDesc);
};
