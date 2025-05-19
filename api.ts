import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/database"

// Combined API handler for all endpoints
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  // Handle geocoding
  if (endpoint === "geocode") {
    const location = searchParams.get("location")

    if (!location) {
      return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        {
          headers: {
            "User-Agent": "WeatherFit/1.0",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data || data.length === 0) {
        return NextResponse.json({ error: "Location not found" }, { status: 404 })
      }

      // Return the first result
      return NextResponse.json({
        location: data[0].display_name,
        latitude: Number.parseFloat(data[0].lat),
        longitude: Number.parseFloat(data[0].lon),
      })
    } catch (error) {
      console.error("Geocoding error:", error)
      return NextResponse.json({ error: "Failed to geocode location" }, { status: 500 })
    }
  }

  // Handle weather data
  if (endpoint === "weather") {
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Latitude and longitude parameters are required" }, { status: 400 })
    }

    try {
      // Format coordinates properly
      const lat = Number.parseFloat(latitude).toFixed(4)
      const lon = Number.parseFloat(longitude).toFixed(4)

      // First, get the forecast URL from the points endpoint
      const pointsResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
        headers: {
          "User-Agent": "WeatherFit/1.0",
          Accept: "application/geo+json",
        },
        redirect: "follow", // Follow redirects automatically
      })

      if (!pointsResponse.ok) {
        throw new Error(`Weather API error: ${pointsResponse.status}`)
      }

      const pointsData = await pointsResponse.json()
      const forecastUrl = pointsData.properties.forecast

      // Then, get the actual forecast
      const forecastResponse = await fetch(forecastUrl, {
        headers: {
          "User-Agent": "WeatherFit/1.0",
          Accept: "application/geo+json",
        },
        redirect: "follow",
      })

      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`)
      }

      const forecastData = await forecastResponse.json()

      // Get the current period (first period in the forecast)
      const currentPeriod = forecastData.properties.periods[0]

      // Simplify the weather data we return
      const weatherData = {
        temperature: currentPeriod.temperature,
        temperatureUnit: currentPeriod.temperatureUnit,
        shortForecast: currentPeriod.shortForecast,
        detailedForecast: currentPeriod.detailedForecast,
        icon: currentPeriod.icon,
        // Get the next 5 periods for the forecast
        forecast: forecastData.properties.periods.slice(0, 5).map((period) => ({
          name: period.name,
          temperature: period.temperature,
          shortForecast: period.shortForecast,
          icon: period.icon,
        })),
      }

      return NextResponse.json(weatherData)
    } catch (error) {
      console.error("Weather API error:", error)
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
    }
  }

  // Handle outfit recommendations
  if (endpoint === "outfit") {
    const temperature = searchParams.get("temperature")
    const condition = searchParams.get("condition")

    if (!temperature || !condition) {
      return NextResponse.json({ error: "Temperature and condition parameters are required" }, { status: 400 })
    }

    try {
      const tempValue = Number.parseInt(temperature)
      let weatherCondition = "clear"

      // Map the weather condition to our database values (simplify to just rain or clear)
      if (
        condition.toLowerCase().includes("rain") ||
        condition.toLowerCase().includes("shower") ||
        condition.toLowerCase().includes("drizzle")
      ) {
        weatherCondition = "rain"
      }

      const supabase = getServerClient()

      // Find outfit recommendation that matches the temperature and condition
      const { data, error } = await supabase
        .from("outfit_recommendations")
        .select("*")
        .lte("max_temp", tempValue)
        .gte("min_temp", tempValue)
        .eq("condition", weatherCondition)
        .limit(1)

      if (error) {
        console.error("Supabase error:", error)
        return NextResponse.json({ error: "Failed to fetch outfit recommendations" }, { status: 500 })
      }

      if (!data || data.length === 0) {
        // If no exact match, get a fallback recommendation
        const { data: fallbackData } = await supabase
          .from("outfit_recommendations")
          .select("*")
          .eq("condition", weatherCondition)
          .order("min_temp", { ascending: tempValue < 50 })
          .limit(1)

        if (!fallbackData || fallbackData.length === 0) {
          return NextResponse.json({ error: "No outfit recommendations found" }, { status: 404 })
        }

        return NextResponse.json(fallbackData[0])
      }

      return NextResponse.json(data[0])
    } catch (error) {
      console.error("Outfit recommendations error:", error)
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
    }
  }

  // Handle search history
  if (endpoint === "history") {
    try {
      const supabase = getServerClient()

      const { data, error } = await supabase
        .from("search_history")
        .select("*")
        .order("searched_at", { ascending: false })
        .limit(5)

      if (error) {
        console.error("Supabase error:", error)
        return NextResponse.json({ error: "Failed to fetch search history" }, { status: 500 })
      }

      return NextResponse.json(data)
    } catch (error) {
      console.error("Search history error:", error)
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  // Handle saving search history
  if (endpoint === "history") {
    try {
      const { location, latitude, longitude } = await request.json()

      if (!location || !latitude || !longitude) {
        return NextResponse.json({ error: "Location, latitude, and longitude are required" }, { status: 400 })
      }

      const supabase = getServerClient()

      const { data, error } = await supabase.from("search_history").insert([{ location, latitude, longitude }]).select()

      if (error) {
        console.error("Supabase error:", error)
        return NextResponse.json({ error: "Failed to save search history" }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    } catch (error) {
      console.error("Search history error:", error)
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 })
}
