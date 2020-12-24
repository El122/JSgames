document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector(".bird");
    const gameDisplay = document.querySelector(".playGround");
    const ground = document.querySelector(".ground");
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    let birdLeftSpace = 220;
    let birdBottomSpace = 100;
    let gap = 430;

    let gravity = 2;

    let isGameOver = false;

    function gameLogic() {
        birdBottomSpace -= gravity;
        bird.style.bottom = birdBottomSpace + "px";
        bird.style.left = birdLeftSpace + "px";
    }

    function control(e) {
        switch (e.keyCode) {
            case 32: jump(); break;
        }
    }

    function jump() {
        if (birdBottomSpace < 500) birdBottomSpace += 50;
        bird.style.bottom = birdBottomSpace + "px";
    }

    function createObstacle() {
        let obstacleLeftSpace = 500;
        let randomHeight = Math.random() * 100;
        let obstacleBottomSpace = randomHeight;

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("topObstacle");
        obstacle.style.left = obstacleLeftSpace + "px";
        topObstacle.style.left = obstacleLeftSpace + "px";
        obstacle.style.bottom = obstacleBottomSpace + "px";
        topObstacle.style.bottom = obstacleBottomSpace + gap + "px";

        function moveObstacle() {
            obstacleLeftSpace -= 2;
            obstacle.style.left = obstacleLeftSpace + "px";
            topObstacle.style.left = obstacleLeftSpace + "px";

            if (obstacleLeftSpace === 0) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (obstacleLeftSpace > 200 && obstacleLeftSpace < 280 && birdLeftSpace === 220 &&
                ((birdBottomSpace < obstacleBottomSpace + 140) || (birdBottomSpace > (obstacleBottomSpace - 200 + gap))) ||
                birdBottomSpace <= 0) {
                gameOver();
                clearInterval(timerId);
            }
        }

        let timerId = setInterval(moveObstacle, 10);
        if (!isGameOver) setTimeout(createObstacle, 3000);
    }

    let gameTimerId = setInterval(gameLogic, 20);
    document.addEventListener("keyup", control);
    createObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true
        document.removeEventListener("keyup", control);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
    }
});