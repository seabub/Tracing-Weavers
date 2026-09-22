import Link from "next/link";
import { passportStore } from "@/lib/store";
import { currentIdentity, heldIds } from "@/lib/session";
import { records } from "@/lib/records";
import { t } from "@/lib/copy";
import { PassportShelf } from "@/components/passport/PassportShelf";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { Button } from "@/components/ui/button";
import type { Passport } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "My passport" };

/* OPERATE surface: the things you hold, and the one action that matters
   (read another tag). No masthead theatre.

   What is listed comes from the signed held-passport cookie — the ids this
   browser has proved it holds — NOT from whatever email happens to be typed in.
   That is the difference between a collection and a lookup service for other
   people's names. */
export default async function CollectionPage() {
    const [identity, ids] = await Promise.all([currentIdentity(), heldIds()]);
    const store = passportStore();
    const found = await Promise.all(
        ids.map((id) => store.get(id).catch(() => null)),
    );
    const issued = found.filter((passport): passport is Passport => Boolean(passport));

    const emptyState = (
        <div className="rounded-lg px-6 py-14 text-center shadow-[var(--ring)]">
            <p className="display text-2xl">{t.collectionEmpty}</p>
            <p className="mx-auto mt-3 max-w-[52ch] text-[17px] text-muted-foreground">
                {t.collectionEmptyNote}
            </p>
            <TagLookupForm className="mx-auto mt-6 max-w-sm text-left" />
        </div>
    );

    return (
        <div className="space-y-9">
            <header className="border-b border-border pb-5">
                <div className="eyebrow">{t.collectionEyebrow}</div>
                <h1 className="mt-3">{t.collectionTitle}</h1>
                <p className="mt-3 max-w-[52ch] text-[17px] text-muted-foreground">
                    {identity
                        ? `Tercatat atas ${identity.email}.`
                        : t.collectionSignInNote}
                </p>
            </header>

            {!identity && (
                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">{t.signInEyebrow}</div>
                    <p className="mt-3 text-[17px] text-muted-foreground">
                        No password, no wallet. Just an email.
                    </p>
                    <Link href="/login" className="mt-5 inline-block">
                        <Button size="lg">{t.signIn}</Button>
                    </Link>
                </div>
            )}

            <PassportShelf issued={issued} records={records} emptyState={emptyState} />

            {issued.length > 0 && (
                <Link
                    href="/scan"
                    className="inline-block text-[14px] text-muted-foreground hover:text-ink"
                >
                    {t.readTag} →
                </Link>
            )}

            {identity && (
                <p className="max-w-[52ch] text-[13px] text-muted-foreground">
                    A passport issued on another device arrives here once you open its verification link and press “Save to my collection”.
                </p>
            )}
        </div>
    );
}