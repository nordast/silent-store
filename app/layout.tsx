import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { siteName } from "@/constants";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: `${siteName} - A simple and secure file storage service`,
  description:
    "Your secure and discreet digital vault, where privacy meets simplicity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {children}
      </body>
    </html>
  );
}
