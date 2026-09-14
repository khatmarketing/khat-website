import { NextRequest, NextResponse } from "next/server";
import { submitWordPressForm, uploadWordPressMedia } from "@/lib/wordpress";

function clean(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  const form = await request.formData();

  if (clean(form.get("website"), 200)) return NextResponse.json({ ok: true });

  const file = form.get("receipt");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, message: "تصویر رسید پرداخت الزامی است." },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, message: "حجم رسید نباید بیشتر از ۵ مگابایت باشد." },
      { status: 413 },
    );
  }

  if (!["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)) {
    return NextResponse.json(
      { ok: false, message: "فرمت رسید معتبر نیست." },
      { status: 400 },
    );
  }

  const media = await uploadWordPressMedia(file);
  if (!media) {
    return NextResponse.json(
      { ok: false, message: "بارگذاری رسید در وردپرس ناموفق بود." },
      { status: 502 },
    );
  }

  const payload = {
    name: clean(form.get("name"), 120),
    phone: clean(form.get("phone"), 40),
    email: clean(form.get("email"), 180),
    programType: clean(form.get("programType"), 40),
    programSlug: clean(form.get("programSlug"), 120),
    amount: clean(form.get("amount"), 80),
    receiptMediaId: media.id,
    receiptUrl: media.source_url || "",
    status: "pending_review",
    submittedAt: new Date().toISOString(),
  };

  if (!payload.name || !payload.phone || !payload.programSlug) {
    return NextResponse.json(
      { ok: false, message: "نام، شماره تماس و شناسه دوره/کارگاه الزامی است." },
      { status: 400 },
    );
  }

  const wpResult = await submitWordPressForm("payment-receipts", payload);
  if (!wpResult) {
    return NextResponse.json(
      { ok: false, message: "ثبت رسید برای بررسی مدیر ناموفق بود." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: wpResult.id, mediaId: media.id });
}
