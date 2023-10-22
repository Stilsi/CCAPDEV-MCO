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

    // Define your card elements.
    const cards = Array.from(document.querySelectorAll('.card'));

    // Sort the cards based on the selected criteria.
    if (sortType === 'alphabetically') {
        cards.sort((a, b) => {
            const titleA = a.querySelector('.card-title').textContent.toUpperCase();
            const titleB = b.querySelector('.card-title').textContent.toUpperCase();
            return titleA.localeCompare(titleB);
        });
    } else if (sortType === 'by-rating') {
        cards.sort((a, b) => {
            const ratingA = parseInt(a.querySelector('.recommend').textContent);
            const ratingB = parseInt(b.querySelector('.recommend').textContent);
            return ratingB - ratingA;
        });
    } else if (sortType === 'most-recent') {
        cards.sort((a, b) => {
            const keyA = parseInt(a.getAttribute('data-sort-key'));
            const keyB = parseInt(b.getAttribute('data-sort-key'));
            return keyB - keyA;
        });
    }

    // Clear the container and append the sorted cards.
    const container = document.querySelector('.container');
    container.innerHTML = '';
    cards.forEach((card) => container.appendChild(card));
}

// Initialize the sorting by rating as the default.
sortCards('by-rating');

  