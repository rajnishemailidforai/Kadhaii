import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";
export const metadata: Metadata = { title: "Prototype order confirmation", description: "Kadhai demo order confirmation. No real payment is processed." };
export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <OrderConfirmation id={id} />; }
