"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function KhatMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    if (!isMenuOpen) {
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

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsNewsOpen(false);
  };

  return (
    <>
      {/* HAMBURGER */}
      <button
        type="button"
        aria-label="باز کردن منو"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
        className="absolute left-5 top-6 z-[70] flex h-10 w-10 items-center justify-center"
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block h-[1.5px] w-6 rounded-full bg-white" />
          <span className="block h-[1.5px] w-6 rounded-full bg-white" />
          <span className="block h-[1.5px] w-6 rounded-full bg-white" />
        </div>
      </button>

      {/* FULL SCREEN MENU */}
      <div
        className={`fixed inset-0 z-[1000] transition-all duration-500 ${
          isMenuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        {/* BACKDROP */}
        <button
          type="button"
          aria-label="بستن منو"
          onClick={closeMenu}
          className={`absolute inset-0 h-full w-full bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* PANEL */}
        <aside
          dir="rtl"
          className={`absolute left-0 top-0 flex h-[100dvh] w-[86%] max-w-[360px] flex-col overflow-hidden border-r border-white/[0.07] bg-[#070707]/95 px-6 pb-5 pt-5 shadow-[20px_0_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* TOP */}
          <div className="flex shrink-0 items-start justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex flex-col items-start"
            >
              <span className="text-[28px] font-extrabold leading-none text-white">
                خط
              </span>

              <span
                dir="ltr"
                className="mt-[6px] text-[6px] tracking-[0.5em] text-white/30"
              >
                KHAT
              </span>
            </Link>

            <button
              type="button"
              aria-label="بستن منو"
              onClick={closeMenu}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-black/20 text-white transition-all duration-300 hover:border-[#FF6A1A] hover:text-[#FF6A1A]"
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

          {/* KHAT SIGNATURE */}
          <div className="relative mt-5 h-[8px] w-full shrink-0">
            <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

            <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#070707]" />
          </div>

          {/* NAV */}
          <nav className="mt-3 flex shrink-0 flex-col">
            {/* 01 HOME */}
            <Link
              href="/"
              onClick={closeMenu}
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
            </Link>

            {/* 02 SERVICES */}
            <div className="border-b border-white/[0.06]">
              <div className="flex min-h-[50px] items-center justify-between">
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className={`text-[14px] font-medium transition-colors duration-300 ${
                    isServicesOpen
                      ? "text-[#FF6A1A]"
                      : "text-white hover:text-[#FF6A1A]"
                  }`}
                >
                  کاری که خط برات میکنه
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="باز کردن زیرمنوی خدمات"
                    aria-expanded={isServicesOpen}
                    onClick={() => {
                      setIsServicesOpen((prev) => !prev);
                      setIsNewsOpen(false);
                    }}
                    className="flex h-8 w-8 items-center justify-center"
                  >
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
                  </button>

                  <span
                    dir="ltr"
                    className="text-[8px] tracking-[0.12em] text-white/20"
                  >
                    02
                  </span>
                </div>
              </div>

              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isServicesOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mb-3 mr-3 flex flex-col border-r border-white/[0.07] pr-4">
                    <Link
                      href="/services/content-production"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      تولید محتوا
                    </Link>

                    <Link
                      href="/services/advertising"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      تبلیغات
                    </Link>

                    <Link
                      href="/services/personal-branding"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      پرسونال برندینگ
                    </Link>

                    <Link
                      href="/services/business-growth"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      رشد و توسعه کسب‌وکار
                    </Link>

                    <Link
                      href="/services/team-building"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      تیم‌سازی
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 PARTNERS */}
            <Link
              href="/partners"
              onClick={closeMenu}
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
            </Link>

            {/* 04 NEWS */}
            <div className="border-b border-white/[0.06]">
              <div className="flex min-h-[50px] items-center justify-between">
                <Link
                  href="/news"
                  onClick={closeMenu}
                  className={`text-[14px] font-medium transition-colors duration-300 ${
                    isNewsOpen
                      ? "text-[#FF6A1A]"
                      : "text-white hover:text-[#FF6A1A]"
                  }`}
                >
                  خبر های خط
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="باز کردن زیرمنوی خبرهای خط"
                    aria-expanded={isNewsOpen}
                    onClick={() => {
                      setIsNewsOpen((prev) => !prev);
                      setIsServicesOpen(false);
                    }}
                    className="flex h-8 w-8 items-center justify-center"
                  >
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
                  </button>

                  <span
                    dir="ltr"
                    className="text-[8px] tracking-[0.12em] text-white/20"
                  >
                    04
                  </span>
                </div>
              </div>

              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isNewsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mb-3 mr-3 flex flex-col border-r border-white/[0.07] pr-4">
                    <Link
                      href="/news"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      همه خبرها
                    </Link>

                    <Link
                      href="/news?category=marketing"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      مارکتینگ و تبلیغات
                    </Link>

                    <Link
                      href="/news?category=business"
                      onClick={closeMenu}
                      className="flex h-[29px] items-center text-[10px] text-white/45 transition-colors hover:text-[#FF6A1A]"
                    >
                      کسب‌وکار و استراتژی
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 ABOUT */}
            <Link
              href="/about"
              onClick={closeMenu}
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
            </Link>

            {/* 06 CONTACT */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="group flex h-[50px] items-center justify-between border-b border-white/[0.06]"
            >
              <span className="text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-[#FF6A1A]">
                به خط زنگ بزن
              </span>

              <span
                dir="ltr"
                className="text-[8px] tracking-[0.12em] text-white/20"
              >
                06
              </span>
            </Link>
          </nav>

          {/* BOTTOM */}
          <div className="mt-auto shrink-0 pt-4">
            <div className="relative mb-4 h-[8px] w-[62px]">
              <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

              <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#070707]" />
            </div>

            <p className="text-[9px] leading-[19px] text-white/30">
              استراتژی، بازاریابی، برندینگ و رشد کسب‌وکار
            </p>

            <div
              dir="ltr"
              className="mt-3 flex items-center justify-end gap-3"
            >
              <a
                href="#"
                className="text-[8px] tracking-[0.1em] text-white/40 transition-colors hover:text-[#FF6A1A]"
              >
                Instagram
              </a>

              <span className="h-[3px] w-[3px] rounded-full bg-[#FF6A1A]" />

              <a
                href="#"
                className="text-[8px] tracking-[0.1em] text-white/40 transition-colors hover:text-[#FF6A1A]"
              >
                Telegram
              </a>
            </div>
          </div>

          {/* AMBIENT GLOW */}
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#FF6A1A]/[0.06] blur-[85px]" />
        </aside>
      </div>
    </>
  );
}