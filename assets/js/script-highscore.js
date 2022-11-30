var $container = document.getElementById("container");


$container.addEventListener("click", function(event){
  var element = event.target;

  if (element.matches("#goBack")) {
    window.location.href = "./index.html";
  }
  if (element.matches("#clear")){
    localStorage.clear();
  }
 
});

