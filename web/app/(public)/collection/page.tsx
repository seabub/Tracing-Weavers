import Link from "next/link";
import { passportStore } from "@/lib/store";
import { currentIdentity } from "@/lib/session";
import { records } from "@/lib/records";
import { t } from "@/lib/copy";
import { PassportShelf } from "@/components/passport/PassportShelf";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { Button } from "@/components/ui/button";
import { WarpField } from "@/components/motif/marks";

export const dynamic = "force-dynamic";

export const metadata = { title: "Paspor saya" };

export default async function CollectionPage() {
    const identity = await currentIdentity();
    const store = passportStore();
    const issued = identity ? await store.listByHolder(identity.email) : [];

    return (
        <div className="space-y-10">
            <section className="ink-band cloth relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10" data-theme="dark">
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/12" />
                <div className="relative">
                    <div className="eyebrow">{t.collectionEyebrow}</div>
                    <h1 className="display mt-3 text-3xl sm:text-4xl">{t.collectionTitle}</h1>
                    <p className="mt-4 max-w-[52ch] text-base text-white/75">
                        {identity
                            ? `Paspor yang terbit ke ${identity.email}.`
                            : t.collectionSignInNote}
                    </p>
                </div>
            </section>

            {!identity && (
                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="eyebrow">{t.signInEyebrow}</div>
                    <p className="mt-3 text-base text-muted-foreground">
                        Tanpa kata sandi, tanpa dompet — emailnya saja.
                    </p>
                    <Link href="/login" className="mt-5 inline-block">
                        <Button size="lg">{t.signIn}</Button>
                    </Link>
                </div>
            )}

            {identity && issued.length === 0 && (
                <div className="space-y-4 rounded-xl border border-dashed border-border px-6 py-14 text-center">
                    <p className="display text-2xl">{t.collectionEmpty}</p>
                    <p className="mx-auto max-w-[52ch] text-base text-muted-foreground">
                        {t.collectionEmptyNote}
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
                    {t.readTag} →
                </Link>
            )}
        </div>
    );
}