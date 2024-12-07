const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const resetButton = document.getElementById("resetButton");

const snakeSize = 20;
let snake = [{x: 100, y: 100}, {x: 80, y: 100}, {x: 60, y: 100}];
let food = {x: 200, y: 200};
let direction = 'RIGHT';
let gameStarted = false;
let score = 0;
let gameInterval;

document.addEventListener('keydown', (e) => {
  if (!gameStarted && e.code === 'Space') {
    startGame();
  }
  if (e.code === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.code === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (e.code === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.code === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);

function startGame() {
  gameStarted = true;
  gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
  // Move the snake
  const head = {x: snake[0].x, y: snake[0].y};

  if (direction === 'UP') head.y -= snakeSize;
  if (direction === 'DOWN') head.y += snakeSize;
  if (direction === 'LEFT') head.x -= snakeSize;
  if (direction === 'RIGHT') head.x += snakeSize;

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score=score+10;
    scoreDisplay.textContent = score;  // Update the score display
    food = generateFood();
  } else {
    snake.pop();
  }

  // Check if snake hits the wall or itself
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
    clearInterval(gameInterval);
    alert('Game Over!');
    resetGame();
    return;
  }

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'cyan' : 'lightgreen'; // Head is cyan, body is lightgreen
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });

  // Draw food
  ctx.fillStyle = 'yellow';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function generateFood() {
  let foodX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  let foodY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
  return {x: foodX, y: foodY};
}

function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  snake = [{x: 100, y: 100}, {x: 80, y: 100}, {x: 60, y: 100}];
  direction = 'RIGHT';
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = score;  // Reset the score display
  gameStarted = false;
}
