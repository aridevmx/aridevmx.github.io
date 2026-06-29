import { json } from "./_lib/http";
import { listAllRecords } from "./_lib/airtable";

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

const tableName = () => process.env.AIRTABLE_EXPERIENCE_TABLE ?? "Experience";

const toExperience = (fields: Record<string, unknown>): Experience | null => {
  const company = String(fields.company ?? "").trim();
  if (!company) return null;

  const start = String(fields.period_start ?? "").trim();
  const end = fields.current ? "hoy" : String(fields.period_end ?? "").trim();
  const period = start && end ? `${start} \u2013 ${end}` : start || end || "";

  return {
    id: String(fields.id ?? "").trim() || "",
    company,
    role: String(fields.role ?? "").trim(),
    period,
    description: String(fields.description_es ?? fields.description_en ?? "").trim(),
  };
};

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "GET") return json(405, { error: "Method not allowed" });

  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    return json(500, { error: "Servidor no configurado (Airtable)" });
  }

  try {
    const records = await listAllRecords<Record<string, unknown>>(tableName(), {
      sortField: "period_start",
      sortDirection: "desc",
      maxRecords: "20",
    });

    const experience = records
      .map((r) => toExperience(r.fields))
      .filter(Boolean) as Experience[];

    return json(200, { experience });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(500, { error: message });
  }
}
