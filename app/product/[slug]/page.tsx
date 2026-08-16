import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProduct } from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";
import { formatINR } from "@/lib/commerce";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = findProduct(slug);
  return product ? { title: product.name, description: `${product.shortDescription} ${formatINR(product.price)}. Demo product.` } : { title: "Piece not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = findProduct(slug); if (!product) notFound();
  return <ProductDetail product={product} />;
}
