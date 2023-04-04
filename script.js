let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

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