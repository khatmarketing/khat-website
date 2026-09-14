import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import { services } from "@/lib/services";
import { createMetadata } from "@/lib/seo";
import { getWordPressService } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = true;
function getFallbackService(slug: string) {
  if (!Object.hasOwn(services, slug)) notFound();
  return services[slug as keyof typeof services];
}
export function generateStaticParams() { return Object.keys(services).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const service = (await getWordPressService(slug)) || getFallbackService(slug);
  return createMetadata({
    title: service.title,
    description: service.intro,
    image: service.image,
    path: `/services/${slug}`,
  });
}
export default async function ServicePage({ params }: Props) {
  const slug = (await params).slug;
  const service = (await getWordPressService(slug)) || getFallbackService(slug);
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title={service.title} label="SERVICES / KHAT" image={service.image} />
      <section className="content-section text-center">
        <p className="text-lg font-medium leading-9 text-white/80">{service.intro}</p>
        <span className="signature mx-auto my-8" aria-hidden="true" />
        <div className="space-y-6">{service.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-9 text-white/75">{paragraph}</p>)}</div>
        <Link href="/contact" className="cta mt-9" data-analytics-event="consultation_click">مشاوره رایگان <span aria-hidden="true">←</span></Link>
        <div><Link href="/services" className="mt-5 inline-flex min-h-11 items-center text-sm text-white/65">بازگشت به همه خدمات</Link></div>
      </section>
    </main>
  );
}

