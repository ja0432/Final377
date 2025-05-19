# Developer Manual

Overview

This manual provides a guide for future developers who will take over What to Wear? System. The purpose of this document is to make sure developers arent confused by providing a outlining of the setup process, API usage, testing methods, and a roadmap for further development.

System Purpose

This system helps users decide what to wear based on real-time weather data. It integrates the Weather.gov API and OpenStreetMap Nominatim API to provide current weather details and generates outfit recommendations accordingly.

Installation
VS code
 Prerequisites

-Node.js 
- npm
- Next.js A
- API Routes Supabase for database storage

Steps

1. Clone the repository:


git clone https://github.com/ja0432/Final377.git

2. Install dependencies:

npm install
live server instal

Run the website

To start the server:

live server - go Live 



API Documentation

The backend server offers a RESTful API that connects to external services and processes weather data.

External APIs Used

Weather.gov API

  Endpoint: `https://api.weather.gov/points/{lat},{lon}`
   Purpose: Fetch weather forecast, temperature, humidity, and condition data.
 OpenStreetMap Nominatim API

   Endpoint: `https://nominatim.openstreetmap.org/search?format=json&q={city}`
   Purpose: Translate city name into latitude and longitude.

Internal API Endpoints

 `GET /api/weather?city={cityName}`

 Description: Fetches weather data and outfit recommendations for a given city.
 Query Parameters:

   `city`: Name of the city.
   Response Format:

json
{
  "location": "New York, NY",
  "temperature": 75,
  "condition": "Partly Cloudy",
  "recommendation": ["T-shirt", "Shorts", "Light Jacket"]
}


Home Page

- Search bar for city input
- Display of:

  - Current temperature
  - Humidity
  - Wind speed
  - Weather status (e.g., sunny, rainy)
- Outfit recommendations based on weather data

About Page

-Overview of the problem being solved
- Explanation of technology stack
- Credits to team members

Help Page

-Instructions on using the app
- Frequently asked questions



- Insomnia or Postman for API testing

testing Steps

1. Test Weather.gov API;

   -Endpoint: `https://api.weather.gov/points/34.0522,-118.2437`
   - Verify that weather details such as temperature and forecast are returned.

2. Test Nominatim API:

   -Endpoint: `https://nominatim.openstreetmap.org/search?format=json&q=New%20York`
   - Confirm that latitude and longitude data for the city is returned.

3. Internal API Test:

   Endpoint: `GET /api/weather?city=New York`
   Ensure the response includes weather and outfit recommendation.

Screenshot Submission

Attach screenshots of each API request and response in the final submission.

Known Issues

-  APIs may slow down responses due to heavy use.
- Smaller or less known city names may return no data.
-No user log in currently implemented.

 Future Roadmap

-Add user login and preference settings.
- Store user search history and clothing preferences in a database (SQLite or MongoDB).- Implement caching for frequent city searches to reduce API load.
- Add AI-generated pictures of the outfit suggestions based on user profile.
-Enhance frontend with React and better styling.


