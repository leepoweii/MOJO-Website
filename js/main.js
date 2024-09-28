// Global variables
let currentLanguage = "zh_TW"; // Default language set to Traditional Chinese
let contentData = {};
let cocktailsData = {};

// Load content and cocktail data based on the selected language
async function loadContent() {
  try {
    console.log(`Loading content for language: ${currentLanguage}`);

    // Load content JSON file for the current language
    await fetchContent(
      `data/${currentLanguage}/content_${currentLanguage}.json`,
      "content"
    );

    // Load cocktails JSON file for the current language
    await fetchContent(
      `data/${currentLanguage}/mojoSignature_${currentLanguage}.json`,
      "cocktails"
    );

    // Initialize with the default tab (e.g., "kaoliang")
    updateIntro("kaoliang");
    updateCocktailSections();
    updateTabs();
  } catch (error) {
    console.error("Error loading content:", error);
    displayErrorMessage(`Failed to load content: ${error.message}`);
  }
}

// Generic fetch function for content and cocktail data
async function fetchContent(url, type) {
  console.log(`Fetching ${type} from: ${url}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`${type} data loaded:`, data);

  if (type === "content") {
    contentData = data;
  } else if (type === "cocktails") {
    cocktailsData = data;
  }
}

// Function to update the introduction text based on the selected tab
function updateIntro(tabKey) {
  const tabMapping = {
    kaoliang: "kaoliang",
    memory: "memory",
    "non-alcoholic": "nonAlcoholic",
  };

  const jsonKey = tabMapping[tabKey];

  if (cocktailsData[jsonKey] && cocktailsData[jsonKey].intro) {
    const { title, content } = cocktailsData[jsonKey].intro;
    document.querySelector("#intro-section h2").innerText = title || "";
    document.querySelector("#intro-section p").innerText = content || "";
  } else {
    console.error(`Introduction data for '${tabKey}' is not properly loaded.`);
  }
}

// Function to update the tab titles based on the current language
function updateTabs() {
  if (contentData.tabs) {
    document.querySelector('.tab-link[data-lang-key="kaoliang"]').innerHTML =
      contentData.tabs.kaoliang;
    document.querySelector('.tab-link[data-lang-key="memory"]').innerHTML =
      contentData.tabs.memory;
    document.querySelector(
      '.tab-link[data-lang-key="nonAlcoholic"]'
    ).innerHTML = contentData.tabs.nonAlcoholic;
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

  let contentHTML = "";
  cocktails.forEach((cocktail) => {
    contentHTML += `
      <div class="cocktail">
        <div class="cocktail-content">
          <h2>${cocktail.name}</h2>
          <p>${cocktail.ingredients}</p>
        </div>
      </div>
    `;
  });
  section.innerHTML = contentHTML;
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
  const tabKey = tabName.replace("-content", "");
  updateIntro(tabKey);
}

// Function to switch the language and reload content
function switchLanguage(lang) {
  currentLanguage = lang;
  console.log(`Switching to language: ${currentLanguage}`);
  loadContent();
}

// Function to display an error message
function displayErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  errorMessage.innerText = message;
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

// Initial content load
loadContent();
