var $scoreList = document.getElementById("scoreList");
var $container = document.getElementById("container");


// Show the list of high score
function showList() {
  
  var highScore = JSON.parse(localStorage.getItem("highScore"));

  for (var i = 0; i < highScore.length; i++) {
    var score = highScore[i].score;
    var initial = highScore[i].initial;

    var li = document.createElement("li");
    li.innerHTML = initial+ " : " + score;
    li.setAttribute("class","li-style");

    // To set different backgrond color
    if(i%2 === 0){
      li.classList.add("li-color1");
    } else{
      li.classList.add("li-color2");
    }
    $scoreList.appendChild(li);
  }
}

// Go Back Button and Clear High Score Button
$container.addEventListener("click", function (event) {
  var element = event.target;

  // If click the "Go Back" button, go back to the main site
  if (element.matches("#goBack")) {
    window.location.href = "./index.html";
  }

  // if click the "Clear Highscores", remove local storage and clean the list
  if (element.matches("#clear")) {
    localStorage.clear();
    var li = document.querySelectorAll("li");
    for (var i = 0; i < li.length; i++) {
      li[i].remove();
    }    
  }
});

// show the list
showList();