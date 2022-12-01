// HTML element
var $quiz = document.getElementById("quiz");
var $result = document.getElementById("result");
var $showQuestions = document.getElementById("questions");
var $yesNo = document.getElementById("yesNo");
var $mainPage = document.getElementById("main-page");
var $inital = document.getElementById("inital");
var $submit = document.getElementById("submit");
var $timer = document.getElementById("timer");

var quizNumber = 0;
var timeLimit = 60;
$timer.textContent = timeLimit;
var finish = false;

// Object of Score
var $score = {
  score: 0,
  initial: ''
}

// Object of Quiz
var quiz = {
  title: "",
  questions: [],
  answer: 0
}

// Quiz Set
var quizzes = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    questions: ["<script>", "<scripting>", "<js>", "<javascript>"],
    answer: 0
  },
  {
    title: "Where is the correct place to insert a JavaScript?",
    questions: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section"],
    answer: 0
  },
  {
    title: "What is my name?",
    questions: ["Andrew", "Peter", "Sam", "John"],
    answer: 1
  },
  {
    title: "What is my homework score?",
    questions: ["0", "50", "80", "100"],
    answer: 3
  },
  {
    title: "How many children do I have?",
    questions: ["1", "2", "3", "4","5"],
    answer: 4
  }
];


// Starting page
$mainPage.addEventListener("click", function (event) {
  // event.stopPropagation();
  var element = event.target;

  // When click start button, hide starting page and show the quiz and start the timer
  if (element.matches("button")) {
    element.parentElement.setAttribute("hidden", "hidden");
    renderQuiz();
    timeStart();
  }
});


// render quiz
function renderQuiz() {

  // Show quiz page
  $quiz.removeAttribute("hidden");

  // select quiz number
  quiz = quizzes[quizNumber];

  
  document.getElementById("title").textContent = quiz.title;

  // showing list of questions and set data-index
  for (var i = 0; i < quiz.questions.length; i++) {
    var question = quiz.questions[i];
    var li = document.createElement("li");
    li.textContent = question;
    li.setAttribute("class", "question");
    li.setAttribute("data-index", i);
    $showQuestions.appendChild(li);
  }
}

// When select the answer
$quiz.addEventListener("click", function (event) {
  
  // selected answer
  var element = event.target;

  if (element.matches("li")) {
    
    // answer is correct, show 'correct' and next quiz
    if (element.getAttribute("data-index") == quiz.answer) {
      $yesNo.textContent = "Correct";
      nextQuiz();
    } else {  // answer is wrong, show 'wrong' and reduce the time and next quiz
      $yesNo.textContent = "Wrong";
      timeLimit -= 10;
      nextQuiz();
    }
  } else {
    console.log("not match");
  }
});

// Call next quiz
function nextQuiz() {
  quizNumber++;  
  
  // remove previous question
  var li = document.querySelectorAll("li");
  for (var i = 0; i < quiz.questions.length; i++) {
    li[i].remove();
  }

  // if there is more question, render next quiz
  if (quizNumber < quizzes.length)
    renderQuiz();
  else {  // If no more question, finish the game and show the result
    finish = true;
    result();
  }
}

// Show the final result
function result() {
  $quiz.setAttribute("hidden", "hidden"); // hide question page
  $result.removeAttribute("hidden"); // show the result page

  $score.score = timeLimit; // score is remain time
  document.getElementById("score").textContent = $score.score; 

}

// Timer 
function timeStart() {
  var timer = setInterval(function () {
    timeLimit--;
    $timer.textContent = timeLimit;

    // When time is over, timer stops and show the result
    if (timeLimit === 0) {
      clearInterval(timer);
      result();
      return ;      
    }

    // when user answer all question, timer stops
    if (finish) {
      clearInterval(timer);
      return ;      
    }

  }, 1000);
}


// Submit inital
$submit.addEventListener("submit", function (event) {
  event.preventDefault();

  var inital = $inital.value;

  // If there is no inital
  if (inital === "") {
    var message = "Initals cannot be blank";
    document.getElementById("message").textContent = message;
  } else { // store the score and inital, then move to the high score page
    $score.initial = inital;
    storeScore($score);
    window.location.href = "./highscore.html";
  }

});



// Store Sorted Score to the localStorage (highscore first)
function storeScore(user) {

  var index = 0;
  var highScore = [];
  var getScore = JSON.parse(localStorage.getItem("highScore"));
  
  // It there is no score in the local storage, directly store to the local storage
  if (getScore === null) {
    highScore.push(user);
    localStorage.setItem("highScore", JSON.stringify(highScore));       
  } else { 
    // If there is previous score in the local storage
    // compare the current score and store the sorted score object
    for(var i=0; i<getScore.length; i++){
      highScore.push(getScore[i]);
    }
      
    // decide current score location
    for (var i = 0; i < highScore.length; i++) {
      if (highScore[i].score > user.score) {
        index++;
      } else {
        break;
      }
    }
    highScore.splice(index, 0, user);    
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }
}



