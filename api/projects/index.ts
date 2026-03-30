import { json, readJson } from "../_lib/http";
import { getAdminSession } from "../_lib/adminAuth";
import { airtableTableUrl, createRecord, updateRecord, formula } from "../_lib/airtable";

type Localized<T> = { es: T; en: T };

type ProjectDetails = {
  problem?: string;
  solution?: string;
  result?: string;
};

type Project = {
  id: string;
  name: string;
  client: string | null;
  category: string;
  summary: Localized<string>;
  details?: Localized<ProjectDetails>;
  technologies: string[];
  languages: string[];
  demoUrl: string;
  githubUrl: string | null;
  status: "in_progress" | "delivered";
  publishedAt: string;
  image: string;
  access: unknown | null;
};

type AirtableProjectFields = Record<string, unknown>;

const tableName = () => process.env.AIRTABLE_PROJECTS_TABLE ?? "projects";

const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const splitList = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string" && v.trim()).map((v) => v.trim());
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const toIsoDate = (value: string) => {
  if (!value) return null;
  const d = Date.parse(value);
  if (Number.isNaN(d)) return null;
  return value;
};

const toProject = (fields: AirtableProjectFields): Project | null => {
  const id = String(fields.id ?? "").trim();
  if (!isUuid(id)) return null;

  const publishedAt = String(fields.publishedAt ?? "").trim();
  if (!toIsoDate(publishedAt)) return null;

  const status = String(fields.status ?? "").trim();
  if (status !== "in_progress" && status !== "delivered") return null;

  const name = String(fields.name ?? "").trim();
  const category = String(fields.category ?? "").trim();
  const summaryEs = String(fields.summary_es ?? "").trim();
  const summaryEn = String(fields.summary_en ?? "").trim();
  const demoUrl = String(fields.demoUrl ?? "").trim();
  const image = String(fields.image ?? "").trim();
  if (!name || !category || !summaryEs || !summaryEn || !demoUrl || !image) return null;

  const details: Localized<ProjectDetails> | undefined =
    fields.problem_es || fields.solution_es || fields.result_es || fields.problem_en || fields.solution_en || fields.result_en
      ? {
          es: {
            problem: fields.problem_es ? String(fields.problem_es) : undefined,
            solution: fields.solution_es ? String(fields.solution_es) : undefined,
            result: fields.result_es ? String(fields.result_es) : undefined,
          },
          en: {
            problem: fields.problem_en ? String(fields.problem_en) : undefined,
            solution: fields.solution_en ? String(fields.solution_en) : undefined,
            result: fields.result_en ? String(fields.result_en) : undefined,
          },
        }
      : undefined;

  return {
    id,
    name,
    client: fields.client ? String(fields.client) : null,
    category,
    summary: { es: summaryEs, en: summaryEn },
    details,
    technologies: splitList(fields.technologies),
    languages: splitList(fields.languages),
    demoUrl,
    githubUrl: fields.githubUrl ? String(fields.githubUrl) : null,
    status,
    publishedAt,
    image,
    access: null,
  };
};

const toAirtableFields = (project: Project) => {
  return {
    id: project.id,
    name: project.name,
    client: project.client,
    category: project.category,
    summary_es: project.summary.es,
    summary_en: project.summary.en,
    problem_es: project.details?.es?.problem ?? null,
    solution_es: project.details?.es?.solution ?? null,
    result_es: project.details?.es?.result ?? null,
    problem_en: project.details?.en?.problem ?? null,
    solution_en: project.details?.en?.solution ?? null,
    result_en: project.details?.en?.result ?? null,
    technologies: project.technologies,
    languages: project.languages,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    status: project.status,
    publishedAt: project.publishedAt,
    image: project.image,
  };
};

const listProjects = async (includeDrafts: boolean) => {
  const url = new URL(airtableTableUrl(tableName()));
  url.searchParams.set("pageSize", "100");
  if (!includeDrafts) {
    url.searchParams.set("filterByFormula", formula.eq("status", "delivered"));
  }

  const records: AirtableProjectFields[] = [];
  let offset: string | undefined = undefined;
  do {
    const pageUrl = new URL(url.toString());
    if (offset) pageUrl.searchParams.set("offset", offset);
    const res = await fetch(pageUrl.toString(), { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN ?? ""}` } });
    const text = await res.text();
    const jsonRes = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const msg = jsonRes?.error?.message || jsonRes?.error || text || `HTTP ${res.status}`;
      throw new Error(`Airtable error: ${msg}`);
    }
    for (const r of jsonRes?.records ?? []) records.push(r.fields ?? {});
    offset = jsonRes?.offset;
  } while (offset);

  return records.map(toProject).filter(Boolean) as Project[];
};

const findProjectRecordIdByUuid = async (uuid: string) => {
  const url = new URL(airtableTableUrl(tableName()));
  url.searchParams.set("maxRecords", "1");
  url.searchParams.set("filterByFormula", formula.eq("id", uuid));
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN ?? ""}` } });
  const text = await res.text();
  const jsonRes = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = jsonRes?.error?.message || jsonRes?.error || text || `HTTP ${res.status}`;
    throw new Error(`Airtable error: ${msg}`);
  }
  return jsonRes?.records?.[0]?.id ?? null;
};

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    return json(500, { error: "Servidor no configurado (Airtable)" });
  }

  const session = getAdminSession(req);

  if (req.method === "GET") {
    const includeDrafts = req.url.includes("includeDrafts=1") && !!session;
    try {
      const projects = await listProjects(includeDrafts);
      const cacheHeaders = includeDrafts ? { "Cache-Control": "no-store" } : { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" };
      return json(200, { projects }, cacheHeaders);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return json(500, { error: message });
    }
  }

  if (req.method === "POST") {
    if (!session) return json(401, { error: "No autenticado" });

    try {
      const body = await readJson<{ project: Project }>(req);
      const project = body.project;
      if (!project || typeof project !== "object") return json(400, { error: "Body inválido" });
      if (!isUuid(String(project.id ?? ""))) return json(400, { error: "id debe ser UUID" });

      const recordId = await findProjectRecordIdByUuid(project.id);
      const fields = toAirtableFields(project);
      if (recordId) await updateRecord(tableName(), recordId, fields);
      else await createRecord(tableName(), fields);

      return json(200, { ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return json(400, { error: message });
    }
  }

  return json(405, { error: "Method not allowed" });
}
