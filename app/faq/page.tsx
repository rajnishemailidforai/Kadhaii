"use client";

import { useState } from "react";
import Link from "next/link";
import { faqGroups } from "@/lib/content";
export default function FaqPage() { const [open, setOpen] = useState(0); return <div className="faq-page"><header className="utility-hero"><p>Customer care</p><h1>Questions,<br /><em>unfolded.</em></h1><span>Prototype answers for ordering, delivery, and products.</span></header><div className="faq-layout"><aside><p>Need something else?</p><h2>We’re here to help.</h2><Link href="/contact">Contact Kadhai ↗</Link><Link href="/track-order">Track a demo order ↗</Link></aside><section>{faqGroups.map((item, index) => <article key={item.q}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>0{index + 1}</span><h2>{item.q}</h2><i>{open === index ? "−" : "+"}</i></button>{open === index && <p>{item.a}</p>}</article>)}</section></div></div>; }
