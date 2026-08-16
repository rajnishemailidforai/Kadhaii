"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { formatINR, makeCartLine } from "@/lib/commerce";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ProductCard } from "./ProductCard";
import { useStore } from "./StoreProvider";

export function ProductDetail({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [size, setSize] = useState(product.fitOrSize[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState("");
  const [open, setOpen] = useState("story");
  const { addToCart, toggleWishlist, wishlist, settings } = useStore();
  const saved = wishlist.includes(product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  const add = () => addToCart({ ...makeCartLine(product, size), quantity });
  const checkPincode = () => setDelivery(/^\d{6}$/.test(pincode) ? `Delivery available — ${settings.deliveryCopy} (demo).` : "Enter a valid six-digit Indian pincode.");

  return (
    <div className="product-page">
      <div className="breadcrumb"><Link href="/shop">Shop</Link><span>/</span><Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><em>{product.name}</em></div>
      <section className="product-layout">
        <div className="product-gallery"><div className="gallery-thumbs">{product.images.map((src, index) => <button className={image === index ? "is-active" : ""} onClick={() => setImage(index)} key={src}><MediaPlaceholder src={src} alt={`${product.name} view ${index + 1}`} /></button>)}</div><div className="gallery-main" key={product.images[image]}><MediaPlaceholder src={product.images[image]} alt={`${product.name} view ${image + 1}`} label="Add product gallery image" priority /><span>Image {image + 1} / {product.images.length}</span></div></div>
        <div className="product-info"><p className="eyebrow">{product.collection} · {product.category}</p><h1>{product.name}</h1><div className="price-row"><strong>{formatINR(product.price)}</strong>{product.compareAtPrice && <del>{formatINR(product.compareAtPrice)}</del>}<span>★ {product.rating} ({product.reviewCount} demo reviews)</span></div><p className="product-short">{product.shortDescription}</p><div className="stock-note">{product.stock <= 5 ? `Only ${product.stock} demo pieces left` : "In demo stock"}</div>
          <fieldset className="variant-field"><legend>{product.fitOrSize.length > 1 ? "Select size" : "Size"}</legend><div>{product.fitOrSize.map((option) => <button type="button" className={size === option ? "is-active" : ""} onClick={() => setSize(option)} key={option}>{option}</button>)}</div>{product.fitOrSize.length > 1 && <Link href="/faq">Size guide</Link>}</fieldset>
          <div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div><button className="button button-dark add-bag" onClick={add}>Add to bag · {formatINR(product.price * quantity)}</button><button className={`product-wish ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist">{saved ? "♥" : "♡"}</button></div>
          <div className="delivery-box"><label htmlFor="pincode">Check demo delivery</label><div><input id="pincode" value={pincode} inputMode="numeric" maxLength={6} onChange={(event) => setPincode(event.target.value.replace(/\D/g, ""))} placeholder="Six-digit pincode" /><button onClick={checkPincode}>Check</button></div>{delivery && <p>{delivery}</p>}</div>
          <div className="product-accordions">{[["story", "The story", product.description], ["details", "Material & details", `${product.fabric} · ${product.weaveOrWork} · ${product.origin}${product.blouseIncluded === true ? " · Blouse piece included" : ""}${product.drapeType ? ` · ${product.drapeType}` : ""}`], ["care", "Care & delivery", `${product.care} ${product.shippingNote}`], ["returns", "Returns & exchanges", "Demo policy content only. Replace with Kadhai’s final returns and exchanges policy before launch."]].map(([id, title, copy]) => <div key={id}><button onClick={() => setOpen(open === id ? "" : id)} aria-expanded={open === id}>{title}<span>{open === id ? "−" : "+"}</span></button>{open === id && <p>{copy}</p>}</div>)}</div>
          <p className="prototype-note">Prototype product information — materials, availability, origin, and ratings must be verified before launch.</p>
        </div>
      </section>
      <section className="related-products"><header className="section-header"><div><p>Continue the story</p><h2>You may also <em>love.</em></h2></div><Link href={`/shop?category=${encodeURIComponent(product.category)}`}>View the edit ↗</Link></header><div className="product-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></section>
    </div>
  );
}
