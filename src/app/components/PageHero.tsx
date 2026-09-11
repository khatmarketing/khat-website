import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({ title, label, description, image, children }: { title: string; label: string; description?: string; image?: string; children?: ReactNode }) {
  return (
    <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
      {image && <><Image src={image} alt="" fill sizes="(max-width: 430px) 100vw, 430px" loading="eager" fetchPriority="high" className="object-cover" /><div className="hero-shade" /></>}
      <div className="relative z-10"><span dir="ltr" className="eyebrow">{label}</span><h1>{title}</h1>{description && <p className="mt-4 text-base leading-8 text-white/75">{description}</p>}{children}</div>
    </section>
  );
}

