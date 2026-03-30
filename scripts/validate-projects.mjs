import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { validateProjectsData } from "../src/data/projectsSchema.js";

const projectsFilePath = path.resolve(process.cwd(), "src/data/projects.json");

const formatJsonParseError = (text, error) => {
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/position\s+(\d+)/i);
  if (!match) return message;

  const position = Number(match[1]);
  if (!Number.isFinite(position)) return message;

  const before = text.slice(0, position);
  const lines = before.split(/\r?\n/);
  const line = lines.length;
  const column = lines[lines.length - 1]?.length ?? 0;

  const lineStart = before.lastIndexOf("\n") + 1;
  const lineEndIndex = text.indexOf("\n", position);
  const lineEnd = lineEndIndex === -1 ? text.length : lineEndIndex;
  const lineText = text.slice(lineStart, lineEnd);
  const caret = `${" ".repeat(Math.max(0, column))}^`;

  return `${message}\n\nLínea ${line}, columna ${column + 1}\n${lineText}\n${caret}`;
};

try {
  const rawText = await fs.readFile(projectsFilePath, "utf8");

  let json;
  try {
    json = JSON.parse(rawText);
  } catch (error) {
    console.error(`projects.json mal formado:\n${formatJsonParseError(rawText, error)}`);
    process.exit(1);
  }

  const allowCredentialsInBundle = process.env.ALLOW_PROJECT_ACCESS_CREDS === "true";
  validateProjectsData(json, { allowCredentialsInBundle });

  process.stdout.write("projects.json OK\n");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
