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


var $score = {
  score: 0,
  initial: ''
}


var quiz = {
  title: "",
  questions: [],
  answer: 0
}

var quizzes = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    questions: ["<script>", "<scripting>", "<js>", "<javascript>"],
    answer: 0
  },
  {
    title: "dsdgsdgsdsd?",
    questions: ["<script>", "<scripting>", "<js>", "<javascript>"],
    answer: 0
  },
  {
    title: "dgowpopoeklg;lsd?",
    questions: ["<script>", "<scripting>", "<js>", "<javascript>"],
    answer: 0
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    questions: ["<script>", "<scripting>", "<js>", "<javascript>"],
    answer: 0
  },
  {
    title: "Final?",
    questions: ["<scrsdgsdsipt>", "<scriptsdgsding>", "<jsdgds>", "<javasdgsdgscript>"],
    answer: 0
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


// Store High Score and Initial
function storeScore(user) {
  var highScore = JSON.parse(localStorage.getItem("highScore"));

  if (highScore === null) {
    localStorage.setItem("highScore",JSON.stringify(user));     
  } else {
    if (highScore.score > user.score) {
      return;
    } else {
      localStorage.setItem("highScore",JSON.stringify(user));    
    } 
  }   
}


// Submit inital
$submit.addEventListener("click", function(event){
  event.preventDefault();

   var inital = $inital.value;

   if(inital === ""){
      var message = "Initals cannot be blank";
      document.getElementById("message").textContent = message;
   } else {
      $score.initial = inital;
      console.log("initial:"+$score.initial);
      console.log("score: "+$score.score);
      console.log($score);
      storeScore($score);
      window.location.href = "./highscore.html";

   }

});


