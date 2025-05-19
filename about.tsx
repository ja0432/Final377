export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About WeatherFit</h1>

        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <div className="p-6">
            <p className="text-lg">
              WeatherFit was created to solve a common everyday problem: deciding what to wear based on the weather. Our
              application combines real-time weather data with practical clothing recommendations to help you dress
              appropriately for any weather condition.
            </p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">How It Works</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Location Search</h3>
                <p>
                  Enter any city or location to get started. We use the OpenStreetMap Nominatim API to convert your
                  location into geographic coordinates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Weather Data</h3>
                <p>
                  We fetch real-time weather data from the National Weather Service (Weather.gov API) to provide you
                  with accurate and up-to-date weather information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Outfit Recommendations</h3>
                <p>
                  Based on the temperature and weather conditions, our algorithm suggests appropriate clothing options
                  to keep you comfortable throughout the day.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">Our Team</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">SN</span>
                </div>
                <h3 className="text-xl font-medium">Saathvika Nagareddy</h3>
                <p className="text-gray-600">Frontend Developer</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">JC</span>
                </div>
                <h3 className="text-xl font-medium">Jada Cook</h3>
                <p className="text-gray-600">Backend Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
