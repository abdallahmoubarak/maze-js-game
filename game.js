window.addEventListener("DOMContentLoaded", function () {
  var status = document.getElementById("status");

  status.outerHTML =
    "<div><div id='controller' ></div><h2 id='status'>Begin by moving your mouse over the 'S'.</h2></div>";

  status = document.getElementById("status");
  var controller = document.getElementById("controller");
  var game = document.getElementById("game");
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var boundary = document.getElementsByClassName("boundary");
  var score = 0;
  var gameOn = false;

  var heighestScore = 0;

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
      score = score + 1;
      if (score > parseInt(heighestScore)) {
        heighestScore = score;
        document.getElementById("hscore").innerHTML = heighestScore;
      }
    } else {
      if (score > 0) {
        score = score - 1;
      }
    }
    updateStatus(s);
  }

  function updateStatus(state) {
    var strStat = state ? "won" : "lose";
    var color = state ? "green" : "red";
    status.innerHTML =
      "<div style='display:flex;gap:10rem;justify-content:center;color:" +
      color +
      "'><div>Status:" +
      strStat +
      "</div><div>Score: " +
      score +
      "</div></div>";
  }

  // additional features
  controller.innerHTML =
    "<div style='display:flex;gap:1rem;font-size:1.2rem;justify-content:center;'><input id='userNameInput'  style='font-size:1.2rem;padding:.2rem 1rem;border-radius:.3rem;border:1px solid #8888ff;' placeholder='your name'/> <div>heighest score: <span id='hscore'>0</span></div> <button id='savebtn' style='background:black;border:none;color:white;font-size:1.2rem;padding:.2rem 1rem;border-radius:.3rem;cursor:pointer'>save</button></div>";

  var userNameInput = document.getElementById("userNameInput");
  // updateScore from localstorage depending on user
  userNameInput.addEventListener("input", function (e) {
    document.getElementById("hscore").innerHTML = 0;
    if (localStorage.getItem(e.target.value) != null) {
      document.getElementById("hscore").innerHTML = localStorage.getItem(
        e.target.value
      );
      if (heighestScore < parseInt(localStorage.getItem(e.target.value))) {
        heighestScore = parseInt(localStorage.getItem(e.target.value));
      }
    }
  });
  // saving heighestScore

  var savebtn = document.getElementById("savebtn");

  savebtn.addEventListener("click", function () {
    var username = document.getElementById("userNameInput").value;
    if (
      !!username &&
      (parseInt(localStorage.getItem(username)) < heighestScore ||
        localStorage.getItem(username) == null)
    ) {
      localStorage.setItem(username, heighestScore);
      status.innerHTML = "Begin by moving your mouse over the 'S'.";
      document.getElementById("hscore").innerHTML = heighestScore;
      score = 0;
    } else {
      status.innerHTML = "Please, use proper username";
    }
  });
});
