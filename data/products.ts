export type ProductCategory =
  | "Ready Saree"
  | "Saree"
  | "Lehenga"
  | "Salwar Suit";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  thumbnail: string;
  fabric: string;
  weaveOrWork: string;
  origin: string;
  color: string;
  occasion: string[];
  fitOrSize: string[];
  stock: number;
  sku: string;
  blouseIncluded: boolean | null;
  drapeType: string | null;
  care: string;
  shippingNote: string;
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  limitedEdition: boolean;
  rating: number;
  reviewCount: number;
};

const media = (slug: string, modelExtension: "jpg" | "webp") => [
  `/images/products/${slug}-01.${modelExtension}`,
  `/images/products/${slug}-02.${modelExtension}`,
  `/images/products/${slug}-garment.png`,
];

const product = (
  id: string,
  slug: string,
  name: string,
  category: ProductCategory,
  price: number,
  color: string,
  fabric: string,
  work: string,
  occasions: string[],
  modelExtension: "jpg" | "webp" = "jpg",
  options: Partial<Product> = {},
): Product => ({
  id,
  slug,
  name,
  category,
  collection: "Dhaaga No. 01",
  shortDescription: `${color} ${fabric.toLowerCase()} with ${work.toLowerCase()}.`,
  description: `${name} is imagined as a modern heirloom: expressive in movement, considered in detail, and made for the moments that become stories. The model photographs show the styling direction; the clean studio view lets you read the garment on its own.`,
  price,
  compareAtPrice: null,
  images: media(slug, modelExtension),
  thumbnail: media(slug, modelExtension)[0],
  fabric,
  weaveOrWork: work,
  origin: "Kadhai Studio",
  color,
  occasion: occasions,
  fitOrSize: category.includes("Saree") ? ["Free size"] : ["XS", "S", "M", "L", "XL", "XXL"],
  stock: 7,
  sku: `KDH-${id.padStart(4, "0")}`,
  blouseIncluded: category.includes("Saree") ? true : null,
  drapeType: category === "Ready Saree" ? "Pre-stitched drape" : category === "Saree" ? "Classic drape" : null,
  care: "Dry clean only. Store in a breathable fabric bag.",
  shippingNote: "Demo estimate: dispatch in 2–3 business days.",
  tags: [color, fabric, work, ...occasions],
  featured: false,
  newArrival: false,
  limitedEdition: false,
  rating: 4.7,
  reviewCount: 18,
  ...options,
});

export const products: Product[] = [
  product("1", "hariyali-handloom-saree", "Hariyali Handloom Saree", "Saree", 14800, "Olive and ochre", "Handloom silk blend", "Woven folk motifs", ["Festive", "Everyday luxe"], "webp", { featured: true, newArrival: true, limitedEdition: true, stock: 4 }),
  product("2", "panna-zari-saree", "Panna Zari Saree", "Saree", 18600, "Forest green", "Silk blend", "Statement zari border", ["Wedding guest", "Reception"], "webp", { featured: true }),
  product("3", "sheesha-noir-lehenga", "Sheesha Noir Lehenga Set", "Lehenga", 28900, "Black and ivory", "Silk blend", "Mirror and shell work", ["Sangeet", "Festive"], "webp", { featured: true, limitedEdition: true, stock: 3 }),
  product("4", "sindoor-organza-saree", "Sindoor Organza Saree", "Ready Saree", 13900, "Vermilion red", "Organza blend", "Tonal jacquard", ["Sangeet", "Reception"], "jpg", { featured: true, newArrival: true }),
  product("5", "genda-ivory-saree", "Genda Ivory Saree", "Saree", 16900, "Ivory and red", "Silk blend", "Gold woven border", ["Wedding guest", "Festive"], "jpg", { featured: true }),
  product("6", "gulabi-resham-suit", "Gulabi Resham Suit Set", "Salwar Suit", 11800, "Fuchsia", "Chanderi blend", "Floral resham embroidery", ["Festive", "Gifting"], "jpg", { featured: true, newArrival: true }),
  product("7", "amaltas-drape-set", "Amaltas Drape Set", "Salwar Suit", 14500, "Mustard", "Textured silk blend", "Layered drape work", ["Wedding guest", "Festive"], "jpg", { featured: true }),
  product("8", "basant-chiffon-saree", "Basant Chiffon Saree", "Saree", 12400, "Lemon yellow", "Chiffon", "Tonal floral weave", ["Everyday luxe", "Festive"], "jpg", { featured: true }),
  product("9", "dhusar-heritage-saree", "Dhusar Heritage Saree", "Saree", 17600, "Stone grey", "Silk blend", "Woven paisley pallu", ["Wedding guest", "Gifting"]),
  product("10", "chandni-stage-lehenga", "Chandni Stage Lehenga", "Lehenga", 32500, "Charcoal and blush", "Raw silk blend", "Floral threadwork", ["Sangeet", "Reception"], "jpg", { limitedEdition: true, stock: 2 }),
  product("11", "rani-neel-saree", "Rani Neel Saree", "Saree", 15800, "Rani pink and blue", "Georgette blend", "Mirror-zari border", ["Sangeet", "Festive"]),
  product("12", "raat-ki-rani-saree", "Raat Ki Rani Saree", "Saree", 13200, "Ink black", "Chiffon blend", "Minimal tonal border", ["Reception", "Everyday luxe"]),
  product("13", "panna-pallu-saree", "Panna Pallu Saree", "Saree", 17200, "Emerald green", "Silk blend", "Contrast brocade pallu", ["Wedding guest", "Festive"]),
  product("14", "meher-maroon-saree", "Meher Maroon Saree", "Saree", 19800, "Maroon and antique gold", "Silk blend", "Temple zari work", ["Wedding guest", "Reception"], "jpg", { limitedEdition: true }),
  product("15", "neel-sindoor-saree", "Neel Sindoor Saree", "Saree", 18400, "Red and royal blue", "Silk blend", "Gold woven border", ["Festive", "Gifting"]),
  product("16", "laal-dhun-saree", "Laal Dhun Saree", "Ready Saree", 14600, "Scarlet red", "Georgette blend", "Fine gold embroidery", ["Sangeet", "Reception"], "jpg", { newArrival: true }),
  product("17", "shwet-angan-saree", "Shwet Angan Saree", "Saree", 12800, "Soft white", "Organza blend", "White floral embroidery", ["Everyday luxe", "Festive"]),
  product("18", "kesariya-twilight-saree", "Kesariya Twilight Saree", "Ready Saree", 15200, "Orange and coral", "Silk blend", "Gold woven motifs", ["Wedding guest", "Festive"], "jpg", { newArrival: true }),
  product("19", "barsaat-angrakha-set", "Barsaat Angrakha Set", "Salwar Suit", 13700, "Orange and red", "Chiffon blend", "Tonal print and piping", ["Festive", "Everyday luxe"], "webp", { featured: true }),
  product("20", "gulab-bagh-printed-saree", "Gulab Bagh Printed Saree", "Saree", 9800, "Blush pink and ivory", "Cotton silk", "Playful woven print", ["Everyday luxe", "Gifting"], "jpg", { newArrival: true }),
];

export const categories = ["All", "Ready Saree", "Saree", "Lehenga", "Salwar Suit"];
export const occasions = ["Wedding guest", "Festive", "Sangeet", "Reception", "Everyday luxe", "Gifting"];
export const fabrics = [...new Set(products.map((item) => item.fabric))].sort();
export const colors = [...new Set(products.map((item) => item.color))].sort();

export const findProduct = (slug: string) => products.find((item) => item.slug === slug);
