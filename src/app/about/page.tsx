import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";

export const metadata: Metadata = { title: "درباره خط", description: "خط، همراه برندها از شکل‌گیری ایده تا اجرای مسیر رشد." };
export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="درباره خط" label="ABOUT US" image="/images/about.png" description="ترکیبی از فکر، خلاقیت و عمل" />
      <section className="content-section">
        <h2 className="section-title">از ایده تا بازار، کنار شما</h2>
        <p className="mt-5 text-base leading-9 text-white/75">در خط، رشد را نتیجه پیوند استراتژی و اجرا می‌دانیم. از شناخت کسب‌وکار و مخاطب شروع می‌کنیم تا برای برند شما مسیری روشن و قابل‌اندازه‌گیری بسازیم.</p>
        <span className="signature my-8" aria-hidden="true" />
        <h2 className="section-title">فکر منسجم، اجرای هدفمند</h2>
        <p className="mt-5 text-base leading-9 text-white/75">تولید محتوا، تبلیغات، برندینگ و تیم‌سازی برای ما بخش‌های یک مسیر مشترک‌اند. هر تصمیم باید به هدف کسب‌وکار نزدیک‌تر شود و هر اجرا فرصتی برای یادگیری و بهتر شدن باشد.</p>
        <Link href="/contact" className="cta mt-8">درباره مسیر برندتان صحبت کنیم <span aria-hidden="true">←</span></Link>
      </section>
    </main>
  );
}

