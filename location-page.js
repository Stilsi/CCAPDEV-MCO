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
  

function sortCards(sortType) {
    const buttons = document.querySelectorAll('.sort');

    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    document.getElementById(`sort-${sortType}`).classList.add('active');
}
  