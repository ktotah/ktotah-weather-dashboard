// Deals with all API interactions

// Pseudocode:
// Function to get coordinates for a city name
function getCoordinates(cityName) {
    // Construct the URL for geocoding API, inserting the city name and API key into the query parameters
    // "limit=1" paramemter tells the API to only provide one result (the best match for the city name provided)
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`;

    // Make a network request to the constructed URL
    return fetch(geocodeUrl)
        .then(response = response.json()) // Parse the JSON from the response when it's available
        .then(data => { // Handle the parsed data, which is now a JavaScript object
            if (data.length > 0) { // Check if the array has at least one item (i.e., a city was found)
                const { lat, lon } = data[0]; // Destructire the latitude and longitude from the first item in the array
                return { lat, lon}; // Return an object containing the latitude and longitude
            } else {
                throw new Error('City not found'); // If the array is empty, no city was found, so throw an error
            }
        });
}

// Function to get current weather by coordinates
function getWeather(lat, lon, apiKey) {
    // Construct the URL for the 5-day weather forecast API, inserting the latitude, longitude, and API key into the query parameters
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    return fetch(weatherUrl)
        .then(response => response.json()) 
        .then(data => {
            if (response.ok) {
                return data;
            } else {
                throw new Error(`Error: ${response.statusText}`)
            }
        });
}

// Function to get 5-day forecast by coordinates
function getForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    return fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (response.ok) {
                return data;
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        });
}
// Utility function to handle API responses and errors