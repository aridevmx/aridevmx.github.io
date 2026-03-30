import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Project = {
  id: string;
  name: string;
  client: string | null;
  category: string;
  summary: { es: string; en: string };
  details?: {
    es: { problem?: string; solution?: string; result?: string };
    en: { problem?: string; solution?: string; result?: string };
  };
  technologies: string[];
  languages: string[];
  demoUrl: string;
  githubUrl: string | null;
  status: "in_progress" | "delivered";
  publishedAt: string;
  image: string;
};

const toCsvList = (value: string) =>
  value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const toCsv = (list: string[]) => list.join(", ");

const newUuid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "");

const emptyProject = (): Project => ({
  id: newUuid(),
  name: "",
  client: null,
  category: "",
  summary: { es: "", en: "" },
  details: { es: {}, en: {} },
  technologies: [],
  languages: [],
  demoUrl: "",
  githubUrl: null,
  status: "delivered",
  publishedAt: "",
  image: "",
});

const ProjectsAdmin = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginToken, setLoginToken] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => projects.find((p) => p.id === selectedId) ?? null, [projects, selectedId]);
  const [draft, setDraft] = useState<Project>(emptyProject);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchMe = async () => {
    const res = await fetch("/api/auth/me", { method: "GET" });
    const data = await res.json();
    return !!data?.authenticated;
  };

  const loadProjects = async () => {
    setProjectsError(null);
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects?includeDrafts=1", { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error cargando proyectos");
      setProjects(Array.isArray(data?.projects) ? data.projects : []);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const ok = await fetchMe();
        setAuthenticated(ok);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    void loadProjects().catch((err) => {
      setProjectsError(err instanceof Error ? err.message : String(err));
    });
  }, [authenticated]);

  useEffect(() => {
    if (!selected) return;
    setDraft(selected);
  }, [selected]);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: loginToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Login falló");
      setAuthenticated(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setAuthChecked(true);
    setProjects([]);
    setSelectedId(null);
    setDraft(emptyProject());
  };

  const handleNew = () => {
    setSelectedId(null);
    setDraft(emptyProject());
    setSaveError(null);
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: draft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error guardando proyecto");
      await loadProjects();
      setSelectedId(draft.id);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (!authChecked) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Admin</h1>
          {loginError && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{loginError}</div>}
          <Input placeholder="Token de acceso" value={loginToken} onChange={(e) => setLoginToken(e.target.value)} />
          <Button onClick={handleLogin} className="w-full">
            Entrar
          </Button>
          <div className="text-xs text-muted-foreground">
            El token se valida contra la tabla auth de Airtable. La sesión se guarda en cookie HttpOnly.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Proyectos</h1>
            <Button variant="outline" onClick={handleLogout}>
              Salir
            </Button>
          </div>

          {projectsError && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{projectsError}</div>}

          <div className="flex gap-2">
            <Button onClick={handleNew} className="w-full">
              Nuevo
            </Button>
            <Button variant="outline" onClick={() => void loadProjects()} disabled={loadingProjects}>
              Recargar
            </Button>
          </div>

          <div className="rounded-xl border border-border/60 overflow-hidden">
            <div className="max-h-[70vh] overflow-auto">
              {projects.map((p) => (
                <button
                  key={p.id}
                  className={`w-full text-left px-4 py-3 border-b border-border/60 hover:bg-muted ${selectedId === p.id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedId(p.id)}
                  type="button"
                >
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.status} · {p.publishedAt}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {saveError && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{saveError}</div>}

          <div className="grid gap-3">
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <Input placeholder="id (UUID)" value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} />
              <Button type="button" variant="outline" onClick={() => setDraft({ ...draft, id: newUuid() })}>
                Nuevo ID
              </Button>
            </div>
            <Input placeholder="Nombre" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <Input placeholder="Cliente (opcional)" value={draft.client ?? ""} onChange={(e) => setDraft({ ...draft, client: e.target.value.trim() ? e.target.value : null })} />
            <Input placeholder="Categoría" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            <Textarea placeholder="Resumen ES (<=150)" value={draft.summary.es} onChange={(e) => setDraft({ ...draft, summary: { ...draft.summary, es: e.target.value } })} />
            <Textarea placeholder="Resumen EN (<=150)" value={draft.summary.en} onChange={(e) => setDraft({ ...draft, summary: { ...draft.summary, en: e.target.value } })} />
            <Input
              placeholder="Tecnologías (CSV)"
              value={toCsv(draft.technologies)}
              onChange={(e) => setDraft({ ...draft, technologies: toCsvList(e.target.value) })}
            />
            <Input
              placeholder="Lenguajes (CSV)"
              value={toCsv(draft.languages)}
              onChange={(e) => setDraft({ ...draft, languages: toCsvList(e.target.value) })}
            />
            <Input placeholder="Demo URL" value={draft.demoUrl} onChange={(e) => setDraft({ ...draft, demoUrl: e.target.value })} />
            <Input placeholder="GitHub URL (opcional)" value={draft.githubUrl ?? ""} onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value.trim() ? e.target.value : null })} />
            <div className="grid grid-cols-2 gap-3">
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as "in_progress" | "delivered" })}
              >
                <option value="delivered">delivered</option>
                <option value="in_progress">in_progress</option>
              </select>
              <Input placeholder="publishedAt (YYYY-MM-DD)" value={draft.publishedAt} onChange={(e) => setDraft({ ...draft, publishedAt: e.target.value })} />
            </div>
            <Input placeholder="Imagen URL" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />

            <div className="grid gap-3">
              <h2 className="text-lg font-semibold">Detalles (opcional)</h2>
              <Textarea
                placeholder="details.es.problem"
                value={draft.details?.es?.problem ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}), problem: e.target.value }, en: { ...(draft.details?.en ?? {}) } } })}
              />
              <Textarea
                placeholder="details.es.solution"
                value={draft.details?.es?.solution ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}), solution: e.target.value }, en: { ...(draft.details?.en ?? {}) } } })}
              />
              <Textarea
                placeholder="details.es.result"
                value={draft.details?.es?.result ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}), result: e.target.value }, en: { ...(draft.details?.en ?? {}) } } })}
              />
              <Textarea
                placeholder="details.en.problem"
                value={draft.details?.en?.problem ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}) }, en: { ...(draft.details?.en ?? {}), problem: e.target.value } } })}
              />
              <Textarea
                placeholder="details.en.solution"
                value={draft.details?.en?.solution ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}) }, en: { ...(draft.details?.en ?? {}), solution: e.target.value } } })}
              />
              <Textarea
                placeholder="details.en.result"
                value={draft.details?.en?.result ?? ""}
                onChange={(e) => setDraft({ ...draft, details: { es: { ...(draft.details?.es ?? {}) }, en: { ...(draft.details?.en ?? {}), result: e.target.value } } })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
