document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("search-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const searchBox = document.getElementById("search-box");
      const searchQuery = searchBox.value;
 
      // Validate the search query
      if (!searchQuery || typeof searchQuery !== 'string') {
          alert('Please enter a valid search query');
          return;
      }
 
      // Redirect to the search results page with the search query as a query parameter
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  });
 });
 