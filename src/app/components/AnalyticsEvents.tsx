"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: "config" | "event", target: string, params?: Record<string, unknown>) => void;
  }
}

function track(eventName: string, params?: Record<string, unknown>) {
  window.gtag?.("event", eventName, params);
}

function inferEvent(element: HTMLElement) {
  const explicit = element.dataset.analyticsEvent;
  if (explicit) return explicit;

  if (!(element instanceof HTMLAnchorElement)) return "";
  const href = element.href;

  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me/")) return "whatsapp_click";
  if (href.includes("t.me/")) return "telegram_click";
  if (href.includes("instagram.com/")) return "instagram_click";
  if (element.classList.contains("cta")) return "cta_click";
  if (new URL(href).pathname === "/contact") return "consultation_click";

  return "";
}

export default function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const pagePath = `${pathname}${window.location.search}`;
    window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: pagePath,
      page_title: document.title,
    });

    if (pathname === "/services") track("services_visit", { page_path: pagePath });
    if (pathname === "/news") track("news_visit", { page_path: pagePath });
    if (pathname === "/contact") track("contact_visit", { page_path: pagePath });
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("a,button");
      if (!target) return;
      const eventName = inferEvent(target);
      if (eventName) {
        track(eventName, {
          label: target.getAttribute("aria-label") || target.textContent?.trim() || undefined,
          href: target instanceof HTMLAnchorElement ? target.href : undefined,
        });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
