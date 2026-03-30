import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectsFilePath = path.resolve(process.cwd(), "src/data/projects.json");
const validateScriptPath = path.resolve(process.cwd(), "scripts/validate-projects.mjs");

let currentBuild = null;
let debounceTimer = null;

const run = (command, args) =>
  new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });
    child.on("exit", (code) => resolve(code ?? 1));
  });

const killCurrentBuild = () => {
  if (!currentBuild) return;
  try {
    currentBuild.kill("SIGTERM");
  } catch {
  }
  currentBuild = null;
};

const buildOnce = async () => {
  const validateExitCode = await run("node", [validateScriptPath]);
  if (validateExitCode !== 0) return;

  killCurrentBuild();
  currentBuild = spawn("vite", ["build"], { stdio: "inherit", shell: true });
  currentBuild.on("exit", () => {
    currentBuild = null;
  });
};

const scheduleBuild = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    void buildOnce();
  }, 150);
};

process.on("SIGINT", () => {
  killCurrentBuild();
  process.exit(0);
});

process.on("SIGTERM", () => {
  killCurrentBuild();
  process.exit(0);
});

console.log(`Observando cambios en: ${projectsFilePath}`);
await buildOnce();

fs.watch(projectsFilePath, { persistent: true }, () => {
  scheduleBuild();
});

