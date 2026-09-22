import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // There are lockfiles above this directory (the design system has its own
    // tooling); pin the Turbopack root so resolution starts in this app.
    turbopack: {
        root: process.cwd(),
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;