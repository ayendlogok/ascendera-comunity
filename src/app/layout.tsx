import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import { RamadanTheme } from "@/components/RamadanTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ascendera Community - Roblox Developer Community",
  description: "Wadah bagi para pengunjung untuk menemukan dan menjelajahi map pegunungan yang penuh tantangan bersama Ascendera Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#0f172a] text-white pt-12 relative`}>
        {/* Global Ramadan Background Ambient Layer */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <img 
            src="/ramadan_hero.png" 
            alt="Ramadan Background Ambient" 
            className="w-full h-full object-cover opacity-25" 
          />
          {/* Subtle blend to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 via-[#0f172a]/80 to-[#0f172a]" />
        </div>

        <Providers>
          <RamadanTheme />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
