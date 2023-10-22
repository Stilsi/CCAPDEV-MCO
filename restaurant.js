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

function editReview(button) {
  console.log("Edit Review button clicked.");

  const card = button.closest(".card");

  const reviewTitle = card.querySelector("h5");
  const reviewBody = card.querySelector("p");
  const recommendation = card.querySelector("#recommendation");

  const editTitleInput = document.createElement("input");
  editTitleInput.setAttribute("type", "text");
  editTitleInput.value = reviewTitle.textContent;

  const editBodyInput = document.createElement("textarea");
  editBodyInput.value = reviewBody.textContent;

  const editRecommendationSelect = document.createElement("select");
  editRecommendationSelect.innerHTML = `
    <option value="recommended">Recommended</option>
    <option value="not-recommended">Not Recommended</option>
  `;
  editRecommendationSelect.value = recommendation.textContent.includes("Recommended") ? "recommended" : "not-recommended";

  reviewTitle.replaceWith(editTitleInput);
  reviewBody.replaceWith(editBodyInput);
  recommendation.replaceWith(editRecommendationSelect);

  const editButton = card.querySelector(".edit");
  const deleteButton = card.querySelector(".delete");
  editButton.style.display = "none";
  deleteButton.style.display = "none";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "save";
  saveButton.onclick = function () {

    editTitleInput.replaceWith(reviewTitle);
    editBodyInput.replaceWith(reviewBody);
    editRecommendationSelect.replaceWith(recommendation);

    reviewTitle.textContent = editTitleInput.value;
    reviewBody.textContent = editBodyInput.value;
    recommendation.textContent = `thoughts: ${editRecommendationSelect.value}`;

    editButton.style.display = "inline-block";
    deleteButton.style.display = "inline-block";
    saveButton.remove();
  };

  card.querySelector(".review-buttons").appendChild(saveButton);
}

// JavaScript to create and manage comments
document.addEventListener("DOMContentLoaded", function () {
  // Find all the comment boxes
  const commentBoxes = document.querySelectorAll(".comment-box");

  // Add event listeners to each comment box
  commentBoxes.forEach(function (commentBox) {
      const addCommentButton = commentBox.querySelector(".add-comment");
      const textArea = commentBox.querySelector(".text-input");
      const commentsContainer = commentBox.querySelector(".comments");

      addCommentButton.addEventListener("click", function () {
          addComment(textArea, commentsContainer);
      });

      textArea.addEventListener("keypress", function (e) {
          if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addComment(textArea, commentsContainer);
          }
      });
  });
});

function addComment(textArea, commentsContainer) {
  const commentText = textArea.value;
  if (commentText.trim() !== "") {
      const comment = document.createElement("div");
      comment.className = "comment";

      const userImageContainer = document.createElement("div");
      userImageContainer.className = "user-info";

      const userImage = document.createElement("img");
      userImage.src = "user-icon.jpg";

      const username = document.createElement("span");
      username.className = "username";
      username.textContent = "@jennierubyjane"; // Replace with the actual username

      const commentTextElement = document.createElement("p");
      commentTextElement.textContent = commentText;

      userImageContainer.appendChild(userImage);
      userImageContainer.appendChild(username);

      comment.appendChild(userImageContainer);
      comment.appendChild(commentTextElement);

      // Append the comment to the comments container
      commentsContainer.appendChild(comment);

      // Clear the comment box
      textArea.value = "";
  }
}


