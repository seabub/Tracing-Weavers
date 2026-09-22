import type { Metadata } from "next";
import { Archivo_Narrow, Caveat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";

/* Beyond Tenun type: Telegraf Black → Hanken Grotesk 900, Archivo Narrow is
   the real deck face, Biro Script Plus → Caveat for the single script use. */
const hanken = Hanken_Grotesk({
    variable: "--font-display-family",
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

const archivo = Archivo_Narrow({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
    variable: "--font-script-family",
    subsets: ["latin"],
    weight: ["600", "700"],
});

export const metadata: Metadata = {
    title: { default: brand, template: `%s | ${brand}` },
    description:
        "Tap the tag on the product to read where it came from, who made it and what happened along the way — then claim the record as your own passport.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${hanken.variable} ${archivo.variable} ${caveat.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}