import { json } from "../_lib/http";
import { serializeCookie } from "../_lib/session";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  const isHttps = req.headers.get("x-forwarded-proto") === "https" || process.env.NODE_ENV === "production";
  const cookie = serializeCookie("aridev_admin", "", { maxAgeSeconds: 0, httpOnly: true, secure: isHttps, sameSite: "Lax", path: "/" });
  return json(200, { ok: true }, { "Set-Cookie": cookie });
}

