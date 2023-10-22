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

  function markHelpful(button) {
    console.log("Mark Helpful button clicked.");
    const helpfulCount = button.parentElement.parentElement.querySelector(".helpful-count");
    if (helpfulCount) {
        let count = parseInt(helpfulCount.textContent.split(":")[1].trim());
        count++;
        helpfulCount.textContent = `Helpful: ${count}`;
        disableButton(button);

        const unhelpfulButton = button.parentElement.parentElement.querySelector(".unhelpful");
        disableButton(unhelpfulButton);
    }
  }

  function markUnhelpful(button) {
    console.log("Mark Unhelpful button clicked.");
    const unhelpfulCount = button.parentElement.parentElement.querySelector(".unhelpful-count");
    if (unhelpfulCount) {
        let count = parseInt(unhelpfulCount.textContent.split(":")[1].trim());
        count++;
        unhelpfulCount.textContent = `Unhelpful: ${count}`;
        disableButton(button);

        const helpfulButton = button.parentElement.parentElement.querySelector(".helpful");
        disableButton(helpfulButton);
    }
  }

  // Call the updateCountsBasedOnExistingReviews function to update the counts
  document.addEventListener("DOMContentLoaded", function () {
    updateCountsBasedOnExistingReviews();
  });

  // Define the updateCountsBasedOnExistingReviews function (remove any duplicate definitions)
  function updateCountsBasedOnExistingReviews() {
    const recommendationElements = document.querySelectorAll(".recommendation");

    let recommendedCount = 0;
    let notRecommendedCount = 0;

    recommendationElements.forEach(function (element) {
        const recommendationText = element.textContent;
        if (recommendationText.includes("Recommended")) {
            recommendedCount++;
        } else if (recommendationText.includes("Not Recommended")) {
            notRecommendedCount++;
        }
    });

    document.getElementById("recommended-count").textContent = recommendedCount;
    document.getElementById("not-recommended-count").textContent = notRecommendedCount;
  }

  // JavaScript to create a new review post
  document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("review-form");
    const username = "@jennierubyjane";

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form input values
        const reviewTitle = document.getElementById("review-title").value;
        const reviewBody = document.getElementById("review-body").value;
        const recommendation = document.getElementById("recommendationSelect").value;
        const fileUpload = document.getElementById("file-upload").value;

        // Create a new review post HTML structure
        const newReviewPost = document.createElement("div");
        newReviewPost.className = "col-md-4";
        newReviewPost.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="user-info">
                        <img src="user-icon.jpg">
                        <span class="username">${username}</span>
                    </div>
                    <div>
                        <h5>${reviewTitle}</h5>
                        <p>${reviewBody}</p>
                        <div class = "review-pic">
                          <img src = "${fileUpload}">
                        </div>
                        <p><span id="recommendation">thoughts: ${recommendation}</span></p>
                        <div class="review-buttons">
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </div>
                        <div class="count">
                            <p>Helpful: 0</p>
                            <p>Unhelpful: 0</p>
                        </div>
                        <div class="comment-box">
                            <textarea id="text-input" placeholder="comment..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the new review post to the container (assuming you have a container element)
        const container = document.getElementById("reviews");
        container.appendChild(newReviewPost);

        // Reset the form
        reviewForm.reset();
    });
  });




function disableButton(button) {
        button.disabled = true;
    }


function deleteReview(button) {
  console.log("Delete Review button clicked.")
  const card = button.closest(".card");
  if (card) {
    card.remove(); // Remove the card element
  }
}