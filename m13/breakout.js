/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author:
 * Date:
 * Project for COSC 1350
 *
 */
// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/*  create a "2d rendering context".
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it help you get to know what the ctx object can and can't draw.
 */
const ctx = canvas.getContext("2d");

//drawing a ball requires the x position, y position, and radius
let ballRadius = 15, xPos = canvas.width / 2, yPos = canvas.height / 2;

//xy move distance. These values are used to move the ball around.
let xMoveDist = 1, yMoveDist = 1;

let xPaddle = (canvas.width - 100) / 2; // Paddle initial x position
const paddleHeight = 15;
const paddleWidth = 100;
let moveLeft = false;
let moveRight = false;

//function that draws the ball on the canvas
const ballRender = () => {
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  //fill in the circular path with default color
  ctx.fillStyle = '#0095DD'; // Ball color
  ctx.fill();
  ctx.closePath();
}

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#FF0000'; // Paddle color
  ctx.fill();
  ctx.closePath();
};

/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* before drawing the next frame of animation.
*
* Right now, it only calls ballRender() over and over again.
* Changing the xPos and yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRender();
  drawPaddle();

  // Uncomment when you're ready to send the ball flying!
  xPos += xMoveDist;
  yPos += yMoveDist;
  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }
  if (yPos > canvas.height - ballRadius || yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }
  if (moveLeft && xPaddle > 0) {
    xPaddle -= 3;
  }
  if (moveRight && xPaddle < canvas.width - paddleWidth) {
    xPaddle += 3;
  }

  requestAnimationFrame(draw);
};

const keyDownHandler = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    moveRight = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    moveLeft = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    moveRight = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    moveLeft = false;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Start the animation
draw();
