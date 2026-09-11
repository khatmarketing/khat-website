import Image from "next/image";
import Link from "next/link";
import NewsRail from "./components/NewsRail";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <Image src="/images/home-hero-v2.png" alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 430px) 100vw, 430px" className="object-cover" />
        <div className="home-hero-shade" />
        <div className="home-hero-copy">
          <span className="eyebrow" dir="ltr">KHAT / CREATIVE GROWTH</span>
          <h1 className="mt-5 text-[clamp(1.65rem,7vw,1.9rem)] font-extrabold leading-[1.9]">ایده تا بازار کنارتیم تا برند بزرگتر و هدفمندتری داشته باشی</h1>
          <Link href="/contact" className="cta mt-7">مشاوره رایگان <span aria-hidden="true">←</span></Link>
        </div>
      </section>
      <section className="content-section" aria-label="خدمات منتخب خط">
        <div className="grid grid-cols-2 gap-3">
          {[["advertising", "تبلیغات", "advertising"], ["content-production", "تولید محتوا", "content"]].map(([slug, label, asset]) => (
            <Link href={`/services/${slug}`} key={slug} aria-label={label} className="quick-service neon-ring group">
              <Image src={`/images/home-services/${asset}-bw.png`} alt={label} fill sizes="(max-width: 430px) 44vw, 185px" className="object-cover transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 group-active:opacity-0" />
              <Image src={`/images/home-services/${asset}-color.png`} alt="" fill sizes="(max-width: 430px) 44vw, 185px" className="object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100" />
            </Link>
          ))}
        </div>
        <Link href="/services" className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-white/75">کاری که خط برات می‌کنه <span aria-hidden="true">←</span></Link>
      </section>
      <section className="pb-14" aria-labelledby="latest-news">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-6"><h2 id="latest-news" className="section-title">آخرین اخبار</h2><Link href="/news" className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm">همه اخبار</Link></div>
        <NewsRail limit={3} />
      </section>
    </main>
  );
}

