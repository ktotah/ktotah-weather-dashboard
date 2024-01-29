// Handles local storage interactions

// Function to save search history to local storage
function saveSearchHistory(cityName) {
   let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
   if (!history.includes(cityName)){
        history.unshift(cityName); // Add to the beginning og the history array
        if (history.length > 8) {
            history.pop(); // Remove the oldest search if there are more than 8 items
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
   }
}

// Function to get search history from local storage
function loadSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Function to clear search history from local storage
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
}