let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

const paddle_Width = 100;
const paddle_height = 15;
const paddle_Margin_Bottom = 10;
let paddle = {
    x: canvas.width / 2 - paddle_Width / 2,
    y: canvas.height - paddle_height - paddle_Margin_Bottom,
    w: paddle_Width,
    h: paddle_height,
    dx: 5   // speed for paddle x axis
};

// creat the ball
const BALL_RADIUS = 10;

const ball = {
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    // speed : 4,
    dx: 2,
    dy: -2
}
const MAX_LEVELS = 3

var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 60;
var brickHeight = 40
var brickPadding = 10;
var brickOffsetTop = 100;
var brickOffsetLeft = 80;

let gameStart = document.getElementById('game-interface');
let gameStartImage = document.getElementById('gstart-img');
let startGameBtn = document.getElementById('play-now')
let gameOver = document.getElementById('gameover');
let youLost = document.getElementById('gover-img');
let youWon = document.getElementById('uwon-img');
let playAgain = document.getElementById('playagain');
var score = 0;
var lives = 3;
var level = 1;
let game=false

function drawball() {
    context.beginPath();
    context.fillStyle = '#0770c1';

    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    //context.strokeStyle = "blue";
    //context.stroke();
    context.closePath();
}
//move the ball
function movingball() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function initBallAndPaddle()
{
    ball.x = canvas.width/2;
    ball.y = canvas.height-30;
    ball.dx = 2;
    ball.dy = -2;
    paddle.x =  (canvas.width - paddle_Width) / 2;
}
function losingLives() {
       
    if(ball.x > paddle.x && ball.x < paddle.x + paddle_Width)
    {
        ball.dy =-ball.dy
        Paddle_Hit.play();
    } else {
        lives--;
       Losing.play();
        if (!lives){
            game=true
            gameLostFun()
        }else{
           initBallAndPaddle()
        }
    }
}

function clashWall() {

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        Wall_Hit.play();
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = - ball.dy;
        Wall_Hit.play();
    }
    else if(ball.y + ball.dy +paddle_height> canvas.height-ball.radius) {  
        losingLives()
}
}


// create paddle //


// Draw Paddle
function drawpaddle() {
    context.beginPath
    context.fillStyle = '#0770c1';
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);

    //context.strokeStyle = '#0770c1';
    //context.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);
    context.fill();
    context.closePath;
}


// Move paddle //

let rightArrow = false;
let leftArrow = false;

document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowRight") {
        rightArrow = true;
    }
    else if (e.code === "ArrowLeft") {
        leftArrow = true;
    }
}
);
document.addEventListener("keyup", function (e) {

    if (e.code === "ArrowRight") {
        rightArrow = false;
    }
    else if (e.code === "ArrowLeft") {
        leftArrow = false;
    }
}
);

function movePaddle() {
    // for paddle move inside canvas 
    if (rightArrow && paddle.x + paddle_Width < canvas.width) {
        paddle.x += paddle.dx
        // don't move outside the canvas
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx
    }
}

var bricks = [];
function initBrick(){
for (var r = 0; r < brickRowCount; r++) {
    bricks[r] = [];
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[r][c] = { x: 0, y: 0, status: 1, hitCount: 0 };
        // Brick_Hit.play();
    }
}
}


function drawBricks() {
    for (var r = 0; r < brickRowCount; r++) {
        for (var c = 0; c < brickColumnCount; c++) {
            if (bricks[r][c].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
                context.beginPath();

                   context.rect(brickX, brickY, brickWidth, brickHeight);
                    context.fillStyle = "#7e0a44";
           
                 if (bricks[r][c].hitCount == 1) {
                    context.rect(brickX, brickY, brickWidth, brickHeight);
                    context.fillStyle = "#0770c1";

                }
                context.fill();
                context.closePath();
            }
        }
    }
}



function drawScore() {
    context.font = "18px Lilita One";
    context.fillStyle = "#FFFFFF";

    context.drawImage(img, 27, 10, 25, 25);
    context.fillText("Score: " + score, 57, 27);

}


function drawLives() {

    context.font = "18px Lilita One ";
    context.fillStyle = "#FFFFFF";
    context.drawImage(img2, canvas.width - 130, 10, 25, 25);

    context.fillText("Lives: " + lives, canvas.width - 98, 27);
}

function drawLevel() {

    context.font = "18px Lilita One ";
    context.fillStyle = "#FFFFFF";
    context.drawImage(img3, canvas.width - 340, 10, 25, 25);

    context.fillText(level, canvas.width - 300, 29);
}
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
        loop();
    }
}

function gameWonFun() {
    gameOver.style.display = "flex";
    youWon.style.display = "block";
    playAgain.style.display = "block"
    canvas.style.display="none"
    

}

function gameLostFun() {
    gameOver.style.backgroundColor = "rgba(0, 0, 0, .5)"
    gameOver.style.display = "flex";
    youLost.style.display = "block";
    playAgain.style.display = "block"
    canvas.style.display="none"
   


}

function collisionDetection() {
    for (var r = 0; r < brickRowCount; r++) {
        for (var c = 0; c < brickColumnCount; c++) {
            var b = bricks[r][c];
            if (b.status == 1) {
                if (ball.x > b.x && ball.x < b.x + brickWidth &&
                    ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy = -ball.dy;
                    b.hitCount++;
                    score++;
                    Brick_Hit.play();

                    if (b.hitCount == 2)
                        b.status = 0

                    if (score == 2 * brickRowCount * brickColumnCount) {
                        level++
                         Winining.play();
                        if (level > MAX_LEVELS) {
                           
                            gameWonFun()
                            
                            game=true
                            
                        }else {
                            brickRowCount++
                            initBrick()
                            initBallAndPaddle()
                            drawBricks()
                            score =0

                        }

                    }
                }
            }
        }
    }
}


// const IMG = new Image();
// IMG.src ="html-color-codes-color-tutorials.jpg";

//add border
canvas.style.border = "1px solid black"


var img = new Image();
img.src = 'S3D.png';
var img2 = new Image();
img2.src = "H3D.png";
var img3 = new Image();
img3.src = "positive-dynamic-100.png";



function loop() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawpaddle();
    movePaddle();
    drawBricks();
    drawScore();
    drawLives();
    drawLevel();
    drawball();
    movingball();
    clashWall();
    collisionDetection()

if(!game){
   requestAnimationFrame(loop);
}
}   
initBrick()
gameStartFun();

const Wall_Hit= new Audio();
Wall_Hit.src="sounds_wall.mp3";

const Paddle_Hit= new Audio();
Paddle_Hit.src="paddle_hit.mp3";

const Brick_Hit =new Audio();
Brick_Hit.src="brick_hit.mp3";

const Winining= new Audio();
Winining.src="sounds_win.mp3";

const Losing= new Audio();
Losing.src="life_lost.mp3";

// const sound= document.getElementById("sound");
// soundElement.addEventListener("click",audio);
// function audio(){
//     let imgsrc = soundElement.getAttribute("src");
//     let SOUND_IMG = imgsrc ==
// }
// Wall_Hit.mute = Wall_Hit.mute ? false : true;
// Paddle_Hit.mute = Paddle_Hit.mute ? false : true;
// Brick_Hit.mute = Brick_Hit.mute ? false : true;
// Winining.mute = Winining.mute ? false : true;
// Losing.mute = Losing.mute ? false : true; 
