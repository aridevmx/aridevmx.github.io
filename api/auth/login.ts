import { json, readJson, getClientIp } from "../_lib/http";
import { createSessionToken, serializeCookie } from "../_lib/session";
import { airtableTableUrl, formula } from "../_lib/airtable";

type LoginBody = {
  token: string;
};

const rateState: Map<string, { count: number; resetAt: number }> = new Map();

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 20;
  const entry = rateState.get(ip);
  if (!entry || now > entry.resetAt) {
    rateState.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
};

const getAuthRecord = async (token: string) => {
  const table = process.env.AIRTABLE_AUTH_TABLE ?? "auth";
  const url = new URL(airtableTableUrl(table));
  url.searchParams.set("maxRecords", "1");
  url.searchParams.set("filterByFormula", formula.and(formula.eq("token", token), formula.isTrue("active")));
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN ?? ""}` } });
  const text = await res.text();
  const jsonRes = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = jsonRes?.error?.message || jsonRes?.error || text || `HTTP ${res.status}`;
    throw new Error(`Airtable error: ${msg}`);
  }
  const record = jsonRes?.records?.[0];
  return record ?? null;
};

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) return json(429, { error: "Too many attempts. Try again later." });

  try {
    const body = await readJson<LoginBody>(req);
    const token = body.token?.trim();
    if (!token) return json(400, { error: "Falta token" });

    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      return json(500, { error: "Servidor no configurado (Airtable)" });
    }

    const record = await getAuthRecord(token);
    if (!record) return json(401, { error: "Credenciales inválidas" });

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) return json(500, { error: "Servidor no configurado (SESSION_SECRET)" });

    const session = createSessionToken({ sub: record.id, exp: Date.now() + 8 * 60 * 60 * 1000 }, sessionSecret);
    const isHttps = req.headers.get("x-forwarded-proto") === "https" || process.env.NODE_ENV === "production";
    const cookie = serializeCookie("aridev_admin", session, { maxAgeSeconds: 8 * 60 * 60, httpOnly: true, secure: isHttps, sameSite: "Lax", path: "/" });
    return json(200, { ok: true }, { "Set-Cookie": cookie });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(400, { error: message });
  }
}
