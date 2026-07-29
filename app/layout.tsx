import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HCH Growth Tracker",
  description:
    "A family-friendly tracker for recording and visualising growth measurements for children with hypochondroplasia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
