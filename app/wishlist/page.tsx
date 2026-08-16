"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/StoreProvider";

export default function WishlistPage() { const { wishlist } = useStore(); const saved = products.filter((item) => wishlist.includes(item.id)); if (!saved.length) return <div className="empty-state standalone"><span>Wishlist · 0</span><h1>Save the pieces<br />that stay with you.</h1><p>Tap the heart on any product to keep it close.</p><Link className="button button-dark" href="/shop">Explore the collection</Link></div>; return <div className="wishlist-page"><header className="utility-hero"><p>Your wishlist</p><h1>Stories saved<br /><em>for later.</em></h1><span>{saved.length} pieces</span></header><div className="product-grid">{saved.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></div>; }
