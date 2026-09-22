"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { forgetLocalPassports } from "@/lib/local-passports";

/**
 * Sign out — and mean it.
 *
 * `forgetLocalPassports` existed but nothing called it, and DELETE /api/session
 * had no button: signing out left the holder's name, email and passport ids in
 * localStorage on a shared phone. Now both cookies and the local copy go.
 */
export function SignOutButton() {
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    async function signOut() {
        setBusy(true);
        try {
            await fetch("/api/session", { method: "DELETE" });
        } catch {
            /* Cookie is httpOnly: if the request fails, say so rather than
               pretending the holder is signed out. */
            setBusy(false);
            return;
        }
        forgetLocalPassports();
        router.refresh();
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-ink-2"
            onClick={signOut}
            disabled={busy}
        >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
        </Button>
    );
}