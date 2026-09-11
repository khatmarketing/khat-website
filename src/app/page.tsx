"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const articlesRef = useRef<HTMLDivElement>(null);
const [scrollProgress, setScrollProgress] = useState(0);
const isDraggingScroll = useRef(false);
const scrollTrackRef = useRef<HTMLDivElement>(null);
const isDraggingArticles = useRef(false);
const dragStartX = useRef(0);
const dragStartScrollLeft = useRef(0);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isServicesOpen, setIsServicesOpen] = useState(false);
const [isNewsOpen, setIsNewsOpen] = useState(false);
  const updateScrollProgress = () => {
    const el = articlesRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }

    setScrollProgress(el.scrollLeft / maxScroll);
  };

  const scrollArticles = (direction: "left" | "right") => {
    const el = articlesRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "right" ? 248 : -248,
      behavior: "smooth",
    });
  };
  const moveScrollHandle = (clientX: number) => {
  const track = scrollTrackRef.current;
  const articles = articlesRef.current;

  if (!track || !articles) return;

  const rect = track.getBoundingClientRect();

  const knobSize = 20;
  const usableWidth = rect.width - knobSize;

  let x = clientX - rect.left - knobSize / 2;

  x = Math.max(0, Math.min(x, usableWidth));

  const progress = usableWidth > 0 ? x / usableWidth : 0;

  const maxScroll =
    articles.scrollWidth - articles.clientWidth;

  articles.scrollLeft = progress * maxScroll;

  setScrollProgress(progress);
};
useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";

    setIsServicesOpen(false);
    setIsNewsOpen(false);
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
      setIsServicesOpen(false);
      setIsNewsOpen(false);
    }
  };

  window.addEventListener("keydown", handleEscape);

  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleEscape);
  };
}, [isMenuOpen]);
  return (
    <main className="min-h-screen bg-[#080808] text-white">
{/* MOBILE MENU */}
<div
  dir="ltr"
  className={`fixed inset-0 z-[999] transition-[visibility] duration-500 ${
    isMenuOpen
      ? "pointer-events-auto visible"
      : "pointer-events-none invisible"
  }`}
>
  {/* BACKDROP */}
  <button
    type="button"
    aria-label="بستن منو"
    onClick={() => setIsMenuOpen(false)}
    className={`absolute inset-0 h-full w-full bg-black/65 backdrop-blur-md transition-opacity duration-500 ${
      isMenuOpen ? "opacity-100" : "opacity-0"
    }`}
  />

  {/* LEFT SLIDING PANEL */}
  <aside
    dir="rtl"
    className={`absolute left-0 top-0 flex h-[100dvh] w-[86%] max-w-[360px] flex-col overflow-hidden border-r border-white/[0.08] bg-[#070707]/95 px-6 pb-5 pt-5 shadow-[20px_0_70px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      isMenuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* TOP */}
    <div className="flex shrink-0 items-start justify-between">
      {/* Brand */}
      <div className="flex flex-col items-start">
        <span className="text-[28px] font-bold leading-none text-white">
          خط
        </span>

        <span
          dir="ltr"
          className="mt-[6px] text-[6px] tracking-[0.5em] text-white/35"
        >
          KHAT
        </span>
      </div>

      {/* Close button */}
      <button
        type="button"
        aria-label="بستن منو"
        onClick={() => setIsMenuOpen(false)}
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition-all duration-300 hover:border-[#FF6A1A] hover:bg-[#FF6A1A]/10"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[17px] w-[17px] transition-transform duration-300 group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 6L18 18" />
          <path d="M18 6L6 18" />
        </svg>
      </button>
    </div>

    {/* KHAT ORANGE SIGNATURE */}
    <div className="relative mt-5 h-[8px] w-full shrink-0">
      <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

      <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#070707]" />
    </div>

{/* NAVIGATION */}
<nav className="mt-3 flex shrink-0 flex-col">

  {/* 01 - HOME */}
  <a
    href="/"
    onClick={() => setIsMenuOpen(false)}
    className="group flex h-[50px] items-center justify-between border-b border-white/[0.06]"
  >
    <span className="text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-[#FF6A1A]">
      صفحه اصلی خط
    </span>

    <span
      dir="ltr"
      className="text-[8px] tracking-[0.12em] text-white/20"
    >
      01
    </span>
  </a>


  {/* 02 - SERVICES */}
  <div className="border-b border-white/[0.06]">
    <button
      type="button"
      onClick={() => {
        setIsServicesOpen((prev) => !prev);
        setIsNewsOpen(false);
      }}
      className="group flex h-[50px] w-full items-center justify-between"
    >
      <span
        className={`text-[14px] font-medium transition-colors duration-300 ${
          isServicesOpen
            ? "text-[#FF6A1A]"
            : "text-white group-hover:text-[#FF6A1A]"
        }`}
      >
        کاری که خط برات میکنه
      </span>

      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className={`h-[14px] w-[14px] transition-all duration-300 ${
            isServicesOpen
              ? "rotate-90 text-[#FF6A1A]"
              : "text-white/30"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18L15 12L9 6" />
        </svg>

        <span
          dir="ltr"
          className="text-[8px] tracking-[0.12em] text-white/20"
        >
          02
        </span>
      </div>
    </button>

    {/* SERVICES SUBMENU */}
    <div
      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isServicesOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="mb-3 mr-3 flex flex-col border-r border-white/[0.07] pr-4">

          <a
            href="/services/content-production"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            تولید محتوا
          </a>

          <a
            href="/services/advertising"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            تبلیغات
          </a>

          <a
            href="/services/personal-branding"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            پرسونال برندینگ
          </a>

          <a
            href="/services/business-growth"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            رشد کسب‌وکار
          </a>

          <a
            href="/services/team-building"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            تیم‌سازی
          </a>

        </div>
      </div>
    </div>
  </div>


  {/* 03 - PARTNERS */}
  <a
href="/partners"
    onClick={() => setIsMenuOpen(false)}
    className="group flex h-[50px] items-center justify-between border-b border-white/[0.06]"
  >
    <span className="text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-[#FF6A1A]">
      کیا با خط کارکردن
    </span>

    <span
      dir="ltr"
      className="text-[8px] tracking-[0.12em] text-white/20"
    >
      03
    </span>
  </a>


  {/* 04 - KHAT NEWS */}
  <div className="border-b border-white/[0.06]">
    <button
      type="button"
      onClick={() => {
        setIsNewsOpen((prev) => !prev);
        setIsServicesOpen(false);
      }}
      className="group flex h-[50px] w-full items-center justify-between"
    >
      <span
        className={`text-[14px] font-medium transition-colors duration-300 ${
          isNewsOpen
            ? "text-[#FF6A1A]"
            : "text-white group-hover:text-[#FF6A1A]"
        }`}
      >
        خبر های خط
      </span>

      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className={`h-[14px] w-[14px] transition-all duration-300 ${
            isNewsOpen
              ? "rotate-90 text-[#FF6A1A]"
              : "text-white/30"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18L15 12L9 6" />
        </svg>

        <span
          dir="ltr"
          className="text-[8px] tracking-[0.12em] text-white/20"
        >
          04
        </span>
      </div>
    </button>

    {/* NEWS SUBMENU */}
    <div
      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isNewsOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="mb-3 mr-3 flex flex-col border-r border-white/[0.07] pr-4">

          <a
            href="/news"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            همه خبرها
          </a>

          <a
            href="/news?category=marketing"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            مارکتینگ و تبلیغات
          </a>

          <a
            href="/news?category=business"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-[28px] items-center text-[10px] text-white/45 transition-colors duration-300 hover:text-[#FF6A1A]"
          >
            کسب‌وکار و استراتژی
          </a>

        </div>
      </div>
    </div>
  </div>


  {/* 05 - ABOUT KHAT */}
  <a
    href="/about"
    onClick={() => setIsMenuOpen(false)}
    className="group flex h-[50px] items-center justify-between border-b border-white/[0.06]"
  >
    <span className="text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-[#FF6A1A]">
      درباره خط
    </span>

    <span
      dir="ltr"
      className="text-[8px] tracking-[0.12em] text-white/20"
    >
      05
    </span>
  </a>


  {/* 06 - CALL KHAT */}
  <a
    href="tel:+989000000000"
    onClick={() => setIsMenuOpen(false)}
    className="group flex h-[50px] items-center justify-between border-b border-white/[0.06]"
  >
    <span className="text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-[#FF6A1A]">
      به خط زنگ بزن
    </span>

    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 24 24"
        className="h-[14px] w-[14px] text-white/30 transition-colors duration-300 group-hover:text-[#FF6A1A]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.72a16 16 0 0 0 4.28 4.28l1.26-1.26a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </svg>

      <span
        dir="ltr"
        className="text-[8px] tracking-[0.12em] text-white/20"
      >
        06
      </span>
    </div>
  </a>

</nav>
    {/* BOTTOM */}
    <div className="mt-auto shrink-0 pt-4">
      {/* KHAT ACCENT */}
      <div className="relative mb-4 h-[8px] w-[58px]">
        <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

        <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#070707]" />
      </div>

      <p className="max-w-[235px] text-[9px] leading-[19px] text-white/30">
        استراتژی، بازاریابی، برندینگ و رشد کسب‌وکار
      </p>

      {/* SOCIAL */}
      <div
        dir="ltr"
        className="mt-3 flex items-center justify-end gap-3"
      >
        <a
          href="#"
          className="text-[8px] tracking-[0.1em] text-white/40 transition-colors duration-300 hover:text-[#FF6A1A]"
        >
          Instagram
        </a>

        <span className="h-[3px] w-[3px] rounded-full bg-[#FF6A1A]" />

        <a
          href="#"
          className="text-[8px] tracking-[0.1em] text-white/40 transition-colors duration-300 hover:text-[#FF6A1A]"
        >
          Telegram
        </a>
      </div>
    </div>

    {/* ORANGE GLOW */}
    <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#FF6A1A]/[0.06] blur-[85px]" />

  </aside>
</div>
      {/* HERO */}
      <section className="relative mx-auto h-[320px] w-full max-w-[430px] overflow-hidden bg-black">
        <Image
          src="/images/home-hero-v2.png"
          alt="خط - مسیر رشد کسب‌وکارها"
          fill
          priority
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />

        <header
          dir="ltr"
          className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-5"
        >
<button
  type="button"
  aria-label="باز کردن منو"
  aria-expanded={isMenuOpen}
  onClick={() => setIsMenuOpen(true)}
  className="flex h-10 w-10 cursor-pointer items-center justify-center"
>
  <div className="flex flex-col gap-[5px]">
    <span className="block h-[1.5px] w-6 bg-white" />
    <span className="block h-[1.5px] w-6 bg-white" />
    <span className="block h-[1.5px] w-6 bg-white" />
  </div>
</button>
<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[45px]">
  <Image
    src="/images/brand/khat-logo.png"
    alt="لوگو و لوگوتایپ خط"
    width={160}
    height={60}
    priority
    className="h-auto w-[160px] object-contain"
  />
</div>

          <a
            href="tel:+989000000000"
            aria-label="تماس با خط"
            className="flex h-10 w-10 items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[23px] w-[23px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </header>

        <div className="absolute bottom-[46px] left-0 z-10 w-[58%] px-7 text-right">
          <h1 className="text-[25px] font-extrabold leading-[1.55]">
            مسیر رشد کسب‌وکارها
          </h1>

          <a
            href="#services"
            className="mt-7 inline-flex h-[44px] items-center gap-4 rounded-full border border-[#ff5a00] px-6 text-[13px] font-medium"
          >
            <span>مشاوره رایگان</span>
            <span className="text-[20px] text-[#ff5a00]">←</span>
          </a>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080808]/50 to-transparent" />
      </section>

      {/* HOME SERVICES QUICK CARDS */}
      <section className="mx-auto w-full max-w-[430px] bg-[#080808] px-5 py-[38px]">

        <div
          dir="ltr"
          className="grid w-full grid-cols-2 gap-3"
        >

          {/* ADVERTISING */}
          <a
            href="/services/advertising"
            aria-label="تبلیغات"
            className="group relative block w-full overflow-hidden rounded-[9px] bg-[#0B0B0B]"
            style={{ aspectRatio: "948 / 588" }}
          >

            {/* BLACK & WHITE */}
            <img
              src="/images/home-services/advertising-bw.png"
              alt="تبلیغات"
              draggable="false"
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
                object-center
                transition-opacity
                duration-100
                group-hover:opacity-0
                group-focus:opacity-0
                group-active:opacity-0
              "
            />

            {/* COLOR */}
            <img
              src="/images/home-services/advertising-color.png"
              alt=""
              draggable="false"
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
                object-center
                opacity-0
                transition-opacity
                duration-100
                group-hover:opacity-100
                group-focus:opacity-100
                group-active:opacity-100
              "
            />

          </a>


          {/* CONTENT PRODUCTION */}
          <a
            href="/services/content-production"
            aria-label="تولید محتوا"
            className="group relative block w-full overflow-hidden rounded-[9px] bg-[#0B0B0B]"
            style={{ aspectRatio: "948 / 588" }}
          >

            {/* BLACK & WHITE */}
            <img
              src="/images/home-services/content-bw.png"
              alt="تولید محتوا"
              draggable="false"
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
                object-center
                transition-opacity
                duration-100
                group-hover:opacity-0
                group-focus:opacity-0
                group-active:opacity-0
              "
            />

            {/* COLOR */}
            <img
              src="/images/home-services/content-color.png"
              alt=""
              draggable="false"
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
                object-center
                opacity-0
                transition-opacity
                duration-100
                group-hover:opacity-100
                group-focus:opacity-100
                group-active:opacity-100
              "
            />

          </a>

        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto w-full max-w-[430px] bg-[#080808] px-5 pb-16 pt-4">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-[27px] font-extrabold leading-none">
  آخرین اخبار
          </h2>

          <a
            href="/news"
            className="inline-flex h-[36px] items-center gap-2 rounded-full border border-white/15 px-4 text-[11px] text-white/60"
          >
<span>همه اخبار</span>
            <span className="text-[16px]">←</span>
          </a>
        </div>

        <div className="overflow-hidden">
<div
  ref={articlesRef}
  dir="ltr"
  onScroll={updateScrollProgress}
  onWheel={(e) => {
    if (!articlesRef.current) return;

    e.preventDefault();
    articlesRef.current.scrollLeft += e.deltaY;
  }}
  onPointerDown={(e) => {
    if (!articlesRef.current) return;

    isDraggingArticles.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = articlesRef.current.scrollLeft;

    e.currentTarget.setPointerCapture(e.pointerId);
  }}
  onPointerMove={(e) => {
    if (!isDraggingArticles.current || !articlesRef.current) return;

    const delta = e.clientX - dragStartX.current;

    articlesRef.current.scrollLeft =
      dragStartScrollLeft.current - delta;
  }}
  onPointerUp={(e) => {
    isDraggingArticles.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }}
  onPointerCancel={() => {
    isDraggingArticles.current = false;
  }}
  className="flex cursor-grab gap-3 overflow-x-auto pb-3 scroll-smooth touch-pan-y select-none active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
>
            <article className="w-[235px] shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.015]">
              <div className="relative h-[125px] overflow-hidden bg-[#111]">
                <Image
                  src="/images/home-hero-v2.png"
                  alt="طراحی کمپین موفق"
                  fill
                  sizes="235px"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <span className="text-[10px] text-white/45">
                  ۱۴۰۴/۰۵/۲۸
                </span>

                <h3 className="mt-3 text-[16px] font-bold leading-7">
                  چگونه یک کمپین موفق طراحی کنیم؟
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-white/50">
                  مراحل، اصول و اجزای کمپین‌های مؤثر از ایده تا نتیجه.
                </p>

                <a
                  href="/news/campaign-strategy"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold text-[#ff5a00]"
                >
                  مطالعه بیشتر
                  <span className="text-[17px]">←</span>
                </a>
              </div>
            </article>

            <article className="w-[235px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.015]">
              <div className="relative h-[125px] overflow-hidden bg-[#111]">
                <Image
                  src="/images/home-hero-v2.png"
                  alt="برندسازی در عصر هوش مصنوعی"
                  fill
                  sizes="235px"
                  className="object-cover object-[65%_center]"
                />
              </div>

              <div className="p-4">
                <span className="text-[10px] text-white/45">
                  ۱۴۰۴/۰۶/۰۵
                </span>

                <h3 className="mt-3 text-[16px] font-bold leading-7">
                  برندسازی در عصر هوش مصنوعی
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-white/50">
                  فرصت‌ها، چالش‌ها و مسیر پیش‌روی برندها در آینده.
                </p>

                <a
                  href="/news/ai-branding"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold text-[#ff5a00]"
                >
                  مطالعه بیشتر
                  <span className="text-[17px]">←</span>
                </a>
              </div>
            </article>

            <article className="w-[235px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.015]">
              <div className="relative h-[125px] overflow-hidden bg-[#111]">
                <Image
                  src="/images/home-hero-v2.png"
                  alt="استراتژی کسب‌وکار"
                  fill
                  sizes="235px"
                  className="object-cover object-left"
                />
              </div>

              <div className="p-4">
                <span className="text-[10px] text-white/45">
                  ۱۴۰۴/۰۵/۱۲
                </span>

                <h3 className="mt-3 text-[16px] font-bold leading-7">
                  چرا استراتژی مهم‌تر از تاکتیک است؟
                </h3>

                <p className="mt-2 text-[11px] leading-6 text-white/50">
                  نگاهی به تفاوت‌های بنیادین و نقش استراتژی در رشد پایدار.
                </p>

                <a
                  href="/news/strategy-vs-tactics"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold text-[#ff5a00]"
                >
                  مطالعه بیشتر
                  <span className="text-[17px]">←</span>
                </a>
              </div>
            </article>
          </div>

{/* CUSTOM SCROLL HANDLE */}
<div
  dir="ltr"
  className="mt-5 flex w-full items-center gap-3 px-1"
>
  {/* Left arrow */}
  <button
    type="button"
    aria-label="اسکرول به چپ"
    onClick={() => {
      if (articlesRef.current) {
        articlesRef.current.scrollBy({
          left: -235,
          behavior: "smooth",
        });
      }
    }}
    className="flex h-7 w-7 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
  >
    <span className="text-[20px] leading-none">‹</span>
  </button>

  {/* Scroll track */}
{/* Smooth draggable scroll track */}
<div
  ref={scrollTrackRef}
  className="relative h-7 flex-1 cursor-grab touch-none select-none active:cursor-grabbing"
  onPointerDown={(e) => {
    isDraggingScroll.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveScrollHandle(e.clientX);
  }}
  onPointerMove={(e) => {
    if (!isDraggingScroll.current) return;
    moveScrollHandle(e.clientX);
  }}
  onPointerUp={(e) => {
    isDraggingScroll.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }}
  onPointerCancel={() => {
    isDraggingScroll.current = false;
  }}
>
  {/* Gray track */}
  <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/20" />

  {/* Orange progress */}
  <div
    className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#ff5a00]"
    style={{
      width: `${scrollProgress * 100}%`,
    }}
  />

  {/* Orange draggable knob */}
  <div
    className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5a00] shadow-[0_0_10px_rgba(255,90,0,0.65)]"
    style={{
      left: `${Math.min(98, Math.max(2, scrollProgress * 100))}%`,
    }}
  />
</div>
  {/* Right arrow */}
  <button
    type="button"
    aria-label="اسکرول به راست"
    onClick={() => {
      if (articlesRef.current) {
        articlesRef.current.scrollBy({
          left: 235,
          behavior: "smooth",
        });
      }
    }}
    className="flex h-7 w-7 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
  >
    <span className="text-[20px] leading-none">›</span>
  </button>
</div>

</div>
      </section>
      {/* ======================================
          FOOTER
      ====================================== */}
      <section className="relative mx-auto min-h-[290px] w-full max-w-[430px] overflow-hidden px-7 pb-10 pt-14">
        {/* Orange glow */}
        <div className="pointer-events-none absolute -bottom-[150px] -right-[110px] h-[300px] w-[300px] rounded-full bg-[#FF6A1A]/30 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-[70px] -right-[30px] h-[150px] w-[150px] rounded-full bg-[#FF6A1A]/10 blur-[55px]" />

        <div className="relative z-10 flex min-h-[205px] items-end justify-between">
          {/* LEFT */}
          <div className="flex max-w-[245px] flex-col items-start">
            <div className="mb-7 h-[2px] w-[110px] rounded-full bg-white/60" />

            <p className="text-right text-[13px] leading-[2] text-white/42">
              بازاریابی، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start">
<p className="text-right text-[18px] font-extrabold leading-[1.5]">
  همه چیز
  <br />
  روی{" "}
  <span className="relative top-[2px] inline-block">
    خط
  </span>
</p>
            <div className="mt-6 h-[2px] w-[78px] rounded-full bg-white/60" />
          </div>
        </div>
      </section>
    </main>
  );
}