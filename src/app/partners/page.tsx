import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "کیا با خط کار کردن",
  description: "همراهان خط در مسیر بازاریابی، برندینگ و رشد.",
  image: "/images/partners.png",
  path: "/partners",
});
const partners = ["Digikala", "Snapp", "Tapsi", "Rooma", "Bazr", "Samsung", "Zarinpal", "Esalat", "Aparat", "CafeBazaar", "Namava", "Alibaba"];
export default function PartnersPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero image="/images/partners.png" title="کیا با خط کار کردن" label="PARTNERS" description="همراهان ما در مسیر رشد" />
      <section className="content-section pt-0" aria-label="همراهان خط">
        <ul className="grid grid-cols-2 gap-3">{partners.map((name) => <li key={name} tabIndex={0} className="neon-ring flex min-h-28 items-center justify-center rounded-[28px] bg-[#101010] p-4 text-center"><span dir="ltr" className="min-w-0 text-lg font-bold [overflow-wrap:anywhere]">{name}</span></li>)}</ul>
      </section>
    </main>
  );
}

