"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { formatINR, makeCartLine } from "@/lib/commerce";
import { useStore } from "./StoreProvider";
import { MediaPlaceholder } from "./MediaPlaceholder";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card reveal" style={{ "--delay": `${(index % 4) * 60}ms` } as React.CSSProperties}>
      <div className="product-card-media">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <MediaPlaceholder src={product.thumbnail} alt={product.name} />
        </Link>
        <button className={`wish-button ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}>
          {saved ? "♥" : "♡"}
        </button>
        <button className="quick-add" onClick={() => addToCart(makeCartLine(product))}>Add to bag</button>
        <div className="product-badges">
          {product.newArrival && <span>New</span>}
          {product.limitedEdition && <span>Limited</span>}
        </div>
      </div>
      <div className="product-card-copy">
        <div><small>{product.category}</small><span>{product.color}</span></div>
        <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <p><strong>{formatINR(product.price)}</strong>{product.compareAtPrice && <del>{formatINR(product.compareAtPrice)}</del>}</p>
      </div>
    </article>
  );
}
