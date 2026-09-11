import Link from "next/link";

const services = [
 {
    id: "01",
    title: "تولید محتوای خلاقانه",
    shortTitle: "تولید محتوا",
    description: "محتوایی که دیده می‌شود و اثر می‌گذارد.",
    href: "/services/content-production",
image: "/images/services/details/content-production.png",
position: "60% center",
  },
  {
    id: "02",
    title: "تبلیغات",
    shortTitle: "تبلیغات",
    description: "کمپین‌هایی هدفمند با نتایج واقعی.",
    href: "/services/advertising",
    image: "/images/services/details/advertising.png",
  },
  {
    id: "03",
    title: "پرسونال برندینگ",
    shortTitle: "پرسونال برندینگ",
    description: "ساختن تصویری ماندگار از شما در ذهن دیگران.",
    href: "/services/personal-branding",
    image: "/images/services/details/personal-branding.png",
  },
  {
    id: "04",
    title: "رشد و توسعه کسب‌وکار",
    shortTitle: "رشد کسب‌وکار",
    description: "از استراتژی تا اجرا در کنار شما.",
    href: "/services/business-growth",
    image: "/images/services/details/business-growth.png",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

function KhatSignature({
  width = "w-[72px]",
  background = "#080808",
}: {
  width?: string;
  background?: string;
}) {
  return (
    <div className={`relative h-[8px] ${width}`}>
      <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

      <div
        className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A]"
        style={{ background }}
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#080808] text-white"
    >
      {/* =========================================
          HERO
      ========================================= */}
      <section
        className="relative mx-auto h-[430px] w-full max-w-[430px] overflow-hidden bg-[#080808]"
        style={{
          backgroundImage:
            "url('/images/services/services-hero.jpg'), url('/images/home-hero-v2.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Hero overlays */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-[#080808]" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/10" />

        {/* Menu */}
        <Link
          href="/"
          aria-label="بازگشت به صفحه اصلی خط"
          className="absolute left-5 top-6 z-20 flex h-10 w-10 items-center justify-center"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[1.5px] w-6 rounded-full bg-white" />
            <span className="block h-[1.5px] w-6 rounded-full bg-white" />
            <span className="block h-[1.5px] w-6 rounded-full bg-white" />
          </div>
        </Link>

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-[48px] z-10 px-6 text-center">
          <span
            dir="ltr"
            className="block text-[9px] font-medium tracking-[0.62em] text-white/55"
          >
            SERVICES
          </span>

          <h1 className="mt-5 text-[36px] font-extrabold leading-[1.4] text-white">
            خدمات خط
          </h1>

          <p className="mt-3 text-[17px] font-medium text-white/45">
            راه‌حل‌های خلاقانه برای رشد واقعی
          </p>
        </div>
      </section>

      {/* =========================================
          SERVICES GRID
      ========================================= */}
      <section className="mx-auto w-full max-w-[430px] bg-[#080808] px-5 pb-4 pt-3">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative min-w-0 overflow-hidden rounded-[18px] border border-white/[0.13] bg-[#101010] transition-all duration-500 hover:border-[#FF6A1A]/45"
            >
              {/* IMAGE */}
              <div
                className="relative h-[120px] overflow-hidden bg-[#111]"
                style={{
                  backgroundImage: `url('${service.image}'), url('/images/home-hero-v2.png')`,
backgroundPosition:
  service.id === "01" ? "center 15%" : "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/45 via-transparent to-black/10" />

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#FF6A1A]/[0.08] blur-[45px]" />
              </div>

              {/* CONTENT */}
              <div className="flex min-h-[145px] flex-col px-4 pb-4 pt-4">
                <span
                  dir="ltr"
                  className="mb-2 text-[7px] tracking-[0.16em] text-white/18"
                >
                  {service.id}
                </span>

                <h2 className="text-[15px] font-extrabold leading-[1.7] text-white">
                  {service.title}
                </h2>

                <p className="mt-3 text-[10px] leading-[1.9] text-white/43">
                  {service.description}
                </p>

                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#FF6A1A] text-[#FF6A1A] transition-all duration-300 group-hover:bg-[#FF6A1A] group-hover:text-black">
                    <ArrowIcon />
                  </div>

                  <KhatSignature
                    width="w-[34px]"
                    background="#101010"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* =========================================
            TEAM BUILDING - WIDE CARD
        ========================================= */}
        <Link
          href="/services/team-building"
          className="group relative mt-3 grid min-h-[190px] grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-[18px] border border-white/[0.13] bg-[#101010] transition-all duration-500 hover:border-[#FF6A1A]/45"
        >
          {/* IMAGE */}
          <div
            className="relative min-h-[190px] bg-[#111]"
            style={{
backgroundImage:
  "url('/images/services/details/team-building.png'), url('/images/home-hero-v2.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#101010]/25" />
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col px-4 py-5">
            <span
              dir="ltr"
              className="text-[7px] tracking-[0.16em] text-white/18"
            >
              05
            </span>

            <h2 className="mt-4 text-[17px] font-extrabold leading-[1.7] text-white">
              تیم‌سازی برای شما
            </h2>

            <p className="mt-4 text-[10px] leading-[1.9] text-white/43">
              ساختن تیم‌های توانمند برای مسیرهای بزرگ.
            </p>

            <div className="mt-auto flex items-end justify-between pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#FF6A1A] text-[#FF6A1A] transition-all duration-300 group-hover:bg-[#FF6A1A] group-hover:text-black">
                <ArrowIcon />
              </div>

              <KhatSignature
                width="w-[34px]"
                background="#101010"
              />
            </div>
          </div>
        </Link>
      </section>

      {/* =========================================
          BOTTOM BRAND SECTION
      ========================================= */}
      <section className="relative mx-auto min-h-[245px] w-full max-w-[430px] overflow-hidden px-6 pb-10 pt-16">
        {/* Orange atmosphere */}
        <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-[#FF6A1A]/20 blur-[90px]" />

        <div className="relative z-10 flex h-full items-end justify-between">
          {/* Left side */}
          <div className="pt-10">
            <div className="mb-7">
              <KhatSignature width="w-[78px]" />
            </div>

            <p className="max-w-[260px] text-[13px] leading-[2] text-white/46">
              بازاریابی، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-start">
            <p className="text-[18px] font-extrabold leading-[1.6]">
              همه چیز
              <br />
              روی خط
            </p>

            <div className="mt-5">
              <KhatSignature width="w-[60px]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MINI FOOTER
      ========================================= */}
      <footer className="mx-auto w-full max-w-[430px] border-t border-white/[0.05] px-5 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[9px] text-white/28 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            صفحه اصلی خط
          </Link>

          <span
            dir="ltr"
            className="text-[7px] tracking-[0.12em] text-white/16"
          >
            KHAT ©
          </span>
        </div>
      </footer>
    </main>
  );
}