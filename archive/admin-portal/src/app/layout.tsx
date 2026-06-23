import React from 'react';
import { Inter } from "next/font/google";
import './globals.css';
import { QueryProvider } from "@soulfest/ui-core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Soulfest Admin',
  description: 'Management portal for Soulfest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-[#050505] antialiased ${inter.className}`}>
        <QueryProvider>
          {children as any}
        </QueryProvider>
      </body>
    </html>
  )
}
