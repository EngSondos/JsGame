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
const BALL_RADIUS = 8;

const ball = {
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    // speed : 4,
    dx: 2,
    dy: -2
}
const MAX_LEVELS = 3

var brickRowCount = 2;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 60
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
let gameOver = document.getElementById('gameover');
let youLost = document.getElementById('youlost');
let youWon = document.getElementById('youwon');
let playAgain = document.getElementById('playagain');
var score = 0;
var lives = 3;
var level = 1;
let game=false

function drawball() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "black";
    context.fill();

    context.strokeStyle = "blue";
    context.stroke();
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
    } else {
        lives--;
       
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
    }
    if(ball.y - ball.radius < 0){
        ball.dy = - ball.dy;
    }
    else if(ball.y + ball.dy +paddle_height> canvas.height-ball.radius) {  
        losingLives()
}
}


// create paddle //


// Draw Paddle
function drawpaddle() {
    context.beginPath
    context.fillStyle = '#5900b3';
    context.rect(paddle.x, paddle.y, paddle.w, paddle.h);

    context.strokeStyle = '#b30000';
    context.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);
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
                context.drawImage(imgb, brickX, brickY, brickWidth, brickHeight)

                if (bricks[r][c].hitCount == 0) {
                    context.drawImage(imgb, brickX, brickY, brickWidth, brickHeight)


                } else if (bricks[r][c].hitCount == 1) {
                    context.drawImage(imgb2, brickX, brickY, brickWidth, brickHeight)


                }
                context.fill();
                context.closePath();
            }
        }
    }
}



function drawScore() {
    context.font = "18px Lilita One";
    context.fillStyle = "#000000";

    context.drawImage(img, 27, 5, 20, 20);
    context.fillText("Score: " + score, 53, 20);

}


function drawLives() {

    context.font = "18px Lilita One ";
    context.fillStyle = "#000000";
    context.drawImage(img2, canvas.width - 120, 5, 20, 20);

    context.fillText("Lives: " + lives, canvas.width - 90, 20);
}

function drawLevel() {

    context.font = "18px Lilita One ";
    context.fillStyle = "#000";
    context.drawImage(img3, canvas.width - 260, 5, 20, 20);

    context.fillText(level, canvas.width - 230, 20);
}

playAgain.addEventListener('click', function () {
    location.reload();
})

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

                    if (b.hitCount == 2)
                        b.status = 0

                    if (score == 2 * brickRowCount * brickColumnCount) {
                        level++
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
img.src = 'icons8-christmas-star-100.png';
var img2 = new Image();
img2.src = "heart.png";
var img3 = new Image();
img3.src = "level.png";

var imgb = new Image();
imgb.src = "b1.PNG";
var imgb2 = new Image();
imgb2.src = "b2.PNG"


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
loop()