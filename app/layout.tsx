import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { HomeDock } from "./_components/HomeDock";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const url = "https://actuallyakshat.in";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Akshat Dubey",
  description: "A portfolio of Akshat Dubey.",
  openGraph: {
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Nota Rapida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Nota Rapida",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#ebebec]`} id="style-4">
        <Toaster />
        <HomeDock />
        {children}
      </body>
    </html>
  );
}
