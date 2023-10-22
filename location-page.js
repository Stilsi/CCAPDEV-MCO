// NavBar
window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    var scrollY = window.scrollY;
    var navLinks = document.querySelectorAll(".navbar .nav-item a");
    var profileButtons = document.querySelectorAll(".dropbtn");
    var profileDropdown = document.getElementById("profile-dropdown");
    var profileDropdownContent = profileDropdown.querySelector(".dropdown-content"); 
    
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
        profileDropdownContent.style.backgroundColor = "#263a29";
    } else {
        navbar.style.backgroundColor = "transparent";
        navLinks.forEach(function (link) {
        link.style.color = "#263a29";
        });

        profileButtons.forEach(function (button) {
        button.style.color = "#263a29";
        });

        dropdownContent.style.backgroundColor = "#f1f1f1";
        profileDropdownContent.style.backgroundColor = "#f1f1f1";
    }
});

// Sorting function
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
            const likesA = parseInt(a.querySelector('.recommend').textContent);
            const dislikesA = parseInt(a.querySelector('.notrecommend').textContent);
            const totalLikesA = likesA - dislikesA;
            const likesB = parseInt(b.querySelector('.recommend').textContent);
            const dislikesB = parseInt(b.querySelector('.notrecommend').textContent);
            const totalLikesB = likesB - dislikesB;
            const ratioA = likesA / (likesA + dislikesA);
            const ratioB = likesB / (likesB + dislikesB);

            // Sort by total likes first, and break ties with the ratio of likes.
            if (totalLikesB !== totalLikesA) {
                return totalLikesB - totalLikesA;
            } else {
                return ratioB - ratioA;
            }
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
