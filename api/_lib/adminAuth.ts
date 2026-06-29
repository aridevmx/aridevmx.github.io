import { parseCookies, verifySessionToken } from "./session.js";

export const getAdminSession = (req: Request) => {
  const cookies = parseCookies(req.headers.get("cookie") ?? undefined);
  const token = cookies.aridev_admin;
  if (!token) return null;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  return verifySessionToken(token, secret);
};

