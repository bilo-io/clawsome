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
  description:
    "Official documentation for Clawsome OS — the neural agent orchestration platform. Guides, API references, CLI usage, and component library.",
  icons: {
    icon: [
      { url: "/clawsome-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/clawsome-icon.svg",
    shortcut: "/clawsome-icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://clawsome-docs.vercel.app",
    title: "Clawsome Docs — Developer Documentation",
    description:
      "Everything you need to build with AI agents. Guides, references, CLI docs, and component library for Clawsome OS.",
    siteName: "Clawsome Docs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clawsome Docs — Developer Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawsome Docs — Developer Documentation",
    description: "Everything you need to build with AI agents.",
    images: ["/og-image.png"],
  },
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
