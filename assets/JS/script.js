// Query selectors:
var title = document.querySelector("#title");
var highScore = document.querySelector("#high-score");
var timer = document.querySelector("#time-left");
var startButton = document.querySelector("#start-btn");
var question = document.querySelector("#question");
const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");
const button4 = document.getElementById("option4");

// Quiz questions:
const questions = [
   {
      question: "Commonly used data types DO Not Include:",
      options: ["1. <strings>", "2. <booleans>", "3. <alerts>", "4. <numbers>"],
      answer: "3. <script>",
   },

   {
      question: "The condition in an if/else statement is enclosed with_______.",
      options: ["1. <quotes>", "2. <curley brackets>", "3. <paranthesis>", "4. <square brackets>"],
      answer: "2. <script>",
   },
];

