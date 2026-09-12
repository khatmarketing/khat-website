"use client";

import { useEffect } from "react";

export default function NeonFeedback() {
  useEffect(() => {
    let pressed: HTMLElement | null = null;
    const release = () => { pressed?.removeAttribute("data-pressed"); pressed = null; };
    const press = (event: PointerEvent) => {
      release();
      pressed = event.target instanceof Element ? event.target.closest<HTMLElement>(".neon-ring") : null;
      pressed?.setAttribute("data-pressed", "true");
    };
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", release);
    return () => {
      release();
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);
  return null;
}
