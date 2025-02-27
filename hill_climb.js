function loadHillClimbGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let car = { x: 50, y: canvas.height - 80, speed: 5, gravity: 2 };
    let obstacles = [];
    let isJumping = false;
    
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight") car.x += 20;
        if (e.key === "ArrowLeft") car.x -= 20;
        if (e.key === "ArrowUp" && !isJumping) {
            isJumping = true;
            let jumpHeight = 20;
            let jumpInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(jumpInterval);
                    isJumping = false;
                }
                car.y -= jumpHeight;
                jumpHeight--;
            }, 20);
        }
    };

    function generateObstacles() {
        if (Math.random() < 0.03) {
            obstacles.push({ x: canvas.width, y: canvas.height - 50, width: 40, height: 20 });
        }
    }

    function loop() {
        if (!gameActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        car.y += car.gravity;
        if (car.y > canvas.height - 50) car.y = canvas.height - 50;

        ctx.fillStyle = "red";
        ctx.fillRect(car.x, car.y, 50, 30);

        obstacles.forEach((obs, index) => {
            obs.x -= 5;
            ctx.fillStyle = "gray";
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

            if (obs.x < 0) obstacles.splice(index, 1);
        });

        generateObstacles();
        requestAnimationFrame(loop);
    }
    loop();
}
