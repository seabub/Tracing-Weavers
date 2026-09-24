import { records } from "@/lib/records";
import { t } from "@/lib/copy";
import { ThreadRule, WarpField, WeftCrossing } from "@/components/motif/marks";

export const metadata = { title: "Browse" };

const STEPS = [
    {
        title: "Find a cloth",
        body: "Every cloth in the exhibition carries a code — look for it on the label beside each piece.",
    },
    {
        title: "Open the record",
        body: "Browse the gallery or type the code. No app to install, no account needed.",
    },
    {
        title: "Read its story",
        body: "Where it was woven, from what, how long it took, and every hand that shaped it.",
    },
];

/* How to explore the collection — the tag-technical section is gone because
   there are no physical NFC tags deployed yet. This is a browse surface. */
export default function ScanPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <header>
                <div className="eyebrow">{t.scanEyebrow}</div>
                <h1 className="mt-4">
                    {t.scanTitleA} <span className="text-bt-red">{t.scanTitleB}</span>
                </h1>
                <p className="mt-4 max-w-[54ch] text-[17px] text-muted-foreground">
                    {records.length} cloths, six collections, three districts. One page per weave.
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

            <div
                className="ink-band cloth relative mt-10 overflow-hidden rounded-lg p-6"
                data-theme="dark"
            >
                <WarpField className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                <div className="relative">
                    <div className="eyebrow">How it works</div>
                    <p className="mt-3 max-w-[60ch] text-[16px] text-white/75">
                        Each cloth in the exhibition has a page here. The code on its label opens it — anyone can read it, no sign-in required. If the cloth changes hands, its record travels with it.
                    </p>
                </div>
            </div>

            <ThreadRule className="mt-14 h-2 w-full text-stone" aria-hidden />
        </div>
    );
}