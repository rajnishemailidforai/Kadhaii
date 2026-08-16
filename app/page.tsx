import type { Metadata } from "next";
import { HomeExperience } from "@/components/HomeExperience";

export const metadata: Metadata = {
  title: "Kadhai — Indian luxury womenswear",
  description: "Wear a story woven for you. Explore Kadhai sarees, occasionwear, jewellery, and accessories.",
};

export default function Home() {
  return <HomeExperience />;
}
