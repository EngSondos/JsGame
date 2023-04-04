let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')
let gameOver = document.getElementById('gameover');
let youLost = document.getElementById('youlost');
let youWon = document.getElementById('youwon');
let playAgain = document.getElementById('playagain');

playAgain.addEventListener('click', function () {
    location.reload();
})

function gameWonFun() {
    gameOver.style.display = "flex";
    youWon.style.display = "block";
    playAgain.style.display = "block"
}
function gameLostFun() {
    gameOver.style.backgroundColor = "rgba(0, 0, 0, .5)"
    gameOver.style.display = "flex";
    youLost.style.display = "block";
    playAgain.style.display = "block"
}
gameWonFun();