import { json } from "../_lib/http";
import { getAdminSession } from "../_lib/adminAuth";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "GET") return json(405, { error: "Method not allowed" });
  const session = getAdminSession(req);
  if (!session) return json(200, { authenticated: false });
  return json(200, { authenticated: true });
}

