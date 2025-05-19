"use client"

import { useState } from "react"

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  const faqs = [
    {
      question: "Why is my city not showing up in the search results?",
      answer:
        "WeatherFit uses the OpenStreetMap Nominatim API for geocoding. If your city isn't showing up, try adding the state, province, or country to make your search more specific. For example, instead of 'Springfield,' try 'Springfield, IL' or 'Springfield, USA.'",
    },
    {
      question: "How accurate are the weather forecasts?",
      answer:
        "WeatherFit uses data from the National Weather Service (Weather.gov), which provides official weather forecasts for the United States. These forecasts are generally reliable, but like all weather predictions, they may not always be 100% accurate, especially for forecasts further in the future.",
    },
    {
      question: "How are outfit recommendations determined?",
      answer:
        "Our outfit recommendations are based on temperature ranges and weather conditions. We consider factors like temperature (hot, warm, cool, cold, freezing) and precipitation (clear, rainy) to suggest appropriate clothing. These recommendations are general guidelines and may need to be adjusted based on your personal preferences and specific activities.",
    },
    {
      question: "Does WeatherFit work for international locations?",
      answer:
        "While our location search works worldwide through OpenStreetMap, our weather data comes from the U.S. National Weather Service, which primarily covers the United States and its territories. For international locations, you may receive limited or no weather data.",
    },
    {
      question: "Why am I seeing an error when searching for a location?",
      answer:
        "Errors can occur for several reasons: The location may not be recognized by our geocoding service, the Weather.gov API may be temporarily unavailable, the location may be outside the coverage area of the Weather.gov API, or there might be network connectivity issues. Try searching for a different location or try again later.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Help & FAQ</h1>

        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">How to Use WeatherFit</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Search for a Location</h3>
                <p>
                  On the home page, enter the name of a city or location in the search bar and click the "Search"
                  button. You can enter city names, addresses, or even landmarks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. View Weather Information</h3>
                <p>
                  After searching, you'll see the current weather conditions for your location, including temperature
                  and a detailed forecast.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Get Outfit Recommendations</h3>
                <p>
                  Based on the current weather, WeatherFit will suggest appropriate clothing to keep you comfortable.
                  These recommendations consider both temperature and weather conditions like rain or sunshine.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Check the Forecast</h3>
                <p>You can also view a 5-day forecast to plan your outfits for the upcoming days.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span>{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && (
                    <div className="p-4 border-t">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
