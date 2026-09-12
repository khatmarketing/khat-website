// Exact destinations supplied and approved by Khat.
export const contactDetails = {
  phone: "09001040402",
  whatsapp: "https://wa.me/message/O3N4D4VFVTMBP1",
  telegram: "pezhmandavoudi",
  email: "Khatmarketing.group@gmail.com",
  instagram: "https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr",
};

export function contactLinks(details: typeof contactDetails) {
  const phone = (value: string) => /^(?:\+[1-9]\d{7,14}|09\d{9})$/.test(value.trim()) ? value.trim() : "";
  const handle = (value: string) => value.trim().replace(/^@/, "");
  const telegram = handle(details.telegram);
  const instagram = handle(details.instagram);
  return [
    { id: "phone", title: "تماس تلفنی", description: "برای شروع یک گفت‌وگو", href: phone(details.phone) ? `tel:${phone(details.phone)}` : "" },
    { id: "whatsapp", title: "WhatsApp", description: "درباره کسب‌وکارتان بنویسید", href: /^https:\/\/wa\.me\/message\/[A-Z0-9]+$/.test(details.whatsapp) ? details.whatsapp : /^\+[1-9]\d{7,14}$/.test(details.whatsapp) ? `https://wa.me/${details.whatsapp.slice(1)}` : "" },
    { id: "telegram", title: "Telegram", description: "راهی برای ارتباط مستقیم", href: /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(telegram) ? `https://t.me/${telegram}` : "" },
    { id: "email", title: "E-mail", description: "پیشنهاد یا درخواست همکاری", href: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()) ? `mailto:${details.email.trim()}` : "" },
    { id: "instagram", title: "Instagram", description: "خط را دنبال کنید", href: details.instagram === contactDetails.instagram ? details.instagram : /^[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/.test(instagram) ? `https://www.instagram.com/${instagram}/` : "" },
  ];
}

