import { NfcReader } from "@/components/nfc/nfc-reader";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { tagCount } from "@/lib/tags";
import { siteUrl } from "@/lib/brand";

export const metadata = { title: "Read a tag" };

const STEPS = [
    {
        title: "Find the tag",
        body: "An NTAG213 chip is sewn into the piece, or printed into the label; a spare QR sits on the packaging.",
    },
    {
        title: "Hold the phone to it",
        body: "iPhone reads it from the lock screen with no app. Android needs NFC on, and reads from the home screen.",
    },
    {
        title: "Tap the banner",
        body: "The phone offers a link. It carries the record code and nothing else — no app install, no account yet.",
    },
    {
        title: "Read it, then claim it",
        body: "The record opens: the maker, the material, the time it took. Put your name on it and the passport is yours.",
    },
];

export default function ScanPage() {
    return (
        <div className="max-w-3xl">
            <div className="eyebrow">Reading a tag</div>
            <h1 className="display mt-5 text-3xl sm:text-5xl">
                Hold the phone
                <br />
                to the <span className="text-gradient">tag</span>.
            </h1>
            <p className="mt-6 max-w-[54ch] text-base text-muted-foreground">
                {tagCount} tags are registered. Each one opens the record of one
                product — and only that one.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {STEPS.map((step, i) => (
                    <div key={step.title} className="border-t border-border pt-4">
                        <div className="text-[11px] uppercase tracking-[.2em] text-bt-red">
                            {"0" + (i + 1)}
                        </div>
                        <div className="display mt-2 text-xl uppercase tracking-[.06em]">
                            {step.title}
                        </div>
                        <p className="mt-2 text-base text-muted-foreground">{step.body}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid gap-6">
                <NfcReader />

                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="eyebrow">Tag code</div>
                    <p className="mt-3 text-base text-muted-foreground">
                        No tag reader? Type the code printed next to the tag.
                    </p>
                    <TagLookupForm className="mt-5 max-w-md" />
                </div>

                <div className="ink-band rounded-xl p-6" data-theme="dark">
                    <div className="eyebrow">For the field team</div>
                    <p className="mt-3 max-w-[60ch] text-base text-white/75">
                        Write each tag with{" "}
                        <code className="text-salmon">
                            {siteUrl}/t/&lt;TAG_CODE&gt;
                        </code>{" "}
                        as an NDEF URI record, then add the code to{" "}
                        <code className="text-salmon">data/tags.json</code>.
                        Generate the list with{" "}
                        <code className="text-salmon">npm run nfc:urls</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}