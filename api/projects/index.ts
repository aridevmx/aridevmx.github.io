import { json, readJson } from "../_lib/http";
import { getAdminSession } from "../_lib/adminAuth";
import { airtableTableUrl, createRecord, updateRecord, formula } from "../_lib/airtable";

type Localized<T> = { es: T; en: T };

type Project = {
  id: string;
  name: string;
  client: string | null;
  category: string;
  description: Localized<string>;
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
  const id = String(fields.id ?? "").trim() || crypto.randomUUID();

  const publishedAt = String(fields.publishedAt ?? "").trim() || new Date().toISOString().split("T")[0];

  const status = String(fields.status ?? "").trim() || "delivered";

  const name = String(fields.name ?? "").trim();
  if (!name) return null;

  const category = String(fields.category ?? "").trim() || "Proyecto";
  const descriptionEs = String(fields.description_es ?? "").trim();
  const descriptionEn = String(fields.description_en ?? "").trim();
  const demoUrl = String(fields.demoUrl ?? "").trim();
  
  let image = "";
  if (Array.isArray(fields.image) && fields.image.length > 0) {
    image = String(fields.image[0].url ?? "");
  } else if (typeof fields.image === "string") {
    image = String(fields.image).trim();
  }
  if (!image) {
    image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
  }

  if (!descriptionEs && !descriptionEn) return null;

  return {
    id,
    name,
    client: fields.client ? String(fields.client) : null,
    category,
    description: { es: descriptionEs || descriptionEn, en: descriptionEn || descriptionEs },
    technologies: splitList(fields.technologies),
    languages: splitList(fields.languages),
    demoUrl,
    githubUrl: fields.githubUrl ? String(fields.githubUrl) : null,
    status: status === "in_progress" ? "in_progress" : "delivered",
    publishedAt,
    image,
    access: null,
  };
};

const toAirtableFields = (project: Project) => {
  return {
    id: project.id || crypto.randomUUID(),
    name: project.name,
    client: project.client,
    category: project.category,
    description_es: project.description.es,
    description_en: project.description.en,
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
    url.searchParams.set("filterByFormula", `{status}="delivered"`);
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
  url.searchParams.set("filterByFormula", formula.eq("name", uuid));
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

      const recordId = project.id ? await findProjectRecordIdByUuid(project.id) : null;
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
