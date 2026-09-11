import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خط | بازاریابی، برندینگ و رشد کسب‌وکار",
  description:
    "خط؛ همراه کسب‌وکارها در بازاریابی، برندینگ، تبلیغات و رشد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}