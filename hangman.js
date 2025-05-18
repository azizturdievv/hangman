var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"c",
	"csharp",
	"kotlin",
	"php",
	"ruby"
]

var frameworks = [
  "django",
  "laravel",
  "jquery",
  "express",
  "rails",
  "spring",
  "angular",
  "react",
  "vue",
  "ember",
  "backbone"
]

var programmers= [
  "pavel-durov",
  "bill-gates"
]
var help_pro = [
  "Telegram asoschisi",
  "Microsoft asoschisi"
]

let answer = '';
let help = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

var is_frm = false, is_prog = false, is_coders = false;
var question = document.getElementById("question");
function frm(){
  reset();
  is_frm = true;
  is_prog = false;
  is_coders = false;
  question.innerText = "Frameworklar:";
  randomWord();
  guessedWord();
  generateButtons();
}
function prog(){
  reset();
  is_frm = false;
  is_prog = true;
  is_coders = false;
  question.innerText = "Dasturlash tillari:";
  randomWord();
  guessedWord();
  generateButtons();
}
function coders(){
  reset();
  is_frm = false;
  is_prog = false;
  is_coders = true;
  question.innerText = "Mashxur dasturchilar:";
  randomWord();
  guessedWord();
  generateButtons();
}


function randomWord() {
  let rnd = 0;
  if(is_prog) {
      rnd = Math.floor(Math.random() * programming_languages.length);
      answer = programming_languages[rnd];
    }
  else if (is_frm)
      answer = frameworks[rnd * frameworks.length];
  else if(is_coders) {
      rnd = Math.floor(Math.random() * programmers.length);
      answer = programmers[rnd];
      document.getElementById("help").innerText = help_pro[rnd];
  }
  // else  alert("Iltimos kategoriya tanlang");
}

function generateButtons() {
  if (is_coders || is_frm || is_prog) {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz-'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-success m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');

      document.getElementById('keyboard').innerHTML = buttonsHTML;
  } else {
    document.getElementById('keyboard').innerHTML = "O'yinni boshlash uchun kategoriya tanlang";
  }
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpeg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Siz  yutdingiz :)';
    let btn = document.getElementById('reset');
    btn.style.display = "inline";
    btn.addEventListener("click", reset)
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'javob: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Siz yutqazdingiz!!!';
    let btn = document.getElementById('reset');
    btn.style.display = "inline";
    btn.addEventListener("click", reset)
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpeg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;


generateButtons();
