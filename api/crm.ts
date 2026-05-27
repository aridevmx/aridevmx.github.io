import { json, readJson, getClientIp } from "./_lib/http";
import { createRecord } from "./_lib/airtable";

type Body = {
  name: string;
  phone?: string;
  email: string;
  message: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  if (!process.env.AIRTABLE_TOKEN && !process.env.BOLTEN_API_KEY) {
    return json(500, { error: "Servidor no configurado (Airtable/Bolten)" });
  }

  try {
    const body = await readJson<Body>(req);
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name) return json(400, { error: "Falta nombre" });
    if (!email || !isEmail(email)) return json(400, { error: "Email inválido" });
    if (!message) return json(400, { error: "Falta mensaje" });

    const table = process.env.AIRTABLE_CRM_TABLE ?? "crm";
    const ip = getClientIp(req);

    // Guardar en Airtable (si está configurado)
    if (process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID) {
      try {
        await createRecord(table, {
          Name: name,
          phone: phone || "",
          email,
          message,
          ip: ip || "unknown",
          userAgent: req.headers.get("user-agent") ?? "unknown",
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Airtable CRM Error:", err);
      }
    }

    // Guardar en Bolten CRM (si está configurado)
    if (process.env.BOLTEN_API_KEY && process.env.BOLTEN_PROJECT_ID) {
      try {
        const boltenUrl = `https://app.bolten.io/kanban/api/v1/${process.env.BOLTEN_PROJECT_ID}/opportunities`;
        const boltenRes = await fetch(boltenUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BOLTEN_API_KEY}`,
          },
          body: JSON.stringify({
            title: `Lead: ${name}`,
            name,
            email,
            message,
            source: "Portfolio Contact Form",
          }),
        });
        if (!boltenRes.ok) {
          console.error("Bolten API Error:", await boltenRes.text());
        }
      } catch (err) {
        console.error("Bolten Fetch Error:", err);
      }
    }

    return json(200, { ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(400, { error: message });
  }
}

