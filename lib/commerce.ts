import type { Product } from "@/data/products";

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  unitPrice: number;
  quantity: number;
  size: string;
};

export const makeCartLine = (product: Product, size = product.fitOrSize[0]): CartLine => ({
  key: `${product.id}-${size}`,
  productId: product.id,
  slug: product.slug,
  name: product.name,
  image: product.thumbnail,
  category: product.category,
  unitPrice: product.price,
  quantity: 1,
  size,
});

export type CouponResult = { code: string; discount: number; message: string };

export function evaluateCoupon(code: string, subtotal: number): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (normalized === "KADHAI10") {
    const discount = Math.min(Math.round(subtotal * 0.1), 2000);
    return { code: normalized, discount, message: "10% off applied (maximum ₹2,000)." };
  }
  if (normalized === "WELCOME500" && subtotal >= 5000) {
    return { code: normalized, discount: 500, message: "₹500 welcome saving applied." };
  }
  if (normalized === "WELCOME500") throw new Error("WELCOME500 requires a minimum bag value of ₹5,000.");
  throw new Error("That demo code is not recognised. Try KADHAI10 or WELCOME500.");
}

export function calculateTotals(lines: CartLine[], coupon?: CouponResult | null, payment = "cod", settings = { shippingFee: 99, freeShipping: 2999, codFee: 49 }) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shipping = subtotal === 0 || subtotal >= settings.freeShipping ? 0 : settings.shippingFee;
  const codFee = payment === "cod" && subtotal > 0 ? settings.codFee : 0;
  return { subtotal, discount, shipping, codFee, total: Math.max(0, subtotal - discount + shipping + codFee) };
}
