import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import { MusicPlayerProvider } from "@/components/MusicPlayerContext";

import type { Metadata } from "next";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Los Falsos",
  description: "Sitio oficial de los Falsos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={anton.className}>
      <body className="bg-[--gradient-page] text-white flex flex-col min-h-screen font-sans">
        <MusicPlayerProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <MusicPlayer />
          <Footer />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
