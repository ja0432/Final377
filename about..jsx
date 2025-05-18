import Link from "next/link"

// Reuse the same Navbar and Footer from the home page
function Navbar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/about"

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

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About WeatherFit</h1>

          <div className="weather-card">
            <div className="card-header">
              <h2 className="card-title">Our Mission</h2>
            </div>
            <div className="card-body">
              <p className="text-lg">
                WeatherFit was created to solve a common everyday problem: deciding what to wear based on the weather.
                Our application combines real-time weather data with practical clothing recommendations to help you
                dress appropriately for any weather condition.
              </p>
            </div>
          </div>

          <div className="weather-card">
            <div className="card-header">
              <h2 className="card-title">How It Works</h2>
            </div>
            <div className="card-body">
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

          <div className="weather-card">
            <div className="card-header">
              <h2 className="card-title">Technology Stack</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Frontend</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Next.js (React Framework)</li>
                    <li>Tailwind CSS for styling</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Backend</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Next.js API Routes</li>
                    <li>Supabase for database storage</li>
                    <li>Weather.gov API integration</li>
                    <li>OpenStreetMap Nominatim API</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="weather-card">
            <div className="card-header">
              <h2 className="card-title">Our Team</h2>
            </div>
            <div className="card-body">
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
    </Layout>
  )
}
