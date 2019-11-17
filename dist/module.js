import { createNaturalLanguageDuration } from "./NaturalDuration.bs.js";
import { createSnakeGame } from "./snake.js"; // Get Natural language date range

var startDate = new Date(2016, 6, 22).getTime();
var currentDate = new Date().getTime();
var naturalLanguageString = createNaturalLanguageDuration(startDate, currentDate);
document.querySelector("#calculated-range").textContent = naturalLanguageString;
/* ========= Snake Game ========= */

var snakeGameDiv = document.querySelector(".snake-game");
var playSnakeButton = document.querySelector(".btn-start-snake");
var quitSnakeButton = document.querySelector(".btn-quit-snake"); // Start the game, hide the play button, and show the quit button

playSnakeButton.addEventListener("click", event => {
  playSnakeButton.classList.add("hidden");
  quitSnakeButton.classList.remove("hidden");
  createSnakeGame(snakeGameDiv);
  document.querySelector(".snake-game canvas").focus();
}); // Quit & clear the game, hide the quit button, and show the play button

quitSnakeButton.addEventListener("click", () => {
  snakeGameDiv.innerHTML = "";
  playSnakeButton.classList.remove("hidden");
  quitSnakeButton.classList.add("hidden");
});
/*
TODO
2. Calculate snake game sizing so it can be responsive/will work on iPhone
3. Make snake game return a reference to the canvas element so we can avoid
   DOM manipulations based on global knowledge & query selectors
   e.g. document.querySelector(".snake-game canvas").focus();
4. Make show/hide play & quit buttons not dependent on knowledge of their
   selectors. Similar problem as #3 above
*/