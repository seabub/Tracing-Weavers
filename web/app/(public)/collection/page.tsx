import Link from "next/link";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { records } from "@/lib/records";
import { PassportShelf } from "@/components/passport/PassportShelf";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";

export const dynamic = "force-dynamic";

export const metadata = { title: "My passports" };

export default async function CollectionPage() {
    const identity = await currentIdentity();
    const store = passportStore();
    const issued = identity ? await store.listByHolder(identity.email) : [];

    return (
        <div className="space-y-8">
            <div>
                <div className="eyebrow">My passports</div>
                <h1 className="display mt-3 text-3xl">Held in your name</h1>
                <p className="mt-3 max-w-[52ch] text-base text-muted-foreground">
                    {identity
                        ? `Passports issued to ${identity.email}.`
                        : "Sign in with the email you claimed with to see the passports issued to you."}
                </p>
            </div>

            {!identity ? (
                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="eyebrow">Sign in</div>
                    <p className="mt-3 text-base text-muted-foreground">
                        No password and no wallet — the email is the whole key.
                    </p>
                    <Link
                        href="/login"
                        className="mt-5 inline-block rounded-lg bg-bt-red px-5 py-3 text-[13px] uppercase tracking-[.12em] font-medium text-white transition-colors hover:bg-bt-red-bright"
                    >
                        Sign in
                    </Link>
                </div>
            ) : null}

            {identity && issued.length === 0 && (
                <div className="space-y-4 rounded-xl border border-dashed border-border px-6 py-16 text-center">
                    <p className="display text-2xl">Nothing here yet</p>
                    <p className="mx-auto max-w-[52ch] text-base text-muted-foreground">
                        Just claimed a record? It appears here immediately. If you
                        claimed it on another device, the store has to be
                        configured for it to follow you — see the README.
                    </p>
                    <TagLookupForm className="mx-auto mt-6 max-w-sm text-left" />
                </div>
            )}

            <PassportShelf issued={issued} records={records} />

            {identity && issued.length > 0 && (
                <Link
                    href="/scan"
                    className="inline-block text-[12px] uppercase tracking-[.18em] text-muted-foreground"
                >
                    Read another tag →
                </Link>
            )}
        </div>
    );
}