import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexora Pulse — Interactive SaaS Demo",
  description: "Interactive frontend-only SaaS dashboard prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}