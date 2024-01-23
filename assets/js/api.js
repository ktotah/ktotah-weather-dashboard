// Deals with all API interactions

// Pseudocode:
// Function to get coordinates for a city name
function getCoordinates(cityName, apiKey) {
    const geocodeUrl = ``;

    return fetch(geocodeUrl)
        .then(response = response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon};
            } else {
                throw new Error('City not found');
            }
        });
}

// Function to get current weather by coordinates
function getWeather(lat, lon, apiKey) {
    const forecastUrl = ``;

    return fetch(forecastUrl)
        .then(response => response.json())
        .then(data => data);
}
// Function to get 5-day forecast by coordinates
// Utility function to handle API responses and errors