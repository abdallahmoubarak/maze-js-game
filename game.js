window.addEventListener("DOMContentLoaded", function () {
  var game = document.getElementById("game");
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var status = document.getElementById("status");
  var boundary = document.getElementsByClassName("boundary");
  var score = 0;
  var gameOn = false;

  // event listeners
  start.addEventListener("mouseover", startGame);
  game.addEventListener("mouseleave", gameOver);
  for (var i = 0; i < boundary.length; i++) {
    boundary[i].addEventListener("mouseover", gameOver);
  }
  end.addEventListener("mouseover", endGame);

  // functions
  function startGame() {
    gameOn = true;
    status.innerHTML =
      "<div style='display:flex;gap:10rem;justify-content:center;color:green'><div>Game Starts </div><div>Score: " +
      score +
      "</div></div>";
    boundary = document.getElementsByClassName("boundary");
    for (var j = 0; j < boundary.length; j++) {
      boundary[j].style.borderColor = 'green';
    }
  }
  function gameOver() {
    if (gameOn) {
      gameOn = false;
      updateScore(0);
    }
  }

  function endGame() {
    if (gameOn) {
      gameOn = false;
      updateScore(1);
    }
  }

  function updateScore(s) {
    if (s) {
      score = score + 5;
    } else {
      score = score - 10;
    }
    updateStatus(s);
  }

  function updateStatus(state) {
    var strStat = state ? " won" : " lose";
    var color = state ? "green" : "red";
    status.innerHTML =
      "<div style='display:flex;gap:10rem;justify-content:center;color:" +
      color +
      "'><div>Status:" +
      strStat +
      "</div><div>Score: " +
      score +
      "</div></div>";

    boundary = document.getElementsByClassName("boundary");
    for (var j = 0; j < boundary.length; j++) {
      boundary[j].style.borderColor = color;
    }
  }

  // additional features
});
