"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Layout components
function Navbar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/"

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Help", href: "/help" },
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link href="/" className="navbar-brand">
            WeatherFit
          </Link>
          <nav className="navbar-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "navbar-link-active" : "navbar-link"}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} WeatherFit. All rights reserved.</p>
        <p className="footer-subtext">Created by Saathvika Nagareddy and Jada Cook</p>
      </div>
    </footer>
  )
}

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

// Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export default function Home() {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [recentSearches, setRecentSearches] = useState([])
  const router = useRouter()

  // Fetch recent searches when the component mounts
  useEffect(() => {
    async function fetchRecentSearches() {
      try {
        const response = await fetch("/api/weather?action=getSearchHistory")
        if (response.ok) {
          const data = await response.json()
          setRecentSearches(data)
        }
      } catch (error) {
        console.error("Failed to fetch recent searches:", error)
      }
    }

    fetchRecentSearches()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!location.trim()) {
      setError("Please enter a location")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      router.push(`/results?location=${encodeURIComponent(location)}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dress for the Weather</h1>
          <p className="text-xl text-gray-600">
            Get personalized outfit recommendations based on real-time weather conditions
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              placeholder="Enter city or location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="search-button">
              {isLoading ? "Searching..." : "Search"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>

        {recentSearches.length > 0 && (
          <div className="max-w-md mx-auto mb-12">
            <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <Link
                  key={item.id}
                  href={`/results?latitude=${item.latitude}&longitude=${item.longitude}&location=${encodeURIComponent(item.location)}`}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {item.location.split(",")[0]}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">Search Any Location</h3>
            <p className="feature-description">Enter any city or location to get accurate weather information</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌤️</div>
            <h3 className="feature-title">Real-Time Weather</h3>
            <p className="feature-description">Get up-to-date weather conditions from the National Weather Service</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👕</div>
            <h3 className="feature-title">Outfit Suggestions</h3>
            <p className="feature-description">Receive personalized clothing recommendations based on the weather</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
