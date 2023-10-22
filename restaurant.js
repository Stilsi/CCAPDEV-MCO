import 'bootstrap/dist/js/bootstrap.min.js';

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
  

  
  function updateRecommendationCount(recommendation) {
  const recommendedCount = document.getElementById("recommended-count");
  const notRecommendedCount = document.getElementById("not-recommended-count");

  if (recommendation === "recommended") {
      recommendedCount.textContent = parseInt(recommendedCount.textContent) + 1;
  } else if (recommendation === "not-recommended") {
      notRecommendedCount.textContent = parseInt(notRecommendedCount.textContent) + 1;
  }
  
  
}

  
  document.getElementById("review-form").addEventListener("submit", function (event) {
          event.preventDefault();

          // Get the values from the form
          const title = document.getElementById("review-title").value;
          const body = document.getElementById("review-body").value;
           const recommendation = document.getElementById("recommendation").value;
           
          

             const fileInput = document.getElementById("file-upload");
  const uploadedFile = fileInput.files[0];
  let imageUrl = '';

  if (uploadedFile) {
      // Assuming you have a server to handle file uploads, you can send the file to the server here
      // and get the URL of the uploaded file in response.
      // For simplicity, we're assuming that the file URL is obtained directly.

      // In this example, we're just using a placeholder image URL.
      imageUrl = 'placeholder_image.jpg';
  }

          // Create a new review card
          const newReviewCard = document.createElement("div");
          newReviewCard.className = "col-md-4";
          newReviewCard.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      
                      <p class="card-text">${body}</p>
                       
                      <p class="recommendation">Recommendation: ${recommendation}</p>
                       ${imageUrl ? `<img src="${imageUrl}" alt="Uploaded Image">` : ''}
                      <button class="edit" onclick="editReview(this)">Edit</button><br></br>
                      <button class="delete" onclick="deleteReview(this)">Delete</button><br></br>
                      <button class="helpful" onclick="markHelpful(this)">Mark Helpful</button><br></br>
                      <button class="unhelpful" onclick="markUnhelpful(this)">Mark Unhelpful</button><br></br>
                      <p class="helpful-count">Helpful: 0</p><br></br>
                      <p class="unhelpful-count">Unhelpful: 0</p><br></br>
                  </div>
              </div>
          `;

          // Add the new review card to the reviews section
          const reviewsSection = document.querySelector(".container[alt='reviews'] .row");
          reviewsSection.appendChild(newReviewCard);

          // Clear the form
          document.getElementById("review-title").value = "";
          document.getElementById("review-body").value = "";
          
          updateRecommendationCount(recommendation);
      });
      
      
      

function disableButton(button) {
          button.disabled = true;
      }


      function deleteReview(button) {
          // Change the button text to "Review deleted"
                    if (!button.disabled) {
          const cardText = button.parentElement.querySelector(".card-text");
          cardText.textContent = "Review deleted";
          disableButton(button);
          }
      }
      
      function editReview(button) {
          // Change the button text to "Review deleted"
   if (!button.disabled) {
         const cardText = button.parentElement.querySelector(".card-text");
          cardText.textContent = "Review edited";
          const editButton = button.parentElement.querySelector(".edit");
              const helpfulButton = button.parentElement.querySelector(".helpful");
              const unhelpfulButton = button.parentElement.querySelector(".unhelpful");
          disableButton(button);
          disableButton(editButton);
          disableButton(helpfulButton);
          disableButton(unhelpfulButton);
          
      }
    }
      
       function markHelpful(button) {
           if (!button.disabled) {
              const helpfulCount = button.parentElement.querySelector(".helpful-count");
              let count = parseInt(helpfulCount.textContent.split(":")[1]);
              count++;
              helpfulCount.textContent = `Helpful: ${count}`;
              disableButton(button);
               const unhelpfulButton = button.parentElement.querySelector(".unhelpful");
              disableButton(unhelpfulButton); 
          }
      }

      function markUnhelpful(button) {
         if (!button.disabled) {
              const unhelpfulCount = button.parentElement.querySelector(".unhelpful-count");
              let count = parseInt(unhelpfulCount.textContent.split(":")[1]);
              count++;
              unhelpfulCount.textContent = `Unhelpful: ${count}`;
              disableButton(button);
               const helpfulButton = button.parentElement.querySelector(".helpful");
              disableButton(helpfulButton); 
          }
      }
      
      document.addEventListener("DOMContentLoaded", function () {
  // Initialize recommendation counts based on existing reviews
  updateCountsBasedOnExistingReviews();
});

function updateCountsBasedOnExistingReviews() {
  const recommendationElements = document.querySelectorAll(".recommendation");

  let recommendedCount = 0;
  let notRecommendedCount = 0;

  recommendationElements.forEach(function (element) {
      const recommendation = element.textContent.includes("Recommended") ? "recommended" : "not-recommended";
      if (recommendation === "recommended") {
          recommendedCount++;
      } else {
          notRecommendedCount++;
      }
  });

  document.getElementById("recommended-count").textContent = recommendedCount;
  document.getElementById("not-recommended-count").textContent = notRecommendedCount;
}		
  