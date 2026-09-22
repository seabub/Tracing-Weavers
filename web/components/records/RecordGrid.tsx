import RecordCard from "./RecordCard";
import type { ProductRecord } from "@/lib/records";

/* Entrance stagger is CSS (animation-delay via --i): it runs off the main
   thread, so it stays smooth while the page is still loading, and it never
   blocks interaction. 55ms between items. */
export default function RecordGrid({ records }: { records: ProductRecord[] }) {
    if (!records.length) {
        return (
            <div className="rounded-lg px-6 py-16 text-center shadow-[var(--ring)]">
                <p className="display text-2xl">Belum ada jejak</p>
                <p className="mx-auto mt-3 max-w-[46ch] text-[17px] text-muted-foreground">
                    Jejak muncul begitu kain pertama didaftarkan dari Adonara,
                    Lembata dan Manggarai.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-7">
            {records.map((record, i) => (
                <RecordCard key={record.code} record={record} index={i} />
            ))}
        </div>
    );
}