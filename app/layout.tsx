import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Sora } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "ReelsNova",
  description:
    "The ultimate platform for short-form video content. Discover trending reels, connect with millions of creators, and share your story with the world.",
  generator: "v0.app",
  keywords: ["reels", "short video", "social media", "creators", "viral", "content"],
  icons: {
    icon: [
      {
        url: "/play.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/play.svg",
        media: "(prefers-color-scheme: dark)",
      },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    ],
    //apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#F43F5E",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sora.variable} ${geistMono.variable} font-sans antialiased`}
      suppressHydrationWarning 
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
