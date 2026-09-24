import Link from "next/link";
import { passportStore } from "@/lib/store";
import { currentIdentity, heldIds } from "@/lib/session";
import { records } from "@/lib/records";
import { PassportShelf } from "@/components/passport/PassportShelf";
import { Button } from "@/components/ui/button";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Traces" };

/**
 * Traces — the certificates you hold.
 *
 * What is listed is the signed held-passport cookie (the ids this browser has
 * proved it holds) plus everything issued to the signed-in account. That
 * distinction is the whole security model: a typed email reads nothing, and
 * knowing somebody's address does not open their certificates.
 *
 * Signed out, this page is a sign-in prompt rather than an empty book —
 * "no certificates yet" would be a lie for someone who has simply not signed
 * in on this device.
 */
export default async function CollectionPage() {
    const [identity, ids] = await Promise.all([currentIdentity(), heldIds()]);
    const store = passportStore();

    /* The held cookie is a device convenience, not a claim of ownership: it
       records "this browser once proved it held this id", which the verify
       page can set from anyone's link. So a held passport only counts when it
       belongs to the signed-in account — otherwise saving a friend's
       certificate to this device would put it in your traces. */
    const held = (
        await Promise.all(ids.map((id) => store.get(id).catch(() => null)))
    ).filter(
        (p): p is Passport =>
            p !== null &&
            (p.email ?? "").trim().toLowerCase() === (identity?.email ?? "\u0000"),
    );

    const byAccount = identity
        ? await store.listByHolder(identity.email).catch(() => [] as Passport[])
        : [];

    const merged = new Map<string, Passport>();
    for (const passport of [...held, ...byAccount]) merged.set(passport.id, passport);
    const issued = [...merged.values()].sort((a, b) =>
        a.issuedAt < b.issuedAt ? 1 : -1,
    );

    if (!identity) {
        return (
            <div className="mx-auto max-w-lg">
                <header className="border-b border-border pb-5">
                    <div className="eyebrow">Traces</div>
                    <h1 className="mt-3">Your certificates</h1>
                </header>
                <div className="mt-6 rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <p className="text-[15px] text-muted-foreground">
                        Sign in to see the certificates kept under your account —
                        one page per cloth you have claimed, bound as a book you
                        can open anywhere.
                    </p>
                    <Link
                        href={`/login?next=${encodeURIComponent("/collection")}`}
                        className="mt-5 inline-block"
                    >
                        <Button size="lg">Sign in</Button>
                    </Link>
                    <p className="mt-4 text-[14px] text-muted-foreground">
                        No account yet? The same page makes one.
                    </p>
                </div>
            </div>
        );
    }

    const emptyState = (
        <div className="rounded-lg px-6 py-14 text-center shadow-[var(--ring)]">
            <p className="display text-2xl">No certificates yet</p>
            <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-muted-foreground">
                Claim a cloth and its certificate appears here — one page per
                weave, kept under {identity.email}.
            </p>
            <Link href="/" className="mt-6 inline-block">
                <Button size="lg">Browse the collection</Button>
            </Link>
        </div>
    );

    return (
        <div className="space-y-9">
            <header className="border-b border-border pb-5">
                <div className="eyebrow">Traces</div>
                <h1 className="mt-3">Your certificates</h1>
                <p className="mt-3 max-w-[52ch] text-[15px] text-muted-foreground">
                    {issued.length === 0
                        ? `Kept under ${identity.email}.`
                        : `${issued.length} certificate${
                              issued.length === 1 ? "" : "s"
                          } kept under ${identity.email}. Open the book to read any of them.`}
                </p>
            </header>

            <PassportShelf issued={issued} records={records} emptyState={emptyState} />

            {issued.length > 0 && (
                <p className="max-w-[56ch] text-[14px] text-muted-foreground">
                    A certificate claimed on another device arrives here once you
                    open its verification link and press “Save to my
                    collection”.{" "}
                    <Link
                        href="/profile"
                        className="underline underline-offset-2 hover:text-ink"
                    >
                        Manage your account →
                    </Link>
                </p>
            )}
        </div>
    );
}