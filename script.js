
let canvas = document.getElementsByTagName('canvas')[0];
let context = canvas.getContext('2d');
let gameStart = document.getElementById('game-interface');
let gameStartImage = document.getElementById('gstart-img');
let startGameBtn = document.getElementById('play-now')
let gameOver = document.getElementById('gameover');
let youLost = document.getElementById('gover-img');
let youWon = document.getElementById('uwon-img');
let playAgain = document.getElementById('playagain');
let clicked = false;

startGameBtn.addEventListener('click', function () {
    clicked = true;
    gameStartFun();
})

playAgain.addEventListener('click', function () {
    location.reload();
})

function gameStartFun() {
    if (clicked == false) {
        gameStart.style.display = "flex";
        gameStartImage.style.display = "block";
        startGameBtn.style.display = "block";
    }
    else {
        gameStart.style.display = "none";
        gameStartImage.style.display = "none";
        startGameBtn.style.display = "none";
        draw();
    }
}

function gameWonFun() {
    gameOver.style.display = "flex";
    youWon.style.display = "block";
    playAgain.style.display = "block";
}

function gameLostFun() {
    gameOver.style.backgroundColor = "rgba(0, 0, 0, .5)"
    gameOver.style.display = "flex";
    youLost.style.display = "block";
    playAgain.style.display = "block";
}
gameStartFun();
