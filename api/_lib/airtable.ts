type AirtableRecord<TFields extends Record<string, unknown>> = {
  id: string;
  createdTime: string;
  fields: TFields;
};

type AirtableListResponse<TFields extends Record<string, unknown>> = {
  records: AirtableRecord<TFields>[];
  offset?: string;
};

const requireEnv = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
};

const airtableFetch = async (url: string, init?: RequestInit) => {
  const token = requireEnv("AIRTABLE_TOKEN");
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const errorMessage = json?.error?.message || json?.error || text || `HTTP ${res.status}`;
    throw new Error(`Airtable error: ${errorMessage}`);
  }

  return json;
};

const encodeFormulaValue = (value: string) => `"${value.replace(/"/g, '\\"')}"`;

export const airtableTableUrl = (tableName: string) => {
  const baseId = requireEnv("AIRTABLE_BASE_ID");
  return `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
};

export const listAllRecords = async <TFields extends Record<string, unknown>>(tableName: string, params: Record<string, string | undefined> = {}) => {
  const all: AirtableRecord<TFields>[] = [];
  let offset: string | undefined = undefined;

  do {
    const url = new URL(airtableTableUrl(tableName));
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined) continue;
      url.searchParams.set(k, v);
    }
    if (offset) url.searchParams.set("offset", offset);

    const json = (await airtableFetch(url.toString())) as AirtableListResponse<TFields>;
    all.push(...json.records);
    offset = json.offset;
  } while (offset);

  return all;
};

export const findFirstByField = async <TFields extends Record<string, unknown>>(tableName: string, fieldName: string, value: string) => {
  const url = new URL(airtableTableUrl(tableName));
  url.searchParams.set("maxRecords", "1");
  url.searchParams.set("filterByFormula", `AND({${fieldName}}=${encodeFormulaValue(value)})`);

  const json = (await airtableFetch(url.toString())) as AirtableListResponse<TFields>;
  return json.records[0] ?? null;
};

export const createRecord = async <TFields extends Record<string, unknown>>(tableName: string, fields: TFields) => {
  const url = airtableTableUrl(tableName);
  const json = await airtableFetch(url, { method: "POST", body: JSON.stringify({ fields }) });
  return json as AirtableRecord<TFields>;
};

export const updateRecord = async <TFields extends Record<string, unknown>>(tableName: string, recordId: string, fields: Partial<TFields>) => {
  const url = `${airtableTableUrl(tableName)}/${recordId}`;
  const json = await airtableFetch(url, { method: "PATCH", body: JSON.stringify({ fields }) });
  return json as AirtableRecord<TFields>;
};

export const formula = {
  and: (...parts: string[]) => `AND(${parts.join(",")})`,
  eq: (field: string, value: string) => `{${field}}=${encodeFormulaValue(value)}`,
  isTrue: (field: string) => `{${field}}=TRUE()`,
};
