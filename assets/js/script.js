// Main JavaScript for to handle the logic

// Define constants for UI elements/DOM elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const historyList = document.getElementById('history-list');

// Function to save to local storage
function saveSearchHistory(cityName) {
    // Get current history from local storage or initialize an empty array if none
    // Add the new city name to the history
    // Save the updated history back to local storage
}

// Function to load from local storage
function loadSearchHistory() {
    // Load and return the search history from local storage
}

// Function to initialize the dashboard
function initializeDashboard() {
    // Load any previous search from local storage using loadSearchHistory()
    // Set up any initial display elements
    // If there's any search history, display the last searched city's weather
}

// Function to handle city search
function handleCitySearch(cityName) {
    // Validate the city name
    // Use getCoordinates from api.js to get coordinates for the city
    // Use getWeather from api.js to get weather data using coordinates
    // Update the display with current weather and forecast updateCurrentWeatherDisplay()
    // Update search history using updateSearchHistoryDisplay()
    // Save the new search to local storage using saveSearchHistory()
}

// Function to udpate the display for current weather
function updateCurrentWeatherDisplay(weatherData) {
    // Display city name, date, icon representation of weather conditions, temperature, humidity, & wind speed

    // should i have current forecast involved in this function?
}

// Function to update the display for 5-day forecast (future weather conditions)
function updateForecastDisplay(forecastData) {
    // Loop through forecast data and display each day's  date, icon representation of weather conditions, temperature, & wind speed
}

// Function to update the search history display
function updateSearchHistoryDisplay(historyData) {
    // Display search hisotry list
}

// Event listeners for search button and hsitory item clicks
function setupEventListeners() {
    searchBtn.addEventListener('click', () => {
        const cityName = searchInput.value;
        handleCitySearch(cityName);
    });

    historyList.addEventListener('click', (event) => {
        // Delegate the event to the list item
        if(event.target.tagName === 'LI') {
            handleSearchHistoryClick(event.target.textContent);
        }
    });
}

// When the document is fully loaded, set up the event listeners and intialize the dashbaord
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializeDashboard();
});
