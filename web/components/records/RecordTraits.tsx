import { WeftCrossing } from "@/components/motif/marks";

type Attribute = { trait_type?: string; value?: unknown };

/* The interface speaks English, so the craft's own word follows as a gloss. */
const GLOSS: Record<string, string> = {
    maker: "Penenun",
    origin: "Asal",
    material: "Bahan",
    technique: "Teknik",
    dye: "Pewarna",
    "weeks on the loom": "Lama di alat tenun",
    "dye baths": "Kali celup",
    "journey step": "Tahap",
    "record type": "Jenis",
    season: "Musim panen",
};

function label(traitType: string | undefined) {
    if (!traitType) return "";
    const gloss = GLOSS[traitType.trim().toLowerCase()];
    return gloss ? `${traitType} · ${gloss}` : traitType;
}

/* The fact table of the record: hairline rows, label caps left, value right.
   Structure carries the hierarchy — no boxes, no chips. */
export function RecordTraits({ attributes }: { attributes?: Attribute[] }) {
    if (!attributes?.length) return null;

    return (
        <section>
            <div className="flex items-end justify-between gap-4">
                <h2 className="eyebrow">Cloth notes · Traits</h2>
                <WeftCrossing className="h-4 w-20 text-stone" aria-hidden />
            </div>

            <dl className="mt-4">
                {attributes.map((attribute, i) => (
                    <div
                        key={`${attribute.trait_type}-${i}`}
                        className="flex items-baseline justify-between gap-6 border-t border-border py-3"
                    >
                        <dt className="label">{label(attribute.trait_type)}</dt>
                        <dd className="num text-right text-[17px]">
                            {String(attribute.value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}