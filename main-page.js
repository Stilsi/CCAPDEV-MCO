window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    var scrollY = window.scrollY;
    var navLinks = document.querySelectorAll(".navbar .nav-item a");
    var profileButtons = document.querySelectorAll(".dropbtn"); // Select all "dropbtn" elements
  
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
    } else {
      navbar.style.backgroundColor = "transparent";
      navLinks.forEach(function (link) {
        link.style.color = "#263a29";
      });
  
      profileButtons.forEach(function (button) {
        button.style.color = "#263a29";
      });
    }
  });
  