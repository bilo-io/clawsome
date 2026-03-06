import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@clawsome/ui";
import { DocsLayout } from "../components/DocsLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clawsome Docs",
  description: "Official Documentation for Clawsome OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-black`}>
        <ThemeProvider>
          <DocsLayout>
            {children}
          </DocsLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
