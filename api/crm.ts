import { json, readJson, getClientIp } from "./_lib/http";
import { createRecord } from "./_lib/airtable";

type Body = {
  name: string;
  email: string;
  message: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    return json(500, { error: "Servidor no configurado (Airtable)" });
  }

  try {
    const body = await readJson<Body>(req);
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name) return json(400, { error: "Falta nombre" });
    if (!email || !isEmail(email)) return json(400, { error: "Email inválido" });
    if (!message) return json(400, { error: "Falta mensaje" });

    const table = process.env.AIRTABLE_CRM_TABLE ?? "crm";
    const ip = getClientIp(req);

    await createRecord(table, {
      name,
      email,
      message,
      ip,
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
    });

    return json(200, { ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(400, { error: message });
  }
}

