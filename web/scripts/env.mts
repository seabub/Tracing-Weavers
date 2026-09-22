/**
 * Minimal .env loader — the mint script is the only thing here that needs
 * server-side secrets, and it must work with `tsx scripts/mint-cloth.ts`
 * without depending on a Node flag being passed correctly.
 * Existing process.env values always win.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnv(cwd = process.cwd()) {
    for (const file of [".env.local", ".env"]) {
        const path = resolve(cwd, file);
        if (!existsSync(path)) continue;

        for (const rawLine of readFileSync(path, "utf8").split("\n")) {
            const line = rawLine.trim();
            if (!line || line.startsWith("#")) continue;

            const eq = line.indexOf("=");
            if (eq === -1) continue;

            const key = line.slice(0, eq).trim();
            let value = line.slice(eq + 1).trim();

            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }

            if (!(key in process.env)) process.env[key] = value;
        }
    }
}

export function requireEnv(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(
            `Missing ${key}. Copy .env.example to .env.local and fill it in.`,
        );
    }
    return value;
}
