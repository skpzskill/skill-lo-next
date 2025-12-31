import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skillpreneurz.com"),
  title: "SkillPreneurZ | Next Gen Skill Builders for Young Minds",
  description: "SkillPreneurZ brings startup thinking, innovation, and entrepreneurial learning to the next generation globally. Build future-ready skills and mindsets through world-class education.",
  keywords: "entrepreneurship, skill building, startup education, SkillPreneurZ, entrepreneurship education, kids business skills, design thinking, financial literacy, AI skills, young entrepreneurs, innovation education",
  authors: [{ name: "SkillPreneurZ" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.png?v=3', type: 'image/png' },
    ],
    apple: '/favicon.png?v=3',
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
