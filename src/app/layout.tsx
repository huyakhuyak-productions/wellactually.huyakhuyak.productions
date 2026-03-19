import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Well, Actually.",
  description:
    "The Quarterly Journal of Unsolicited Correction. A pedantic, irrefutably correct, and entirely unasked-for guide to the proper use of the English language, administered with the gentle patience of a disappointed headmaster who has seen rather too many finals papers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://umami.mykolasolodukha.me/script.js"
          data-website-id="ce6bc450-6368-45e8-87c9-315a88771453"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
