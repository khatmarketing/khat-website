import Link from "next/link";
export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="px-6 pb-20 pt-36 text-center"><span className="eyebrow">404</span><h1 className="mt-5 text-3xl font-extrabold leading-relaxed">این صفحه روی خط نیست</h1><p className="mt-5 text-base leading-8 text-white/70">ممکن است نشانی تغییر کرده باشد. از صفحه اصلی مسیرتان را ادامه دهید.</p><Link href="/" className="cta mt-8">بازگشت به صفحه اصلی</Link></main>;
}

