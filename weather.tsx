"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function Weather() {
  const searchParams = useSearchParams()
  const locationParam = searchParams.get("location")
  const latitudeParam = searchParams.get("latitude")
  const longitudeParam = searchParams.get("longitude")
  const locationNameParam = searchParams.get("location")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locationData, setLocationData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [outfitRecommendation, setOutfitRecommendation] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        // If latitude and longitude are provided directly in URL
        if (latitudeParam && longitudeParam && locationNameParam) {
          setLocationData({
            latitude: Number.parseFloat(latitudeParam),
            longitude: Number.parseFloat(longitudeParam),
            location: decodeURIComponent(locationNameParam),
          })

          // Fetch weather data
          const weatherResponse = await fetch(
            `/api?endpoint=weather&latitude=${latitudeParam}&longitude=${longitudeParam}`,
          )

          if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data")
          }

          const weatherResult = await weatherResponse.json()
          setWeatherData(weatherResult)

          // Fetch outfit recommendation
          const outfitResponse = await fetch(
            `/api?endpoint=outfit&temperature=${weatherResult.temperature}&condition=${weatherResult.shortForecast}`,
          )

          if (outfitResponse.ok) {
            const outfitResult = await outfitResponse.json()
            setOutfitRecommendation(outfitResult)
          }
        }
        // If only location name is provided, geocode it first
        else if (locationParam) {
          const geocodeResponse = await fetch(`/api?endpoint=geocode&location=${encodeURIComponent(locationParam)}`)

          if (!geocodeResponse.ok) {
            throw new Error("Failed to geocode location")
          }

          const geocodeResult = await geocodeResponse.json()
          setLocationData(geocodeResult)

          // Fetch weather data
          const weatherResponse = await fetch(
            `/api?endpoint=weather&latitude=${geocodeResult.latitude}&longitude=${geocodeResult.longitude}`,
          )

          if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data")
          }

          const weatherResult = await weatherResponse.json()
          setWeatherData(weatherResult)

          // Fetch outfit recommendation
          const outfitResponse = await fetch(
            `/api?endpoint=outfit&temperature=${weatherResult.temperature}&condition=${weatherResult.shortForecast}`,
          )

          if (outfitResponse.ok) {
            const outfitResult = await outfitResponse.json()
            setOutfitRecommendation(outfitResult)
          }

          // Save search history
          await fetch("/api?endpoint=history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: geocodeResult.location,
              latitude: geocodeResult.latitude,
              longitude: geocodeResult.longitude,
            }),
          })
        } else {
          throw new Error("No location provided")
        }
      } catch (err) {
        console.error(err)
        setError(err.message || "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [locationParam, latitudeParam, longitudeParam, locationNameParam])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error || !locationData || !weatherData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error || "Failed to load data"}</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            <Link href="/">Try Again</Link>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Search
        </Link>
      </div>

      <div className="space-y-8">
        {/* Weather Display */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Current Weather in {locationData.location.split(",")[0]}</h2>
          </div>
          <div className="p-6">
            <div>
              <div className="text-4xl font-bold mb-2">
                {weatherData.temperature}°{weatherData.temperatureUnit}
              </div>
              <div className="text-xl mb-2">{weatherData.shortForecast}</div>
              <div className="mt-4 text-sm">{weatherData.detailedForecast}</div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Forecast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="border rounded-lg p-3 text-center">
                    <div className="font-medium mb-2">{day.name}</div>
                    <div className="text-lg font-semibold">
                      {day.temperature}°{weatherData.temperatureUnit}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{day.shortForecast}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outfit Recommendation */}
        {outfitRecommendation && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-xl font-semibold">Recommended Outfit</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div>
                  {outfitRecommendation.image_url ? (
                    <img
                      src={outfitRecommendation.image_url || "/placeholder.svg"}
                      alt="Outfit recommendation"
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-md">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg">{outfitRecommendation.outfit_recommendation}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Recommended for temperatures between {outfitRecommendation.min_temp}°F and{" "}
                    {outfitRecommendation.max_temp}°F in {outfitRecommendation.condition} conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
