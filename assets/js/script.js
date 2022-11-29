

var start = document.getElementById("start");
// var reset = document.getElementById("reset");
var time = document.getElementById("timer");

var win = localStorage.getItem("win");
var lose = localStorage.getItem("lose");
var wordNumber = 1;

// var letter = "";
// localStorage.setItem("timeLimit", 10);
// var limit = localStorage.getItem("timeLimit");
var limit = 10;

var fiveLetterWord = ["cable", "daddy", "cabin"];//, "eager", "early", "facet"];
var wordSelect = wordChoice();


function $ (elementToFind) {
  return document.querySelector(elementToFind);
};
var statue = false;

function letterReturn(word, num) {
  // var word = fiveLetterWord.shift();

  var char;
  if (word !== null) {
    char = word.substr(num, 1);
  }
  // console.log(char);

  return char;
}

function wordChoice() {
  var word = fiveLetterWord.shift();
  return word;
}


function winGame() {
  win++;
  document.getElementById("win").textContent = win;
  document.getElementById("win-lose").textContent = "You Win!";

  console.log(endGame());
  if (!endGame()) {
    start.textContent = "Re-Start";
    statue = false;
    start.setAttribute("style", "display: block")
  }
  // resetGame();
}

function loseGame() {
  lose++;
  document.getElementById("lose").textContent = lose;
  time.textContent = "Time Over!";
  document.getElementById("win-lose").textContent = "You Lose!";
  console.log(endGame());

  if (!endGame()) {
    statue = false;
    start.textContent = "Re-Start";
    start.setAttribute("style", "display: block")
    console.log("lose");
  }
}

// Timer Start
start.addEventListener("click", function () {
  var timer = setInterval(function () {
    if (!statue) {
      resetGame();
    }

    start.setAttribute("style", "display: none")

    statue = true;
    limit--;
    time.textContent = limit;
    document.getElementById("win-lose").textContent = "Game Start!";
    if (wordNumber === 6) {
      clearInterval(timer);
      winGame();
      //  resetGame();        
    }

    if (limit === 0) {
      clearInterval(timer);
      loseGame();

    }
  }, 1000)

})

function endGame() {
  wordSelect = wordChoice();

  console.log(wordSelect);
  if (wordSelect === undefined) {
    document.getElementById("win-lose").textContent = "Game Over";
    return true;
  } else {
    return false;
  }
}

function resetGame() {

  // wordSelect = wordChoice();


  limit = 10;
  for (wordNumber = 1; wordNumber < 6; wordNumber++) {
    var letter = "letter" + wordNumber;
    document.getElementById(letter).textContent = '';
    document.getElementById(letter).setAttribute("class", "box");
  }
  wordNumber = 1;
  statue = false;
  document.getElementById("win-lose").textContent = "";
  return;

}


function inputLetter(event) {

  if (statue) {
    var correct = event.key;
    var letter = "letter" + wordNumber;

    if (wordNumber < 6) {
      document.getElementById(letter).textContent = correct;
      if (correct === letterReturn(wordSelect, wordNumber - 1)) {
        document.getElementById(letter).setAttribute("class", "c-box");
        wordNumber++;
      }
    }
  }
}

document.addEventListener("keydown", inputLetter);

function init() {
  resetGame();

}








/////////// in addition study


function navigate(direction) {
  index = index + direction;
  if (index < 0) {
    index = images.length - 1;
  } else if (index > images.length - 1) {
    index = 0;
  }
  currentImage = images[index];
  carousel.style.backgroundImage = "url('" + currentImage + "')";
}


todoList.addEventListener("click", function(event) {
  var element = event.target;
  // TODO: Describe the functionality of the following `if` statement.
  // when hit the button, remove matched array
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    // TODO: What will happen when the following functions are called?
    // store removed array and show
    storeTodos();
    renderTodos();
  }
});