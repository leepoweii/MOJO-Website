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
  if (event) {
    event.currentTarget.classList.add("active");
  }
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

  // Update the tab labels and content for each cocktail
  cocktails.forEach((cocktail) => {
    const tabButton = document.querySelector(
      `.tab-link[data-key="${cocktail.id}"]`
    );
    if (tabButton) {
      tabButton.textContent = cocktail.tabLabel;
    }

    const section = document.getElementById(`${cocktail.id}-content`);
    if (section) {
      section.innerHTML = `
      <div class="cocktail-container">
        <div class="cocktail-content">
          <h2 class="cocktail-name">${cocktail.name}</h2>
          <p class="cocktail-flavorType">${cocktail.flavorType}</p>
          <p class="cocktail-ingredients">${cocktail.ingredients}</p>
        </div>
        <div class="cocktail-story">
         <h2 class="story-heading">${cocktail.storyHeading}</h2>
          <p>${cocktail.storyBehind}</p>
        </div>
      </div>
          `;
    }
  });
}

// Fetch JSON data from the specified file
async function loadCocktailData(languageCode = "zh_TW") {
  const jsonFilePath = `data/${languageCode}/cocktailData_${languageCode}.json`;

  try {
    document.getElementById("intro-content").innerHTML = "<p>Loading...</p>";
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const data = await response.json();
    populateCocktailData(
      data.cocktails,
      data.introTabLabel,
      data.introHeading,
      data.introDescription
    );
    openTab(null, "intro-content");
  } catch (error) {
    console.error("Error fetching the cocktail data:", error);
    document.getElementById("error-message").textContent =
      "Failed to load cocktail data.";
    document.getElementById("error-message").style.display = "block";
  }
}

// Initialize the page content
document.addEventListener("DOMContentLoaded", () => {
  loadCocktailData(); // Load default language (English) on page load

  // Add event listeners for language switcher buttons
  document
    .getElementById("lang-zh-tw")
    .addEventListener("click", () => loadCocktailData("zh_TW"));
  document
    .getElementById("lang-en")
    .addEventListener("click", () => loadCocktailData("en"));
});
