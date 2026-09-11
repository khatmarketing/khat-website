import Link from "next/link";
import { notFound } from "next/navigation";
import KhatMenu from "../../components/KhatMenu";

const articles = {
  "strong-brands": {
    date: "۱۴۰۴/۰۵/۱۲",
    category: "برندینگ",
    title: "چرا برندهای قوی آینده را می‌سازند؟",
    description:
      "برندهای قدرتمند فقط در بازار حضور ندارند؛ آن‌ها بخشی از آینده بازار را شکل می‌دهند.",
    image: "/images/news/news-01.png",
    paragraphs: [
      "ساختن یک برند قوی فقط به طراحی لوگو، رنگ یا تبلیغات بیشتر محدود نمی‌شود. برند قدرتمند از مجموعه‌ای از تصمیم‌های منسجم ساخته می‌شود.",
      "وقتی محصول، تجربه مشتری، ارتباطات، محتوا و تصمیم‌های تجاری در یک جهت حرکت کنند، برند کم‌کم جایگاه مشخصی در ذهن مخاطب پیدا می‌کند.",
      "مزیت اصلی چنین برندی این است که فقط به تقاضای امروز پاسخ نمی‌دهد؛ بلکه می‌تواند روی انتظارات و رفتار آینده مخاطب هم اثر بگذارد.",
    ],
  },

  "content-growth": {
    date: "۱۴۰۴/۰۵/۰۸",
    category: "محتوا",
    title: "نقش محتوا در رشد کسب‌وکارها",
    description:
      "محتوا می‌تواند پلی میان برند شما و مخاطبانی باشد که هنوز مشتری شما نشده‌اند.",
    image: "/images/news/news-02.png",
    paragraphs: [
      "محتوا زمانی به رشد کسب‌وکار کمک می‌کند که هدف مشخصی داشته باشد. صرفاً تولید کردن و انتشار مداوم، به‌تنهایی استراتژی محتوا نیست.",
      "باید بدانیم مخاطب چه مسئله‌ای دارد، برند برای چه چیزی قرار است شناخته شود و هر محتوا چه نقشی در این مسیر دارد.",
      "در این حالت محتوا از یک فعالیت روزمره به بخشی از سیستم بازاریابی و رشد کسب‌وکار تبدیل می‌شود.",
    ],
  },

  "strategy-path": {
    date: "۱۴۰۴/۰۵/۰۳",
    category: "استراتژی",
    title: "استراتژی، مسیر ماندگار",
    description:
      "با تصمیم‌های منسجم و مسیر مشخص می‌توان به رشد پایدار نزدیک‌تر شد.",
    image: "/images/news/news-03.png",
    paragraphs: [
      "استراتژی یعنی تصمیم بگیریم چه کارهایی را انجام بدهیم و مهم‌تر از آن، چه کارهایی را انجام ندهیم.",
      "وقتی کسب‌وکار بدون اولویت مشخص از یک تاکتیک به تاکتیک دیگر می‌رود، انرژی و منابع زیادی مصرف می‌شود اما مسیر روشنی شکل نمی‌گیرد.",
      "یک استراتژی خوب کمک می‌کند محصول، مارکتینگ، برند و فروش در یک جهت حرکت کنند.",
    ],
  },

  "good-advertising": {
    date: "۱۴۰۴/۰۴/۲۸",
    category: "تبلیغات",
    title: "تبلیغات خوب از کجا شروع می‌شود؟",
    description:
      "تبلیغ خوب قبل از اجرا، از شناخت مخاطب و هدف کسب‌وکار شروع می‌شود.",
    image: "/images/news/news-04.png",
    paragraphs: [
      "قبل از انتخاب رسانه یا ساخت یک کمپین باید مشخص باشد تبلیغات قرار است دقیقاً چه تغییری ایجاد کند.",
      "مخاطب، پیشنهاد، پیام و زمان‌بندی کمپین روی نتیجه اثر دارند. افزایش بودجه نمی‌تواند یک پیشنهاد ضعیف یا پیام نامناسب را جبران کند.",
      "برای همین تحلیل نتیجه تبلیغات باید فراتر از تعداد نمایش و کلیک باشد و به اثر واقعی آن روی کسب‌وکار برسد.",
    ],
  },
} as const;

type ArticleSlug = keyof typeof articles;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in articles)) {
    notFound();
  }

  const article = articles[slug as ArticleSlug];

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      {/* HERO */}
      <section className="relative mx-auto h-[600px] w-full max-w-[430px] overflow-hidden bg-[#050505]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${article.image}')`,
          }}
        />

        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />

        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />

        <KhatMenu />

        <div className="absolute inset-x-0 bottom-[55px] z-20 px-7">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#FF6A1A]">
              {article.category}
            </span>

            <span className="text-[9px] text-white/35">
              {article.date}
            </span>
          </div>

          <h1 className="text-[32px] font-extrabold leading-[1.65]">
            {article.title}
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto w-full max-w-[430px] px-7 pb-8 pt-2">
        <p className="text-[17px] font-medium leading-[2.15] text-white/55">
          {article.description}
        </p>

        {/* KHAT SIGNATURE */}
        <div className="relative mt-9 h-[8px] w-[80px]">
          <div className="absolute left-0 right-[6px] top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#FF6A1A]" />

          <div className="absolute right-0 top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full border-[1.5px] border-[#FF6A1A] bg-[#050505]" />
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="mx-auto w-full max-w-[430px] px-7 pb-16">
        {article.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`text-[15px] leading-[2.25] text-white/72 ${
              index === 0 ? "mt-4" : "mt-8"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </article>

      {/* BACK TO NEWS */}
      <section className="mx-auto w-full max-w-[430px] border-t border-white/[0.06] px-7 py-12">
        <Link
          href="/news"
          className="group flex items-center justify-between rounded-[20px] border border-white/[0.09] bg-[#090909] px-5 py-5 transition-all duration-300 hover:border-[#FF6A1A] hover:shadow-[0_0_24px_rgba(255,106,26,0.15)]"
        >
          <div>
            <span className="text-[9px] text-white/30">
              برگشت به
            </span>

            <p className="mt-1 text-[16px] font-bold transition-colors group-hover:text-[#FF6A1A]">
              خبرهای خط
            </p>
          </div>

          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-white/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#FF6A1A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12H19" />
            <path d="M13 6L19 12L13 18" />
          </svg>
        </Link>
      </section>

      {/* FOOTER */}
      <section className="relative mx-auto min-h-[285px] w-full max-w-[430px] overflow-hidden px-7 pb-10 pt-12">
        <div className="pointer-events-none absolute -bottom-[145px] -right-[115px] h-[300px] w-[300px] rounded-full bg-[#FF6A1A]/30 blur-[100px]" />

        <div className="relative z-10 flex min-h-[205px] items-end justify-between">
          <div className="flex max-w-[245px] flex-col items-start">
            <div className="mb-7 h-[2px] w-[110px] rounded-full bg-white/60" />

            <p className="text-right text-[13px] leading-[2] text-white/42">
              بازاریابی، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-right text-[21px] font-extrabold leading-[1.5]">
              همه چیز
              <br />
              روی خط
            </p>

            <div className="mt-6 h-[2px] w-[78px] rounded-full bg-white/60" />
          </div>
        </div>
      </section>
    </main>
  );
}