import Link from "next/link";
import { notFound } from "next/navigation";
import KhatMenu from "../../components/KhatMenu";

const services = {
  "content-production": {
    title: "تولید محتوا",
    image: "/images/services/details/content-production.png",
    intro:
      "تولید محتوای خلاقانه با اصول وایرال مدیا",
    paragraphs: [
      "سناریو نویسی شده نسبت به محصول، شخصیت و مخاطب شما",
      "از ایده پردازی و فیلمبرداری تا آپلود محتوا و سنجش بازخوردها",
      "نسبت به KPI های مورد نیاز سازمان یا برند شما",
    ],
  },

  advertising: {
    title: "تبلیغات",
    image: "/images/services/details/advertising.png",
    intro:
      "طراحی و اجرای کمپین‌های تبلیغاتی هدفمند برای رشد برند",
    paragraphs: [
      "شناخت مخاطب، انتخاب کانال مناسب و ساخت پیام اثرگذار",
      "از ایده‌پردازی و طراحی کمپین تا اجرا، اندازه‌گیری و تحلیل نتایج",
      "برای رسیدن به بازدهی بهتر و اهداف مشخص کسب‌وکار شما",
    ],
  },

  "personal-branding": {
    title: "پرسونال برندینگ",
    image: "/images/services/details/personal-branding.png",
    intro:
      "ساخت یک تصویر حرفه‌ای و ماندگار از شما در ذهن مخاطب",
    paragraphs: [
      "طراحی مسیر محتوایی و ارتباطی متناسب با شخصیت، تخصص و اهداف شما",
      "از استراتژی حضور در فضای دیجیتال تا ساخت اعتبار و اعتماد شخصی",
      "برای تبدیل شدن به یک مرجع قابل توجه در حوزه فعالیت خود",
      "شناخته شدن شما باعث اعتبار فردی و بالاتر رفتن جایگاه کسب‌وکار شما میشه",
    ],
  },

  "business-growth": {
    title: "رشد و توسعه کسب‌وکار",
    image: "/images/services/details/business-growth.png",
    intro:
      "طراحی مسیر رشد پایدار برای کسب‌وکار شما",
    paragraphs: [
      "بررسی مدل کسب‌وکار، فرصت‌های جدید و نقاط قابل بهبود",
      "از تحلیل وضعیت فعلی تا اجرای استراتژی‌های توسعه و افزایش درآمد",
      "با تمرکز بر اهداف، بازار و KPI های مورد نیاز برند شما",
    ],
  },

  "team-building": {
    title: "تیم سازی برای شما",
    image: "/images/services/details/team-building.png",
    intro:
      "ساخت تیم تولید محتوا و تبلیغات برای سازمان و برند شما و بی نیاز کردن شما از کار با مجموعه‌های دیگر",
    paragraphs: [
      "از شناسایی افراد مناسب تا ایجاد فرآیندهای همکاری و رشد تیم",
      "برای ساخت مجموعه‌ای که بتونه مسیر رشد برند شما رو ادامه بده",
    ],
  },
} as const;

type ServiceSlug = keyof typeof services;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}

function BrandSignature({
  width = "w-[74px]",
}: {
  width?: string;
}) {
  return (
    <div className={`relative h-[8px] ${width}`}>
      <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

      <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#080808]" />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[31px] w-[31px]"
      fill="#FF6A1A"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in services)) {
    notFound();
  }

  const service =
    services[slug as ServiceSlug];

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#080808] text-white"
    >
      {/* ======================================
          HERO
      ====================================== */}
      <section className="relative mx-auto h-[620px] w-full max-w-[430px] overflow-hidden bg-[#080808]">
        {/* Background image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('${service.image}')`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }}
/>

{/* Cinematic overlays */}
<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent via-[#080808]/75 to-[#080808]" />

<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] bg-[#080808]" />

        {/* SAME HAMBURGER AS HOME */}
        <KhatMenu />

{/* Service title */}
<div className="absolute inset-x-0 bottom-[75px] z-20 px-6 text-center">
  <h1 className="mx-auto max-w-[390px] text-[40px] font-extrabold leading-[1.3] tracking-[-0.03em] text-white">
    {service.title}
  </h1>
</div>
      </section>

{/* ======================================
    CONTENT
====================================== */}
<section className="relative mx-auto w-full max-w-[430px] px-7 pb-5 pt-2 text-center">
  {/* Intro */}
  <p className="mx-auto max-w-[360px] text-[18px] font-medium leading-[2.05] text-white/48">
    {service.intro}
  </p>

  {/* Main paragraphs */}
  <div className="mx-auto mt-9 max-w-[365px]">
    {service.paragraphs.map((paragraph, index) => (
      <div key={paragraph}>
        {index === 2 && (
          <div className="mx-auto my-9 flex justify-center">
            <BrandSignature width="w-[72px]" />
          </div>
        )}

        <p
          className={`mx-auto text-[16px] font-medium leading-[2.12] text-white/82 ${
            index === 0 ? "mt-0" : "mt-9"
          }`}
        >
          {paragraph}
        </p>
      </div>
    ))}
  </div>
</section>

{/* ======================================
    FREE CONSULTATION
====================================== */}
<section className="mx-auto w-full max-w-[430px] px-7 pb-20 pt-10">
  <Link
    href="/contact"
    className="mx-auto flex max-w-[370px] items-center justify-center gap-4"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center">
      <PhoneIcon />
    </div>

    <span className="text-[17px] font-medium leading-[1.9] text-white">
      واسه مشاوره رایگان باهامون تماس بگیر
    </span>
  </Link>
</section>
{/* ======================================
    FOOTER / BRAND AREA
====================================== */}
<section className="relative mx-auto min-h-[270px] w-full max-w-[430px] overflow-hidden px-7 pb-9 pt-12">
  {/* Orange ambient light */}
  <div className="pointer-events-none absolute -bottom-[150px] -left-[120px] h-[300px] w-[300px] rounded-full bg-[#FF6A1A]/25 blur-[100px]" />

  <div className="pointer-events-none absolute -bottom-[90px] -left-[60px] h-[170px] w-[170px] rounded-full bg-[#FF6A1A]/10 blur-[55px]" />

  <div className="relative z-10 flex min-h-[195px] items-end justify-between">
    {/* LEFT SIDE */}
    <div className="flex flex-col items-start pb-1">
      <div className="mb-6 h-[2px] w-[52px] rounded-full bg-white/70" />

      <p className="max-w-[245px] text-right text-[12px] font-normal leading-[2] text-white/42">
        بازاریابی، برندینگ و رشد کسب‌وکارها
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex flex-col items-start">
      <p className="text-right text-[18px] font-extrabold leading-[1.5] text-white">
        همه چیز
        <br />
        روی خط
      </p>

      <div className="mt-5 h-[2px] w-[42px] rounded-full bg-white/70" />
    </div>
  </div>
</section>

    </main>
  );
}