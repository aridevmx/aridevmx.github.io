export const json = (status: number, body: unknown, headers: Record<string, string> = {}) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
};

export const readJson = async <T>(req: Request): Promise<T> => {
  const text = await req.text();
  if (!text) throw new Error("Body vacío");
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON mal formado: ${message}`);
  }
};

export const getClientIp = (req: Request) => {
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  return xff.split(",")[0]?.trim() || "unknown";
};

