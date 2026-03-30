import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";
import { validateProjectsData } from "../src/data/projectsSchema.js";

const projectsFilePath = path.resolve(process.cwd(), "src/data/projects.json");

const parseArgs = (argv) => {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) {
      args[key] = true;
      i -= 1;
    } else {
      args[key] = value;
      i += 1;
    }
  }
  return args;
};

const b64 = (buf) => Buffer.from(buf).toString("base64");

const encryptWithPassphrase = (plaintext, passphrase) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const iterations = 150000;
  const key = crypto.pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const cipherText = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const packed = Buffer.concat([cipherText, authTag]);

  return {
    kdf: "pbkdf2-sha256",
    iterations,
    saltB64: b64(salt),
    alg: "aes-256-gcm",
    ivB64: b64(iv),
    cipherTextB64: b64(packed),
  };
};

const splitList = (value) =>
  String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const nowIsoDate = () => new Date().toISOString().slice(0, 10);

const args = parseArgs(process.argv);

const usage = () => {
  process.stdout.write(
    [
      "Uso:",
      "  node scripts/add-project.mjs --name <nombre> --category <categoria> --summaryEs <texto> --summaryEn <texto> --technologies <a,b> --languages <a,b> --demoUrl <url> --githubUrl <url|null> --status <in_progress|delivered> --publishedAt <YYYY-MM-DD> --image <url>",
      "",
      "Opcional:",
      "  --id <uuid|auto>",
      "  --client <cliente>  --problemEs <t> --solutionEs <t> --resultEs <t> --problemEn <t> --solutionEn <t> --resultEn <t>",
      "  --accessRequired <true|false> --accessUser <u> --accessPass <p> --passphraseEnv <ENV_NAME>",
      "",
      "Modo rápido:",
      '  --quick "idOrAuto|name|category|summaryEs|summaryEn|technologiesCSV|languagesCSV|demoUrl|githubUrlOrNull|status|publishedAt|imageUrl"',
      "",
    ].join("\n"),
  );
};

const parseQuick = (value) => {
  const parts = String(value).split("|");
  if (parts.length < 12) {
    throw new Error(`--quick inválido: se esperaban 12 campos separados por "|", se recibieron ${parts.length}`);
  }
  const [id, name, category, summaryEs, summaryEn, technologies, languages, demoUrl, githubUrl, status, publishedAt, image] = parts;
  return {
    id,
    name,
    category,
    summaryEs,
    summaryEn,
    technologies,
    languages,
    demoUrl,
    githubUrl,
    status,
    publishedAt,
    image,
  };
};

const toNullableUrl = (value) => {
  const v = String(value).trim();
  if (v.toLowerCase() === "null") return null;
  return v;
};

try {
  const quick = args.quick ? parseQuick(args.quick) : null;
  const idInput = (quick?.id ?? args.id ?? "auto").toString().trim();
  const id = idInput && idInput.toLowerCase() !== "auto" ? idInput : crypto.randomUUID();

  const passphraseEnvName = (args.passphraseEnv ?? "PROJECT_CRED_PASSPHRASE").toString();
  const passphrase = process.env[passphraseEnvName] ?? "";
  const accessRequired = String(args.accessRequired ?? "false") === "true";
  const shouldEncrypt = accessRequired && (args.accessUser || args.accessPass);
  if (shouldEncrypt && !passphrase) {
    throw new Error(`Falta la passphrase de cifrado. Define ${passphraseEnvName} en el entorno.`);
  }

  const access =
    accessRequired || shouldEncrypt
      ? {
          required: true,
          usernameEnc: args.accessUser ? encryptWithPassphrase(String(args.accessUser), passphrase) : null,
          passwordEnc: args.accessPass ? encryptWithPassphrase(String(args.accessPass), passphrase) : null,
        }
      : null;

  const project = {
    id,
    name: (quick?.name ?? args.name ?? "").toString().trim(),
    client: (args.client ?? null) === null ? null : String(args.client).trim(),
    category: (quick?.category ?? args.category ?? "").toString().trim(),
    summary: {
      es: (quick?.summaryEs ?? args.summaryEs ?? "").toString(),
      en: (quick?.summaryEn ?? args.summaryEn ?? "").toString(),
    },
    details:
      args.problemEs || args.solutionEs || args.resultEs || args.problemEn || args.solutionEn || args.resultEn
        ? {
            es: {
              problem: args.problemEs ? String(args.problemEs) : undefined,
              solution: args.solutionEs ? String(args.solutionEs) : undefined,
              result: args.resultEs ? String(args.resultEs) : undefined,
            },
            en: {
              problem: args.problemEn ? String(args.problemEn) : undefined,
              solution: args.solutionEn ? String(args.solutionEn) : undefined,
              result: args.resultEn ? String(args.resultEn) : undefined,
            },
          }
        : undefined,
    technologies: splitList(quick?.technologies ?? args.technologies ?? ""),
    languages: splitList(quick?.languages ?? args.languages ?? ""),
    demoUrl: (quick?.demoUrl ?? args.demoUrl ?? "").toString(),
    githubUrl: toNullableUrl(quick?.githubUrl ?? args.githubUrl ?? "null"),
    status: (quick?.status ?? args.status ?? "delivered").toString(),
    publishedAt: (quick?.publishedAt ?? args.publishedAt ?? nowIsoDate()).toString(),
    image: (quick?.image ?? args.image ?? "").toString(),
    access,
  };

  const fileText = await fs.readFile(projectsFilePath, "utf8");
  const json = JSON.parse(fileText);
  const parsed = validateProjectsData(json, { allowCredentialsInBundle: process.env.ALLOW_PROJECT_ACCESS_CREDS === "true" });

  const next = {
    projects: [...parsed.projects, project],
  };

  validateProjectsData(next, { allowCredentialsInBundle: process.env.ALLOW_PROJECT_ACCESS_CREDS === "true" });

  const pretty = `${JSON.stringify(next, null, 2)}\n`;
  await fs.writeFile(projectsFilePath, pretty, "utf8");

  process.stdout.write(`Proyecto agregado: ${id}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
