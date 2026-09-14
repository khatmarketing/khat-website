import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import PageHero from "../../components/PageHero";
import { articles } from "@/lib/articles";
import { articleSchema, createMetadata } from "@/lib/seo";
import { getWordPressArticle } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = true;
function getFallbackArticle(slug: string) {
  if (!Object.hasOwn(articles, slug)) notFound();
  return articles[slug as keyof typeof articles];
}
export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article = (await getWordPressArticle(slug)) || getFallbackArticle(slug);
  return createMetadata({
    title: article.title,
    description: article.description,
    image: article.image,
    path: `/news/${slug}`,
    type: "article",
    tags: [article.category],
  });
}
export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const article = (await getWordPressArticle(slug)) || getFallbackArticle(slug);
  return (
    <main id="main-content" tabIndex={-1}>
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          image: article.image,
          path: `/news/${slug}`,
          author: "خط",
        })}
      />
      <PageHero title={article.title} label="JOURNAL / KHAT" image={article.image}><div className="mt-4 flex justify-between gap-4 text-sm text-white/75"><span>{article.category}</span><span>{article.date}</span></div></PageHero>
      <article className="content-section"><p className="text-lg font-medium leading-9 text-white/85">{article.description}</p><span className="signature my-8" aria-hidden="true" /><div className="space-y-7">{article.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-9 text-white/75">{paragraph}</p>)}</div><Link href="/news" className="cta mt-10">بازگشت به خبرهای خط <span aria-hidden="true">←</span></Link></article>
    </main>
  );
}

