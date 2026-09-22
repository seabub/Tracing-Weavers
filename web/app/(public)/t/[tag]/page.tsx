import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveTag } from "@/lib/tags";

export const dynamic = "force-dynamic";

/**
 * The NFC / QR landing route.
 *
 * A tag is written with exactly one URL: `${NEXT_PUBLIC_SITE_URL}/t/<TAG_CODE>`.
 * The code is resolved against data/tags.json and forwarded to the record, so a
 * tag can be re-pointed without rewriting the physical chip.
 */
export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    const resolved = resolveTag(tag);

    if (resolved) {
        redirect(`/record/${resolved.record.code}?tag=${encodeURIComponent(tag)}`);
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="eyebrow">Tag not recognised</div>
            <h1 className="display mt-5 text-3xl sm:text-4xl">
                This tag is not attached
                <br />
                to a record yet.
            </h1>
            <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
                The tag read <span className="font-medium text-foreground">{tag}</span>.
                It is either not in the registry, or the product has not been
                written up yet.
            </p>

            <div className="mt-10 rounded-xl border border-border bg-card p-6">
                <div className="eyebrow">Read it another way</div>
                <p className="mt-3 text-base text-muted-foreground">
                    Enter the code printed next to the tag.
                </p>
                <Link href="/scan" className="mt-5 inline-block text-[12px] uppercase tracking-[.18em]">
                    Open the reader →
                </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border-t border-border pt-4">
                    <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                        Field team
                    </div>
                    <p className="mt-2 text-base text-muted-foreground">
                        Add the code to{" "}
                        <span className="font-medium">data/tags.json</span> with the
                        record it should open, then redeploy.
                    </p>
                </div>
                <div className="border-t border-border pt-4">
                    <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                        Browse instead
                    </div>
                    <p className="mt-2 text-base text-muted-foreground">
                        <Link href="/">All records →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}