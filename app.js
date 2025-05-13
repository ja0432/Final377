function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Fetch weather data from the backend API
    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            // Update the weather information on the page
            document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
            document.getElementById('windspeed').textContent = `Wind Speed: ${data.windSpeed} km/h`;
            document.getElementById('weather').textContent = `Weather: ${data.weather}`;

            // Provide outfit suggestions based on temperature
            let outfit = '';
            if (data.temperature > 25) {
                outfit = 'Wear light clothes, a t-shirt and shorts.';
            } else if (data.temperature > 15) {
                outfit = 'Wear a jacket or sweater.';
            } else {
                outfit = 'Wear a heavy coat and warm clothes.';
            }
            document.getElementById('outfitSuggestions').textContent = `Suggested Outfit: ${outfit}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again.');
        });
}

