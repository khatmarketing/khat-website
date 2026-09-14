import { NextRequest, NextResponse } from "next/server";
import { submitWordPressForm } from "@/lib/wordpress";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "فرمت درخواست معتبر نیست." }, { status: 400 });
  }

  if (clean(payload.website, 200)) return NextResponse.json({ ok: true });

  const submission = {
    name: clean(payload.name, 120),
    phone: clean(payload.phone, 40),
    email: clean(payload.email, 180),
    message: clean(payload.message, 3000),
    source: clean(payload.source, 120) || "website",
    submittedAt: new Date().toISOString(),
  };

  if (!submission.name || !submission.phone) {
    return NextResponse.json(
      { ok: false, message: "نام و شماره تماس الزامی است." },
      { status: 400 },
    );
  }

  const wpResult = await submitWordPressForm("consultation-requests", submission);
  if (!wpResult) {
    return NextResponse.json(
      { ok: false, message: "اتصال به وردپرس تنظیم نشده یا ثبت درخواست ناموفق بود." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: wpResult.id });
}
