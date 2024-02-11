import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import HeaderTop from "@/components/Header/HeaderTop";

import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zivana Store",
  description: "zivana Store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div>
            <HeaderTop />
            <Header />
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
