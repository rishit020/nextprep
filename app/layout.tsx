import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// Two optical cuts of one superfamily: Inter Tight for display (it is drawn for
// large, tight headlines), Inter for text (drawn for legibility at small sizes).
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unistep · Your college plan, one step at a time",
  description:
    "A college admissions assistant for high schoolers. Get a personalized plan customized for your intended major and target schools, with real next steps that update as you go. Join the waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
