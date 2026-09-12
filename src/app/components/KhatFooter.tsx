import Link from "next/link";
import KhatLogo from "./KhatLogo";

export default function KhatFooter() {
  return (
    <footer className="site-footer">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><Link href="/" className="inline-flex min-h-11 items-center text-3xl font-extrabold" aria-label="خط؛ صفحه اصلی"><KhatLogo /></Link><p className="mt-4 max-w-48 text-sm leading-7 text-white/65">بازاریابی، برندینگ<br />و رشد کسب‌وکارها</p></div>
        <div className="shrink-0"><p className="text-xl font-bold leading-9">همه چیز<br />روی خط</p><span className="signature mt-5" aria-hidden="true" /></div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60"><Link href="/contact" className="inline-flex min-h-11 items-center">شروع گفت‌وگو با خط</Link><span dir="ltr">KHAT © 2026</span></div>
    </footer>
  );
}

