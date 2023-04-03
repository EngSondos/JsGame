let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

var brickRowCount = 3;
var brickColumnCount = 5;
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
for(var r=0; r<brickRowCount; r++) {
  bricks[r] = [];
  for(var c=0; c<  brickColumnCount ; c++) {
    bricks[r][c] = { x: 0, y: 0, status: 1,hitCount:0 };
  }
}



function drawBricks() {
  for(var c=0; c<  brickRowCount ; c++) {
    for(var r=0; r<brickColumnCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.drawImage(imgb,brickX, brickY, brickWidth, brickHeight)

        if(bricks[c][r].hitCount == 0){
        ctx.drawImage(imgb,brickX, brickY, brickWidth, brickHeight)


        }else if (bricks[c][r].hitCount == 1){
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
