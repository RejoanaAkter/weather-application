import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";

// Replace Geist with Inter (sans) and Fira Mono (mono)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Application",
  description: "A weather app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
