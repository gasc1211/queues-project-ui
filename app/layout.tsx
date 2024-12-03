import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import "./globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Queues Project",
  description: "Queue storage example project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.className} antialiased bg-slate-900 text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
