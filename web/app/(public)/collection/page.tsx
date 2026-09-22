import Link from "next/link";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { records } from "@/lib/records";
import { t } from "@/lib/copy";
import { PassportShelf } from "@/components/passport/PassportShelf";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata = { title: "Paspor saya" };

/* OPERATE surface: the things you hold, and the one action that matters
   (read another tag). No masthead theatre. */
export default async function CollectionPage() {
    const identity = await currentIdentity();
    const store = passportStore();
    const issued = identity ? await store.listByHolder(identity.email) : [];

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
                        Tanpa kata sandi, tanpa dompet. Cukup email.
                    </p>
                    <Link href="/login" className="mt-5 inline-block">
                        <Button size="lg">{t.signIn}</Button>
                    </Link>
                </div>
            )}

            {identity && issued.length === 0 && (
                <div className="rounded-lg px-6 py-14 text-center shadow-[var(--ring)]">
                    <p className="display text-2xl">{t.collectionEmpty}</p>
                    <p className="mx-auto mt-3 max-w-[52ch] text-[17px] text-muted-foreground">
                        {t.collectionEmptyNote}
                    </p>
                    <TagLookupForm className="mx-auto mt-6 max-w-sm text-left" />
                </div>
            )}

            <PassportShelf issued={issued} records={records} />

            {identity && issued.length > 0 && (
                <Link
                    href="/scan"
                    className="inline-block text-[14px] text-muted-foreground hover:text-ink"
                >
                    {t.readTag} →
                </Link>
            )}
        </div>
    );
}