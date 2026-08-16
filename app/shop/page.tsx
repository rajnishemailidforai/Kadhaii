import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopExperience } from "@/components/ShopExperience";

export const metadata: Metadata = { title: "Shop", description: "Explore Kadhai sarees, lehengas, suits, dupattas, jewellery, and accessories." };
export default function ShopPage() { return <Suspense fallback={<div className="page-loading">Unfolding the collection…</div>}><ShopExperience /></Suspense>; }
