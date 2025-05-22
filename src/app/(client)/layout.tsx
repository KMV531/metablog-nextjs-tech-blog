import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Customize weights as needed
  variable: "--font-work-sans", // Optional: for CSS variable usage
  display: "swap", // Optional: prevents invisible text during load
});

export const metadata: Metadata = {
  title: "MetaBlog – Insights, Guides & News on Tech, Business & More.",
  description:
    "MetaBlog delivers high-quality articles, tutorials, and news on web development, AI, design systems, and modern tech trends. Stay informed, stay inspired.",
  keywords: [
    "web development blog",
    "AI news",
    "frontend tutorials",
    "MetaBlog",
    "React guides",
    "Next.js blog",
    "tech trends",
    "developer resources",
    "JavaScript tips",
    "programming articles",
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  openGraph: {
    title: "MetaBlog – Insights, Guides & News on Tech, Business & More.",
    description:
      "Explore MetaBlog's curated content on modern web development, AI advancements, and UI/UX trends.",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    siteName: "MetaBlog",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/assets/Logo.png`, // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: "MetaBlog – Deep Dives into Web Dev & Tech",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaBlog – Deep Dives into Web Dev, AI & Tech",
    description:
      "Get practical tutorials, expert insights, and industry updates on MetaBlog – your go-to blog for modern developers.",
    images: [`${process.env.NEXT_PUBLIC_URL}/assets/Logo.png`], // Replace with actual image
  },
  icons: {
    icon: "/assets/Logo.png",
    shortcut: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* ✅ Explicit link fallback (optional, Next will auto inject from metadata too) */}
          <link rel="icon" href="/assets/favicon.png" type="image/png+xml" />
        </head>
        <body className={`${workSans.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster richColors position="bottom-right" />{" "}
            {/* ✅ enable rich color themes */}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
