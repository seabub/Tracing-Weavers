import Link from "next/link";
import { t } from "@/lib/copy";
import { ThreadRule } from "@/components/motif/marks";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
            <div className="eyebrow">404</div>
            <h1 className="display mt-5 text-4xl">
                Tidak ada jejak di alamat ini.
            </h1>
            <p className="mt-5 max-w-[48ch] text-base text-muted-foreground">
                Jejak dibuka dengan menempelkan tag pada kainnya, atau dari daftar
                jejak.
            </p>
            <ThreadRule className="mt-10 h-2 w-full text-stone" aria-hidden />
            <Link
                href="/"
                className="mt-6 inline-block text-[12px] uppercase tracking-[.18em]"
            >
                ← {t.backToRecords}
            </Link>
        </div>
    );
}