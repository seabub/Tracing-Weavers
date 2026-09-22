import { WeftCrossing } from "@/components/motif/marks";

type Attribute = { trait_type?: string; value?: unknown };

/* The attribute names are already English (data/records.json), so the table
   prints them as they are — no gloss, nothing to translate. */
function label(traitType: string | undefined): string {
    return traitType?.trim() ?? "";
}

/* The fact table of the record: hairline rows, label caps left, value right.
   Structure carries the hierarchy — no boxes, no chips. */
export function RecordTraits({ attributes }: { attributes?: Attribute[] }) {
    if (!attributes?.length) return null;

    return (
        <section>
            <div className="flex items-end justify-between gap-4">
                <h2 className="eyebrow">Cloth notes</h2>
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