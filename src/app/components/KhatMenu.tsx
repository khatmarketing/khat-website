"use client";

import Link from "next/link";
import KhatLogo from "./KhatLogo";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const backdropPress = useRef(false);

  function openMenu() {
    const element = dialog.current;
    if (!element) return;
    // Open in the activation event, including a touch pointer release.
    if (!element.open) element.showModal();
    backdropPress.current = false;
    setOpen(true);
  }

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const triggerElement = trigger.current;
    const scrollY = window.scrollY;
    const original = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
    if (!element.open) element.showModal();
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      element.close();
      Object.assign(document.body.style, original);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      triggerElement?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" className="menu-trigger glass" aria-label="باز کردن منو" aria-expanded={open} aria-controls="khat-drawer" style={{ touchAction: "manipulation" }} onClick={openMenu}
        onPointerDown={event => {
          if (event.isPrimary && event.pointerType !== "mouse") touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onPointerUp={event => {
          const start = touchStart.current;
          touchStart.current = null;
          if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 10) openMenu();
        }}>
        <span aria-hidden="true" className="hamburger"><i /><i /><i /></span>
      </button>
      <dialog ref={dialog} id="khat-drawer" className="drawer" aria-label="منوی اصلی خط" style={{ pointerEvents: open ? "auto" : "none" }} onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
        onPointerCancel={() => { backdropPress.current = false; }}
        onClick={event => {
          // A release/compatibility click from the opening tap is not an outside tap.
          if (backdropPress.current && event.target === event.currentTarget) setOpen(false);
          backdropPress.current = false;
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}>
        <div className="drawer-panel">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-3xl font-extrabold" aria-label="خط؛ صفحه اصلی"><KhatLogo /></Link>
            <button type="button" className="icon-button" aria-label="بستن منو" onClick={() => setOpen(false)} autoFocus><span aria-hidden="true">×</span></button>
          </div>
          <span className="signature my-6" aria-hidden="true" />
          <nav aria-label="ناوبری اصلی">
            {navigation.map(([href, label], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={(href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined} className="drawer-link">
                <span>{label}</span><span aria-hidden="true" className="text-xs text-white/50" dir="ltr">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <p className="mt-auto pt-8 text-sm leading-7 text-white/65">استراتژی، بازاریابی، برندینگ<br />و رشد کسب‌وکار</p>
        </div>
      </dialog>
    </>
  );
}

