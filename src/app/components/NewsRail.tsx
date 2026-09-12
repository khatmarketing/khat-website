"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { articles } from "@/lib/articles";

export default function NewsRail({ limit, aboveFold = false }: { limit?: number; aboveFold?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const frame = useRef<number | null>(null);
  const progressValue = useRef(0);
  const [progress, setProgress] = useState(0);
  const items = Object.entries(articles).slice(0, limit);
  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, []);
  function updateProgress() {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const el = rail.current;
      if (!el) return;
      const next = Math.abs(el.scrollLeft) / Math.max(1, el.scrollWidth - el.clientWidth);
      if (Math.abs(next - progressValue.current) > 0.005 || next === 0 || next === 1) {
        progressValue.current = next;
        setProgress(next);
      }
    });
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return (
    <div>
      <div ref={rail} className="news-rail" role="region" aria-label="خبرهای خط؛ برای مرور ورق بزنید" tabIndex={0}
        onScroll={updateProgress}
        onPointerDown={(event) => {
          drag.current.moved = false;
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { active: true, startX: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          const delta = event.clientX - drag.current.startX;
          if (Math.abs(delta) > 7) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.dataset.dragging = "true";
          }
          if (drag.current.moved) event.currentTarget.scrollLeft = drag.current.scroll - delta;
        }}
        onPointerUp={endDrag} onPointerCancel={endDrag}
        onLostPointerCapture={() => { drag.current.active = false; }}
        onPointerLeave={(event) => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) endDrag(event); }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => { if (drag.current.moved && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const el = event.currentTarget;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); el.scrollLeft += event.key === "ArrowLeft" ? -220 : 220; }
          if (event.key === "Home") { event.preventDefault(); el.scrollLeft = 0; }
          if (event.key === "End") { event.preventDefault(); el.scrollLeft = -el.scrollWidth; }
        }}>
        {items.map(([slug, article], index) => (
          <Link key={slug} href={`/news/${slug}`} aria-label={article.title} draggable={false} className="news-card neon-ring">
            <article className="h-full">
              <div className="news-card-image"><Image src={article.image} alt="" fill sizes="300px" loading={aboveFold && index === 0 ? "eager" : "lazy"} draggable={false} className="object-cover object-[center_35%]" /></div>
              <div className="p-5"><div className="flex flex-wrap justify-between gap-2 text-xs text-white/65"><span>{article.category}</span><span>{article.date}</span></div>
                <h2 className="mt-3 text-lg font-bold leading-8">{article.title}</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">{article.description}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-medium">مطالعه خبر <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FF6A1A] text-[#FF6A1A]" aria-hidden="true">←</span></span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <progress className="news-progress" max={1} value={progress} aria-label="میزان پیمایش خبرها" />
      <p className="px-6 pt-4 text-xs leading-6 text-white/60">برای مرور خبرها، کارت‌ها را به دو طرف بکشید.</p>
    </div>
  );
}

