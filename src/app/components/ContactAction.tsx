"use client";

import { useRef, type ComponentProps } from "react";

export default function ContactAction(props: ComponentProps<"a">) {
  const animation = useRef<Animation | null>(null);
  function rotate(element: HTMLAnchorElement) {
    animation.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animation.current = element.querySelector(".contact-icon")?.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(1080deg)" }],
      { duration: 900, easing: "cubic-bezier(.22,.61,.36,1)", iterations: 1 },
    ) ?? null;
  }
  return <a {...props}
    onPointerEnter={event => { if (event.pointerType === "mouse") rotate(event.currentTarget); }}
    onPointerDown={event => { if (event.pointerType !== "mouse") rotate(event.currentTarget); }}
    onFocus={event => { if (event.currentTarget.matches(":focus-visible")) rotate(event.currentTarget); }}
  />;
}
