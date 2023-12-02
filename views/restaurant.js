
  // Call the updateCountsBasedOnExistingReviews function to update the counts
  document.addEventListener("DOMContentLoaded", function () {
    updateCountsBasedOnExistingReviews();

    const submitReplyButton = document.getElementById('btnsubmit');

    // Check if the submitReplyButton exists (if the user is on a page with the form)
    if (submitReplyButton) {
        document.getElementById('reply-form').addEventListener('submit', function (event) {
            // Check if the user is logged in (if there is a user in the session)
            if (!checkUserLoggedIn()) {
                // Prevent the form submission
                event.preventDefault();

                // Optionally, you can display a message or redirect the user to the login page
                alert('Please log in to submit a reply.');
                // Alternatively, you can redirect to the login page:
                // window.location.href = '/login';
            }
        });
    }

    function checkUserLoggedIn() {
        // You may need to adjust this condition based on how your user session is stored
        return (typeof loggedInUser !== 'undefined' && loggedInUser !== null);
    }
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

function disableButton(button) {
        button.disabled = true;
}


async function deleteReview(button) {
  const card = button.closest(".card");
  if (card) {
      const reviewId = card.id;
  
      // Delete the review from the database
      await Review.findByIdAndDelete(reviewId);
  
      // Remove the card element
      card.remove();
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
  saveButton.onclick = async function () {
      const reviewId = card.id;

      // Find the review in the database
      const review = await Review.findById(reviewId);

      // Update the review
      review.title = editTitleInput.value;
      review.comment = editBodyInput.value;
      review.recommendation = `thoughts: ${editRecommendationSelect.value}`;

      // Save the updated review
      await review.save();
 
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
 
 


