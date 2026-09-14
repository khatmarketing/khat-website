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
    programType: clean(payload.programType, 40),
    programSlug: clean(payload.programSlug, 120),
    notes: clean(payload.notes, 2000),
    submittedAt: new Date().toISOString(),
  };

  if (!submission.name || !submission.phone || !submission.programSlug) {
    return NextResponse.json(
      { ok: false, message: "نام، شماره تماس و شناسه دوره/کارگاه الزامی است." },
      { status: 400 },
    );
  }

  const wpResult = await submitWordPressForm("registrations", submission);
  if (!wpResult) {
    return NextResponse.json(
      { ok: false, message: "اتصال به وردپرس تنظیم نشده یا ثبت‌نام ناموفق بود." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: wpResult.id });
}
