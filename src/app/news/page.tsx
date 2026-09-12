import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import NewsRail from "../components/NewsRail";

export const metadata: Metadata = { title: "خبرهای خط", description: "نگاه خط به بازاریابی، برندها و مسیر رشد کسب‌وکار." };
export default function NewsPage() {
  return <main id="main-content" tabIndex={-1}><PageHero image="/images/news.png" title="خبرهای خط" label="NEWS" description="نگاه ما به دنیای بازاریابی، برندها و آینده" /><section className="pb-14" aria-label="آخرین اخبار"><NewsRail aboveFold /></section></main>;
}

