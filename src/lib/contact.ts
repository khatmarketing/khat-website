// Populate only with verified Khat contact details. Empty values are deliberately inactive.
export const contactDetails = {
  phone: process.env.KHAT_PHONE ?? "",
  whatsapp: process.env.KHAT_WHATSAPP ?? "",
  telegram: process.env.KHAT_TELEGRAM ?? "",
  email: process.env.KHAT_EMAIL ?? "",
  instagram: process.env.KHAT_INSTAGRAM ?? "",
};

export function contactLinks(details: typeof contactDetails) {
  const phone = (value: string) => /^\+[1-9]\d{7,14}$/.test(value.trim()) ? value.trim() : "";
  const handle = (value: string) => value.trim().replace(/^@/, "");
  const telegram = handle(details.telegram);
  const instagram = handle(details.instagram);
  return [
    { id: "phone", title: "تماس تلفنی", description: "برای شروع یک گفت‌وگو", href: phone(details.phone) ? `tel:${phone(details.phone)}` : "" },
    { id: "whatsapp", title: "واتساپ", description: "درباره کسب‌وکارتان بنویسید", href: phone(details.whatsapp) ? `https://wa.me/${phone(details.whatsapp).slice(1)}` : "" },
    { id: "telegram", title: "تلگرام", description: "راهی برای ارتباط مستقیم", href: /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(telegram) ? `https://t.me/${telegram}` : "" },
    { id: "email", title: "ایمیل", description: "پیشنهاد یا درخواست همکاری", href: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()) ? `mailto:${details.email.trim()}` : "" },
    { id: "instagram", title: "اینستاگرام", description: "خط را دنبال کنید", href: /^[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/.test(instagram) ? `https://www.instagram.com/${instagram}/` : "" },
  ];
}

