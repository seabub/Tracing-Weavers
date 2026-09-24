import Link from "next/link";
import { currentIdentity, heldIds } from "@/lib/session";
import { passportStore } from "@/lib/store";
import { accountStore } from "@/lib/accounts";
import { ProfileForms } from "@/components/profile-forms";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Profile" };

/**
 * Account settings.
 *
 * This page used to be a second copy of the collection: the same passports,
 * under a "digital wallet" heading. That was one surface too many — the
 * certificates live in /collection ("Traces"), and what belongs here is the
 * only thing that page cannot do: change the password, and change the email
 * the account is kept under.
 */
export default async function ProfilePage() {
    const identity = await currentIdentity();

    if (!identity) {
        return (
            <div className="mx-auto max-w-lg">
                <header className="border-b border-border pb-5">
                    <div className="eyebrow">Profile</div>
                    <h1 className="mt-3">Not signed in</h1>
                </header>
                <div className="mt-6 rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <p className="text-[15px] text-muted-foreground">
                        Sign in to manage the account your certificates are kept
                        under.
                    </p>
                    <Link
                        href={`/login?next=${encodeURIComponent("/profile")}`}
                        className="mt-5 inline-block"
                    >
                        <Button size="lg">Sign in</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const account = await accountStore()
        .get(identity.email)
        .catch(() => null);
    const since = account?.createdAt
        ? new Date(account.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Jakarta",
          })
        : null;

    const ids = await heldIds();
    const store = passportStore();
    const owned = (
        await Promise.all(ids.map((id) => store.get(id).catch(() => null)))
    ).filter((p): p is Passport => Boolean(p));

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <header className="border-b border-border pb-5">
                <div className="eyebrow">Profile</div>
                <h1 className="mt-3">{identity.name}</h1>
                <p className="mt-2 text-[15px] text-muted-foreground">
                    {identity.email}
                    {identity.outlet ? ` · ${identity.outlet}` : ""}
                    {since ? ` · member since ${since}` : ""}
                </p>
                <p className="mt-3 text-[15px] text-muted-foreground">
                    {owned.length === 0
                        ? "No certificates yet."
                        : `${owned.length} certificate${owned.length === 1 ? "" : "s"} kept under this account.`}{" "}
                    <Link
                        href="/collection"
                        className="underline underline-offset-2 hover:text-ink"
                    >
                        See them in your traces →
                    </Link>
                </p>
            </header>

            <ProfileForms email={identity.email} />

            <p className="text-[12px] tracking-[.12em] uppercase text-muted-foreground">
                &copy; {brand} &middot; All rights reserved &middot; Confidential
            </p>
        </div>
    );
}