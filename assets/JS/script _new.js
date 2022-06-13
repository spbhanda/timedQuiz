// Query selectors:
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question-title");
const answerElement = document.getElementById("answer-options");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("view-high-scores");
var listOfHighScores = document.getElementById("listOfHighScores");

startBtn.addEventListener("click", startQuiz);

var questionTitle = document.getElementById("question-title");
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var firstPage = document.getElementById("first-page");

var checkAnswer = document.getElementById("check-answer");
var choiceOptions = document.getElementById("answer-options");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

// Quiz questions:
const questions = [
   {
      question: "Commonly used data types DO Not Include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "1. strings",
   },

   {
      question: "The condition in an if/else statement is enclosed with_______.",
      options: ["1. quotes", "2. curley brackets", "3. paranthesis", "4. square brackets"],
      answer: "2. script",
   },

   {
      question: "Who invented JavaScript?",
      options: ["1. Douglas Crockford", "2. Sheryl Sandberg", "3. Brendan Eich", "4. No-one in perticular"],
      answer: "3. Brendan Eich",
   },

   {
      question: "Which one of these is a JavaScript package manager?",
      options: ["1. Node.js", "2. TypeScript", "3. npm", "4. bootstrap"],
      answer: "1. Node.js",
   },

   {
      question: "Which tool can you use to ensure code quality?",
      options: ["1. Angular", "2. jQuery", "3. RequireJS", "4. ESLint"],
      answer: "4. ESLint",
   },
];
// initials
var totalTime = 60;
var currentQuestionIndex = 0;
var totalPoints = 0;

// First page----------------------------------

function startQuiz() {
   totalTime = 60;
   currentQuestionIndex = 0;
   timeLeft.textContent = totalTime;
   firstPage.style.display = "none";
   quizContainer.classList.remove("hide");
   currentQuestion = questions[currentQuestionIndex];

   var timer = setInterval(function () {
      totalTime--;
      timeLeft.textContent = totalTime;
      if (totalTime <= 0 && currentQuestionIndex < questions.length) {
         clearInterval(timer);
         quizFinished();
      }
   }, 1000);

   nextQuestion();
}

// // Start Quiz

function nextQuestion() {
   // resetState();
   showQuestion();
}

// Show Questions-------------------------------------------

function showQuestion() {
   questionTitle.textContent = questions[currentQuestionIndex].question;
   answer1.textContent = questions[currentQuestionIndex].options[0];
   answer2.textContent = questions[currentQuestionIndex].options[1];
   answer3.textContent = questions[currentQuestionIndex].options[2];
   answer4.textContent = questions[currentQuestionIndex].options[3];
}

function answerCheck(answer) {
   if (questions[currentQuestionIndex].answer === questions[currentQuestionIndex].options[answer]) {
      // correct answer, add 1 score to final score
      totalPoints++;
      // console.log(correctAns);
      checkAnswer.textContent = "Correct Answer";
   } else {
      // wrong answer, deduct 10 second from timer
      totalTime -= 10;
      timeLeft.textContent = totalTime;
      checkAnswer.textContent = "Wrong Answer";
   }

   currentQuestionIndex++;
   // repeat with the rest of questions
   if (currentQuestionIndex < questions.length) {
      showQuestion();
   } else {
      // if no more question, run game over function
      quizFinished();
   }
}

function choice1() {
   answerCheck(0);
}

function choice2() {
   answerCheck(1);
}

function choice3() {
   answerCheck(2);
}

function choice4() {
   answerCheck(3);
}

answer1.addEventListener("click", choice1);
answer2.addEventListener("click", choice2);
answer3.addEventListener("click", choice3);
answer4.addEventListener("click", choice4);

// when all questions are answered or timer is 0, quiz is finished
function quizFinished() {
   quizContainer.style.display = "none";
   firstPage.style.display = "none";
   timer.style.display = "none";
   summary.style.display = "block";

   // show final score
   finalScore.textContent = totalPoints;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
   event.preventDefault();

   // stop function is initial is blank
   if (initialInput.value === "") {
      alert("Please enter your initials!");
      return;
   }

   firstPage.style.display = "none";
   timer.style.display = "none";

   summary.style.display = "none";
   highScoreSection.style.display = "block";

   var savedHighScores = localStorage.getItem("high scores");
   var scoresArray;

   if (savedHighScores === null) {
      scoresArray = [];
   } else {
      scoresArray = JSON.parse(savedHighScores);
   }

   var userScore = {
      initials: initialInput.value,
      score: finalScore.textContent,
   };

   scoresArray.push(userScore);

   // stringify array in order to store in local
   var scoresArrayString = JSON.stringify(scoresArray);
   window.localStorage.setItem("high scores", scoresArrayString);

   // show current highscores
   showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {
   firstPage.style.display = "none";
   timer.style.display = "none";
   quizContainer.style.display = "none";

   highScoreSection.style.display = "block";

   var savedHighScores = localStorage.getItem("high scores");

   // check if there is any in local storage
   if (savedHighScores === null) {
      return;
   }

   var storedHighScores = JSON.parse(savedHighScores);

   for (; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
      listOfHighScores.appendChild(eachNewHighScore);
   }
}

// Event listener after the quiz is over

submitInitialBtn.addEventListener("click", function (event) {
   storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
   showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
   firstPage.style.display = "block";
   highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
   window.localStorage.removeItem("high scores");
   listOfHighScores.innerHTML = "High Scores Cleared!";
   listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;");
});
