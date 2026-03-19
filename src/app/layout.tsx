import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import { LebaranTheme } from "@/components/LebaranTheme";

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
        {/* Global Festive Ambient Layer */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-[#0f172a]/80 to-[#0f172a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        <Providers>
          <LebaranTheme />
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
