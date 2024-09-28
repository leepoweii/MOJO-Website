// Object to map category names to their JSON files
const dataFiles = {
  kinmenJourney: "data/kinmenJourney.json",
  mojoSignature: "data/mojoSignature.json",
  nonAlcoholic: "data/nonAlcoholic.json",
};

// Load the selected category and populate content
function loadCategory(category) {
  fetch(dataFiles[category])
    .then((response) => response.json())
    .then((data) => {
      if (category === "mojoSignature" || category === "nonAlcoholic") {
        populateCategoryWithSubsections(data);
      } else {
        populateIntro(data.kinmenJourney.intro);
        populateSideNav(data.kinmenJourney.items);
      }
      clearItemDetails(); // Clear the item details section on category change
    })
    .catch((error) => console.error("Error loading category:", error));
}

// Populate the introductory section
function populateIntro(intro) {
  const introContent = document.getElementById("intro-content");
  introContent.innerHTML = `
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

// Populate categories with subsections (e.g., MOJO Signature, Non-Alcoholic)
function populateCategoryWithSubsections(data) {
  const sideNav = document.getElementById("side-nav");
  sideNav.innerHTML = ""; // Clear previous buttons

  // Iterate through subsections in the data (e.g., "kaoliang", "memory")
  Object.keys(data).forEach((subcategory) => {
    const button = document.createElement("button");
    button.textContent = data[subcategory].intro.title;
    button.onclick = () => {
      populateIntro(data[subcategory].intro);
      populateSideNav(data[subcategory].items);
    };
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
