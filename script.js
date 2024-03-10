document.addEventListener('DOMContentLoaded', () => {
    // Target the search form and input
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting in the traditional way

        // Fetch the user's search query
        const query = searchInput.value.trim();

        // For demonstration, show a mock result. Replace this logic with your search functionality.
        if (query) { // Checks if the query is not empty
            searchResults.innerHTML = `<p>Searching for: ${query}</p><p>Mock result: Classroom found</p>`;
        } else {
            searchResults.innerHTML = `<p>Please enter a search term.</p>`;
        }
    });
});
