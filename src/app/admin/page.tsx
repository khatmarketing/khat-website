import type { Metadata } from "next";
import { wordpressAdminUrl, wordpressPasswordResetUrl } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "WordPress Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const adminUrl = wordpressAdminUrl();
  const resetUrl = wordpressPasswordResetUrl();

  return (
    <main id="main-content" tabIndex={-1} className="content-section pt-32">
      <h1 className="section-title">مدیریت وردپرس خط</h1>
      <p className="mt-5 text-base leading-8 text-white/70">
        مدیریت محتوا، رسانه‌ها، کاربران، نقش‌ها، بازیابی رمز عبور و بررسی فرم‌ها از طریق
        پنل امن WordPress انجام می‌شود. اطلاعات ورود در کد سایت ذخیره نمی‌شود.
      </p>
      {adminUrl ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={adminUrl} className="cta" rel="noopener noreferrer" target="_blank">
            ورود به پنل وردپرس
            <span aria-hidden="true">←</span>
          </a>
          {resetUrl && (
            <a
              href={resetUrl}
              className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-5 text-sm text-white/75"
              rel="noopener noreferrer"
              target="_blank"
            >
              بازیابی رمز عبور
            </a>
          )}
        </div>
      ) : (
        <p className="mt-8 rounded-[24px] border border-white/15 bg-white/[0.04] p-5 text-sm leading-7 text-white/65">
          متغیرهای WORDPRESS_API_URL و WORDPRESS_ADMIN_URL هنوز تنظیم نشده‌اند. بعد از
          اتصال WordPress، این صفحه مدیر را به پنل امن وردپرس هدایت می‌کند.
        </p>
      )}
    </main>
  );
}
