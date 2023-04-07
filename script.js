let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

let isLevelUp = true
    const  MAX_LEVELS =3
function levelUP ()
    {
        for(var c=0; c<brickColumnCount; r++) {
        for(var r=0; r<brickRowCount; r++) {
            isLevelUp = isLevelUp && !b[c][r].status
        }
    }
    if(isLevelUp)
    {
        if(level>MAX_LEVELS)
        {
            //show When win screen
        }
        dx=3
        dy=-3

        brickRowCount++
        drawBricks()
        level++
    }


        }
function collisionDetection() {
    for(var c=0; c<brickRowCount; c++) {
        for(var r=0; r<brickColumnCount; r++) {
            var b = bricks[c][r];
            if(b.status ==1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.hits ++;
                    score++;

                    if(b.hits ==2)
                        b.status =0
                    
                    if(score == 2 *brickRowCount*brickColumnCount) {
                        level++
                        console.log(level)
                        if(level>MAX_LEVELS)
                            { 
                                //screen to win 
                                alert("YOU WIN, CONGRATS!");}
                            else{
                              
                                whenLevelUp()

                            }
                       
                    }
                }
            }
        }
    }
}

function draw (){
    collisionDetection()
}

// const IMG = new Image();
// IMG.src ="html-color-codes-color-tutorials.jpg";

//add border
canvas.style.border = "1px solid black"

// creat the ball
 const BALL_RADIUS= 15;

const ball ={
    x : canvas.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    // speed : 4,
    dx : 4,
    dy : -4
}
function drawball(){
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    context.fillStyle = "black";
    context.fill();
     
    context.strokeStyle = "blue";
    context.stroke();
    context.closePath();
}
//move the ball
function movingball(){
    ball.x += ball.dx;
    ball.y += ball.dy;
} 
 
function clashWall(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    if(ball.y - ball.radius < 0){
        ball.dy = - ball.dy;
    }
}
// function losingLife(){
// };

function final(){

   drawball(); 
   movingball();
   clashWall();
   collisionDetection()

   
}
final();
function loop(){
    context.drawImage(IMG, 0, 0);
    final();
}





var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 50;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var level = 1;

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



var bricks = [];
for(var r=0; r< brickRowCount; r++) {
  bricks[r] = [];
  for(var c=0; c< brickColumnCount; c++) {
    bricks[r][c] = { x: 0, y: 0, status: 1,hitCount:0 };
  }
}



function drawBricks() {
  for(var r=0; r<  brickRowCount; r++) {
    for(var c=0; c<brickColumnCount; c++) {
      if(bricks[r][c].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        ctx.beginPath();
        ctx.drawImage(imgb,brickX, brickY, brickWidth, brickHeight)

        if(bricks[r][c].hitCount == 0){
        ctx.drawImage(imgb,brickX, brickY, brickWidth, brickHeight)


        }else if (bricks[r][c].hitCount == 1){
          ctx.drawImage(imgb2,brickX, brickY, brickWidth, brickHeight)
          

        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}



function drawScore() {
    ctx.font = "18px Lilita One";
    ctx.fillStyle = "#FFFFFF";
  
        ctx.drawImage(img, 27, 5, 20, 20); 
        ctx.fillText("Score: " + score, 53, 20); 
    
  }
  
  
  function drawLives() {
  
    ctx.font = "18px Lilita One ";
    ctx.fillStyle = "#FFFFFF";
    ctx.drawImage(img2, canvas.width-120, 5, 20, 20); 
  
    ctx.fillText("Lives: "+lives, canvas.width-90, 20);
  }
  
  function drawLevel() {
  
    ctx.font = "18px Lilita One ";
    ctx.fillStyle = "#FFFFFF";
    ctx.drawImage(img3, canvas.width-260, 5, 20, 20); 
  
    ctx.fillText(level, canvas.width-230, 20);
  }
  
  function draw() {
     drawBricks();
     drawScore();
     drawLives();
     drawLevel();
  
   }
  
  draw();

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

    // create paddle //
    const paddle_Width = 55;
    const paddle_height =7;
    const paddle_Margin_Bottom = 10;
    var paddleX = (canvas.width-paddle_Width)/2;
    let paddle ={
        x : canvas.width/2 - paddle_Width/2,
        y : canvas.height - paddle_height - paddle_Margin_Bottom,
        w : paddle_Width,
        h : paddle_height,
        dx :5   // speed for paddle x axis
    };

    // Draw Paddle
    function drawpaddle(){
        context.beginPath
        context.fillStyle = '#5900b3';
        context.rect(paddle.x ,paddle.y ,paddle.w ,paddle.h); 
        
        context.strokeStyle = '#b30000';
        context.strokeRect(paddle.x , paddle.y ,paddle.w ,paddle.h);
        context.closePath;
    }


    // Move paddle //
   
    let rightArrow = false ; 
    let leftArrow = false;

   document.addEventListener("keydown", function (e){
    if(e.code === "ArrowRight" ){
            rightArrow = true;
      }
      else if(e.code === "ArrowLeft" ){
             leftArrow = true;
      }
    }
   );   
   document.addEventListener("keyup", function (e){
 
     if(e.code === "ArrowRight" ){
             rightArrow = false;
       }
       else if(e.code === "ArrowLeft" ){
              leftArrow = false;
       }
     }
    );
     
    function movePaddle() {
        // for paddle move inside canvas 
        if (rightArrow && paddle.x + paddle_Width < canvas.width) {
            paddle.x += paddle.dx
        // don't move outside the canvas
        } else if(leftArrow && paddle.x > 0 ){
            paddle.x -= paddle.dx
        }
    }
    
    function loop(){

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawpaddle();
        movePaddle();
       

        requestAnimationFrame(loop);
    }
loop(); 
