function editReview(reviewId) {
    // Get the review's information from the database
    var review = getReviewFromDatabase(reviewId);
   
    // Make the review's information editable
    var reviewTitle = document.getElementById('review-title');
    var reviewBody = document.getElementById('review-body');
    var recommendationSelect = document.getElementById('recommendationSelect');
   
    reviewTitle.value = review.title;
    reviewBody.value = review.comment;
    recommendationSelect.value = review.recommendation;
   
    // Update the review when the changes are saved
    var saveButton = document.getElementById('submit');
    saveButton.onclick = function() {
       review.title = reviewTitle.value;
       review.comment = reviewBody.value;
       review.recommendation = recommendationSelect.value;
   
       saveReviewChanges(review);
    };
   }
   