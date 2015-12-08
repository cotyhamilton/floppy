var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 1200,                                //canvas dimensions
    height = 600,
    player = {                                   //player object
        x: 60, 
        y: 140,                             //starting point, middle of canvas
        width: 20,
        height: 20,                              //canvas dimensions must be divisible player dimensions
        move: 20
    },
    ball = {                                     //ball object
        x: 100,
        y: 140,
        width: 20,
        height: 20
    },
    goal = {
        x: 120,
        y: 260,
        width: 20,
        height: 20
    },
    
    mouse = new Image(),
    cheese = new Image(),
    box = new Image(),                           //image for boxes
    hole = new Image(),    
    boxes = [],                                  //border/boundaries/obstacles
    upCheck = false,
    downCheck = false,                           //checks squares around player for collision with boxes
    rightCheck = false,
    leftCheck = false,
    upBall = false,
    downBall = false,                            //checks squares around player for ball
    rightBall = false,
    leftBall = false,
    upBlock = false,
    downBlock = false,                           //checks squares around ball for collision when player is near
    rightBlock = false,
    leftBlock = false;

canvas.width = width;                            //applies dimensions to canvas
canvas.height = height;
box.src = "assets/brick.png";
mouse.src = "assets/player.png";
cheese.src = "assets/cheese.png";
hole.src = "assets/hole.png";

function pad(number, digits) {                   //pads timer with leading '0's
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function drawHeader(seconds) {                  //draws header
    intervalVar = setInterval(function () {
        ctx.clearRect(0, 0, width, 80);
        ctx.font = "20px 'Press Start 2P'";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText('LEVEL', 120, 25);
        ctx.fillText('1-1', 120, 55);
        ctx.fillText('- FLOPPY -', 600, 25);
        ctx.fillText('TIME', 1065, 25);
        ctx.fillText(pad(seconds.toString(), 5), 1070, 55);
                                                 //^ timer
        seconds++;
    }, 1000);
}

function drawBorder() {                          //draws border: header and footer
    for (var i = 0; i < width / 20; i++) {                //create header blocks
        boxes.push({
            x: i * 20,
            y: 80
        });
    }
    for (var i = 0; i < width/ 20; i++) {        //create footer blocks
        boxes.push({
            x: i * 20,
            y: height - 20,
        });
    }
    
    for (var i = 0; i < boxes.length; i++) {     //draw header and footer
        ctx.drawImage(box, boxes[i].x, boxes[i].y);
    }
}

function collisionCheck() {                      //check for collision
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].y == player.y - 20 && boxes[i].x == player.x) {
            upCheck = true;
            break;                               //if box is found above player
        }
        else {
            upCheck = false;
        }
    }
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].y == player.y + 20 && boxes[i].x == player.x) {
            downCheck = true;
            break;                               //box below player
        }
        else {
            downCheck = false;
        }
    }
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].y == player.y && boxes[i].x == player.x + 20) {
            rightCheck = true;
            break;                               //box to the right
        }
        else {
            rightCheck = false;
        }
    }
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].y == player.y && boxes[i].x == player.x - 20) {
            leftCheck = true;
            break;                               //box to the left
        }
        else {
            leftCheck = false;
        }
    }
    if (ball.y == player.y - 20 && ball.x == player.x) {
        upBall = true;                           //ball is above player
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].y == ball.y - 20 && boxes[i].x == ball.x) {
                upBlock = true;
                break;                           //box is above ball above player
            }
            else {
                upBlock = false;
            }
        }
    }
    else {
        upBall = false;
    }
    if (ball.y == player.y + 20 && ball.x == player.x) {
        downBall = true;                         //ball is below player
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].y == ball.y + 20 && boxes[i].x == ball.x) {
                downBlock = true;
                break;                           //box is below ball below player
            }
            else {
                downBlock = false;
            }
        }
    }
    else {
        downBall = false;
    }
    if (ball.y == player.y && ball.x == player.x + 20) {
        rightBall = true;                        //ball is right of player
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].y == ball.y && boxes[i].x == ball.x + 20) {
                rightBlock = true;
                break;                           //box is right of ball right of player
            }
            else {
                rightBlock = false;
            }
        }
    }
    else {
        rightBall = false;
    }
    if (ball.y == player.y && ball.x == player.x - 20) {
        leftBall = true;                         //ball is left of player
        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].y == ball.y && boxes[i].x == ball.x - 20) {
                leftBlock = true;
                break;                           //box is left of ball left of player
            }
            else {
                leftBlock = false;
            }
        }
    }
    else {
        leftBall = false;
    }
}
function move(evt){                              //event (keyboard input)
    switch (evt.keyCode) {
        case 38:                                 //Up arrow was pressed
            if (player.y > 0 && upCheck == false){ 
                if (upBall == true && upBlock == false) {
                    player.y -= player.move;
                    ball.y -= 20;                //if ball is above player, 
                }
                else if (upBall == false) {
                    player.y -= player.move;
                }
                collisionCheck();
            }
          break;
        case 40:                                 //Down arrow was pressed
            if (player.y + player.height < height && downCheck == false){ 
                if (downBall == true && downBlock == false) {
                    player.y += player.move;
                    ball.y += 20;
                }
                else if (downBall == false) {
                    player.y += player.move;
                }
                collisionCheck();
            }
          break;
        case 37:                                 //Left arrow was pressed
            if (player.x > 0 && leftCheck == false){ 
                if (leftBall == true && leftBlock == false) {
                    player.x -= player.move;
                    ball.x -= 20;
                }
                else if (leftBall == false) {
                    player.x -= player.move;
                }
                collisionCheck();
          }
          break;
        case 39:                                 //Right arrow was pressed
            if (player.x + player.width < width && rightCheck == false){ 
                if (rightBall == true && rightBlock == false) {
                    player.x += player.move;
                    ball.x += 20;
                }
                else if (rightBall == false) {
                    player.x += player.move;
                }
                collisionCheck();
          }
          break;
    }
}

function init() {
    drawHeader(0);
    drawBorder();
    createBoxes();
    return setInterval(update, 10);              //run update() every 10ms
}

function update() {
    ctx.clearRect(0, 100, width, height - 120);          //clears canvas
    ctx.drawImage(mouse, player.x, player.y);
    ctx.drawImage(cheese, ball.x, ball.y);
    ctx.drawImage(hole, goal.x, goal.y);
    drawBoxes();
}
window.addEventListener('keydown', move, true);  //if key is pressed, execute move()

window.addEventListener("load", function(){      //start init() upon page load
    init();
});