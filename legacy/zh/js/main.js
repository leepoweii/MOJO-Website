// Function to load and render data based on the selected category
async function loadMenuData(category) {
  try {
    let response;
    if (category === "kinmenJourney") {
      response = await fetch("../data/kinmenJourney.json");
    } else if (category === "mojoSignature") {
      response = await fetch("../data/mojoSignature.json");
    } else if (category === "nonAlcoholic") {
      response = await fetch("../data/nonAlcoholic.json");
    }

    if (!response.ok) {
      throw new Error("Failed to load menu data");
    }

    const data = await response.json();

    if (category === "kinmenJourney") {
      createKinmenJourneyNav(data.cocktails);
    } else if (category === "mojoSignature") {
      createMojoNav(data);
    } else if (category === "nonAlcoholic") {
      createNonAlcoholicNav(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to create the navigation for Kinmen Journey
function createKinmenJourneyNav(cocktails) {
  const navContainer = document.getElementById("dynamic-nav");
  navContainer.innerHTML = "";

  cocktails.forEach((cocktail) => {
    const button = document.createElement("button");
    button.textContent = cocktail.tabLabel;
    button.classList.add("nav-button");
    button.onclick = () => displayKinmenCocktail(cocktail);
    navContainer.appendChild(button);
  });
}

// Function to create the navigation for MOJO Signature ("Kaoliang" and "Memory")
function createMojoNav(mojoSignature) {
  const navContainer = document.getElementById("dynamic-nav");
  navContainer.innerHTML = "";

  // Buttons for "Kaoliang" and "Memory"
  const categories = ["kaoliang", "memory"];
  categories.forEach((cat) => {
    const button = document.createElement("button");
    button.textContent = mojoSignature[cat].intro.title;
    button.classList.add("nav-button");
    button.onclick = () => displayMojoCocktails(mojoSignature[cat]);
    navContainer.appendChild(button);
  });
}

// Function to create the navigation for Non-Alcoholic drinks
function createNonAlcoholicNav(nonAlcoholic) {
  const navContainer = document.getElementById("dynamic-nav");
  navContainer.innerHTML = "";

  const button = document.createElement("button");
  button.textContent = nonAlcoholic.intro.title;
  button.classList.add("nav-button");
  button.onclick = () => displayNonAlcoholicDrinks(nonAlcoholic);
  navContainer.appendChild(button);
}

// Functions to display content (as described earlier)

// Event listeners for category buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".category-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const category = event.target.getAttribute("data-category");
      loadMenuData(category);
    });
  });
});
