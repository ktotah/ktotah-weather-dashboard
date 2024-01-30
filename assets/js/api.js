// Handles interactions with the OpenWeatherMap API

// Function to get coordinates for a city name
function getCoordinates(cityName) {
    // API call
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`;

    // Make a network request to the constructed URL
    return fetch(geocodeUrl)
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon}; // Return the coordinates
            } else {
                // If not data is received, throw an error indicating the city was not found
                throw new Error('City not found');
            }
        })
        // Log any errors during the fetch process
        .catch(error => console.error("Error fetching coordinates:", error));  
}

// Function to get current weather data by coordinates
function getWeather(lat, lon) {
    // API call
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    // Fetch the weather data from the API
    return fetch(weatherUrl)
        .then(response => {
            // Check if the response is successful, otherwise throw an error
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Convert the successful response to JSON
            return response.json();
        })
}

// Function to get 5-day forecast by coordinates
function getForecast(lat, lon) {
    // API call
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`

    // Fetch the forecast data from the API
    return fetch(forecastUrl)
        .then(response => {
            // If the response is not successful, throw an error
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            // Convert the successful response to JSON
            return response.json();
        })
}
