const teamMembers = [
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
  { name: "عضو تیم", role: "سمت" },
];

function TeamAvatar() {
  return (
    <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/[0.08]">
      <svg
        viewBox="0 0 64 64"
        className="h-[42px] w-[42px] text-white/45"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="32" cy="21" r="11" />
        <path d="M15 52c1.8-11 8.6-17 17-17s15.2 6 17 17H15Z" />
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      <section className="relative mx-auto w-full max-w-[430px] overflow-hidden px-6 pb-5 pt-6">
        <div className="pt-6 text-center">
          <span
            dir="ltr"
            className="block text-[9px] tracking-[0.6em] text-white/45"
          >
            ABOUT US
          </span>

          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.3]">
            درباره خط
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-[16px] font-medium leading-[2] text-white/45">
            تیمی که مسیر رشد کسب‌وکارها را می‌سازد
          </p>
        </div>
      </section>

      <section className="relative mx-auto h-[470px] w-full max-w-[430px] overflow-hidden bg-[#050505]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/about.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-b from-transparent via-[#050505]/70 to-[#050505]" />
      </section>

      <section className="mx-auto w-full max-w-[430px] px-7 pb-14 pt-4 text-center">
        <p className="mx-auto max-w-[345px] text-[14px] leading-[2.1] text-white/42">
          اینجا جاییه که داستان خط نوشته میشه...
        </p>
      </section>

      <section className="mx-auto w-full max-w-[430px] px-6 pb-7">
        <div className="text-right">
          <h2 className="text-[28px] font-extrabold leading-[1.4]">تیم خط</h2>

          <p className="mt-2 text-[15px] leading-[2] text-white/42">
            ترکیبی از فکر، خلاقیت و عمل
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[430px] px-6 pb-16">
        <div className="grid grid-cols-4 gap-3">
          {teamMembers.map((member, index) => (
            <article
              key={index}
              className="flex min-h-[180px] flex-col items-center justify-start rounded-[18px] border border-white/[0.08] bg-[#0A0A0A] px-3 pb-4 pt-5"
            >
              <TeamAvatar />

              <div className="mt-5 h-[8px] w-[72%] rounded-full bg-white/[0.16]" />

              <div className="mt-3 h-[7px] w-[48%] rounded-full bg-white/[0.11]" />

              <div className="sr-only">
                <span>{member.name}</span>
                <span>{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
