import Link from "next/link";
import { records } from "@/lib/records";
import { tagCount } from "@/lib/tags";
import { brand } from "@/lib/brand";
import RecordGrid from "@/components/records/RecordGrid";

const EXPLAIN = [
    {
        title: "What you claim",
        body: "A passport for one product: where the material came from, whose hands made it, how long it took, and what the maker allows to be told about the design.",
    },
    {
        title: "Why it exists",
        body: "Maker knowledge is rarely credited and even more rarely paid for. A record makes the maker visible and keeps them attached to their work.",
    },
    {
        title: "What you get",
        body: "The passport is yours: a verified page, an id you can check, and a place in your collection. The record stays with the product, including on resale.",
    },
    {
        title: "What it is not",
        body: "Not ownership of the product. Not a token to trade, an investment or a donation receipt. No wallet, no gas, no crypto account to open.",
    },
];

export default function Home() {
    return (
        <>
            <section className="max-w-3xl">
                <div className="eyebrow">{brand} · Seed to Loom</div>
                <h1 className="display mt-5 text-4xl sm:text-6xl">
                    Read the record
                    <br />
                    of <span className="text-gradient">one product</span>.
                </h1>
                <p className="mt-6 max-w-[54ch] text-base text-muted-foreground sm:text-lg">
                    Every product carries a record of the hands that made it.
                    Tap the tag on the piece, or scan the code on the packaging,
                    to read where it came from — and to keep the record as your
                    own passport.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/scan"
                        className="rounded-lg bg-bt-red px-5 py-3 text-[13px] uppercase tracking-[.12em] font-medium text-white transition-colors hover:bg-bt-red-bright"
                    >
                        Read a tag
                    </Link>
                    <Link
                        href="/login"
                        className="rounded-lg border border-ink px-5 py-3 text-[13px] uppercase tracking-[.12em] font-medium transition-colors hover:bg-white"
                    >
                        Open my passport
                    </Link>
                </div>
            </section>

            <section className="mt-16">
                <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
                    <div>
                        <div className="eyebrow">Records</div>
                        <h2 className="display mt-2 text-2xl">One product. One record.</h2>
                    </div>
                    <span className="footnote hidden sm:block">
                        {records.length} records · {tagCount} tags
                    </span>
                </div>
                <RecordGrid records={records} />
            </section>

            <section
                className="ink-band mt-16 rounded-2xl px-6 py-12 sm:px-10"
                data-theme="dark"
            >
                <div className="eyebrow">Before you claim</div>
                <h2 className="display mt-4 max-w-[24ch] text-3xl">
                    A passport is not a token.
                </h2>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {EXPLAIN.map((item) => (
                        <div key={item.title} className="border-t border-white/20 pt-4">
                            <div className="text-[11px] uppercase tracking-[.2em] text-salmon">
                                {item.title}
                            </div>
                            <p className="mt-3 text-base text-white/75">{item.body}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-[12px] uppercase tracking-[.12em] text-white/50">
                    Targets, not promises · measured over the three-year pilot
                </p>
            </section>
        </>
    );
}