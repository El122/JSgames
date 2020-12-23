function start() {
    const bird = document.querySelector(".bird");
    const gameDisplay = document.querySelector(".playGroung");
    const ground = document.querySelector(".ground");
    const obstacle = document.createElement("div");

    let birdLeftSpace = 220;
    let birdBottomSpace = 100;

    let gravity = 2;

    let isGameOver = false;

    function createObstacle() {
        obstacle.classList.add("obstacle");
        gameDisplay.appendChild(obstacle);
    }

    function jump() {
        if (birdBottomSpace < 500) birdBottomSpace += 50;
        bird.style.bottom = birdBottomSpace + "px";
    }

    function control(e) {
        switch (e.keyCode) {
            case 32: jump(); break;
        }
    }

    function startGame() {
        if (!isGameOver) {
            birdBottomSpace -= gravity;
            bird.style.bottom = birdBottomSpace + "px";
            bird.style.left = birdLeftSpace + "px";
            createObstacle();
            document.addEventListener("keyup", control);
        }
    }

    let timerId = setInterval(startGame, 20);
}