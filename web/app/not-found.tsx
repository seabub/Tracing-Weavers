import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
            <div className="eyebrow">404</div>
            <h1 className="display mt-5 text-4xl">No record lives at this address.</h1>
            <p className="mt-5 max-w-[48ch] text-base text-muted-foreground">
                Records are reached by tapping the tag on the product, or from
                the list of records.
            </p>
            <Link href="/" className="mt-6 inline-block text-[12px] uppercase tracking-[.18em]">
                ← All records
            </Link>
        </div>
    );
}