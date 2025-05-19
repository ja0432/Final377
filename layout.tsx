import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WeatherFit - Weather-Based Outfit Recommendations",
  description: "Get outfit recommendations based on current weather conditions",
}

// Navbar component embedded in layout
function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Help", href: "/help" },
  ]

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            WeatherFit
          </Link>
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-600 hover:text-blue-600">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

// Footer component embedded in layout
function Footer() {
  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} WeatherFit. All rights reserved.</p>
        <p className="text-gray-500 text-sm mt-1">Created by Saathvika Nagareddy and Jada Cook</p>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
