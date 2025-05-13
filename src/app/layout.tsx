import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Load Roboto font
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose weights you need
});

export const metadata: Metadata = {
  title: "MetaBlog – Insights, Guides & News on Web Development, AI & Tech",
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
    title: "MetaBlog – Web Dev, AI, Design & Tech Articles",
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
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon-32x32.png",
    apple: "/assets/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Explicit link fallback (optional, Next will auto inject from metadata too) */}
        <link rel="icon" href="/assets/favicon.png" type="image/png+xml" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
