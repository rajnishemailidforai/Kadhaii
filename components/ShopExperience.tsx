"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, colors, fabrics, occasions, products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ShopExperience({ searchMode = false }: { searchMode?: boolean }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [fabric, setFabric] = useState(params.get("fabric") || "All");
  const [color, setColor] = useState(params.get("color") || "All");
  const [occasion, setOccasion] = useState(params.get("occasion") || "All");
  const [price, setPrice] = useState(params.get("price") || "All");
  const [sort, setSort] = useState(params.get("sort") || "featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const syncUrl = (updates: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => value && value !== "All" && value !== "featured" ? next.set(key, value) : next.delete(key));
    router.replace(`${pathname}${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = products.filter((item) => {
      const haystack = [item.name, item.category, item.fabric, item.color, item.weaveOrWork, ...item.occasion, ...item.tags].join(" ").toLowerCase();
      const priceMatch = price === "All" || (price === "under-5000" && item.price < 5000) || (price === "5000-15000" && item.price >= 5000 && item.price <= 15000) || (price === "above-15000" && item.price > 15000);
      return (!search || haystack.includes(search)) && (category === "All" || item.category === category) && (fabric === "All" || item.fabric === fabric) && (color === "All" || item.color === color) && (occasion === "All" || item.occasion.includes(occasion)) && priceMatch;
    });
    return filtered.sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rated" ? b.rating - a.rating : sort === "newest" ? Number(b.newArrival) - Number(a.newArrival) : Number(b.featured) - Number(a.featured));
  }, [query, category, fabric, color, occasion, price, sort]);

  const reset = () => { setQuery(""); setCategory("All"); setFabric("All"); setColor("All"); setOccasion("All"); setPrice("All"); setSort("featured"); router.replace(pathname); };

  const select = (label: string, value: string, options: string[], setter: (value: string) => void, key: string) => <label>{label}<select value={value} onChange={(event) => { setter(event.target.value); syncUrl({ [key]: event.target.value }); }}>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;

  return (
    <div className="shop-page">
      <header className="shop-hero"><p>{searchMode ? "Search the collection" : "The Kadhai collection"}</p><h1>{searchMode ? <>Find your <em>story.</em></> : <>Every piece,<br /><em>a beginning.</em></>}</h1><span>{searchMode ? "Search by name, colour, fabric, work, or occasion." : "Sarees and occasionwear with a modern point of view."}</span></header>
      <div className="catalog-toolbar">
        <form className="catalog-search" onSubmit={(event) => { event.preventDefault(); syncUrl({ q: query }); }}><label htmlFor="catalog-query">Search</label><input id="catalog-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘organza’ or ‘sangeet’" /><button type="submit">→</button></form>
        <button className="filter-trigger" onClick={() => setFiltersOpen(true)}>Filters <span>{[category, fabric, color, occasion, price].filter((item) => item !== "All").length}</span></button>
        <label className="sort-select">Sort<select value={sort} onChange={(event) => { setSort(event.target.value); syncUrl({ sort: event.target.value }); }}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rated">Best rated</option></select></label>
      </div>
      <div className="catalog-layout">
        <aside className={`filter-panel ${filtersOpen ? "is-open" : ""}`}><button className="filter-close" onClick={() => setFiltersOpen(false)}>Close ×</button><h2>Refine the edit</h2>{select("Category", category, categories, setCategory, "category")}{select("Fabric", fabric, ["All", ...fabrics], setFabric, "fabric")}{select("Colour", color, ["All", ...colors], setColor, "color")}{select("Occasion", occasion, ["All", ...occasions], setOccasion, "occasion")}{select("Price", price, ["All", "under-5000", "5000-15000", "above-15000"], setPrice, "price")}<button className="clear-button" onClick={reset}>Clear all filters</button><button className="button button-dark mobile-apply" onClick={() => setFiltersOpen(false)}>Show {list.length} pieces</button></aside>
        <section className="catalog-results"><div className="results-line"><span>{list.length} pieces</span>{query && <p>Results for “{query}”</p>}</div>{list.length ? <div className="product-grid catalog-grid">{list.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div> : <div className="empty-state"><span>0 pieces</span><h2>No thread found.</h2><p>Try a broader search, remove a filter, or begin again with the full collection.</p><button className="button button-dark" onClick={reset}>Clear filters</button><Link href="/shop">Explore all pieces</Link></div>}</section>
      </div>
    </div>
  );
}
