"use client"; // Tambahkan ini di paling atas

import { SessionProvider } from "next-auth/react";
import "./globals.css"; // Pastikan path css ini benar sesuai struktur Anda

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}