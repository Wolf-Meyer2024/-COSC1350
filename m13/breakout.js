/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Wolfgang Meyer
 * Date: 11-25-2024
 * Project for COSC 1350
 *
 */
window.onload = function() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Ball variables
  let ballRadius = 15;
  let xPos = canvas.width / 2;
  let yPos = canvas.height - 30;
  let xMoveDist = 1;  // Reduced speed
  let yMoveDist = -1.5;  // Reduced speed

  // Paddle variables
  let paddleHeight = 10;
  let paddleWidth = 75;
  let xPaddle = (canvas.width - paddleWidth) / 2;

  let moveLeft = false;
  let moveRight = false;

  // Lives and game over flag
  let lives = 3;
  let gameOver = false;

  // Bricks setup
  const brickRowCount = 5;
  const brickColumnCount = 7; // Increased the column count to ensure full width coverage
  const brickWidth = (canvas.width - (brickColumnCount + 1) * 10) / brickColumnCount; // Adjust brick width based on padding
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  // Create bricks
  let bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, hit: false };
    }
  }

  // Power-up settings
  let powerUps = [];
  const powerUpTypes = {
    PADDLE_WIDE: 'paddle_wide',
    PADDLE_NARROW: 'paddle_narrow',
    BALL_SPEED_UP: 'ball_speed_up',
    BALL_SPEED_DOWN: 'ball_speed_down',
    EXTRA_LIFE: 'extra_life',
  };

  // Power-up constructor
  function PowerUp(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.type = type;
    this.speed = 2;
  }

  // Ball rendering function
  const ballRender = () => {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  // Paddle rendering function
  const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
  };

  // Draw bricks
  const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (!bricks[c][r].hit) {
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  // Draw power-ups
  function drawPowerUps() {
    powerUps.forEach((powerUp) => {
      ctx.beginPath();
      ctx.rect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      ctx.fillStyle = '#FF5733';
      ctx.fill();
      ctx.closePath();
    });
  }

  // Move power-ups
  function movePowerUps() {
    powerUps.forEach((powerUp) => {
      powerUp.y += powerUp.speed; // Move the power-up down
    });
  }

  // Detect collision between ball and power-ups
  function checkPowerUpCollision() {
    powerUps.forEach((powerUp, index) => {
      if (
        xPos > powerUp.x && 
        xPos < powerUp.x + powerUp.width &&
        yPos > powerUp.y && 
        yPos < powerUp.y + powerUp.height
      ) {
        activatePowerUp(powerUp);
        powerUps.splice(index, 1);
      }
    });
  }

  // Detect collision between paddle and power-ups
  function checkPaddlePowerUpCollision() {
    powerUps.forEach((powerUp, index) => {
      if (
        xPaddle < powerUp.x + powerUp.width &&
        xPaddle + paddleWidth > powerUp.x &&
        canvas.height - paddleHeight < powerUp.y + powerUp.height &&
        canvas.height - paddleHeight + 5 > powerUp.y
      ) {
        activatePowerUp(powerUp);
        powerUps.splice(index, 1);
      }
    });
  }

  // Activate the power-up
  function activatePowerUp(powerUp) {
    switch (powerUp.type) {
      case powerUpTypes.PADDLE_WIDE:
        paddleWidth += 50;
        break;
      case powerUpTypes.PADDLE_NARROW:
        paddleWidth = Math.max(20, paddleWidth - 50);
        break;
      case powerUpTypes.BALL_SPEED_UP:
        xMoveDist *= 1.2;
        yMoveDist *= 1.2;
        break;
      case powerUpTypes.BALL_SPEED_DOWN:
        xMoveDist *= 0.8;
        yMoveDist *= 0.8;
        break;
      case powerUpTypes.EXTRA_LIFE:
        lives++;
        break;
      default:
        break;
    }
  }

  // Spawn power-ups when a brick is hit
  function spawnPowerUp(x, y) {
    const types = Object.values(powerUpTypes);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const powerUp = new PowerUp(x, y, randomType);
    powerUps.push(powerUp);
  }

  // Ball and paddle collision detection logic
  function ballAndPaddleCollision() {
    if (
      xPos > xPaddle && 
      xPos < xPaddle + paddleWidth &&
      yPos + ballRadius > canvas.height - paddleHeight
    ) {
      yMoveDist = -yMoveDist;
    }
  }

  // Ball and brick collision detection logic
  function brickCollisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let brick = bricks[c][r];
        if (!brick.hit && xPos > brick.x && xPos < brick.x + brickWidth && yPos > brick.y && yPos < brick.y + brickHeight) {
          brick.hit = true;
          spawnPowerUp(brick.x + brickWidth / 2, brick.y + brickHeight / 2);
          yMoveDist = -yMoveDist;
        }
      }
    }
  }

  // Check if the ball hits the floor
  function checkBallFloorCollision() {
    if (yPos + ballRadius > canvas.height) {
      lives--;
      if (lives <= 0) {
        gameOver = true;
      } else {
        // Reset ball position
        xPos = canvas.width / 2;
        yPos = canvas.height - 30;
        xMoveDist = 1;  // Reset speed
        yMoveDist = -1.5;  // Reset speed
      }
    }
  }

  // Ball and ceiling collision
  function checkBallCeilingCollision() {
    if (yPos - ballRadius < 0) {
      yMoveDist = -yMoveDist;
    }
  }

  // Ball and side wall collision
  function checkBallSideWallCollision() {
    if (xPos - ballRadius < 0 || xPos + ballRadius > canvas.width) {
      xMoveDist = -xMoveDist;  // Reverse direction on collision with walls
    }
  }

  // Draw everything
  const draw = () => {
    if (gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '30px Arial';
      ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ballRender();
    drawPaddle();
    drawBricks();
    drawPowerUps();

    // Update power-ups' positions and check collisions
    movePowerUps();
    checkPowerUpCollision();
    checkPaddlePowerUpCollision();

    // Ball and side wall collision
    checkBallSideWallCollision();

    // Ball position update
    xPos += xMoveDist;
    yPos += yMoveDist;

    // Paddle movement
    if (moveRight && xPaddle < canvas.width - paddleWidth) {
      xPaddle += 7;
    } else if (moveLeft && xPaddle > 0) {
      xPaddle -= 7;
    }

    ballAndPaddleCollision();
    brickCollisionDetection();
    checkBallFloorCollision();
    checkBallCeilingCollision();

    requestAnimationFrame(draw);
  };

  // Handle key events for paddle movement
  document.addEventListener('keydown', (e) => {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      moveRight = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      moveLeft = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      moveRight = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      moveLeft = false;
    }
  });

  // Start the game
  draw();
};
