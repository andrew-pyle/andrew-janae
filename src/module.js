import { getNaturalLanguageRange } from "./natural-lang-date-range.js";
import { createSnakeGame } from "./snake.js";

// Get Natural language date range
const startDate = new Date(2016, 6, 22).getTime();
const currentDate = new Date().getTime();
const naturalLanguageString = getNaturalLanguageRange(startDate, currentDate);
document.querySelector("#calculated-range").textContent = naturalLanguageString;

/* ========= Snake Game ========= */
const snakeGameDiv = document.querySelector(".snake-game");
const playSnakeButton = document.querySelector(".btn-start-snake");
const quitSnakeButton = document.querySelector(".btn-quit-snake");

// Start the game, hide the play button, and show the quit button
playSnakeButton.addEventListener("click", event => {
  playSnakeButton.classList.add("hidden");
  quitSnakeButton.classList.remove("hidden");
  createSnakeGame(snakeGameDiv);
  document.querySelector(".snake-game canvas").focus();
});

// Quit & clear the game, hide the quit button, and show the play button
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
5. Work on build and dev workflow. Need to run babel and serve concurrently?
*/
