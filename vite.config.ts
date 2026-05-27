import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api/projects": {
          target: "https://api.airtable.com/v0",
          changeOrigin: true,
          rewrite: (path) => {
            const tableName = env.AIRTABLE_PROJECTS_TABLE || "Projects";
            return `/${env.AIRTABLE_BASE_ID}/${tableName}`;
          },
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("Authorization", `Bearer ${env.AIRTABLE_TOKEN}`);
            });
          },
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "import.meta.env.VITE_AIRTABLE_TOKEN": JSON.stringify(env.AIRTABLE_TOKEN),
      "import.meta.env.VITE_AIRTABLE_BASE_ID": JSON.stringify(env.AIRTABLE_BASE_ID),
    },
  };
});
