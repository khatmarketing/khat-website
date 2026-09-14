import { NextRequest, NextResponse } from "next/server";
import { submitWordPressForm } from "@/lib/wordpress";

const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const submissions = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

function rateLimitKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = submissions.get(key);
  if (!current || current.resetAt <= now) {
    submissions.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 20_000) {
    return jsonError("درخواست بیش از حد بزرگ است.", 413);
  }

  const key = rateLimitKey(request);
  if (isRateLimited(key)) {
    return jsonError("تعداد درخواست‌ها زیاد است. لطفاً کمی بعد دوباره تلاش کنید.", 429);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return jsonError("فرمت درخواست معتبر نیست.");
  }

  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 40);
  const message = clean(payload.message, 3_000);

  if (!name || !message) return jsonError("نام و پیام الزامی است.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("ایمیل معتبر نیست.");
  if (phone && !/^[+\d\s()-]{7,40}$/.test(phone)) return jsonError("شماره تماس معتبر نیست.");

  const submission = {
    name,
    email,
    phone,
    message,
    source: "contact_page",
    submittedAt: new Date().toISOString(),
  };

  await submitWordPressForm("consultation-requests", submission);

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      return jsonError("ثبت پیام با مشکل روبه‌رو شد. لطفاً دوباره تلاش کنید.", 502);
    }
  }

  return NextResponse.json({ ok: true });
}
