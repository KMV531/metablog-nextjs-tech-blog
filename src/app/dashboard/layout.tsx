export const metadata = {
  title: "MetaBlog – Insights, Guides & News on Web Development, AI & Tech",
  description:
    "MetaBlog delivers high-quality articles, tutorials, and news on web development, AI, design systems, and modern tech trends. Stay informed, stay inspired.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
