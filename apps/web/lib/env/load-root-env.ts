import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\n/g, "\n").replace(/\\r/g, "\r");
  }
  return trimmed;
}

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) {
    return;
  }

  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (!key || key.startsWith("export ") || process.env[key]) {
      continue;
    }

    process.env[key] = stripQuotes(line.slice(separatorIndex + 1));
  }
}

export function loadRootEnv() {
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, ".env"),
    resolve(cwd, ".env.production"),
    resolve(cwd, "../.env"),
    resolve(cwd, "../.env.production"),
    resolve(cwd, "../../.env"),
    resolve(cwd, "../../.env.production")
  ];

  for (const filePath of candidates) {
    loadEnvFile(filePath);
  }
}
