import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/app/components/sidebar";
import  Navbar from "@/app/components/navbar";
import { auth } from "@/services/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student OS",
  description: "Manage your academic life",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {session ? (
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        ) : (
          <div className="flex min-h-screen flex-col w-full">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
