document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const searchBox = document.getElementById("search-box").value;
      window.location.href = `search-page.html?query=${searchBox}`;
    });
  });

