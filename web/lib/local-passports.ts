"use client";

import type { Passport } from "@/lib/types";

const KEY = "dpp:passports";

/** Passports this browser has been issued. The authoritative list lives in
 *  the store on the server; this copy is what keeps the passport visible if
 *  the store is not configured (a Vercel deploy with no KV yet). */
export function readLocalPassports(): Passport[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Passport[]) : [];
    } catch {
        return [];
    }
}

export function rememberLocalPassport(passport: Passport) {
    if (typeof window === "undefined") return;
    const existing = readLocalPassports().filter((p) => p.id !== passport.id);
    window.localStorage.setItem(KEY, JSON.stringify([...existing, passport]));
}

export function forgetLocalPassports() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY);
}