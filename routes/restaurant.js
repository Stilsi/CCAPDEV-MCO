  import Review from "../model/reviewschema";
  
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


