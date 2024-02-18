
import type { Metadata } from "next";
import "./globals.css";
import Layout from "./components/layout/layout";
import type { Viewport } from 'next'


export const viewport: Viewport = {
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL("https://flightmetrics.vercel.app/"),
  title: "FlightMetrics - Your performance calculator",
  description:
  "TODO: Add description",
  generator: "Next.js",
  applicationName: "FlightMetrics",
  keywords: [
      "FlightMetrics",
      "FlightMetrics"
  ],
  openGraph: {
      title: "FlightMetrics - Your performance calculator",
      description:
    "TODO: Add description",
      url: "https://flightmetrics.vercel.app/",
      siteName: "FlightMetrics",
      images: [
          {
              url: "./public/metadata.jpg",
              width: 1200,
              height: 630,
              alt: "FlightMetrics - Your performance calculator",
          },
      ],
      locale: "en-US",
      type: "website",
  },
  twitter: {
      card: "summary_large_image",
      title: "FlightMetrics - Your performance calculator",
      description:
    "TODO : Add description",
      creator: "ZeroxyDev",
      creatorId: "0000000000",
      images: ["./public/metadata.jpg"],
  },
  robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
          index: true,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
      },
  },
  category: "service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   

  return (
    <html lang="en">
      <body className="bg-transparent">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
