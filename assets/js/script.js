// Object of quiz
var quizNumber = 0;
var $quiz = document.getElementById("quiz");
var $result = document.getElementById("result");
var $showQuestions = document.getElementById("questions");
var $yesNo = document.getElementById("yesNo");
var $mainPage = document.getElementById("main-page");
var $inital = document.getElementById("inital");
var $submit = document.getElementById("submit");

var timeLimit = 60;
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

  if (element.matches("button")) {
    element.parentElement.setAttribute("hidden", "hidden");
    renderQuiz();
    timeStart();
  }
});


// render quiz
function renderQuiz() {

  $quiz.removeAttribute("hidden");

  quiz = quizzes[quizNumber];
  document.getElementById("title").textContent = quiz.title;

  for (var i = 0; i < quiz.questions.length; i++) {
    var question = quiz.questions[i];
    var li = document.createElement("li");
    li.textContent = question;
    li.setAttribute("class", "question");
    li.setAttribute("data-index", i);


    $showQuestions.appendChild(li);
  }
}

// select the answer
$quiz.addEventListener("click", function (event) {
  // event.stopPropagation();
  var element = event.target;

  if (element.matches("li")) {
    if (element.getAttribute("data-index") == quiz.answer) {
      // console.log("correct");
      $yesNo.textContent = "Correct";
      nextQuiz();
    } else {
      // console.log("wrong");
      $yesNo.textContent = "Wrong";
      timeLimit -= 10;
      nextQuiz();
    }
  } else {
    console.log("not match");
  }


});

// call next quiz
function nextQuiz() {
  quizNumber++;
  var li = document.querySelectorAll("li");
  for (var i = 0; i < quiz.questions.length; i++) {
    li[i].remove();
  }

  if (quizNumber < quizzes.length)
    renderQuiz();
  else {
    console.log("End");
    finish = true;
    result();
  }
}

// show the final result
function result() {
  $quiz.setAttribute("hidden", "hidden");
  $result.removeAttribute("hidden");

  $score.score = timeLimit;
  document.getElementById("score").textContent = $score.score;

}

// timer 
function timeStart() {
  var timer = setInterval(function () {
    timeLimit--;
    document.getElementById("timer").textContent = timeLimit;

    if (timeLimit === 0) {
      clearInterval(timer);
      result();
      return timeLimit;
    }

    if (finish) {
      clearInterval(timer);
      return timeLimit;
    }

  }, 1000);
}


// Store Sorted Score to the localStorage
function storeScore(user) {

  var index = 0;
  var highScore = [];
  var getScore = JSON.parse(localStorage.getItem("highScore"));
  
  console.log("get score: " + getScore);

  if (getScore === null) {
    highScore.push(user);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    
    console.log("highSocre is null");
  } else {
    console.log("highSocre is not null");
    for(var i=0; i<getScore.length; i++){
      highScore.push(getScore[i]);
    }
      
    for (var i = 0; i < highScore.length; i++) {
      if (highScore[i].score > user.score) {
        index++;
      } else {
        break;
      }
    }
    highScore.splice(index, 0, user);
    console.log("Updated highSocre is "+ highScore);
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }
}


// Submit inital
$submit.addEventListener("click", function (event) {
  event.preventDefault();

  var inital = $inital.value;

  if (inital === "") {
    var message = "Initals cannot be blank";
    document.getElementById("message").textContent = message;
  } else {
    $score.initial = inital;
    console.log("initial:" + $score.initial);
    console.log("score: " + $score.score);
    console.log($score);
    storeScore($score);
    window.location.href = "./highscore.html";
  }

});


