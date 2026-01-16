import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { KeyboardProvider } from "@/components/keyboard-provider";
import { CommandPalette } from "@/components/command-palette";
import { KeyboardHelp } from "@/components/keyboard-help";
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "plob.dev",
    template: "%s | plob.dev",
  },
  description: "linktree, but better - blogs, products, links, and analytics all in one place",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://plob.dev"),
  openGraph: {
    title: "plob.dev",
    description: "linktree, but better - blogs, products, links, and analytics all in one place",
    url: "https://plob.dev",
    siteName: "plob.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "plob.dev",
    description: "linktree, but better - blogs, products, links, and analytics all in one place",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <KeyboardProvider>
          {children}
          <Analytics />
          <CommandPalette />
          <KeyboardHelp />
        </KeyboardProvider>
      </body>
    </html>
  );
}

