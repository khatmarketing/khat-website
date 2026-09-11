import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = { title: "کیا با خط کار کردن", description: "همراهان خط در مسیر بازاریابی، برندینگ و رشد." };
const partners = ["Digikala", "Snapp", "Tapsi", "Rooma", "Bazr", "Samsung", "Zarinpal", "Esalat", "Aparat", "CafeBazaar", "Namava", "Alibaba"];
export default function PartnersPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="کیا با خط کار کردن" label="PARTNERS" description="همراهان ما در مسیر رشد" />
      <section className="content-section pt-0" aria-label="همراهان خط">
        <ul className="grid grid-cols-2 gap-3">{partners.map((name) => <li key={name} className="neon-ring flex min-h-28 items-center justify-center rounded-[28px] bg-[#101010] p-4 text-center"><span dir="ltr" className="text-lg font-bold">{name}</span></li>)}</ul>
      </section>
    </main>
  );
}

