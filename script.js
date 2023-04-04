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
