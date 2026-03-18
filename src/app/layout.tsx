import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Well, Actually.",
  description:
    "A pedantic and irrefutably correct guide to the proper use of the English language, presented with the gentle patience of a disappointed headmaster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
