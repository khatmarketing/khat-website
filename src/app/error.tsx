"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1} className="px-6 pb-20 pt-36 text-center">
      <h1 className="text-3xl font-extrabold leading-relaxed">ارتباط با این صفحه برقرار نشد</h1>
      <p className="mt-5 text-base leading-8 text-white/70">لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.</p>
      <button type="button" onClick={reset} className="cta mt-8">تلاش دوباره</button>
      <div><Link href="/" className="mt-4 inline-flex min-h-11 items-center text-sm">صفحه اصلی خط</Link></div>
    </main>
  );
}
