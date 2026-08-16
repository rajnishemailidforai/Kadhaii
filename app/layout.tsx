import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: "Kadhai — Indian luxury womenswear", template: "%s | Kadhai" },
    description: "A living textile story for modern celebrations. Kadhai is a prototype ecommerce experience.",
    openGraph: { title: "Kadhai", description: "Har Dhage ki apni Kahani hai", type: "website", images: [{ url: `${origin}/og.png`, width: 1729, height: 910, alt: "Kadhai — Har Dhage ki apni Kahani hai" }] },
    twitter: { card: "summary_large_image", title: "Kadhai", description: "Har Dhage ki apni Kahani hai", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppChrome>{children}</AppChrome></body></html>;
}
