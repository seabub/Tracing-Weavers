import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Before this the app sent none: no CSP, no nosniff, no referrer policy, and
 * `X-Powered-By: Next.js` announced the framework. There is no XSS sink in the
 * app today (the audit checked: no dangerouslySetInnerHTML, React escapes all
 * data, including ?tag=), so this is hardening, not a patch for an open hole.
 *
 * The CSP keeps 'unsafe-inline' for scripts and styles because Next injects its
 * own inline bootstrap and the app uses inline styles; a nonce-based policy via
 * middleware is the next step if the threat model ever changes. Everything that
 * matters is still locked: no external origins, no frames, no object embedding,
 * no form posts off-site.
 */
const CSP = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
    // There are lockfiles above this directory (the design system has its own
    // tooling); pin the Turbopack root so resolution starts in this app.
    turbopack: {
        root: process.cwd(),
    },
    images: {
        unoptimized: true,
    },
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Content-Security-Policy", value: CSP },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(self), geolocation=(), microphone=()",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;