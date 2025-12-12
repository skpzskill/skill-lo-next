import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skillpreneurz.com"),
  title: "SkillPreneurZ | Building the Future Mindset",
  description: "SkillPreneurZ brings startup thinking, innovation, and entrepreneurial learning to the next generation. Build future-ready skills and mindsets.",
  keywords: "SkillPreneurZ, entrepreneurship education, kids business skills, design thinking, financial literacy, AI skills, startup education, young entrepreneurs",
  authors: [{ name: "SkillPreneurZ" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png?v=2', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon.png?v=2',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    url: "https://www.skillpreneurz.com/",
    title: "SkillPreneurZ | Building the Future Mindset",
    description: "Shaping mindsets through startup thinking, innovation, and entrepreneurial learning for the next generation.",
    images: [
      {
        url: "https://www.skillpreneurz.com/logo.png",
        width: 1200,
        height: 630,
        alt: "SkillPreneurZ Logo",
      },
    ],
    siteName: "SkillPreneurZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SkillPreneurZ",
    title: "SkillPreneurZ | Building the Future Mindset",
    description: "Shaping mindsets through startup thinking, innovation, and entrepreneurial learning for the next generation.",
    images: ["https://www.skillpreneurz.com/logo.png"],
  },
  verification: {
    google: "hjVbVrKL9y2mFTeDXRiAzwrSZazI3klfiMLvfR0I8K8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
