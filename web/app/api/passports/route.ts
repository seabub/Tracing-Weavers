import { NextResponse } from "next/server";
import { passportStore } from "@/lib/store";

/** Read-only view of issued passports, for a dashboard or a spot-check by the
 *  field team: /api/passports?code=BT-0042 or ?email=someone@example.com */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const email = url.searchParams.get("email");
    const store = passportStore();

    const passports = code
        ? await store.listByRecord(code.toUpperCase())
        : email
          ? await store.listByHolder(email)
          : await store.all();

    return NextResponse.json({ backend: store.backend, count: passports.length, passports });
}