import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";

// One family across display and text. Merriweather Sans is a variable font
// (300–800), so the headline can take the full 800 without loading a second cut.
const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextPrep · Your college plan, one step at a time",
  description:
    "A college admissions assistant for high schoolers. Get a personalized plan customized for your intended major and target schools, with real next steps that update as you go. Join the waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${merriweatherSans.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
