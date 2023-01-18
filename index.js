function Quiz(question) {
  this.score = 0;
  this.question = question;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function () {
  return this.question[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.question.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
let question = [
  new Question(
    "Which of the following is not a Javascript framework?",
    ["Node", "Vue", "React", "Cassandra"],
    "Cassandra"
  ),
  new Question(
    "JavaScript File Has An Extension of:",
    [".java", ".js", ".html", ".xml"],
    ".js"
  ),
  new Question(
    "Which of the following is not javascript data types?",
    ["Null type", "Undefined type", "Number type", "All of the mentioned"],
    "All of the mentioned"
  ),
  new Question(
    "Which of the following is not a framework?",
    ["JavaScript .NET", "JavaScript", "Cocoa JS", "jQuery"],
    "JavaScript"
  ),
  new Question(
    "Which of the following is the property that is triggered in response to JS errors?",
    [
      "onclick",
      "onerror",
      "onmessage",
      "onexception",
    ],
    "onerror"
  ),
];

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    var choices = quiz.getQuestionByIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function showScores() {
  var gameOverHtml = "<h1>Result</h1>";
  gameOverHtml +=
    "<h2 id='score'> Your Score is:  " +
    quiz.score +
    " . And Percentage is: " +
    (quiz.score / question.length) * 100 +
    "%" +
    "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.question.length;
}

function handleOptionButton(id, choice) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

var quiz = new Quiz(question);
loadQuestions();