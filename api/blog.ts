import { json } from "./_lib/http";
import { airtableTableUrl, formula } from "./_lib/airtable";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage: string | null;
  url: string | null;
};

const tableName = () => process.env.AIRTABLE_BLOG_TABLE ?? "blog";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request) {
  if (req.method !== "GET") return json(405, { error: "Method not allowed" });

  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    return json(500, { error: "Servidor no configurado (Airtable)" });
  }

  try {
    const url = new URL(airtableTableUrl(tableName()));
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("filterByFormula", formula.isTrue("published"));

    const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN ?? ""}` } });
    const text = await res.text();
    const jsonRes = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const msg = jsonRes?.error?.message || jsonRes?.error || text || `HTTP ${res.status}`;
      throw new Error(`Airtable error: ${msg}`);
    }

    const records = Array.isArray(jsonRes?.records) ? (jsonRes.records as unknown[]) : [];
    const posts: BlogPost[] = records
      .map((r) => {
        if (typeof r !== "object" || r === null) return null;
        const record = r as Record<string, unknown>;
        const fields = typeof record.fields === "object" && record.fields !== null ? (record.fields as Record<string, unknown>) : {};
        const id = String((fields.id ?? record.id ?? "") as unknown).trim();
        const title = String((fields.title ?? "") as unknown).trim();
        const slug = String((fields.slug ?? "") as unknown).trim();
        const excerpt = String((fields.excerpt ?? "") as unknown).trim();
        const publishedAt = String((fields.publishedAt ?? "") as unknown).trim();
        if (!title || !slug || !publishedAt) return null;
        return {
          id,
          title,
          slug,
          excerpt,
          publishedAt,
          coverImage: fields.coverImage ? String(fields.coverImage) : null,
          url: fields.url ? String(fields.url) : null,
        };
      })
      .filter((p): p is BlogPost => p !== null);

    return json(200, { posts }, { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(500, { error: message });
  }
}
