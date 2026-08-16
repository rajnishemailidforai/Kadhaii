import Link from "next/link";
export default function ProductNotFound() { return <div className="empty-state standalone"><span>404</span><h1>This story is not in the edit.</h1><p>The piece may have moved, or the link may be incomplete.</p><Link className="button button-dark" href="/shop">Return to the collection</Link></div>; }
