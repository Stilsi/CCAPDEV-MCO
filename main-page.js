window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  var scrollY = window.scrollY;
  var navLinks = document.querySelectorAll(".navbar .nav-item a");
  var profileButtons = document.querySelectorAll(".dropbtn");
  var profileDropdown = document.getElementById("profile-dropdown"); // Select the profile dropdown by its ID
  var profileDropdownContent = profileDropdown.querySelector(".dropdown-content"); // Select the dropdown content within the profile dropdown
  var dropdownContent = document.querySelector(".dropdown-content");
  
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

    dropdownContent.style.backgroundColor = "#263a29";
    profileDropdownContent.style.backgroundColor = "#263a29"; // Change the background color of the specific dropdown content
  } else {
    navbar.style.backgroundColor = "transparent";
    navLinks.forEach(function (link) {
      link.style.color = "#263a29";
    });

    profileButtons.forEach(function (button) {
      button.style.color = "#263a29";
    });

    dropdownContent.style.backgroundColor = "#f1f1f1";
    profileDropdownContent.style.backgroundColor = "#f1f1f1"; // Reset the background color
  }
});

function navigateToLoginPage() {
  window.location.href = 'search-page.html';
}

function validateInput() {
  var searchInput = document.getElementById("search-input");
  var searchButton = document.getElementById("search-button");

  if (searchInput.value.trim() !== "") {
    searchButton.disabled = false; // Enable the button if the input has a value
  } else {
    searchButton.disabled = true; // Disable the button if the input is empty
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("search-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const searchBox = document.getElementById("search-box").value;
    window.location.href = `search-page.html?query=${searchBox}`;
  });
});

