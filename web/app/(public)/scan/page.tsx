import { NfcReader } from "@/components/nfc/nfc-reader";
import { TagLookupForm } from "@/components/nfc/tag-lookup-form";
import { tagCount } from "@/lib/tags";
import { siteUrl } from "@/lib/brand";
import { t } from "@/lib/copy";
import { ThreadRule, WarpField, WeftCrossing } from "@/components/motif/marks";
import { Reveal } from "@/components/ui/reveal";

export const metadata = { title: "Read a tag" };

const STEPS = [
    {
        title: "Find the tag",
        body: "An NTAG213 chip is sewn into the edge of the cloth; a backup QR is on the packaging.",
    },
    {
        title: "Hold your phone to it",
        body: "iPhone reads it from the lock screen. Android: turn NFC on, hold, then tap the notification.",
    },
    {
        title: "Tap the banner",
        body: "It is a link to the cloth's record. No app to install, no account.",
    },
    {
        title: "Read it, then claim it",
        body: "Who wove it, from what, for how long. Put your name on it and the passport is yours.",
    },
];

/* CONFIGURE surface: how to do the one thing, then the two ways to do it. */
export default function ScanPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <header>
                <div className="eyebrow">{t.scanEyebrow}</div>
                <h1 className="mt-4">
                    {t.scanTitleA} <span className="text-bt-red">{t.scanTitleB}</span>
                </h1>
                <p className="mt-4 max-w-[54ch] text-[17px] text-muted-foreground">
                    {tagCount} {t.scanLead}
                </p>
            </header>

            <WeftCrossing className="mt-10 h-14 w-full text-stone" aria-hidden />

            <ol className="mt-8">
                {STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-5 border-t border-border py-4">
                        <span className="data w-6 shrink-0 pt-1 text-bt-red">
                            {"0" + (i + 1)}
                        </span>
                        <span>
                            <span className="block text-[19px] leading-tight">
                                {step.title}
                            </span>
                            <span className="mt-1 block text-[16px] text-muted-foreground">
                                {step.body}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>

            <div className="mt-10 grid gap-5">
                <NfcReader />

                <div className="rounded-lg bg-card p-6 shadow-[var(--ring)]">
                    <div className="eyebrow">Tag code</div>
                    <p className="mt-3 text-[17px] text-muted-foreground">
                        Tag not reading? Type the code printed beside it.
                    </p>
                    <TagLookupForm className="mt-5 max-w-md" />
                </div>

                <div
                    className="ink-band cloth relative overflow-hidden rounded-lg p-6"
                    data-theme="dark"
                >
                    <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                    <div className="relative">
                        <div className="eyebrow">For the field team</div>
                        <p className="mt-3 max-w-[60ch] text-[16px] text-white/75">
                            One tag, one URL, one line in the tag file.
                        </p>
                        <Reveal tone="ink" summary="How to write a tag" className="mt-4">
                            <p>
                                Write each tag with{" "}
                                <code className="data text-salmon">
                                    {siteUrl}/t/&lt;TAG_CODE&gt;
                                </code>{" "}
                                as an NDEF URI, then add its code to{" "}
                                <code className="data text-salmon">data/tags.json</code>.
                                The list of URLs comes from{" "}
                                <code className="data text-salmon">npm run nfc:urls</code>.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>

            <ThreadRule className="mt-14 h-2 w-full text-stone" aria-hidden />
        </div>
    );
}