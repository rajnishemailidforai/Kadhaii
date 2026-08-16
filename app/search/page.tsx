import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopExperience } from "@/components/ShopExperience";

export const metadata: Metadata = { title: "Search", description: "Search the Kadhai collection by piece, fabric, colour, or occasion." };
export default function SearchPage() { return <Suspense fallback={<div className="page-loading">Searching the collection…</div>}><ShopExperience searchMode /></Suspense>; }
