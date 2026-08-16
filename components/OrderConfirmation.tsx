"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";
import { formatINR } from "@/lib/commerce";

export function OrderConfirmation({ id }: { id: string }) {
  const { orders } = useStore(); const [ready, setReady] = useState(false); useEffect(() => setReady(true), []); const order = orders.find((item) => item.id === id);
  if (!ready) return <div className="page-loading">Preparing your order story…</div>;
  if (!order) return <div className="empty-state standalone"><span>Prototype order</span><h1>We could not find that demo order.</h1><p>Local prototype orders remain on the device where they were created.</p><Link className="button button-dark" href="/shop">Return to shop</Link></div>;
  return <div className="confirmation-page"><div className="confirmation-mark">✓</div><p>Prototype order placed</p><h1>Thank you, {order.customer.split(" ")[0]}.</h1><h2>Your next story is<br /><em>being folded.</em></h2><div className="confirmation-notice"><b>No real payment was processed.</b><span>This is a prototype confirmation; no goods will be dispatched.</span></div><div className="confirmation-grid"><div><span>Demo order number</span><strong>{order.id}</strong></div><div><span>Estimated delivery</span><strong>4–6 business days</strong></div><div><span>Payment simulation</span><strong>{order.payment === "cod" ? "Cash on Delivery" : "Online payment"}</strong></div><div><span>Order total</span><strong>{formatINR(order.total)}</strong></div></div><div className="confirmation-items"><h3>Your pieces</h3>{order.items.map((line) => <div key={line.key}><span>{line.quantity} ×</span><p>{line.name}<small>{line.size}</small></p><strong>{formatINR(line.unitPrice * line.quantity)}</strong></div>)}</div><div className="confirmation-actions"><Link className="button button-dark" href={`/track-order?order=${encodeURIComponent(order.id)}`}>Track prototype order</Link><Link className="text-link" href="/shop">Continue shopping</Link></div></div>;
}
