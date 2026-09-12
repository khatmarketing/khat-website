"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import KhatLogo from "./KhatLogo";

const navigation = [
  ["/", "صفحه اصلی خط"],
  ["/services", "کاری که خط برات می‌کنه"],
  ["/partners", "کیا با خط کار کردن"],
  ["/news", "خبرهای خط"],
  ["/about", "درباره خط"],
  ["/contact", "به خط زنگ بزن"],
] as const;

export default function KhatMenu() {
  const pathname = usePathname();
  return <Menu key={pathname} pathname={pathname} />;
}

function Menu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  function openMenu() {
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    const triggerElement = trigger.current;
    const scrollY = window.scrollY;
    const original = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButton.current?.focus({ preventScroll: true });
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      Object.assign(document.body.style, original);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      triggerElement?.focus({ preventScroll: true });
    };
  }, [closeMenu, open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="menu-trigger glass"
        aria-label="باز کردن منو"
        aria-expanded={open}
        aria-controls="khat-drawer"
        style={{ touchAction: "manipulation" }}
        onClick={openMenu}
      >
        <span aria-hidden="true" className="hamburger">
          <i />
          <i />
          <i />
        </span>
      </button>

      {open && (
        <div
          id="khat-drawer"
          className="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی خط"
          data-open="true"
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const controls = event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])',
            );
            const first = controls[0];
            const last = controls[controls.length - 1];

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
        >
          <div className="drawer-backdrop" aria-hidden="true" onClick={closeMenu} />
          <div className="drawer-panel">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-3xl font-extrabold"
                aria-label="خط؛ صفحه اصلی"
              >
                <KhatLogo />
              </Link>
              <button
                ref={closeButton}
                type="button"
                className="icon-button"
                aria-label="بستن منو"
                onClick={closeMenu}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <span className="signature my-6" aria-hidden="true" />
            <nav aria-label="ناوبری اصلی">
              {navigation.map(([href, label], index) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={
                    (href === "/" ? pathname === href : pathname.startsWith(href))
                      ? "page"
                      : undefined
                  }
                  className="drawer-link"
                >
                  <span>{label}</span>
                  <span aria-hidden="true" className="text-xs text-white/50" dir="ltr">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>
            <p className="mt-auto pt-8 text-sm leading-7 text-white/65">
              استراتژی، بازاریابی، برندینگ
              <br />
              و رشد کسب‌وکار
            </p>
          </div>
        </div>
      )}
    </>
  );
}
