// Main JavaScript for to handle the logic

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
    if (history.lenght > 0) {
        // Display the wather for the last searced city
        handleCitySearch(history[0]);
    }
}

// Function to handle city search: validate input, fetch coordinates, then weather data, and update UI
function handleCitySearch(cityName) {
    // Get the geographical coordinates from the OpenWeatherMap Geocoding API
    getCoordinates(cityName)
        .then(coords => {
            // Use getWeather to get current weather data using coordinates
            getWeather(coords.lat, coords.lon)
                .then(currentWeather => {
                    // Update the display with the current weather
                    updateCurrentWeatherDisplay(currentWeather);
                })
                .catch(error => console.error(error));

            // Use getForecast to get 5-day weather forecast data using coordinates
            getForecast(coords.lat, coords.lon)
                .then(forecast => {
                    updateForecastDisplay(forecast);
                })
                .catch(error => console.error(error));
        })
        .catch(error)
        .then(coords => getForecast(coords.lat, coords.lon))
        .then(forecast => {
            // Update the display with current weather and forecast
            updateCurrentWeatherDisplay(forecast.list[0]); // ASSUMING THE FIRST ENTRY IS THE CURRENT WEATHER
            updateForecastDisplay(/* pass in relevant data */);
            // Update search history display 
            updateSearchHistoryDisplay(cityName);
            // Save the new search to local storage
            saveSearchHistory(cityName);
        })
        .catch(error => console.error(error));
}

// Function to udpate the display for current weather
function updateCurrentWeatherDisplay(weatherData) {
    // clear existing data
    currentWeatherContainer.innerHTML = '';

    // Create elements and append them to currentWeatherContainer
    
    // Display city name, date, icon representation of weather conditions, temperature, humidity, & wind speed

    // should i have current forecast involved in this function?
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
        event.preventDefault(); // Prevent page refresh
        const cityName = searchInput.value.trim();
        if (cityName) {
            handleCitySearch(cityName);
            searchInput.value = ''; // Clear the input
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
