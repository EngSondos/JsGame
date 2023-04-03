let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

const IMG = new Image();
IMG.src ="html-color-codes-color-tutorials.jpg";

//add border
cvs.style.border = "1px solid black"

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
   
}
// final();
function loop(){
    context.drawImage(IMG, 0, 0);
    final();
}