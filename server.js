const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('frontend'));

// Weather data route
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        // Replace with actual Weather API URL
        const response = await axios.get(`https://api.weather.gov/points/${city}`);
        const data = response.data;

        // Sample data from the Weather API (replace with actual data structure)
        const weatherData = {
            temperature: data.temperature,  // Example; replace with correct response structure
            humidity: data.humidity,
            windSpeed: data.windSpeed,
            weather: data.weather,
        };

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
