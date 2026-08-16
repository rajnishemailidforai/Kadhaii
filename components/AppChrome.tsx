"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { StoreProvider, useStore } from "./StoreProvider";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, content } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [solid, setSolid] = useState(pathname !== "/");

  useEffect(() => {
    const onScroll = () => setSolid(pathname !== "/" || window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <div className="announcement">{content.announcement}<span>Prototype experience — no real payment is processed.</span></div>
      <header className={`site-header ${solid ? "is-solid" : ""}`}>
        <button className="menu-trigger" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><i /><i /></button>
        <nav className="nav-left" aria-label="Primary navigation">
          <Link href="/shop">Shop</Link><Link href="/shop?category=Ready+Saree">Ready sarees</Link><Link href="/about">Our story</Link>
        </nav>
        <Link href="/" className="wordmark" aria-label="Kadhai home"><span>K</span>adhai<small>कढ़ाई</small></Link>
        <nav className="nav-actions" aria-label="Shopping actions">
          <button onClick={() => setSearch(true)}>Search</button>
          <Link href="/account" className="desktop-action">Account</Link>
          <Link href="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}>♡<b>{wishlist.length}</b></Link>
          <Link href="/cart" aria-label={`Bag with ${cart.reduce((sum, line) => sum + line.quantity, 0)} items`}>Bag<b>{cart.reduce((sum, line) => sum + line.quantity, 0)}</b></Link>
        </nav>
      </header>
      <div className={`mobile-menu ${menu ? "is-open" : ""}`}>
        <button onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button>
        {[["Shop all", "/shop"], ["Ready sarees", "/shop?category=Ready+Saree"], ["Lehengas", "/shop?category=Lehenga"], ["Our story", "/about"], ["Track order", "/track-order"], ["Demo admin", "/admin"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}</Link>)}
        <p>Har Dhage ki apni Kahani hai</p>
      </div>
      {search && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Kadhai">
          <button onClick={() => setSearch(false)} aria-label="Close search">Close ×</button>
          <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); router.push(`/search?q=${encodeURIComponent(String(form.get("q") || ""))}`); setSearch(false); }}>
            <label htmlFor="global-search">What are you looking for?</label>
            <input id="global-search" name="q" autoFocus placeholder="Silk, saree, sangeet…" />
            <button type="submit">Search collection</button>
          </form>
          <div><span>Try</span><Link href="/search?q=organza">Organza</Link><Link href="/search?q=festive">Festive</Link><Link href="/search?q=maroon">Maroon</Link></div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true"><span>Har Dhage ki apni Kahani hai · Har Dhage ki apni Kahani hai · </span></div>
      <div className="footer-grid">
        <div><Link href="/" className="footer-logo">Kadhai</Link><p>Indian luxury womenswear, imagined as a living textile story.</p></div>
        <div><h3>Shop</h3><Link href="/shop">All pieces</Link><Link href="/shop?category=Saree">Sarees</Link><Link href="/wishlist">Wishlist</Link></div>
        <div><h3>Customer care</h3><Link href="/faq">FAQ</Link><Link href="/track-order">Track order</Link><Link href="/contact">Contact</Link></div>
        <div><h3>About Kadhai</h3><Link href="/about">Our story</Link><Link href="/admin">Demo admin</Link><span>Instagram · Pinterest</span></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Kadhai prototype</span><span>No real payment or fulfilment is processed.</span></div>
    </footer>
  );
}

function Cursor() {
  const [point, setPoint] = useState({ x: -100, y: -100, active: false });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY, active: Boolean((event.target as Element)?.closest("a,button,.product-card-media")) });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className={`custom-cursor ${point.active ? "is-active" : ""}`} style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }} aria-hidden="true"><i /></div>;
}

function ChromeInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { toast } = useStore();
  const admin = pathname.startsWith("/admin");

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return <>{!admin && <Header />}<main className={admin ? "admin-main" : "site-main"}>{children}</main>{!admin && <Footer />}{!admin && <Cursor />}{toast && <div className="toast" role="status">{toast}</div>}</>;
}

export function AppChrome({ children }: { children: ReactNode }) {
  return <StoreProvider><ChromeInner>{children}</ChromeInner></StoreProvider>;
}
