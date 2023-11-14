window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  var scrollY = window.scrollY;
  var navLinks = document.querySelectorAll(".navbar .nav-item a");
  var profileButtons = document.querySelectorAll(".dropbtn");
  var dropdownContent = document.querySelectorAll(".dropdown-content");

  if (scrollY > 100) {
    navbar.style.backgroundColor = "#263a29";
    navbar.style.transition = "background-color 0.3s";
    navLinks.forEach(function (link) {
      link.style.color = "#f2e3db";
      link.style.transition = "color 0.3s";
    });

    profileButtons.forEach(function (button) {
      button.style.color = "#f2e3db";
    });

    dropdownContent.forEach(function (content) {
      content.style.backgroundColor = "#263a29"; // Set the same background color for both dropdown contents
    });
  } else {
    navbar.style.backgroundColor = "transparent";
    navLinks.forEach(function (link) {
      link.style.color = "#263a29";
    });

    profileButtons.forEach(function (button) {
      button.style.color = "#263a29";
    });

    dropdownContent.forEach(function (content) {
      content.style.backgroundColor = "#f1f1f1";
    });
  }
});

    function navigateToLoginPage() {
        const searchInput = document.getElementById("search-input").value;
        
        // You can replace this URL with the one you want to navigate to
        const searchURL = `search-results.html?query=${searchInput}`;
        
        // Check if the search input is not empty
        if (searchInput.trim() !== "") {
            // Redirect to the search results page
            window.location.href = "search-page.html";
        }
    }

    function validateInput() {
        const searchInput = document.getElementById("search-input").value;
        const searchButton = document.getElementById("search-button");

        // Enable the search button only if the input is not empty
        searchButton.disabled = searchInput.trim() === "";
    }