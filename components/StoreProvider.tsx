"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine, CouponResult } from "@/lib/commerce";

export type DemoOrder = {
  id: string;
  createdAt: string;
  customer: string;
  phone: string;
  address: string;
  items: CartLine[];
  total: number;
  payment: string;
  status: string;
};

type AdminContent = {
  heroHeadline: string;
  heroSupport: string;
  announcement: string;
  campaignCopy: string;
  featuredProductIds: string[];
};

type AdminSettings = {
  shippingFee: number;
  freeShipping: number;
  codFee: number;
  deliveryCopy: string;
};

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  orders: DemoOrder[];
  coupon: CouponResult | null;
  toast: string;
  content: AdminContent;
  settings: AdminSettings;
  stockOverrides: Record<string, number>;
  addToCart: (line: CartLine) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setCoupon: (coupon: CouponResult | null) => void;
  createOrder: (details: Omit<DemoOrder, "id" | "createdAt" | "items" | "status">) => DemoOrder;
  updateOrderStatus: (id: string, status: string) => void;
  updateContent: (value: AdminContent) => void;
  updateSettings: (value: AdminSettings) => void;
  updateStock: (id: string, value: number) => void;
  notify: (message: string) => void;
};

const defaults: Pick<StoreValue, "content" | "settings"> = {
  content: {
    heroHeadline: "Wear a story woven for you.",
    heroSupport: "Occasionwear, heirloom textures, and modern silhouettes from the world of Indian craft.",
    announcement: "Complimentary demo delivery above ₹2,999",
    campaignCopy: "Clothes for celebrations—and for becoming the version of yourself the evening calls for.",
    featuredProductIds: ["1", "2", "4", "5", "7", "10", "13", "15"],
  },
  settings: { shippingFee: 99, freeShipping: 2999, codFee: 49, deliveryCopy: "Estimated delivery in 4–6 business days" },
};

const StoreContext = createContext<StoreValue | null>(null);

function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [toast, setToast] = useState("");
  const [content, setContent] = useState<AdminContent>(defaults.content);
  const [settings, setSettings] = useState<AdminSettings>(defaults.settings);
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    setCart(readLocal("kadhai-cart", []));
    setWishlist(readLocal("kadhai-wishlist", []));
    setOrders(readLocal("kadhai-orders", []));
    setContent({ ...defaults.content, ...readLocal("kadhai-content", defaults.content) });
    setSettings(readLocal("kadhai-settings", defaults.settings));
    setStockOverrides(readLocal("kadhai-stock", {}));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-orders", JSON.stringify(orders)); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-content", JSON.stringify(content)); }, [content, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-settings", JSON.stringify(settings)); }, [settings, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kadhai-stock", JSON.stringify(stockOverrides)); }, [stockOverrides, hydrated]);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }, []);

  const addToCart = useCallback((line: CartLine) => {
    setCart((current) => {
      const existing = current.find((item) => item.key === line.key);
      return existing
        ? current.map((item) => item.key === line.key ? { ...item, quantity: item.quantity + line.quantity } : item)
        : [...current, line];
    });
    notify(`${line.name} added to your bag.`);
  }, [notify]);

  const removeFromCart = useCallback((key: string) => setCart((current) => current.filter((item) => item.key !== key)), []);
  const updateQuantity = useCallback((key: string, quantity: number) => setCart((current) => current.map((item) => item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)), []);
  const clearCart = useCallback(() => { setCart([]); setCoupon(null); }, []);
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }, []);

  const createOrder = useCallback((details: Omit<DemoOrder, "id" | "createdAt" | "items" | "status">) => {
    const order: DemoOrder = {
      ...details,
      id: `KDH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      items: cart,
      status: "Order placed",
    };
    setOrders((current) => [order, ...current]);
    setCart([]);
    setCoupon(null);
    return order;
  }, [cart]);

  const updateOrderStatus = useCallback((id: string, status: string) => setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order)), []);
  const updateContent = useCallback((value: AdminContent) => { setContent(value); notify("Homepage content updated."); }, [notify]);
  const updateSettings = useCallback((value: AdminSettings) => { setSettings(value); notify("Demo settings saved."); }, [notify]);
  const updateStock = useCallback((id: string, value: number) => setStockOverrides((current) => ({ ...current, [id]: Math.max(0, value) })), []);

  const value = useMemo<StoreValue>(() => ({
    cart, wishlist, orders, coupon, toast, content, settings, stockOverrides,
    addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, setCoupon,
    createOrder, updateOrderStatus, updateContent, updateSettings, updateStock, notify,
  }), [cart, wishlist, orders, coupon, toast, content, settings, stockOverrides, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, createOrder, updateOrderStatus, updateContent, updateSettings, updateStock, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
