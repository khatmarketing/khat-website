import KhatMenu from "../components/KhatMenu";

function PhoneIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.72a16 16 0 0 0 4.28 4.28l1.26-1.26a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsappIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.7A8.5 8.5 0 0 1 8.1 19.2L3 20.5l1.4-4.9A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.7 8.2c.4 2.4 2.3 4.4 4.8 5.1" />
      <path d="M9 7.8l1.1 1.7" />
      <path d="M13.7 12.3l1.8 1" />
    </svg>
  );
}

function TelegramIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 3L3.8 10.1c-.8.3-.8 1.4 0 1.7l4.4 1.6 1.6 4.9c.3.8 1.3.9 1.8.3L21 3Z" />
      <path d="M8.2 13.4L21 3" />
    </svg>
  );
}

function MailIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function InstagramIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

const contactItems = [
  {
    title: "تماس تلفنی",
    description: "همین حالا با ما صحبت کنید",
    href: "tel:+989000000000",
    icon: PhoneIcon,
  },
  {
    title: "Whatsapp",
    description: "در واتساپ با ما در ارتباط باشید",
    href: "https://wa.me/989000000000",
    icon: WhatsappIcon,
  },
  {
    title: "Telegram",
    description: "در تلگرام با ما در ارتباط باشید",
    href: "https://t.me/yourusername",
    icon: TelegramIcon,
  },
  {
    title: "E-mail",
    description: "پیام خود را برای ما ارسال کنید",
    href: "mailto:hello@khat.com",
    icon: MailIcon,
  },
  {
    title: "Instagram",
    description: "ما را در اینستاگرام دنبال کنید",
    href: "https://instagram.com/yourusername",
    icon: InstagramIcon,
  },
];

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      {/* HERO */}
      <section className="relative mx-auto h-[610px] w-full max-w-[430px] overflow-hidden bg-[#050505]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/contact.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-[#050505]" />

        <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-transparent via-[#050505]/65 to-[#050505]" />

        <KhatMenu />

        <div className="absolute inset-x-0 bottom-[72px] z-20 px-7 text-right">
          <span
            dir="ltr"
            className="block text-[9px] tracking-[0.55em] text-white/45"
          >
            CONTACT
          </span>

          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.3]">
            به خط زنگ بزن
          </h1>

          <p className="mt-5 max-w-[330px] text-[16px] leading-[2] text-white/50">
            برای مشاوره، همکاری یا هر سوالی در تماس باشید.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="mx-auto w-full max-w-[430px] px-6 pb-10 pt-2">
        <div className="flex flex-col gap-3">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="
                  group
                  relative
                  flex
                  min-h-[126px]
                  items-center
                  justify-between
                  rounded-[24px]
                  border
                  border-white/[0.12]
                  bg-[#090909]
                  px-6
                  outline-none
                  transition-all
                  duration-300

                  hover:border-[#FF6A1A]
                  hover:shadow-[0_0_22px_rgba(255,106,26,0.5),0_0_48px_rgba(255,106,26,0.18)]

                  focus:border-[#FF6A1A]
                  focus:shadow-[0_0_22px_rgba(255,106,26,0.5),0_0_48px_rgba(255,106,26,0.18)]

                  active:border-[#FF6A1A]
                  active:shadow-[0_0_22px_rgba(255,106,26,0.5),0_0_48px_rgba(255,106,26,0.18)]
                "
              >
                <div className="flex items-center gap-5">
                  <div
                    className="
                      flex
                      h-[68px]
                      w-[68px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.14]
                      bg-white/[0.025]
                      text-white/80
                      transition-all
                      duration-300

                      group-hover:border-[#FF6A1A]
                      group-hover:text-[#FF6A1A]
                      group-hover:shadow-[0_0_18px_rgba(255,106,26,0.28)]

                      group-focus:border-[#FF6A1A]
                      group-focus:text-[#FF6A1A]

                      group-active:border-[#FF6A1A]
                      group-active:text-[#FF6A1A]
                    "
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <div className="text-right">
                    <h2
                      className="
                        text-[20px]
                        font-bold
                        leading-none
                        text-white
                        transition-colors
                        duration-300

                        group-hover:text-[#FF6A1A]
                        group-focus:text-[#FF6A1A]
                        group-active:text-[#FF6A1A]
                      "
                    >
                      {item.title}
                    </h2>

                    <p className="mt-3 text-[12px] leading-[1.9] text-white/42">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    text-white/45
                    transition-all
                    duration-300

                    group-hover:-translate-x-1
                    group-hover:text-[#FF6A1A]

                    group-focus:-translate-x-1
                    group-focus:text-[#FF6A1A]

                    group-active:-translate-x-1
                    group-active:text-[#FF6A1A]
                  "
                >
                  <ArrowIcon className="h-8 w-8" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <section className="relative mx-auto min-h-[285px] w-full max-w-[430px] overflow-hidden px-7 pb-10 pt-12">
        <div className="pointer-events-none absolute -bottom-[145px] -right-[115px] h-[300px] w-[300px] rounded-full bg-[#FF6A1A]/30 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-[80px] -right-[25px] h-[160px] w-[160px] rounded-full bg-[#FF6A1A]/10 blur-[60px]" />

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