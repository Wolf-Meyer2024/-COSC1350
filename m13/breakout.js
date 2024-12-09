/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Wolfgang Meyer
 * Date: 11-25-2024
 * Project for COSC 1350
 *
 */
window.onload = function () {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const scoreBoard = document.getElementById('scoreBoard');
  const resetBtn = document.getElementById('resetBtn');

  let xPos = canvas.width / 2;
  let yPos = canvas.height - 30;
  let xMoveDist = 2;
  let yMoveDist = -2;
  const ballRadius = 10;

  const paddleHeight = 10;
  let paddleWidth = 75;
  let xPaddle = (canvas.width - paddleWidth) / 2;
  let moveRight = false;
  let moveLeft = false;
  // Function to calculate brick dimensions dynamically based on canvas size
  const brickWidth = Math.floor(canvas.width / 8);  // Adjust brick width dynamically
  const brickHeight = Math.floor(canvas.height / 20);  // Adjust brick height dynamically
  const brickColumnCount = Math.floor(canvas.width / brickWidth); // Dynamically adjust column count
  const brickRowCount = Math.floor(canvas.height / brickHeight / 3.5); // Dynamically adjust row count
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  let score = 0;
  let lives = 3;

  let bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
  }

  const powerUpTypes = ['expandPaddle', 'shrinkPaddle', 'extraLife', 'slowBall'];
  let activePowerUps = [];

  function drawBall() {
      ctx.beginPath();
      ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }

  function drawPaddle() {
      ctx.beginPath();
      ctx.rect(xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


  function drawPowerUps() {
      activePowerUps.forEach(powerUp => {
          ctx.beginPath();
          ctx.arc(powerUp.x, powerUp.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = powerUp.color;
          ctx.fill();
          ctx.closePath();
      });
  }

  function movePowerUps() {
      activePowerUps.forEach(powerUp => {
          powerUp.y += 2;
      });

      activePowerUps = activePowerUps.filter(powerUp => powerUp.y < canvas.height);
  }

  function checkPowerUpCollision() {
      activePowerUps.forEach((powerUp, index) => {
          if (
              powerUp.x > xPaddle &&
              powerUp.x < xPaddle + paddleWidth &&
              powerUp.y > canvas.height - paddleHeight - 10 &&
              powerUp.y < canvas.height - paddleHeight + 10
          ) {
              activatePowerUp(powerUp.type);
              activePowerUps.splice(index, 1);
          }
      });
  }

  function activatePowerUp(type) {
      switch (type) {
          case 'expandPaddle':
              paddleWidth = 100;
              setTimeout(() => {
                  paddleWidth = 75;
              }, 10000);
              break;
          case 'shrinkPaddle':
              paddleWidth = 50;
              setTimeout(() => {
                  paddleWidth = 75;
              }, 10000);
              break;
          case 'extraLife':
              lives++;
              updateScoreBoard();
              break;
          case 'slowBall':
              xMoveDist /= 2;
              yMoveDist /= 2;
              setTimeout(() => {
                  xMoveDist *= 2;
                  yMoveDist *= 2;
              }, 10000);
              break;
      }
  }

  function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
              const b = bricks[c][r];
              if (b.status == 1) {
                  if (xPos > b.x && xPos < b.x + brickWidth && yPos > b.y && yPos < b.y + brickHeight) {
                      yMoveDist = -yMoveDist;
                      b.status = 0;
                      score++;
                      updateScoreBoard();
                      if (score % 5 == 0) {
                          dropPowerUp(xPos, yPos);
                      }
                      if (score == brickRowCount * brickColumnCount) {
                          alert("YOU WIN, CONGRATULATIONS!");
                          document.location.reload();
                      }
                  }
              }
          }
      }
  }

  function dropPowerUp(x, y) {
      const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      const color =
          type == 'expandPaddle' ? 'green' :
          type == 'shrinkPaddle' ? 'red' :
          type == 'extraLife' ? 'blue' :
          'purple';
      activePowerUps.push({ x, y, type, color });
  }

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawPowerUps();
      movePowerUps();
      checkPowerUpCollision();
      collisionDetection();

      if (xPos + xMoveDist > canvas.width - ballRadius || xPos + xMoveDist < ballRadius) {
          xMoveDist = -xMoveDist;
      }
      if (yPos + yMoveDist < ballRadius) {
          yMoveDist = -yMoveDist;
      } else if (yPos + yMoveDist > canvas.height - ballRadius) {
          if (xPos > xPaddle && xPos < xPaddle + paddleWidth) {
              yMoveDist = -yMoveDist;
          } else {
              lives--;
              updateScoreBoard();
              if (!lives) {
                  alert("GAME OVER");
                  document.location.reload();
              } else {
                  xPos = canvas.width / 2;
                  yPos = canvas.height - 30;
                  xMoveDist = 2;
                  yMoveDist = -2;
                  xPaddle = (canvas.width - paddleWidth) / 2;
              }
          }
      }

      xPos += xMoveDist;
      yPos += yMoveDist;

      if (moveRight && xPaddle < canvas.width - paddleWidth) {
          xPaddle += 7;
      } else if (moveLeft && xPaddle > 0) {
          xPaddle -= 7;
      }

      requestAnimationFrame(draw);
  }

  function updateScoreBoard() {
      scoreBoard.innerHTML = `Score: ${score} Lives: ${lives}`;
  }

  function resetGame() {
      document.location.reload();
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  resetBtn.addEventListener("click", resetGame);

  function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
          moveRight = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
          moveLeft = true;
      }
  }

  function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
          moveRight = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
          moveLeft = false;
      }
  }

  draw();
};

