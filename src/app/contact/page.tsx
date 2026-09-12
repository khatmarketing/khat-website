import type { Metadata } from "next";
import ContactAction from "../components/ContactAction";
import PageHero from "../components/PageHero";
import { contactDetails, contactLinks } from "@/lib/contact";

export const metadata: Metadata = { title: "به خط زنگ بزن", description: "برای مشاوره رایگان و گفت‌وگو درباره مسیر رشد برندتان با خط در تماس باشید." };
const icons: Record<string, string> = {
  phone: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z",
  whatsapp: "M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5ZM8 8c.5 4 3 6.5 7 7",
  telegram: "m21 3-18 7 7 3 3 7 8-17ZM10 13 21 3",
  email: "M3 5h18v14H3V5Zm0 2 9 7 9-7",
  instagram: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1-5h.01",
};
export default function ContactPage() {
  const items = contactLinks(contactDetails);
  const missing = items.filter((item) => !item.href);
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title="به خط زنگ بزن" label="CONTACT" description="برای مشاوره رایگان، همکاری یا گفت‌وگو درباره برندتان در تماس باشید." image="/images/contact.png" />
      <section className="content-section pt-0" aria-label="راه‌های ارتباط با خط">
        {missing.length > 0 && <p className="mb-5 text-sm leading-7 text-white/65">راه‌های ارتباطی در حال تکمیل‌اند. گزینه‌های غیرفعال به‌زودی در دسترس قرار می‌گیرند.</p>}
        <div className="space-y-3">{items.map((item) => {
          const content = <><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="contact-icon h-6 w-6" aria-hidden="true"><path d={icons[item.id]} /></svg></span><div className="min-w-0"><h2 className="text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm leading-7 text-white/65">{item.href ? item.description : "به‌زودی"}</p></div>{item.href && <span className="mr-auto" aria-hidden="true">←</span>}</>;
          return item.href ? <ContactAction key={item.id} href={item.href} className="contact-card neon-ring" target={item.href.startsWith("https") ? "_blank" : undefined} rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}>{content}</ContactAction> : <div key={item.id} className="contact-card border border-white/15" aria-disabled="true">{content}</div>;
        })}</div>
      </section>
    </main>
  );
}

