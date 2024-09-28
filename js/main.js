// Object to map category names to their JSON files
const dataFiles = {
  kinmenJourney: "data/kinmenJourney.json",
  kaoliangCocktails: "data/kaoliangCocktails.json",
  mojoMemory: "data/mojoMemory.json",
  nonAlcoholic: "data/nonAlcoholic.json",
};

// Load the selected category and populate content
function loadCategory(category) {
  fetch(dataFiles[category])
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      clearItemDetails(); // Clear the item details section on category change

      // Get the key to access the data in the JSON file (e.g., 'kaoliang', 'memory')
      const categoryKey = Object.keys(data)[0];

      // Handle introductory content and items for each category
      if (data[categoryKey].intro) {
        populateIntro(data[categoryKey].intro);
      }
      if (data[categoryKey].items) {
        populateSideNav(data[categoryKey].items);
      }
    })
    .catch((error) => console.error("Error loading category:", error));
}

// Populate the introductory section
function populateIntro(intro) {
  const itemDetails = document.getElementById("item-details");
  itemDetails.innerHTML = `
    <h2>${intro.title}</h2>
    <p>${intro.content}</p>
  `;
}

// Populate the side navigation with items
function populateSideNav(items) {
  const sideNav = document.getElementById("side-nav");
  sideNav.innerHTML = ""; // Clear previous buttons

  items.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.ID;
    button.onclick = () => displayItemDetails(item);
    sideNav.appendChild(button);
  });
}

// Display the selected item's details
function displayItemDetails(item) {
  const itemDetails = document.getElementById("item-details");
  itemDetails.innerHTML = `
    <h3>${item.name}</h3>
    <img src="${item.image}" alt="${item.name}">
    <p><strong>Ingredients:</strong> ${item.ingredients}</p>
    ${item.storyBehind ? `<div>${item.storyBehind}</div>` : ""}
  `;
}

// Clear the item details section
function clearItemDetails() {
  const itemDetails = document.getElementById("item-details");
  itemDetails.innerHTML = "";
}

// Initialize with the first category on page load
window.onload = () => loadCategory("kinmenJourney");
