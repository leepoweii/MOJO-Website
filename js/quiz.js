// Variables to store quiz state
let currentQuestionIndex = 0;
let preferences = {};

// Define quiz questions and options
const quizQuestions = [
  {
    question: {
      en: "What kind of flavor do you prefer?",
      "zh-TW": "您喜歡什麼樣的口味？",
      "zh-CN": "您喜欢什么样的口味？",
    },
    options: [
      {
        text: { en: "Fruity", "zh-TW": "水果味", "zh-CN": "水果味" },
        value: "fruity",
      },
      {
        text: { en: "Bitter", "zh-TW": "苦味", "zh-CN": "苦味" },
        value: "bitter",
      },
      {
        text: { en: "Sweet", "zh-TW": "甜味", "zh-CN": "甜味" },
        value: "sweet",
      },
      {
        text: { en: "Spicy", "zh-TW": "辛辣", "zh-CN": "辛辣" },
        value: "spicy",
      },
    ],
  },
  {
    question: {
      en: "Do you prefer alcoholic or non-alcoholic?",
      "zh-TW": "您喜歡含酒精還是無酒精？",
      "zh-CN": "您喜欢含酒精还是无酒精？",
    },
    options: [
      {
        text: { en: "Alcoholic", "zh-TW": "含酒精", "zh-CN": "含酒精" },
        value: "alcoholic",
      },
      {
        text: { en: "Non-Alcoholic", "zh-TW": "無酒精", "zh-CN": "无酒精" },
        value: "nonalcoholic",
      },
    ],
  },
  // Add more questions if needed
];

// Load the first question on page load
window.onload = () => {
  loadQuestion();
};

// Function to load the current question
function loadQuestion() {
  const quizForm = document.getElementById("quiz-form");
  quizForm.innerHTML = ""; // Clear previous content

  const questionData = quizQuestions[currentQuestionIndex];
  const questionText = questionData.question[currentLanguage];

  // Display the question
  const questionElement = document.createElement("p");
  questionElement.innerText = questionText;
  quizForm.appendChild(questionElement);

  // Display the options
  questionData.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text[currentLanguage];
    button.onclick = () => nextQuestion(option.value);
    quizForm.appendChild(button);
  });
}

// Function to handle moving to the next question
function nextQuestion(selectedValue) {
  // Store the user's preference
  preferences[currentQuestionIndex] = selectedValue;

  // Move to the next question
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showRecommendation();
  }
}

// Function to show cocktail recommendation based on preferences
function showRecommendation() {
  const quizForm = document.getElementById("quiz-form");
  quizForm.innerHTML = ""; // Clear previous content

  // Basic logic to determine a recommendation based on preferences
  let recommendedCocktail;
  if (preferences[0] === "fruity" && preferences[1] === "alcoholic") {
    recommendedCocktail = { en: "No.16", "zh-TW": "十六號", "zh-CN": "十六号" };
  } else if (preferences[0] === "bitter" && preferences[1] === "alcoholic") {
    recommendedCocktail = {
      en: "Rogue of Yanan",
      "zh-TW": "燕南紅",
      "zh-CN": "燕南红",
    };
  } else if (preferences[1] === "nonalcoholic") {
    recommendedCocktail = {
      en: "Bloom Brush",
      "zh-TW": "夢筆生花",
      "zh-CN": "梦笔生花",
    };
  } else {
    recommendedCocktail = {
      en: "Sober Diablo",
      "zh-TW": "清醒惡魔",
      "zh-CN": "清醒恶魔",
    };
  }

  // Display the recommendation
  const recommendationElement = document.createElement("p");
  recommendationElement.innerText = `${
    currentLanguage === "en"
      ? "We recommend:"
      : currentLanguage === "zh-TW"
      ? "我們推薦："
      : "我们推荐："
  } ${recommendedCocktail[currentLanguage]}`;
  quizForm.appendChild(recommendationElement);
}
