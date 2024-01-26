// Handles local storage interactions

// Function to save search history to local storage
function saveSearchHistory(cityName) {
   let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
   if (!history.includes(cityName)){
        history.unshift(cityName); // Add to the beginning og the history array
        localStorage.setItem('searchHistory', JSON.stringify(history));
   }
}

// Function to get search history from local storage
function loadSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}