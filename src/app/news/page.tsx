"use client";

import Link from "next/link";
import {
  PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";

import KhatMenu from "../components/KhatMenu";

const articles = [
  {
    id: "01",
    date: "۱۴۰۴/۰۵/۱۲",
    title: "چرا برندهای قوی آینده را می‌سازند؟",
    description:
      "برندهای قدرتمند فقط آن‌ها نمی‌شوند، آن‌ها آینده بازار را شکل می‌دهند.",
    image: "/images/news/news-01.png",
    href: "/news/strong-brands",
  },
  {
    id: "02",
    date: "۱۴۰۴/۰۵/۰۸",
    title: "نقش محتوا در رشد کسب‌وکارها",
    description:
      "محتوا، پلی میان برند شما و مخاطبان آینده است.",
    image: "/images/news/news-02.png",
    href: "/news/content-growth",
  },
  {
    id: "03",
    date: "۱۴۰۴/۰۵/۰۳",
    title: "استراتژی، مسیر ماندگار",
    description:
      "با استراتژی دقیق به رشد پایدار برسید.",
    image: "/images/news/news-03.png",
    href: "/news/strategy-path",
  },
  {
    id: "04",
    date: "۱۴۰۴/۰۴/۲۸",
    title: "تبلیغات خوب از کجا شروع می‌شود؟",
    description:
      "تبلیغ خوب قبل از اجرا، از شناخت مخاطب و هدف شروع می‌شود.",
    image: "/images/news/news-04.png",
    href: "/news/good-advertising",
  },
];

/* ======================================================
   ICONS
====================================================== */

function ArrowIcon({
  direction = "right",
  className = "h-5 w-5",
}: {
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${
        direction === "left" ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

/* ======================================================
   PAGE
====================================================== */

export default function NewsPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ======================================================
     SLIDER POSITION
  ====================================================== */

  const updateActiveIndex = () => {
    const el = sliderRef.current;

    if (!el) return;

    const card = el.querySelector<HTMLElement>(
      "[data-news-card]"
    );

    if (!card) return;

    const gap = 14;
    const cardStep =
      card.offsetWidth + gap;

    const index = Math.round(
      el.scrollLeft / cardStep
    );

    setActiveIndex(
      Math.max(
        0,
        Math.min(index, articles.length - 1)
      )
    );
  };

  /* ======================================================
     BUTTON SCROLL
  ====================================================== */

  const scrollSlider = (
    direction: "left" | "right"
  ) => {
    const el = sliderRef.current;

    if (!el) return;

    const card = el.querySelector<HTMLElement>(
      "[data-news-card]"
    );

    if (!card) return;

    const distance =
      card.offsetWidth + 14;

    el.scrollBy({
      left:
        direction === "right"
          ? distance
          : -distance,
      behavior: "smooth",
    });
  };

  /* ======================================================
     MOUSE / TOUCH DRAG
  ====================================================== */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const el = sliderRef.current;

    if (!el) return;

    isDragging.current = true;

    startX.current = event.clientX;
    startScrollLeft.current =
      el.scrollLeft;

    dragDistance.current = 0;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const el = sliderRef.current;

    if (!el || !isDragging.current)
      return;

    const movement =
      event.clientX - startX.current;

    dragDistance.current =
      Math.abs(movement);

    el.scrollLeft =
      startScrollLeft.current -
      movement;
  };

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    isDragging.current = false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  /* ======================================================
     PREVENT LINK AFTER DRAG
  ====================================================== */

  const preventClickAfterDrag = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (dragDistance.current > 7) {
      event.preventDefault();
      dragDistance.current = 0;
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      {/* ==================================================
          TOP / TITLE
      ================================================== */}
      <section className="relative mx-auto w-full max-w-[430px] px-6 pb-10 pt-6">
        <KhatMenu />

        <div className="pt-[150px] text-center">
          <span
            dir="ltr"
            className="block text-[11px] tracking-[0.72em] text-white/45"
          >
            NEWS
          </span>

          <h1 className="mt-5 text-[41px] font-extrabold leading-[1.25]">
            خبرهای خط
          </h1>

          <p className="mx-auto mt-5 max-w-[360px] text-[17px] font-medium leading-[2] text-white/45">
            نگاه ما به دنیای بازاریابی، برندها و آینده
          </p>
        </div>
      </section>

      {/* ==================================================
          NEWS CARDS
      ================================================== */}
      <section className="mx-auto w-full max-w-[430px] pb-8">
        <div
          ref={sliderRef}
          dir="ltr"
          onScroll={updateActiveIndex}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="
            flex
            cursor-grab
            touch-pan-y
            select-none
            gap-[14px]
            overflow-x-auto
            px-5
            pb-4
            active:cursor-grabbing
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              data-news-card
              draggable={false}
              dir="rtl"
              onClick={preventClickAfterDrag}
              className="
                group
                w-[270px]
                shrink-0
                overflow-hidden
                rounded-[20px]
                border
                border-white/[0.13]
                bg-[#090909]
                transition-all
                duration-300

                hover:border-[#FF6A1A]
                hover:shadow-[0_0_24px_rgba(255,106,26,0.18)]

                focus:border-[#FF6A1A]
                focus:shadow-[0_0_24px_rgba(255,106,26,0.18)]

                active:border-[#FF6A1A]
              "
            >
              {/* IMAGE */}
              <div className="px-3 pt-3">
                <div
                  className="h-[285px] overflow-hidden rounded-[14px] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${article.image}')`,
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="flex min-h-[310px] flex-col px-5 pb-5 pt-5">
                <span className="text-[12px] text-white/45">
                  {article.date}
                </span>

                <h2 className="mt-5 text-[21px] font-extrabold leading-[1.7] text-white">
                  {article.title}
                </h2>

                <p className="mt-4 text-[14px] leading-[2] text-white/42">
                  {article.description}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-7 text-[#FF6A1A]">
                  <span className="text-[15px] font-extrabold">
                    مطالعه بیشتر
                  </span>

                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#FF6A1A]">
                    <ArrowIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ==================================================
            SLIDER CONTROLS
        ================================================== */}
        <div
          dir="ltr"
          className="mt-6 flex items-center justify-between px-6"
        >
          {/* LEFT ARROW */}
          <button
            type="button"
            aria-label="مقاله قبلی"
            onClick={() =>
              scrollSlider("left")
            }
            className="
              flex
              h-[54px]
              w-[54px]
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.16]
              text-white
              transition-all
              duration-300

              hover:border-[#FF6A1A]
              hover:text-[#FF6A1A]
              hover:shadow-[0_0_18px_rgba(255,106,26,0.15)]
            "
          >
            <ArrowIcon
              direction="left"
              className="h-6 w-6"
            />
          </button>

          {/* INDICATORS */}
          <div className="flex items-center gap-3">
            {[0, 1, 2].map((index) => {
              const isActive =
                Math.min(
                  activeIndex,
                  2
                ) === index;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`اسلاید ${index + 1}`}
                  onClick={() => {
                    const el =
                      sliderRef.current;

                    if (!el) return;

                    const card =
                      el.querySelector<HTMLElement>(
                        "[data-news-card]"
                      );

                    if (!card) return;

                    el.scrollTo({
                      left:
                        index *
                        (card.offsetWidth +
                          14),
                      behavior: "smooth",
                    });
                  }}
                  className={`h-[8px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-[58px] bg-[#FF6A1A]"
                      : "w-[58px] bg-white/[0.16]"
                  }`}
                />
              );
            })}
          </div>

          {/* RIGHT ARROW */}
          <button
            type="button"
            aria-label="مقاله بعدی"
            onClick={() =>
              scrollSlider("right")
            }
            className="
              flex
              h-[54px]
              w-[54px]
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.16]
              text-white
              transition-all
              duration-300

              hover:border-[#FF6A1A]
              hover:text-[#FF6A1A]
              hover:shadow-[0_0_18px_rgba(255,106,26,0.15)]
            "
          >
            <ArrowIcon className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}
      <section className="relative mx-auto min-h-[320px] w-full max-w-[430px] overflow-hidden px-6 pb-10 pt-14">
        <div className="relative z-10 flex min-h-[230px] items-end justify-between">
          {/* LEFT */}
          <div className="flex max-w-[255px] flex-col items-start">
            <div className="mb-7 h-[2px] w-[175px] rounded-full bg-white/30" />

            <p className="text-right text-[14px] leading-[2] text-white/45">
              بازاریابی، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start">
            <p className="text-right text-[22px] font-extrabold leading-[1.45]">
              همه چیز
              <br />
              روی خط
            </p>

            <div className="mt-6 h-[2px] w-[82px] rounded-full bg-white/30" />
          </div>
        </div>
      </section>
    </main>
  );
}