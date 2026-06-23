import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@soulfest/ui-core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Soulfest Ticketing',
  description: 'Purchase your passes for the Kampar Heritage and Music Festival',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#f1f5f9] min-h-screen flex justify-center text-slate-900">
        <QueryProvider>
          <div className="w-full max-w-[768px] bg-white min-h-[100dvh] relative shadow-2xl flex flex-col sm:border-x sm:border-slate-300 overflow-hidden">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

