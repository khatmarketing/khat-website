import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import KhatLogo from "./components/KhatLogo";
import KhatMenu from "./components/KhatMenu";
import KhatFooter from "./components/KhatFooter";
import NeonFeedback from "./components/NeonFeedback";
import "./globals.css";

const anjoman = localFont({
  src: [
    { path: "../../public/fonts/Anjoman-FaNum-Regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/Anjoman-FaNum-Medium.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/Anjoman-FaNum-Bold.woff", weight: "700", style: "normal" },
    { path: "../../public/fonts/Anjoman-FaNum-ExtraBold.woff", weight: "800", style: "normal" },
  ],
  variable: "--font-anjoman",
  display: "swap",
});
export const metadata: Metadata = {
  title: { default: "خط | بازاریابی، برندینگ و رشد کسب‌وکار", template: "%s | خط" },
  description: "خط؛ همراه کسب‌وکارها در بازاریابی، برندینگ، تبلیغات و رشد.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" className={anjoman.variable}>
      <body>
        <NeonFeedback />
        <div className="site-shell">
          <a href="#main-content" className="skip-link">رفتن به محتوای اصلی</a>
          <header className="site-header"><KhatMenu /><Link href="/" className="header-brand" aria-label="خط؛ صفحه اصلی"><KhatLogo /></Link><Link href="/contact" className="header-contact glass neon-ring">تماس</Link></header>
          {children}
          <KhatFooter />
        </div>
      </body>
    </html>
  );
}

