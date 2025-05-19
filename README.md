# WeatherFit - Weather-Based Outfit Recommendation App

## Description
WeatherFit is a web application that helps users decide what to wear based on current weather conditions. By providing real-time weather data and personalized outfit recommendations, WeatherFit takes the guesswork out of dressing appropriately for the weather.

The application fetches weather data from the National Weather Service API and uses the OpenStreetMap Nominatim API for location geocoding. Based on the temperature and weather conditions, WeatherFit suggests suitable clothing options to keep users comfortable throughout the day.

## Target Browsers
WeatherFit is designed to work on all modern browsers, including:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (latest version)
- Microsoft Edge (latest version)

The application is responsive and works on both desktop and mobile devices, including iOS and Android.

## Link to Developer Manual
The developer manual is included at the bottom of this README.

---

# Developer Manual

## Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Steps to Install

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/weatherfit.git
cd weatherfit
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

4. Set up the database:
Run the SQL scripts in the `database` directory to create the necessary tables and seed data.

## Running the Application

### Development Server
To run the application in development mode:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`
The application will be available at http://localhost:3000.

### Production Build
To create a production build:
\`\`\`bash
npm run build
# or
yarn build
\`\`\`

To start the production server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

## API Documentation

### Combined API Endpoint
The application uses a single API endpoint with different parameters to handle various functionalities:

- **Endpoint**: `/api`
- **Method**: GET or POST
- **Query Parameter**: `endpoint` - Specifies the operation to perform

### 1. Geocoding
- **Endpoint**: `/api?endpoint=geocode`
- **Method**: GET
- **Parameters**:
  - `location` (required): The location to geocode (city, address, etc.)
- **Response**: JSON object containing location, latitude, and longitude

### 2. Weather Data
- **Endpoint**: `/api?endpoint=weather`
- **Method**: GET
- **Parameters**:
  - `latitude` (required): The latitude coordinate
  - `longitude` (required): The longitude coordinate
- **Response**: JSON object containing current weather data and forecast

### 3. Outfit Recommendations
- **Endpoint**: `/api?endpoint=outfit`
- **Method**: GET
- **Parameters**:
  - `temperature` (required): The temperature in Fahrenheit
  - `condition` (required): The weather condition (e.g., "clear", "rain")
- **Response**: JSON object containing outfit recommendation

### 4. Search History
- **Endpoint**: `/api?endpoint=history`
- **Method**: GET
- **Response**: JSON array of recent search history items

- **Endpoint**: `/api?endpoint=history`
- **Method**: POST
- **Body**:
  - `location` (required): The location name
  - `latitude` (required): The latitude coordinate
  - `longitude` (required): The longitude coordinate
- **Response**: JSON object confirming the save operation

## Known Bugs and Limitations

1. **Weather Data Coverage**: The application uses the National Weather Service API, which primarily covers the United States and its territories. International locations may have limited or no weather data.

2. **API Rate Limits**: The OpenStreetMap Nominatim API has usage limits. Excessive requests may be throttled.

3. **Outfit Recommendations**: The outfit recommendations are based on general temperature ranges and may not account for personal preferences or specific activities.

## Future Development Roadmap

1. **User Accounts**: Implement user authentication to allow users to create accounts and save preferences.

2. **Favorite Locations**: Add the ability for users to save favorite locations for quick access.

3. **International Weather Data**: Integrate additional weather APIs to provide better coverage for international locations.

4. **Personalized Recommendations**: Allow users to customize outfit recommendations based on their preferences and style.
