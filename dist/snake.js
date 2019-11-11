/* This module is based on 
Snake Game in JavaScript 
https://www.samclarke.com/js-snake-game/

Copyright 2016 Sam Clarke

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function createLoop(mainFn) {
  var last = Date.now();

  (function loop() {
    var now = Date.now();
    mainFn(now - last);
    requestAnimationFrame(loop);
    last = now;
  })();
}

function createCanvasGrid(parentNode, _width, _height) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = _width * size;
  canvas.height = _height * size;
  canvas.setAttribute("tabindex", "0");
  parentNode.appendChild(canvas);
  return {
    width: () => _width,
    height: () => _height,
    keydown: fn => canvas.addEventListener("keydown", fn),
    fill: function fill(cell) {
      var fillStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#fff";
      context.fillStyle = fillStyle;
      context.fillRect(cell.x * size, cell.y * size, size, size);
    },
    clear: () => {
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);
    },
    write: function write(cell, text) {
      var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      context.textAlign = style.textAlign || "left";
      context.font = style.font || "48px sans-serif";
      context.fillStyle = style.fillStyle || "#fff";
      context.fillText(text, cell.x * size, cell.y * size);
    }
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function isCellEqual(cellA, cellB) {
  return cellA.x === cellB.x && cellA.y === cellB.y;
}

function createSnakeGame(parentNode) {
  var drawInterval = 1000 / 15; // 1000 ms / 15 fps

  var grid = createCanvasGrid(parentNode, 40, 25, 15);

  var drawSnake = () => snake.map(cell => grid.fill(cell));

  var drawFood = () => grid.fill(foodCell, "red");

  var snake = [{
    x: 2,
    y: 0
  }, {
    x: 1,
    y: 0
  }, {
    x: 0,
    y: 0
  }];
  var isDead = false;
  var speedX = 1;
  var speedY = 0;
  var timeToNextDraw = 0;
  var foodCell = getRandomEmptyCell();

  function reset() {
    isDead = false;
    snake = [{
      x: 2,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 0
    }];
    speedX = 1;
    speedY = 0;
  }

  function drawGameOver() {
    var center = {
      x: grid.width() / 2,
      y: grid.height() / 2 - 2
    };
    var centerSub = {
      x: grid.width() / 2,
      y: grid.height() / 2 + 2
    };
    grid.write(center, "Game over", {
      textAlign: "center"
    });
    grid.write(centerSub, "Press space to continue...", {
      textAlign: "center",
      font: "bold 14px sans-serif"
    });
  }

  function drawScore() {
    var score = (snake.length - 3) * 10;
    var bottomRight = {
      x: grid.width() - 1,
      y: grid.height() - 1
    };
    grid.write(bottomRight, "Score " + score, {
      textAlign: "right",
      font: "bold 12px sans-serif",
      fillStyle: "lightblue"
    });
  }

  function getRandomEmptyCell() {
    var randomCell;

    if (snake.length >= grid.width() * grid.height()) {
      throw "No more empty cells!";
    }

    do {
      randomCell = {
        x: getRandomInt(0, grid.width()),
        y: getRandomInt(0, grid.height())
      };
    } while (snake.some(cell => isCellEqual(cell, randomCell)));

    return randomCell;
  }

  function checkIfDead() {
    var head = snake[0];
    return snake.slice(1).some(cell => isCellEqual(head, cell));
  }

  function setSnakeSpeed(x, y) {
    // Ignore if trying to go back on self
    if (speedY === 0 && y !== 0 || speedX === 0 && x !== 0) {
      speedY = y;
      speedX = x;
    }
  }

  function moveSnake() {
    var currentHead = snake[0];
    var head = {
      x: currentHead.x + speedX,
      y: currentHead.y + speedY
    };

    if (head.x >= grid.width()) {
      head.x = 0;
    } else if (head.x < 0) {
      head.x = grid.width() - 1;
    }

    if (head.y >= grid.height()) {
      head.y = 0;
    } else if (head.y < 0) {
      head.y = grid.height() - 1;
    }

    snake.unshift(head);

    if (isCellEqual(foodCell, head)) {
      foodCell = getRandomEmptyCell();
    } else {
      snake.pop();
    }
  }

  function main(dt) {
    timeToNextDraw -= dt;

    if (timeToNextDraw <= 0 && !isDead) {
      timeToNextDraw = drawInterval;
      isDead = checkIfDead();
      grid.clear();

      if (!isDead) {
        moveSnake();
        drawSnake();
        drawFood();
      } else {
        drawGameOver();
      }

      drawScore();
    }
  }

  grid.keydown(e => {
    var keyCodes = {
      // Up
      40: () => setSnakeSpeed(0, 1),
      // Right
      39: () => setSnakeSpeed(1, 0),
      // Up
      38: () => setSnakeSpeed(0, -1),
      // Left
      37: () => setSnakeSpeed(-1, 0),
      // Space
      32: () => isDead && reset()
    };

    if (e.keyCode in keyCodes) {
      keyCodes[e.keyCode]();
      e.preventDefault();
    }
  });
  createLoop(main);
}

export { createSnakeGame };