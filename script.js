const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = 500;

// Car physics
let car = {
    x: 100,
    y: 250,
    width: 60,
    height: 30,
    speed: 0,
    gravity: 0.2,
    friction: 0.02,
    acceleration: 0.5,
    maxSpeed: 5,
    fuel: 100
};

// Terrain settings
let terrain = [];
const terrainWidth = canvas.width;
const segmentLength = 40;

function generateTerrain() {
    let y = 300;
    for (let i = 0; i < terrainWidth / segmentLength; i++) {
        y += Math.random() * 30 - 15;
        terrain.push({ x: i * segmentLength, y });
    }
}

generateTerrain();

// Controls
let accelerate = false;
let brake = false;

document.getElementById("accelerate").addEventListener("mousedown", () => (accelerate = true));
document.getElementById("accelerate").addEventListener("mouseup", () => (accelerate = false));
document.getElementById("brake").addEventListener("mousedown", () => (brake = true));
document.getElementById("brake").addEventListener("mouseup", () => (brake = false));

function update() {
    if (accelerate && car.fuel > 0) {
        car.speed += car.acceleration;
        car.fuel -= 0.2;
    }
    if (brake) {
        car.speed -= car.acceleration * 1.5;
    }

    car.speed -= car.speed * car.friction;
    car.speed = Math.max(Math.min(car.speed, car.maxSpeed), -car.maxSpeed);
    car.x += car.speed;

    // Gravity effect
    car.y += car.gravity;

    if (car.y + car.height > terrain[Math.floor(car.x / segmentLength)].y) {
        car.y = terrain[Math.floor(car.x / segmentLength)].y - car.height;
        car.speed *= 0.8;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw terrain
    ctx.beginPath();
    ctx.moveTo(0, terrain[0].y);
    for (let i = 1; i < terrain.length; i++) {
        ctx.lineTo(terrain[i].x, terrain[i].y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();

    // Draw car
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Draw fuel
    ctx.fillStyle = "yellow";
    ctx.fillRect(20, 20, car.fuel * 2, 10);
    ctx.strokeRect(20, 20, 200, 10);

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
}

gameLoop();
