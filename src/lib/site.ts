import { articles } from "./articles";
import { services } from "./services";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khatmarketing.ir";

export const siteConfig = {
  name: "خط",
  legalName: "Khat Marketing",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "fa_IR",
  language: "fa",
  title: "خط | بازاریابی، برندینگ و رشد کسب‌وکار",
  description:
    "خط همراه کسب‌وکارها در بازاریابی، برندینگ، تبلیغات، تولید محتوا و رشد هدفمند است.",
  keywords: [
    "خط",
    "بازاریابی",
    "برندینگ",
    "تبلیغات",
    "تولید محتوا",
    "رشد کسب‌وکار",
    "Khat Marketing",
  ],
  defaultImage: "/images/home-hero-v2.png",
  logo: "/images/brand/khat-logo.png",
  instagram:
    "https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export const publicRoutes = [
  "/",
  "/about",
  "/services",
  ...Object.keys(services).map((slug) => `/services/${slug}`),
  "/news",
  ...Object.keys(articles).map((slug) => `/news/${slug}`),
  "/partners",
  "/contact",
] as const;
