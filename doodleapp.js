function start() {

    const grid = document.querySelector(".grid");
    const doodler = document.createElement("div");
    const startButton = document.getElementsByClassName("startButton")[0];

    let doodleLeftSpace = 20;
    let startPoint = 120;
    let doodleBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let windowHeight = 600;
    let platforms = [];

    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;

    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;

    let score = 0;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodleLeftSpace = platforms[0].leftSpace + 13;
        doodler.style.left = doodleLeftSpace + "px";
        doodler.style.bottom = doodleBottomSpace + "px";
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottomSpace = newPlatBottom;
            this.leftSpace = Math.random() * 315;
            this.visual = document.createElement("div");

            const visual = this.visual;
            visual.classList.add("platform");
            visual.style.left = this.leftSpace + "px";
            visual.style.bottom = this.bottomSpace + "px";
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; ++i) {
            let platformGap = windowHeight / platformCount;
            let newPlatBottom = 100 + platformGap * i;
            let newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if (doodleBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottomSpace -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottomSpace + "px";

                if (platform.bottomSpace < 10) {
                    ++score;

                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove("platform");
                    platforms.shift();

                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            });
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {
            doodleBottomSpace += 20;
            doodler.style.bottom = doodleBottomSpace + "px";
            if (doodleBottomSpace > startPoint + 200) {
                fall();
            }
        }, 30);
    }

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function () {
            doodleBottomSpace -= 5;
            doodler.style.bottom = doodleBottomSpace + "px";
            if (doodleBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach(platform => {
                if (
                    (doodleBottomSpace >= platform.bottomSpace) &&
                    (doodleBottomSpace <= platform.bottomSpace + 15) &&
                    ((doodleLeftSpace + 60) >= platform.leftSpace) &&
                    (doodleLeftSpace <= platform.leftSpace + 85) &&
                    !isJumping
                ) {
                    startPoint = doodleBottomSpace;
                    jump();
                }
            });
        }, 30);
    }

    function control(e) {
        switch (e.key) {
            case "ArrowLeft": moveLeft(); break;
            case "ArrowRight": moveRight(); break;
            case "ArrowUp": moveStraight(); break;
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }

        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if (doodleLeftSpace >= 0) {
                doodleLeftSpace -= 5;
                doodler.style.left = doodleLeftSpace + "px";
            } else {
                moveRight();
            }
        }, 30)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }

        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if (doodleLeftSpace <= 400 - 60) {
                doodleLeftSpace += 5;
                doodler.style.left = doodleLeftSpace;
            } else {
                moveLeft();
            }
        }, 30)
    }

    function moveStraight() {
        clearInterval(leftTimerId);
        isGoingLeft = false;
        clearInterval(rightTimerId);
        isGoingRight = false;
    }

    function gameOver() {
        isGameOver = true;

        grid.innerHTML = score;

        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);

        startButton.style.display = "block";
    }


    startButton.style.display = "none";

    if (!isGameOver) {
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms, 30);
        jump();
        document.addEventListener("keyup", control);
    }

}