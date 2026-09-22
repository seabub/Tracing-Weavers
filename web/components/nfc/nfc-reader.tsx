"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/* Web NFC is Android Chrome only, so this is progressive enhancement: if the
   browser has no NDEFReader the block renders nothing and the visitor uses the
   system camera / QR path instead. */

type NdefRecordLike = {
    recordType: string;
    data?: DataView;
    toText?: () => string;
};

type NdefReadingEventLike = { message: { records: NdefRecordLike[] } };

type NdefReaderLike = {
    scan: (options?: { signal?: AbortSignal }) => Promise<void>;
    onreading: ((event: NdefReadingEventLike) => void) | null;
    onreadingerror: (() => void) | null;
};

declare global {
    interface Window {
        NDEFReader?: new () => NdefReaderLike;
    }
}

function recordsToText(event: NdefReadingEventLike) {
    const decoder = new TextDecoder();
    return event.message.records
        .map((record) => {
            if (typeof record.toText === "function") return record.toText();
            if (record.data) return decoder.decode(record.data);
            return "";
        })
        .join(" ");
}

export function NfcReader() {
    const router = useRouter();
    const [supported, setSupported] = useState(false);
    const [listening, setListening] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setSupported(typeof window !== "undefined" && "NDEFReader" in window);
    }, []);

    const start = useCallback(async () => {
        setError(null);
        const NDEFReaderCtor = window.NDEFReader;
        if (!NDEFReaderCtor) return;

        try {
            const reader = new NDEFReaderCtor();
            await reader.scan();
            reader.onreading = (event) => {
                const text = recordsToText(event);
                const match = text.match(/\/t\/([A-Za-z0-9._~-]+)/i);
                setListening(false);
                if (match) {
                    router.push(`/t/${match[1]}`);
                    return;
                }
                const code = text.trim().replace(/[^A-Za-z0-9._~-]/g, "");
                if (code) router.push(`/t/${code}`);
                else setError("That tag carries no readable code.");
            };
            reader.onreadingerror = () =>
                setError("The tag could not be read. Try again, or type the code.");
            setListening(true);
        } catch {
            setError(
                "NFC scanning was blocked. Open the phone camera and point it at the tag instead.",
            );
            setListening(false);
        }
    }, [router]);

    if (!supported) return null;

    return (
        <div className="rounded-xl border border-border bg-card p-6">
            <div className="eyebrow">Tap it here</div>
            <p className="mt-3 text-base text-muted-foreground">
                This browser can read the tag directly. Hold the phone against it.
            </p>
            <Button className="mt-5 w-full sm:w-auto" onClick={start} disabled={listening}>
                {listening ? "Listening for a tag…" : "Start reading"}
            </Button>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </div>
    );
}