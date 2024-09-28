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
function populateCocktailData(
  cocktails,
  introLabel,
  introHeading,
  introDescription
) {
  // Update the introduction tab label
  const introTabButton = document.querySelector('.tab-link[data-key="intro"]');
  if (introTabButton) {
    introTabButton.textContent = introLabel;
  }

  // Update the introduction section content
  const introSection = document.getElementById("intro-content");
  if (introSection) {
    introSection.innerHTML = `
          <h2>${introHeading}</h2>
          <p>${introDescription}</p>
      `;
  }

  // Update the tab labels for each cocktail
  cocktails.forEach((cocktail) => {
    const tabButton = document.querySelector(
      `.tab-link[data-key="${cocktail.id}"]`
    );
    if (tabButton) {
      tabButton.textContent = cocktail.tabLabel;
    }

    // Populate the cocktail content
    const section = document.getElementById(`${cocktail.id}-content`);
    if (section) {
      section.innerHTML = `
              <h2>${cocktail.name}</h2>
              <img src="${cocktail.image}" alt="${cocktail.name}" class="cocktail-img">
              <p><strong>Flavor Type:</strong> ${cocktail.flavorType}</p>
              <p><strong>Ingredients:</strong> ${cocktail.ingredients}</p>
              <p><strong>Alcohol Content:</strong> ${cocktail.alcoholContent}</p>
              <p><strong>Story Behind:</strong> ${cocktail.storyBehind}</p>
          `;
    }
  });
}

// Fetch JSON data from the specified file
function loadCocktailData(languageCode = "en") {
  const jsonFilePath = `data/${languageCode}/cocktailData_${languageCode}.json`;
  console.log(`Fetching data from: ${jsonFilePath}`); // Log the file path for debugging

  fetch(jsonFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully:", data); // Log the fetched data for debugging
      populateCocktailData(
        data.cocktails,
        data.introTabLabel,
        data.introHeading,
        data.introDescription
      );
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
