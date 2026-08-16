"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { collectionCards } from "@/lib/content";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { useStore } from "./StoreProvider";

function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const travel = Math.max(1, node.offsetHeight - window.innerHeight);
        setProgress(Math.max(0, Math.min(1, -rect.top / travel)));
      });
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [ref]);
  return progress;
}

const timeline = [
  { year: "A THREAD", title: "Begins with feeling", copy: "A colour catches your eye. A texture stays in your hand. Every Kadhai piece starts with a mood before it becomes a silhouette.", image: "/images/products/hariyali-handloom-saree-02.webp" },
  { year: "A DRAPE", title: "Learns your movement", copy: "Pleats, layers, and borders are composed for the body in motion—not simply for the photograph.", image: "/images/products/sindoor-organza-saree-02.jpg" },
  { year: "A NIGHT", title: "Becomes a memory", copy: "Made for the wedding entrance, the dance floor, the family portrait, and the quiet journey home.", image: "/images/products/raat-ki-rani-saree-02.jpg" },
  { year: "A STORY", title: "Continues with you", copy: "Har Dhage ki apni Kahani hai. The next chapter is yours to wear.", image: "/images/products/barsaat-angrakha-set-01.webp" },
];

export function HomeExperience() {
  const { content } = useStore();
  const [loaded, setLoaded] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const collectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const collectionProgress = useSectionProgress(collectionRef);
  const timelineProgress = useSectionProgress(timelineRef);
  const timelineIndex = Math.min(timeline.length - 1, Math.floor(timelineProgress * timeline.length));

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1250);
    const fallback = window.setTimeout(() => setLoaded(true), 2500);
    return () => { clearTimeout(timer); clearTimeout(fallback); };
  }, []);

  const featured = products.filter((item) => content.featuredProductIds.includes(item.id)).slice(0, 8);

  return (
    <>
      <div className={`fabric-loader ${loaded ? "is-finished" : ""}`} aria-hidden={loaded}>
        <div className="loader-loop"><span /></div><div className="loader-word">Kadhai<small>Har Dhage ki apni Kahani hai</small></div><div className="loader-line"><i /></div>
      </div>
      <section className="hero" onPointerMove={(event) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 18, y: (event.clientY / window.innerHeight - 0.5) * 18 })}>
        <div className="hero-thread-loop" style={{ transform: `translate3d(${pointer.x * -0.35}px, ${pointer.y * -0.35}px, 0) rotate(-8deg)` }}><span /><i /></div>
        <div className="hero-media" style={{ transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)` }}><MediaPlaceholder src="/images/products/sindoor-organza-saree-01.jpg" alt="Kadhai campaign hero" priority /></div>
        <div className="hero-copy"><p className="eyebrow">Indian luxury womenswear</p><h1>{content.heroHeadline.split(" ").map((word, index) => <span key={`${word}-${index}`}>{word} </span>)}</h1><p>{content.heroSupport}</p><div className="hero-actions"><Link className="button button-light" href="/shop">Explore the collection</Link><Link className="text-link" href="/about">Discover the story</Link></div></div>
        <div className="hero-title" aria-hidden="true">KADHAI</div><div className="scroll-cue"><i /> Scroll to unspool the story</div>
      </section>
      <section className="brand-intro">
        <p className="section-number">01 · The premise</p><h2 className="reveal">Clothes can hold a <em>memory</em> before you have even worn them.</h2>
        <div className="intro-notes reveal"><p>We collect colour, drape, shine, and silhouette into pieces made for modern Indian celebrations.</p><Link href="/shop">Shop all womenswear ↗</Link></div><div className="giant-script" aria-hidden="true">हर धागे की अपनी कहानी है</div>
      </section>
      <section className="collection-scroll" ref={collectionRef}>
        <div className="collection-sticky"><div className="collection-heading"><p>02 · The Kadhai edit</p><h2>Pick your<br /><em>chapter.</em></h2><span>{String(Math.min(6, Math.floor(collectionProgress * 6) + 1)).padStart(2, "0")} / 06</span></div>
          <div className="collection-track" style={{ transform: `translate3d(calc(${collectionProgress * -245}vw), 0, 0)` }}>
            {collectionCards.map((card, index) => <Link href={`/shop?category=${encodeURIComponent(card.category)}`} className={`collection-card tone-${card.tone}`} key={card.title}><MediaPlaceholder src={card.image} alt={card.title} /><div><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.line}</p><b>Explore edit ↗</b></div></Link>)}
          </div>
        </div>
      </section>
      <section className="thread-timeline" ref={timelineRef}>
        <div className="timeline-sticky"><div className="timeline-bg-word" aria-hidden="true">{timeline[timelineIndex].year}</div><div className="timeline-label"><p>03 · Every thread has a story</p><span>{timelineIndex + 1} / {timeline.length}</span></div>
          <div className="timeline-stage"><div className="timeline-copy" key={`copy-${timelineIndex}`}><h2>{timeline[timelineIndex].title}</h2><p>{timeline[timelineIndex].copy}</p></div><div className="timeline-card card-back"><MediaPlaceholder src="/images/products/genda-ivory-saree-garment.png" alt="Textile detail" /></div><div className="timeline-card card-front" key={`image-${timelineIndex}`}><MediaPlaceholder src={timeline[timelineIndex].image} alt={timeline[timelineIndex].title} /></div></div><div className="timeline-progress"><i style={{ width: `${timelineProgress * 100}%` }} /></div>
        </div>
        <div className="timeline-mobile"><p>03 · Every thread has a story</p>{timeline.map((item, index) => <article key={item.year}><span>0{index + 1} · {item.year}</span><h2>{item.title}</h2><p>{item.copy}</p><MediaPlaceholder src={item.image} alt={item.title} label="Add editorial image" /></article>)}</div>
      </section>
      <section className="featured-section"><header className="section-header reveal"><div><p>04 · Pieces to begin with</p><h2>The current <em>mood.</em></h2></div><Link href="/shop">View all {products.length} pieces ↗</Link></header><div className="product-grid">{featured.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></section>
      <section className="occasion-orbit"><div className="orbit-copy reveal"><p>05 · Dress for the feeling</p><h2>Where are<br />you going?</h2><span>Choose an occasion and let the edit find you.</span></div><div className="orbit-wheel" aria-label="Shop by occasion">{['Wedding guest','Festive','Sangeet','Reception','Everyday luxe','Gifting'].map((occasion, index) => <Link style={{ "--i": index } as React.CSSProperties} key={occasion} href={`/shop?occasion=${encodeURIComponent(occasion)}`}>{occasion}</Link>)}<div className="orbit-center"><MediaPlaceholder src="/images/products/rani-neel-saree-01.jpg" alt="Celebration look" /></div></div></section>
      <section className="lookbook"><div className="lookbook-type" aria-hidden="true">THE NIGHT<br />IS YOURS</div><div className="lookbook-card lookbook-one reveal"><MediaPlaceholder src="/images/products/meher-maroon-saree-01.jpg" alt="Kadhai evening look one" /></div><div className="lookbook-card lookbook-two reveal"><MediaPlaceholder src="/images/products/neel-sindoor-saree-01.jpg" alt="Kadhai evening look two" /></div><div className="lookbook-card lookbook-three reveal"><MediaPlaceholder src="/images/products/panna-pallu-saree-garment.png" alt="Kadhai textile closeup" /></div><div className="lookbook-copy reveal"><p>06 · Kadhai after dark</p><h2>Be the colour<br />in the room.</h2><p>{content.campaignCopy}</p><Link className="button button-light" href="/shop?occasion=Reception">Shop the evening edit</Link></div></section>
      <section className="closing-story"><p>Har Dhage ki apni Kahani hai</p><h2 className="reveal">Every thread<br />is waiting for<br /><em>your story.</em></h2><div className="closing-actions"><Link className="button button-dark" href="/shop">Explore all womenswear</Link><Link className="text-link" href="/about">Read our story</Link></div></section>
    </>
  );
}
