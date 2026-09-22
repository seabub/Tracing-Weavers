"use client";

/**
 * Last resort: the root layout itself failed, so this file renders its own
 * html/body. Kept plain on purpose — no fonts, no theme, nothing that could
 * fail again.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="id">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    background: "#F6F2EA",
                    color: "#1C1A18",
                    fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
                }}
            >
                <div style={{ maxWidth: "34rem" }}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "11px",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "#AE1800",
                        }}
                    >
                        Something came loose
                    </p>
                    <h1 style={{ margin: "1rem 0 0", fontSize: "1.6rem", lineHeight: 1.2 }}>
                        This page cannot be opened right now.
                    </h1>
                    <p style={{ margin: "1rem 0 0", fontSize: "1rem", lineHeight: 1.6 }}>
                        Try again in a moment. To diagnose, open{" "}
                        <code>/api/health</code> on this deployment.
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            marginTop: "1.5rem",
                            padding: ".75rem 1.25rem",
                            border: "0",
                            borderRadius: ".5rem",
                            background: "#AE1800",
                            color: "#fff",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                    {error.digest && (
                        <p style={{ marginTop: "1.5rem", fontSize: ".8rem", opacity: 0.7 }}>
                            code: {error.digest}
                        </p>
                    )}
                </div>
            </body>
        </html>
    );
}