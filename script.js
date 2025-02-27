let gameActive = false;

function showMenu() {
    document.querySelector(".game-container").style.display = "flex";
    document.querySelector(".back-btn").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
    gameActive = false;
}

function startGame(gameName) {
    document.querySelector(".game-container").style.display = "none";
    document.querySelector(".back-btn").style.display = "block";
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";
    gameActive = true;

    if (gameName === "flappyRocket") {
        let y = canvas.height / 2, velocity = 0, gravity = 0.5;
        document.onkeydown = () => velocity = -10;

        function loop() {
            if (!gameActive) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            velocity += gravity;
            y += velocity;
            ctx.fillStyle = "white";
            ctx.fillRect(50, y, 30, 30);
            requestAnimationFrame(loop);
        }
        loop();

    } else if (gameName === "hillClimb") {
        loadHillClimbGame();

    } else if (gameName === "spaceShooter") {
        let y = canvas.height / 2;
        document.onkeydown = () => y -= 10;

        function loop() {
            if (!gameActive) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "cyan";
            ctx.fillRect(100, y, 40, 40);
            requestAnimationFrame(loop);
        }
        loop();

    } else if (gameName === "2048Game") {
        ctx.fillStyle = "gold";
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("2048", 120, 160);
    }
}
