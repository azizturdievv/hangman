// script.js

const programmingLanguages = [
  "python", "javascript", "mongodb", "json", "java",
  "c", "csharp", "kotlin", "php", "ruby"
];

const frameworks = [
  "django", "laravel", "jquery", "express", "rails",
  "spring", "angular", "react", "vue", "ember", "backbone"
];

const programmers = ["pavel-durov", "bill-gates"];
const helpTextMap = {
  "django": "Python frameworki",
  "laravel": "PHP frameworki",
  "jquery": "JavaScript kutubxonasi",
  "express": "Node.js frameworki",
  "rails": "Ruby frameworki",
  "spring": "Java frameworki",
  "angular": "JavaScript frameworki",
  "react": "JavaScript kutubxonasi",
  "vue": "JavaScript frameworki",
  "ember": "JavaScript frameworki",
  "backbone": "JavaScript frameworki",
  "python": "Mashhur dasturlash tili",
  "javascript": "Web uchun asosiy dasturlash tili",
  "mongodb": "NoSQL ma'lumotlar bazasi",
  "json": "Ma'lumot almashish formati",
  "java": "OOP dasturlash tili",
  "c": "Past darajadagi dasturlash tili",
  "csharp": "Microsoft tomonidan yaratilgan",
  "kotlin": "Android uchun dasturlash tili",
  "php": "Web server tili",
  "ruby": "Oddiy sintaksisli dasturlash tili",
  "pavel-durov": "Telegram asoschisi",
  "bill-gates": "Microsoft asoschisi"
};

let answer = "";
let guessed = [];
let mistakes = 0;
let maxWrong = 6;
let wordStatus = null;
let timer = 0;
let timerInterval;
let wins = 0;
let losses = 0;
let currentCategory = "";

const qwerty = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm-".split("")
];

function setCategory(category) {
  currentCategory = category;
  reset();
}

function randomWord() {
  let list;
  switch (currentCategory) {
    case "language": list = programmingLanguages; break;
    case "framework": list = frameworks; break;
    case "coder": list = programmers; break;
    default: list = [];
  }
  const rnd = Math.floor(Math.random() * list.length);
  answer = list[rnd];
  document.getElementById("question").innerText = `Kategoriya: ${currentCategory}`;
}

function generateButtons() {
  let html = qwerty.map(row => row.map(letter =>
    `<button class="letter" id="${letter}" onclick="handleGuess('${letter}')">${letter}</button>`
  ).join(""))
  .map(rowHtml => `<div class="keyboard-row">${rowHtml}</div>`)
  .join("");

  document.getElementById("keyboard").innerHTML = html;
}

function handleGuess(chosenLetter) {
  if (guessed.includes(chosenLetter)) return;
  guessed.push(chosenLetter);
  document.getElementById(chosenLetter).disabled = true;

  if (answer.includes(chosenLetter)) {
    guessedWord();
    checkIfGameWon();
  } else {
    mistakes++;
    updateMistakes();
    updateHangmanPicture();
    checkIfGameLost();
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => guessed.includes(letter) ? letter : "_ ").join('');
  document.getElementById("wordSpotlight").innerText = wordStatus;
}

function updateMistakes() {
  document.getElementById("mistakes").innerText = mistakes;
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = `./images/${mistakes}.jpeg`;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    clearInterval(timerInterval);
    wins++;
    document.getElementById("wins").innerText = wins;
    disableKeyboard();
    document.getElementById("nextBtn").style.display = "inline-block";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    clearInterval(timerInterval);
    losses++;
    document.getElementById("losses").innerText = losses;
    document.getElementById("wordSpotlight").innerText = `To'g'ri javob: ${answer}`;
    disableKeyboard();
    document.getElementById("retryBtn").style.display = "inline-block";
  }
}

function disableKeyboard() {
  document.querySelectorAll("#keyboard button").forEach(btn => btn.disabled = true);
}

function reset() {
  clearInterval(timerInterval);
  timer = 0;
  document.getElementById("timer").innerText = "0s";
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = `${timer}s`;
  }, 1000);

  mistakes = 0;
  guessed = [];
  document.getElementById("mistakes").innerText = 0;
  document.getElementById("hangmanPic").src = "./images/0.jpeg";
  document.getElementById("retryBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("helpText").innerText = "";
  randomWord();
  guessedWord();
  generateButtons();
}

function nextQuestion() {
  reset();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function showHelp() {
  if (helpTextMap[answer]) {
    document.getElementById("helpText").innerText = `🛈 ${helpTextMap[answer]}`;
  }
}

document.getElementById("maxWrong").innerText = maxWrong;
// script.js faylida
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
