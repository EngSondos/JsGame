let canvas = document.getElementsByTagName('canvas')[0]
let context = canvas.getContext('2d')

    // create paddle //
    const paddle_Width = 150;
    const paddle_height =20;
    const paddle_Margin_Bottom = 30;
    const paddle ={
        x : canvas.width/2 - paddle_Width/2, // middle of canvas 
        y : canvas.height - paddle_height - paddle_Margin_Bottom,
        w : paddle_Width,
        h : paddle_height,
        dx :5   // speed for paddle x axis
    };

    // Draw Paddle
    function drawpaddle(){
        context.beginPath();
        context.rect(paddle.x ,paddle.y ,paddle.w ,paddle.h);
        context.fillStyle = '#5900b3';
        context.fill();
    
        context.strokeStyle = '#b30000';
        context.stroke();

        context.closePath;
        
    }


    // Move paddle //
   
    let rightArrow = false ; 
    let leftArrow = false;
    // control paddle with keyboard
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
    
  
   // control with Mouse
    document.addEventListener('mousemove',function(e){
        // mouse position //
        let relativeX = e.clientX - canvas.offsetLeft ;  
        // if mouse inside canvas
        if( 
            relativeX > paddle_Width / 2 &&
            relativeX + paddle_Width / 2 < canvas.width
        ){
            paddle.x = relativeX -paddle_Width /2 ;
        }
       
    }) ;
     
  
    function loop(){

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawpaddle();
        movePaddle();
       

        requestAnimationFrame(loop);
    }
loop(); 


