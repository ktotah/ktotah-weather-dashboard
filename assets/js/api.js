// Deals with all API interactions

// Pseudocode:
// Function to get coordinates for a city name
function getCoordinates(cityName) {
    // API call
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`;

    // Make a network request to the constructed URL
    return fetch(geocodeUrl)
        .then(response => response.json()) // Parse the JSON from the response when it's available
        .then(data => { // Handle the parsed data, which is now a JavaScript object
            console.log("Coordinates data:", data); // Log data
            if (data.length > 0) { // Check if the array has at least one item (i.e., a city was found)
                const { lat, lon } = data[0]; // Destructire the latitude and longitude from the first item in the array
                return { lat, lon}; // Return an object containing the latitude and longitude
            } else {
                throw new Error('City not found'); // If the array is empty, no city was found, so throw an error
            }
        })
        .catch(error => console.error("Error fetching coordinates:", error));  
}

// Function to get current weather by coordinates
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    return fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherData = data;
            const cityNameFromAPI = data.name
            
            updateCurrentWeatherDisplay(weatherData);
            console.log(`Weather data fetched for city: ${cityNameFromAPI}`);

            return weatherData;
        });
}

// Function to get 5-day forecast by coordinates
function getForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    return fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => data);
}
// Utility function to handle API responses and errors