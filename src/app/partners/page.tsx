import KhatMenu from "../components/KhatMenu";

const partners = [
  {
    name: "Digikala",
    image: "/images/partners/digikala.png",
  },
  {
    name: "Snapp",
    image: "/images/partners/snapp.png",
  },
  {
    name: "Tapsi",
    image: "/images/partners/tapsi.png",
  },
  {
    name: "Rooma",
    image: "/images/partners/rooma.png",
  },
  {
    name: "Bazr",
    image: "/images/partners/bazr.png",
  },
  {
    name: "Samsung",
    image: "/images/partners/samsung.png",
  },
  {
    name: "Zarinpal",
    image: "/images/partners/zarinpal.png",
  },
  {
    name: "Esalat",
    image: "/images/partners/esalat.png",
  },
  {
    name: "Aparat",
    image: "/images/partners/aparat.png",
  },
  {
    name: "CafeBazaar",
    image: "/images/partners/cafebazaar.png",
  },
  {
    name: "Namava",
    image: "/images/partners/namava.png",
  },
  {
    name: "Alibaba",
    image: "/images/partners/alibaba.png",
  },
];

export default function PartnersPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#050505] text-white"
    >
      {/* ======================================
          HEADER
      ====================================== */}
      <section className="relative mx-auto w-full max-w-[430px] px-6 pb-10 pt-6">
        <KhatMenu />

        <div className="pt-[95px] text-center">
          <span
            dir="ltr"
            className="block text-[10px] tracking-[0.72em] text-white/45"
          >
            PARTNERS
          </span>

          <h1 className="mt-5 text-[39px] font-extrabold leading-[1.3] tracking-[-0.02em]">
            کیا با خط کار کردن
          </h1>

          <p className="mx-auto mt-4 max-w-[360px] text-[16px] font-medium leading-[2] text-white/45">
            همراه‌هایی که مسیر رشدشون رو با خط ساختن
          </p>
        </div>
      </section>

      {/* ======================================
          PARTNERS GRID
      ====================================== */}
      <section className="mx-auto w-full max-w-[430px] px-5 pb-16">
        <div className="grid grid-cols-3 gap-3">
          {partners.map((partner) => (
            <button
              key={partner.name}
              type="button"
              aria-label={partner.name}
              className="
                group
                relative
                aspect-[1.18/1]
                overflow-hidden
                rounded-[18px]
                border
                border-white/[0.12]
                bg-[#090909]
                outline-none
                transition-all
                duration-300

                hover:border-[#FF6A1A]
                hover:shadow-[0_0_18px_rgba(255,106,26,0.55),0_0_38px_rgba(255,106,26,0.20)]

                focus:border-[#FF6A1A]
                focus:shadow-[0_0_18px_rgba(255,106,26,0.55),0_0_38px_rgba(255,106,26,0.20)]

                active:border-[#FF6A1A]
                active:shadow-[0_0_18px_rgba(255,106,26,0.55),0_0_38px_rgba(255,106,26,0.20)]
              "
            >
              {/* IMAGE */}
              <div
                className="
                  absolute
                  inset-0
                  bg-cover
                  bg-center
                  bg-no-repeat
                  transition-transform
                  duration-500
                  ease-out

                  group-hover:scale-[1.04]
                  group-focus:scale-[1.04]
                  group-active:scale-[1.04]
                "
                style={{
                  backgroundImage: `url('${partner.image}')`,
                }}
              />

              {/* DARK OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-black/[0.03]
                  transition-all
                  duration-300

                  group-hover:bg-black/0
                  group-focus:bg-black/0
                  group-active:bg-black/0
                "
              />

              {/* INNER ORANGE GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[17px]
                  opacity-0
                  shadow-[inset_0_0_22px_rgba(255,106,26,0.18)]
                  transition-opacity
                  duration-300

                  group-hover:opacity-100
                  group-focus:opacity-100
                  group-active:opacity-100
                "
              />

              {/* OUTER SOFT GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-[1px]
                  rounded-[19px]
                  opacity-0
                  shadow-[0_0_28px_rgba(255,106,26,0.25)]
                  transition-opacity
                  duration-300

                  group-hover:opacity-100
                  group-focus:opacity-100
                  group-active:opacity-100
                "
              />
            </button>
          ))}
        </div>
      </section>

      {/* ======================================
          FOOTER
      ====================================== */}
      <section className="relative mx-auto min-h-[310px] w-full max-w-[430px] overflow-hidden px-6 pb-10 pt-14">
        {/* ORANGE GLOW */}
        <div className="pointer-events-none absolute -bottom-[145px] -left-[120px] h-[300px] w-[300px] rounded-full bg-[#FF6A1A]/28 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-[70px] -left-[30px] h-[160px] w-[160px] rounded-full bg-[#FF6A1A]/10 blur-[60px]" />

        <div className="relative z-10 flex min-h-[220px] items-end justify-between">
          {/* LEFT */}
          <div className="flex max-w-[255px] flex-col items-start">
            <div className="mb-7 h-[2px] w-[175px] rounded-full bg-white/30" />

            <p className="text-right text-[14px] leading-[2] text-white/45">
              بازاریابی، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start">
            <p className="text-right text-[22px] font-extrabold leading-[1.45]">
              همه چیز
              <br />
              روی خط
            </p>

            <div className="mt-6 h-[2px] w-[82px] rounded-full bg-white/30" />
          </div>
        </div>
      </section>
    </main>
  );
}