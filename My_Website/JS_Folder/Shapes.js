const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Function to draw a trapezoid
function drawTrapezoid() {

    ctx.beginPath();
    ctx.moveTo(100,100); // start point
    ctx.lineTo(300,100); // top base
    ctx.lineTo(250,200); // right side
    ctx.lineTo(150,200); // bottom side
    ctx.closePath();    // left side
    ctx.fillStyle = "black";
    ctx.fill();
}

// Function to draw a red diamond
function drawDiamond() {
    ctx.save();
    ctx.translate(400, 100); // Move to center position for the diamond
    ctx.rotate(Math.PI / 4); // Rotate 45 degrees
    ctx.fillStyle = "red";
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
}

// Function to draw a zigzagging line
function drawZigzag() {
    ctx.beginPath();
    ctx.moveTo(50, 300); // Start point
    let x = 50;
    let y = 300;
    for (let i = 0; i < 10; i++) {
        x += 40;
        y = (i % 2 === 0) ? y + 40 : y - 40;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

// Function to draw a spiral
function drawSpiral() {
    let x = 600;
    let y = 300;
    let angle = 0;
    let radius = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < 100; i++) {
        angle += Math.PI / 16; // Increment angle
        radius += 2; // Increment radius
        x = 600 + radius * Math.cos(angle);
        y = 300 + radius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "green";
    ctx.stroke();
}

// Function to draw a yellow star
function drawStar() {
    const cx = 200; // Center x
    const cy = 500; // Center y
    const spikes = 5;
    const outerRadius = 70;
    const innerRadius = 30;
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// Draw all shapes
drawTrapezoid();
drawDiamond();
drawZigzag();
drawSpiral();
drawStar();

