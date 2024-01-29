// Handles local storage interactions

// Function to save search history to local storage
function saveSearchHistory(cityName) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Remove the city if it's already in the history
    const existingIndex = history.indexOf(cityName);
    if (existingIndex !== -1) { 
        history.splice(existingIndex, 1);
    }
    
    // Add the city to the beginning of the history array
    history.unshift(cityName);

    // Ensure the history doesn't exceed 7 items
    if (history.length > 7) {
        history.pop(); // Remove the oldest search if there are more than 7 items
    }

    // Save the updated history to local storage
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Function to get search history from local storage
function loadSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Function to clear search history from local storage
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
}