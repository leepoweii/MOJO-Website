// Function to open the selected tab and hide others
function openTab(event, contentId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((section) => {
    section.style.display = "none";
  });

  // Remove 'active' class from all tab links
  document.querySelectorAll(".tab-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Show the selected tab content
  document.getElementById(contentId).style.display = "block";
  event.currentTarget.classList.add("active");
}

// Populate the cocktail data into their respective sections
function populateCocktailData(cocktails) {
  cocktails.forEach((cocktail) => {
    const section = document.getElementById(`${cocktail.id}-content`);
    if (section) {
      section.innerHTML = `
              <h2>${cocktail.name}</h2>
              <p>${cocktail.flavorType}</p>
              <p><strong>Main Flavor:</strong> ${cocktail.ingredients}</p>
              <p><strong>ABV:</strong> ${cocktail.alcoholContent}</p>
              <p><strong>Story Behind:</strong> ${cocktail.storyBehind}</p>
          `;
    }
  });
}
// No picture first <img src="${cocktail.image}" alt="${cocktail.name}" class="cocktail-img">

// Fetch JSON data from the specified file
function loadCocktailData(languageCode = "en") {
  const jsonFilePath = `data/${languageCode}/cocktailData_${languageCode}.json`;

  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      populateCocktailData(data.cocktails);
      openTab(event, "intro-content"); // Open the introduction tab by default
    })
    .catch((error) => {
      console.error("Error fetching the cocktail data:", error);
      document.getElementById("error-message").textContent =
        "Failed to load cocktail data.";
      document.getElementById("error-message").style.display = "block";
    });
}

// Initialize the page content
document.addEventListener("DOMContentLoaded", () => {
  loadCocktailData(); // Load default language (English) on page load

  // Add event listeners for language switcher buttons
  document
    .getElementById("lang-zh-tw")
    .addEventListener("click", () => loadCocktailData("zh_TW"));
  document
    .getElementById("lang-zh-cn")
    .addEventListener("click", () => loadCocktailData("zh_CN"));
  document
    .getElementById("lang-en")
    .addEventListener("click", () => loadCocktailData("en"));
});
