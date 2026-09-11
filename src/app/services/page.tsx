import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { services } from "@/lib/services";

export const metadata: Metadata = { title: "خدمات خط", description: "تولید محتوا، تبلیغات، پرسونال برندینگ، رشد کسب‌وکار و تیم‌سازی با خط." };
export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="خدمات خط" label="SERVICES" description="راه‌حل‌های خلاقانه برای رشد واقعی" image="/images/home-hero-v2.png" />
      <section className="content-section pt-0" aria-label="خدمات خط">
        <div className="service-grid">
          {Object.entries(services).map(([slug, service], index) => (
            <Link href={`/services/${slug}`} aria-label={service.title} key={slug} className={`service-card neon-ring ${slug === "team-building" ? "service-wide" : ""}`}>
              <div className="service-image"><Image src={service.image} alt="" fill sizes={slug === "team-building" ? "190px" : "(max-width: 430px) 44vw, 185px"} className="object-cover object-[center_25%]" /></div>
              <div className="service-copy"><span dir="ltr" className="text-xs text-white/55">0{index + 1}</span><h2 className="mt-2 text-base font-bold leading-8">{service.title}</h2><p className="mt-2 text-sm leading-7 text-white/70">{service.intro}</p><span className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs">جزئیات خدمت <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FF6A1A] text-lg text-[#FF6A1A]">←</span></span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

