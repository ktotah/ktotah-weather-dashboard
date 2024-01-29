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
    // Validate the city name if necessary
    if (!cityName) {
        console.error('No city name provided');
        return;
    }

    // Get the geographical coordinates from the OpenWeatherMap Geocoding API
    getCoordinates(cityName)
        .then(coords => {
            console.log("Coordinates received:", coords); // Log the coordinates
            return getWeather(coords.lat, coords.lon);
        })
        .catch(error => console.error("Error fetching coodinates for city:", cityName, error))
        .then(currentWeather => {
            console.log("Current weather data:", currentWeather); // Log current weather
            // Update the UI with the current weather
            updateCurrentWeatherDisplay(currentWeather);
            // Save the API's city name to the search history local storage
            saveSearchHistory(currentWeather.name); // <-- Use the name from the API
            // Now, get the 5-day weather forecast data using the same coordinates
            return getForecast(currentWeather.coord.lat, currentWeather.coord.lon);
        })
        .catch(error => console.error("Error fetching current weather:", error))
        .then(forecast => {
            console.log("Full forecast data:", forecast)
            // Update the UI with the forecast data
            updateForecastDisplay(forecast); // Log full forecast
            // Update the search history display
            updateSearchHistoryDisplay(loadSearchHistory());
        })
        .catch(error => console.error("Error fetching forcast data:", error));
}

// Function to udpate the display for current weather
function updateCurrentWeatherDisplay(weatherData) {
    // Clear existing data
    currentWeatherContainer.innerHTML = '';

    // Create a div element to contain the city name, date, and weather icon
    const cityDateIconContainer = document.createElement('div');
    cityDateIconContainer.className = 'city-date-icon'; // Assigning a class for styling

    // Create an append an element to display the city name and current date
    const cityNameAndDateEl = document.createElement('h2');
    // Combining city name from weatherData and current date into a single string
    cityNameAndDateEl.textContent = `${weatherData.name} (${new Date().toLocaleDateString()})`;
    cityDateIconContainer.appendChild(cityNameAndDateEl);

    // Create and append an image element for the weather icon
    const weatherIconEl = document.createElement('img');
    // Setting the source of the image using the icon code from weatherData
    weatherIconEl.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    weatherIconEl.alt = weatherData.weather[0].description; // Setting alternative text for accessibility
    cityDateIconContainer.appendChild(weatherIconEl);

    // Append the cityDateIconContainer to the currentWeatherContainer
    currentWeatherContainer.appendChild(cityDateIconContainer);

    // Displaying temperature in a new paragraph
    const tempEl = document.createElement('p');
    // Rounding the temperature to two decimal places
    tempEl.textContent =   `Temp: ${weatherData.main.temp.toFixed(2)}°F`;
    currentWeatherContainer.appendChild(tempEl);

    // Displaying wind speed in a new paragraph
    const windEl = document.createElement('p');
    // Rounding the wind speed to two decimal places
    windEl.textContent = `Wind: ${weatherData.wind.speed.toFixed(2)} MPH`;
    currentWeatherContainer.appendChild(windEl);

    //Displaying humidity in a new paragraph
    const humidityEl = document.createElement('p');
    // Rounding the humidity to a whole number (percentage)
    humidityEl.textContent = `Humidity: ${weatherData.main.humidity.toFixed(0)}%`;
    currentWeatherContainer.appendChild(humidityEl);
}

// Function to update the display for the 5-day forecast
function updateForecastDisplay(forecastData) {
     // Filter our every 8th forecast from the list to get approximately one forecast per day, since the 5 day forecast data set includes weather forecast data with a 3-hour step
     const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);
     console.log("Filtered daily forecasts:", dailyForecasts); // Log filtered forecasts
 
    // Accessing the container element in the DOM where the forecast cards will be displayed
    const forecastContainer = document.getElementById('forecast-cards-container');

    // Clear existing content
    forecastContainer.innerHTML = ''; 

    // Checking if forecast data is available
    if (!forecastData.list || forecastData.list.length === 0) {
        console.error('No forecast data available');
        return; // Exiting the function if no data is present
    }

    // Iterating over each day's data in the forecast
    dailyForecasts.forEach(dayForecast => {
        // Creating a new div element for each day's forecast, to be used as a card
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card' // Assign a class for styling purposes

        // Creating and appending an element to display the forecast date
        const date = new Date(dayForecast.dt * 1000).toLocaleDateString(); // Converting UNIX timestamp (in seconds) to a Date object and formatting it
        const forecastDateEl = document.createElement('h4');
        
        forecastDateEl.textContent = date;
        forecastCard.appendChild(forecastDateEl);

        // Creating and appending an image element for the weather icon
        const iconUrl = `http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}.png`;
        const forecastIconEl = document.createElement('img');
        forecastIconEl.src = iconUrl;
        forecastIconEl.alt = dayForecast.weather[0].description; // Setting alternative text for accessibility
        forecastCard.appendChild(forecastIconEl);

        // Creating and appending an element to display the temperature
        const forecastTempEl = document.createElement('p');
        // Rounding the temperature to two decimal places 
        forecastTempEl.textContent = `Temp: ${dayForecast.main.temp.toFixed(2)}°F`;
        forecastCard.appendChild(forecastTempEl)

        // Creating and appending an element to display the wind speed
        const forecastWindEl = document.createElement('p');
        // Rouding the wind speed to two decimal places
        forecastWindEl.textContent = `Wind: ${dayForecast.wind.speed.toFixed(2)} mph`;
        forecastCard.appendChild(forecastWindEl);

        // Creating and appending an element to display the humidity
        const forecastHumidityEl = document.createElement('p');
        // Displaying humidity as a whole number (percentage)
        forecastHumidityEl.textContent = `Humidity: ${dayForecast.main.humidity.toFixed(0)}%`;
        forecastCard.appendChild(forecastHumidityEl);

        // Appending the complete forecastCard to the forecastContainer
        forecastContainer.appendChild(forecastCard);
    });
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

// Event listeners for search button and history item clicks
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
            handleCitySearch(event.target.textContent);
        }
    });

    const clearSearchHistoryBtn = document.getElementById('clear-search-history-btn');

    clearSearchHistoryBtn.addEventListener('click', () => {
        clearSearchHistory();
        updateSearchHistoryDisplay([]);
    });
}

// When the document is fully loaded, set up the event listeners and intialize the dashbaord
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    // Check if there's any history, if not, load default city weather
    const history = loadSearchHistory();
    if (history.length > 0) {
        initializeDashboard();
    } else {
        handleCitySearch('New York'); // Setting New York as the default search city when the page loads so that it doesn't just have an empty display for the current weather and 5-day forecast
    }
});
