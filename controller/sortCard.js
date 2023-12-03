import fetch from 'node-fetch';

async function sortCards(type) {
  // Fetch the sorted data from the server
  const response = await fetch(`/sort?type=${type}`);
  const sortedData = await response.json();

  // Get the container where the cards will be appended
  const container = document.querySelector(".container");

  // Create a document fragment to hold the new cards
  const fragment = document.createDocumentFragment();

  // Create a new card for each item in the sorted data
  sortedData.forEach(item => {
    // Create the card element
    const card = document.createElement("div");
    card.className = "card";

    // Add the item's data to the card
    const logo = document.createElement("img");
    logo.className = "card-logo";
    logo.src = item.logo;
    logo.alt = `${item.name} Logo`;
    card.appendChild(logo);

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = item.name;
    card.appendChild(title);

    // Add the card to the document fragment
    fragment.appendChild(card);
  });

  // Remove all existing cards from the container
  while (container.firstChild) {
    container.firstChild.remove();
  }

  // Append the new cards to the container
  container.appendChild(fragment);
}

// Export the function so it can be imported and used in other files
export { sortCards };
