// Global variables
let currentLanguage = "zh_TW"; // Default language set to Traditional Chinese
let contentData = {};
let cocktailsData = {};

// Show the agreement modal on page load
window.onload = () => {
  document.getElementById("agreement").style.display = "flex";
};

// Handle agreement acceptance
document.getElementById("agreement-accept").addEventListener("click", () => {
  document.getElementById("agreement").style.display = "none";
});

// Load content and cocktail data based on the selected language
async function loadContent() {
  try {
    console.log(`Loading content for language: ${currentLanguage}`);

    // Load content JSON file for the current language
    const contentFile = `data/${currentLanguage}/content_${currentLanguage}.json`;
    console.log(`Fetching content from: ${contentFile}`);
    const contentResponse = await fetch(contentFile);

    if (!contentResponse.ok) {
      throw new Error(`Failed to fetch content: ${contentResponse.statusText}`);
    }

    contentData = await contentResponse.json();
    console.log("Content data loaded:", contentData);

    // Load cocktails JSON file for the current language
    const cocktailsFile = `data/${currentLanguage}/mojoSignature_${currentLanguage}.json`;
    console.log(`Fetching cocktails from: ${cocktailsFile}`);
    const cocktailsResponse = await fetch(cocktailsFile);

    if (!cocktailsResponse.ok) {
      throw new Error(
        `Failed to fetch cocktails: ${cocktailsResponse.statusText}`
      );
    }

    cocktailsData = await cocktailsResponse.json();
    console.log("Cocktails data loaded:", cocktailsData);

    // Initialize with the default tab (e.g., "kaoliang")
    updateIntro("kaoliang");
    updateCocktailSections();
    updateTabs();
  } catch (error) {
    console.error("Error loading content:", error);
    displayErrorMessage(`Failed to load content: ${error.message}`);
  }
}

// Function to update the introduction text based on the selected tab
function updateIntro(tabKey) {
  if (cocktailsData[tabKey] && cocktailsData[tabKey].intro) {
    const introTitle = cocktailsData[tabKey].intro.title;
    const introContent = cocktailsData[tabKey].intro.content;

    document.querySelector("#intro-section h2").innerText = introTitle;
    document.querySelector("#intro-section p").innerText = introContent;
  } else {
    console.error("Introduction data is not properly loaded.");
  }
}

// Function to update the tab titles based on the current language
function updateTabs() {
  if (contentData.tabs) {
    document.querySelector('.tab-link[data-lang-key="kaoliang"]').innerText =
      contentData.tabs.kaoliang;
    document.querySelector('.tab-link[data-lang-key="memory"]').innerText =
      contentData.tabs.memory;
    document.querySelector(
      '.tab-link[data-lang-key="nonAlcoholic"]'
    ).innerText = contentData.tabs.nonAlcoholic;
  } else {
    console.error("Tab titles are not properly loaded.");
  }
}

// Populate the cocktail sections
function updateCocktailSections() {
  populateCocktailSection("kaoliang-content", cocktailsData.kaoliang.cocktails);
  populateCocktailSection("memory-content", cocktailsData.memory.cocktails);
  populateCocktailSection(
    "non-alcoholic-content",
    cocktailsData.nonAlcoholic.cocktails
  );
}

// Function to populate a cocktail section with content
function populateCocktailSection(sectionId, cocktails) {
  console.log(`Populating section: ${sectionId}`, cocktails);
  const section = document.getElementById(sectionId);
  section.innerHTML = ""; // Clear existing content

  cocktails.forEach((cocktail) => {
    section.innerHTML += `
            <div class="cocktail">
                <div class="cocktail-content">
                    <h2>${cocktail.name}</h2>
                    <p>${cocktail.ingredients}</p>
                </div>
            </div>
        `;
  });
}

// Function to handle tab switching
function openTab(event, tabName) {
  // Hide all tab contents
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => (content.style.display = "none"));

  // Remove 'active' class from all tab links
  document
    .querySelectorAll(".tab-link")
    .forEach((link) => link.classList.remove("active"));

  // Show the selected tab content and set the clicked tab link as active
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");

  // Update the introduction content based on the selected tab
  const tabKey = tabName.replace("-content", ""); // Remove '-content' to match JSON keys
  updateIntro(tabKey);
}

// Event listeners for language switch buttons
document
  .getElementById("lang-zh-tw")
  .addEventListener("click", () => switchLanguage("zh_TW"));
document
  .getElementById("lang-en")
  .addEventListener("click", () => switchLanguage("en"));
document
  .getElementById("lang-zh-cn")
  .addEventListener("click", () => switchLanguage("zh_CN"));

// Function to switch the language and reload content
function switchLanguage(lang) {
  currentLanguage = lang;
  contentData = {}; // Clear existing content data to load the new language file
  cocktailsData = {}; // Clear existing cocktail data to load the new language file
  console.log(`Switching to language: ${currentLanguage}`);
  loadContent();
}

// Function to display an error message
function displayErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  errorMessage.innerText = message;
}

// Load the default language ('zh_TW') and cocktail data on page load
window.onload = () => {
  document.getElementById("agreement-modal").style.display = "flex";
  document.getElementById("agreement-accept").addEventListener("click", () => {
    document.getElementById("agreement-modal").style.display = "none";
    switchLanguage("zh_TW"); // Set default language to 'zh_TW'
  });
};
