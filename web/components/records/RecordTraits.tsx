import { WeftCrossing } from "@/components/motif/marks";

type Attribute = { trait_type?: string; value?: unknown };

/* Indonesian first, English kept as the gloss — the design system's rule for
   terms that a visitor may not read in Indonesian. */
const GLOSS: Record<string, string> = {
    maker: "Penenun",
    origin: "Asal",
    material: "Bahan",
    technique: "Teknik",
    dye: "Pewarna",
    "weeks on the loom": "Lama di alat tenun",
    "dye baths": "Kali celup",
    "journey step": "Tahap",
    "record type": "Jenis jejak",
    season: "Musim",
};

function label(traitType: string | undefined) {
    if (!traitType) return "";
    const gloss = GLOSS[traitType.trim().toLowerCase()];
    if (!gloss) return traitType;
    return `${gloss} · ${traitType}`;
}

export function RecordTraits({ attributes }: { attributes?: Attribute[] }) {
    if (!attributes?.length) return null;

    return (
        <div>
            <div className="flex items-end justify-between gap-4">
                <div className="eyebrow">Catatan kain · Traits</div>
                <WeftCrossing className="h-5 w-24 text-stone" aria-hidden />
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {attributes.map((attribute, i) => (
                    <div
                        key={`${attribute.trait_type}-${i}`}
                        className="flex items-baseline justify-between gap-4 border-t border-border py-3"
                    >
                        <dt className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">
                            {label(attribute.trait_type)}
                        </dt>
                        <dd className="text-right text-base font-medium">
                            {String(attribute.value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}