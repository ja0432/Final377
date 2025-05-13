async function getCityWeather() {
  const city = document.getElementById('city').value.trim();
  const forecastDiv = document.getElementById('forecast');
  forecastDiv.innerHTML = "Loading...";

  if (!city) {
    forecastDiv.innerHTML = "Please enter a city!";
    return;
  }

  try {
    // Step 1: Get lat/lon
    const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    const geoData = await geoResp.json();

    if (geoData.length === 0) {
      forecastDiv.innerHTML = "City not found.";
      return;
    }

    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // Step 2: Get forecast URL
    const pointResp = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    const pointData = await pointResp.json();
    const forecastURL = pointData.properties.forecast;

    // Step 3: Get forecast
    const forecastResp = await fetch(forecastURL);
    const forecastData = await forecastResp.json();
    const periods = forecastData.properties.periods;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const todayPeriods = periods.filter(period =>
      period.name.includes("Today") ||
      period.name.includes("This Afternoon") ||
      period.name.includes("Tonight") ||
      period.name.includes(today)
    );

    forecastDiv.innerHTML = `<h2>Forecast for ${geoData[0].display_name.split(",")[0]} - ${today}</h2>`;

    if (todayPeriods.length === 0) {
      forecastDiv.innerHTML += `<p>No forecast available.</p>`;
    } else {
      todayPeriods.forEach(period => {
        const details = period.detailedForecast;

        // Extract data using regex
        const tempMatch = details.match(/(high|low) near (\d+)/i);
        const windMatch = details.match(/(wind.*?mph)/i);
        const precipMatch = details.match(/Chance of precipitation is (\d+)%/i);

        const temp = tempMatch ? `${tempMatch[1]} near ${tempMatch[2]}°F` : "N/A";
        const wind = windMatch ? windMatch[1] : "N/A";
        const precip = precipMatch ? parseInt(precipMatch[1]) : 0;

        const clothingSuggestion = getClothingSuggestion(tempMatch ? parseInt(tempMatch[2]) : 0);
        const extraRecommendation = getExtraRecommendation(precip, tempMatch ? parseInt(tempMatch[2]) : 0);

        const div = document.createElement("div");
        div.className = "period";
        div.innerHTML = `
          <strong>${period.name}</strong><br>
          Temperature: ${temp}<br>
          Wind: ${wind}<br>
          Chance of Precipitation: ${precip}%<br>
          Clothing Suggestion: ${clothingSuggestion}<br>
          ${extraRecommendation ? `<em>${extraRecommendation}</em><br>` : ""}
          <em>${details}</em>
        `;
        forecastDiv.appendChild(div);
      });
    }

  } catch (err) {
    console.error(err);
    forecastDiv.innerHTML = "Error fetching forecast.";
  }
}

// Clothing suggestion based on temperature
function getClothingSuggestion(temp) {
  if (temp > 65) {
    return "T-shirt, leggings, and shorts";
  } else if (temp >= 40 && temp <= 65) {
    return "Sweatshirt, jacket, and pants/jeans";
  } else {
    return "Heavy jacket, gloves, and boots";
  }
}

// Additional recommendations (Water Bottle, Umbrella)
function getExtraRecommendation(precip, temp) {
  let recommendation = "";

  if (temp > 65) {
    recommendation += "Take a water bottle!";
  }

  if (precip > 30) {
    if (recommendation) {
      recommendation += " Also, take an umbrella!";
    } else {
      recommendation = "Take an umbrella!";
    }
  }

  return recommendation;
}
