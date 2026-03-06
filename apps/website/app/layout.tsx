import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ClawSome | Autonomous AI Operating System",
  description:
    "Next-gen AI swarms and agentic workflows for modern operators. Build, deploy, and scale autonomous agent networks with Clawsome OS.",
  icons: {
    icon: [
      { url: "/clawsome-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/clawsome-icon.svg",
    shortcut: "/clawsome-icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://clawsome.app",
    title: "ClawSome | Autonomous AI Operating System",
    description:
      "Next-gen AI swarms and agentic workflows for modern operators. Build, deploy, and scale autonomous agent networks.",
    siteName: "ClawSome",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClawSome — Autonomous AI Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawSome | Autonomous AI Operating System",
    description: "Next-gen AI swarms and agentic workflows for modern operators.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-300")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1 relative">
            <div className="absolute inset-0 hero-gradient pointer-events-none -z-10" />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
