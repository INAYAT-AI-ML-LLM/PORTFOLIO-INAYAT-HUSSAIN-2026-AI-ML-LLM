import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GrainOverlay from "@/components/GrainOverlay";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inayathussain.dev"),
  title: "Inayat Hussain — Full Stack & GenAI Engineer | 2026 Portfolio",
  description:
    "Master Portfolio of Mohammad Inayat Hussain. Software Engineer specializing in MERN Stack, Python, Generative AI, and Next.js.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "GenAI",
    "React",
    "Next.js",
    "Portfolio",
    "Hyderabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inayathussain.dev",
    siteName: "Inayat Hussain Portfolio",
    title: "Inayat Hussain — Full Stack & GenAI Engineer",
    description: "2026 Master Portfolio featuring Digital Noir Futurism design.",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inayat Hussain — Full Stack & GenAI Engineer",
    description: "2026 Master Portfolio featuring Digital Noir Futurism design.",
    images: ["/images/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body suppressHydrationWarning className="font-body bg-bg-primary text-text-primary antialiased overscroll-none">
        {/* Global film grain overlay */}
        <GrainOverlay />

        {/* Theme provider — wraps the whole app */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
