// Main JavaScript file to handle the logic

// Define constants for UI elements/DOM elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const historyList = document.getElementById('history-list');

// Function to initialize the dashboard by loading any stored search history and displaying the last searched city's weather
function initializeDashboard() {
    // Load seach history from local storage
    const history = loadSearchHistory();
    updateSearchHistoryDisplay(history);
    // If there is any history, display the weather for the last searched city
    if (history.length > 0) {
        // Display the wather for the last searced city
        handleCitySearch(history[0]);
    }
}

// Function to handle city search: validate input, fetch coordinates, then weather data, and update UI
function handleCitySearch(cityName) {
    console.log("Searching for:", cityName); // Confirm function is called
    // Validate the city name if necessary
    if (!cityName) {
        console.error('No city name provided');
        return;
    }

    // Get the geographical coordinates from the OpenWeatherMap Geocoding API
    getCoordinates(cityName)
        .then(coords => {
            // Once coordinates are retrieved, use getWeather to get current weather data using those coordinates
            return getWeather(coords.lat, coords.lon);
        })
        .then(currentWeather => {
            // Update the UI with the current weather
            updateCurrentWeatherDisplay(currentWeather);
            // Now, get the 5-day weather forecast data using the same coordinates
            return getForecast(currentWeather.coord.lat, currentWeather.coord.lon);
        })
        .then(forecast => {
            // Update the UI with the forecast data
            updateForecastDisplay(forecast);
            // Update the search hisotry display
            updateSearchHistoryDisplay(loadSearchHistory());
            // Save the new search to local storage
            saveSearchHistory(cityName);
        })
        .catch(error => console.error(error));
}

// Function to udpate the display for current weather
function updateCurrentWeatherDisplay(weatherData) {
    // clear existing data
    currentWeatherContainer.innerHTML = '';

    // Create the container for the city name, date, and weather icon
    const cityDateIconContainer = document.createElement('div');
    cityDateIconContainer.className = 'city-date-icon';

    // Display city name and current date
    const cityNameAndDateEl = document.createElement('h2');
    cityNameAndDateEl.textContent = `${weatherData.name} (${new Date().toLocaleDateString()})`;
    cityDateIconContainer.appendChild(cityNameAndDateEl);

    // Display weather icon
    const weatherIconEl = document.createElement('img');
    weatherIconEl.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    weatherIconEl.alt = weatherData.weather[0].description;
    cityDateIconContainer.appendChild(weatherIconEl);

    // Append the cityDateIconContainer to the currentWeatherContainer
    currentWeatherContainer.appendChild(cityDateIconContainer);

    // Subsequent details (temp, wind, humidity) on new lines
    // Display temperature
    const tempEl = document.createElement('p');
    tempEl.textContent =   `Temp: ${weatherData.main.temp}°F`;
    currentWeatherContainer.appendChild(tempEl);

    // Display wind speed
    const windEl = document.createElement('p');
    windEl.textContent = `Wind: ${weatherData.wind.speed} MPH`;
    currentWeatherContainer.appendChild(windEl);

    //Display humidity
    const humidityEl = document.createElement('p');
    humidityEl.textContent = `Humidity: ${weatherData.main.humidity}%`;
    currentWeatherContainer.appendChild(humidityEl);
}

// Function to update the display for 5-day forecast (future weather conditions)
function updateForecastDisplay(forecastData) {
    // Loop through forecast data and display each day's  date, icon representation of weather conditions, temperature, & wind speed
}

// Function to update the search history display
function updateSearchHistoryDisplay(historyData) {
    // Clear out the current history list
    historyList.innerHTML = '';

    // Loop through the history data and create a button for each entry
    historyData.forEach(city => {
        const historyBtn = document.createElement('button');
        historyBtn.textContent = city;
        historyBtn.classList.add('history-btn'); // Add a class for styling
        historyBtn.addEventListener('click', () => handleCitySearch(city));
        historyList.appendChild(historyBtn)
    })
}

// Event listeners for search button and hsitory item clicks
function setupEventListeners() {
    searchBtn.addEventListener('click', (event) => {
        console.log("Search button clicked"); // Check if this logs
        event.preventDefault(); // Prevent page refresh
        const cityName = searchInput.value.trim();
        console.log("City to search:", cityName); // Verify the city name
        if (cityName) {
            handleCitySearch(cityName);
        }
    });
 
    historyList.addEventListener('click', (event) => {
        // Delegate the event to the clicked button
        if(event.target.tagName === 'BUTTON') {
            handleSearchHistoryClick(event.target.textContent);
        }
    });
}

// When the document is fully loaded, set up the event listeners and intialize the dashbaord
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializeDashboard();
});
