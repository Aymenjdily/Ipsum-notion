import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ConvexProvider } from "@/contexts/ConvexProvider";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ipsum Notion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-light.svg",
        href: "/logo-light.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="ipsum-theme"
          >
            <Toaster position="bottom-center" />
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
