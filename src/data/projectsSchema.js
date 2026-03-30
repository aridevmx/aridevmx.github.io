import { z } from "zod";

const nonEmptyString = z.string().min(1);

const LanguageKeySchema = z.enum(["es", "en"]);

const LocalizedStringSchema = z.object({
  es: nonEmptyString,
  en: nonEmptyString,
});

const LocalizedShortStringSchema = z.object({
  es: z.string().min(1).max(150),
  en: z.string().min(1).max(150),
});

const ProjectDetailsSchema = z
  .object({
    problem: nonEmptyString,
    solution: nonEmptyString,
    result: nonEmptyString,
  })
  .partial();

const ProjectAccessCipherSchema = z.object({
  kdf: z.literal("pbkdf2-sha256"),
  iterations: z.number().int().min(100000),
  saltB64: nonEmptyString,
  alg: z.literal("aes-256-gcm"),
  ivB64: nonEmptyString,
  cipherTextB64: nonEmptyString,
});

const ProjectAccessSchema = z.object({
  required: z.boolean(),
  usernameEnc: ProjectAccessCipherSchema.nullable(),
  passwordEnc: ProjectAccessCipherSchema.nullable(),
});

const ProjectStatusSchema = z.enum(["in_progress", "delivered"]);

const ProjectIdSchema = z.string().uuid();

const ProjectDefinitionSchema = z.object({
  id: ProjectIdSchema,
  name: nonEmptyString,
  client: nonEmptyString.nullable(),
  category: nonEmptyString,
  summary: LocalizedShortStringSchema,
  details: z.object({ es: ProjectDetailsSchema, en: ProjectDetailsSchema }).optional(),
  technologies: z.array(nonEmptyString).min(1),
  languages: z.array(nonEmptyString).min(1),
  demoUrl: z.string().url(),
  githubUrl: z.string().url().nullable(),
  status: ProjectStatusSchema,
  publishedAt: nonEmptyString.refine((value) => !Number.isNaN(Date.parse(value)), { message: "fecha ISO 8601 inválida" }),
  image: z.string().url(),
  access: ProjectAccessSchema.nullable(),
});

export const ProjectsDataSchema = z.object({
  projects: z
    .array(ProjectDefinitionSchema)
    .min(1)
    .superRefine((projects, ctx) => {
      const seen = new Map();
      for (let i = 0; i < projects.length; i += 1) {
        const id = projects[i]?.id;
        if (!id) continue;
        if (seen.has(id)) {
          const firstIndex = seen.get(id);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `id duplicado: ${id} (también en projects[${firstIndex}])`,
            path: [i, "id"],
          });
        } else {
          seen.set(id, i);
        }
      }
    }),
});

export const formatZodError = (error) =>
  error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      return `- ${path}: ${issue.message}`;
    })
    .join("\n");

export const validateProjectsData = (value, options = {}) => {
  const { allowCredentialsInBundle = false } = options;

  const result = ProjectsDataSchema.safeParse(value);
  if (!result.success) {
    throw new Error(`projects.json inválido:\n${formatZodError(result.error)}`);
  }

  if (!allowCredentialsInBundle) {
    const projectsWithAccess = result.data.projects.filter((p) => p.access !== null);
    if (projectsWithAccess.length > 0) {
      const ids = projectsWithAccess.map((p) => p.id).join(", ");
      throw new Error(
        `projects.json inválido: "access" no puede ir en el bundle del frontend.\nProyectos afectados: ${ids}\nUsa access: null o habilita explícitamente ALLOW_PROJECT_ACCESS_CREDS=true solo para validación local.`,
      );
    }
  }

  return result.data;
};

export const getLocalizedValue = (localized, language) => localized[language];

export const LanguageKeys = LanguageKeySchema.options;
