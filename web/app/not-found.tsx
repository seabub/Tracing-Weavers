import Link from "next/link";
import { t } from "@/lib/copy";
import { ThreadRule } from "@/components/motif/marks";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
            <div className="eyebrow">404</div>
            <h1 className="mt-4">This address points at nothing.</h1>
            <p className="mt-4 max-w-[48ch] text-[17px] text-muted-foreground">
                A record opens when you hold a phone to the tag on the cloth. A passport opens through its verification link.
            </p>
            <ThreadRule className="mt-9 h-2 w-full text-stone" aria-hidden />
            <Link
                href="/"
                className="mt-6 inline-block text-[14px] text-muted-foreground hover:text-ink"
            >
                ← {t.backToRecords}
            </Link>
        </div>
    );
}