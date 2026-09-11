import Image from "next/image";

export default function KhatFooter() {
  return (
    <footer
      dir="rtl"
      className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#050505] px-6 pb-7 pt-10"
    >
      {/* ORANGE GLOW - BOTTOM RIGHT */}
      <div className="pointer-events-none absolute -bottom-[150px] -right-[110px] h-[320px] w-[320px] rounded-full bg-[#FF6A1A]/30 blur-[105px]" />

      <div className="pointer-events-none absolute -bottom-[85px] right-[15px] h-[180px] w-[180px] rounded-full bg-[#FF6A1A]/10 blur-[70px]" />

      <div className="relative z-10">
        {/* TOP LINE */}
        <div className="mb-8 h-px w-full bg-white/[0.10]" />

        {/* MAIN FOOTER CONTENT */}
        <div className="flex items-end justify-between gap-5">
          {/* RIGHT - REAL KHAT LOGO */}
          <div className="flex flex-col items-start">
            <Image
              src="/images/brand/khat-logo.png"
              alt="خط"
              width={135}
              height={75}
              className="h-auto w-[110px] object-contain"
            />

            <p className="mt-5 max-w-[145px] text-[9px] leading-[1.9] text-white/25">
              بازاریابی، برندینگ
              <br />
              و رشد کسب‌وکارها
            </p>
          </div>

          {/* LEFT - SLOGAN */}
          <div className="flex flex-col items-end">
            <p className="text-[16px] font-bold leading-[1.8] text-white">
              همه چیز
              <br />
              روی خط
            </p>

            <div className="mt-5 h-px w-[70px] bg-white/35" />
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-9 h-px w-full bg-white/[0.07]" />

        {/* COPYRIGHT */}
        <p
          dir="ltr"
          className="mt-4 text-left text-[7px] tracking-[0.20em] text-white/15"
        >
          KHAT © 2026
        </p>
      </div>
    </footer>
  );
}