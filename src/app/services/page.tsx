import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { services } from "@/lib/services";
import { createMetadata } from "@/lib/seo";
import { getWordPressServices, type ManagedService } from "@/lib/wordpress";

export const metadata: Metadata = createMetadata({
  title: "خدمات خط",
  description: "تولید محتوا، تبلیغات، پرسونال برندینگ، رشد کسب‌وکار و تیم‌سازی با خط.",
  path: "/services",
});
function fallbackServices(): ManagedService[] {
  return Object.entries(services).map(([slug, service]) => ({
    slug,
    title: service.title,
    intro: service.intro,
    image: service.image,
    paragraphs: [...service.paragraphs],
    active: true,
  }));
}

export default async function ServicesPage() {
  const wpServices = await getWordPressServices();
  const managedServices = (wpServices?.filter((service) => service.active !== false) || fallbackServices());
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="خدمات خط" label="SERVICES" description="راه‌حل‌های خلاقانه برای رشد واقعی" image="/images/home-hero-v2.png" />
      <section className="content-section pt-0" aria-label="خدمات خط">
        <div className="service-grid">
          {managedServices.map((service, index) => (
            <Link href={`/services/${service.slug}`} aria-label={service.title} key={service.slug} className={`service-card neon-ring ${service.slug === "team-building" ? "service-wide" : ""}`}>
              <div className="service-image"><Image src={service.image} alt="" fill sizes={service.slug === "team-building" ? "190px" : "(max-width: 430px) 44vw, 185px"} className="object-cover object-[center_25%]" /></div>
              <div className="service-copy"><span dir="ltr" className="text-xs text-white/55">0{index + 1}</span><h2 className="mt-2 text-base font-bold leading-8">{service.title}</h2><p className="mt-2 text-sm leading-7 text-white/70">{service.intro}</p><span className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs">جزئیات خدمت <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FF6A1A] text-lg text-[#FF6A1A]">←</span></span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

