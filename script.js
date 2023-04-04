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