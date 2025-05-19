"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
        const response = await fetch("/api?endpoint=history")
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
      router.push(`/weather?location=${encodeURIComponent(location)}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dress for the Weather</h1>
        <p className="text-xl text-gray-600">
          Get personalized outfit recommendations based on real-time weather conditions
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter city or location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
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
                href={`/weather?latitude=${item.latitude}&longitude=${item.longitude}&location=${encodeURIComponent(
                  item.location,
                )}`}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {item.location.split(",")[0]}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="border rounded-lg p-6 text-center">
          <div className="text-blue-600 text-3xl mb-4">📍</div>
          <h3 className="text-lg font-medium mb-2">Search Any Location</h3>
          <p className="text-gray-600">Enter any city or location to get accurate weather information</p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <div className="text-blue-600 text-3xl mb-4">🌤️</div>
          <h3 className="text-lg font-medium mb-2">Real-Time Weather</h3>
          <p className="text-gray-600">Get up-to-date weather conditions from the National Weather Service</p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <div className="text-blue-600 text-3xl mb-4">👕</div>
          <h3 className="text-lg font-medium mb-2">Outfit Suggestions</h3>
          <p className="text-gray-600">Receive personalized clothing recommendations based on the weather</p>
        </div>
      </div>
    </div>
  )
}
