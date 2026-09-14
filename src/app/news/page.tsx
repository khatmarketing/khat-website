import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import NewsRail from "../components/NewsRail";
import { createMetadata } from "@/lib/seo";
import { getWordPressArticles } from "@/lib/wordpress";

export const metadata: Metadata = createMetadata({
  title: "خبرهای خط",
  description: "نگاه خط به بازاریابی، برندها و مسیر رشد کسب‌وکار.",
  image: "/images/news.png",
  path: "/news",
});
export default async function NewsPage() {
  const wpArticles = await getWordPressArticles();
  return <main id="main-content" tabIndex={-1}><PageHero image="/images/news.png" title="خبرهای خط" label="NEWS" description="نگاه ما به دنیای بازاریابی، برندها و آینده" /><section className="pb-14" aria-label="آخرین اخبار"><NewsRail aboveFold items={wpArticles || undefined} /></section></main>;
}

