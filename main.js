window.onload = function(){
  var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 1200,                                //canvas dimensions
  height = 600,
  borderWidth = 20,
  borderFromTop = 80,
  player = {                                   //player object
    x: width/2,
    y: height/2,                             //starting point, middle of canvas
    width: 20,
    height: 20,                              //canvas dimensions must be divisible player dimensions
    move: 20,
    moveUp: function(){
      this.y -= this.move;
    },
    moveDown: function(){
      this.y += this.move;
    },
    moveLeft: function(){
      this.x -= this.move;
    },
    moveRight: function(){
      this.x += this.move;
    }
  },
  ball = {                                     //ball object
    x: 200,
    y: 200,
    width: 20,
    height: 20,
    move: 20,
    moveUp: function(){
      this.y -= this.move;
    },
    moveDown: function(){
      this.y += this.move;
    },
    moveLeft: function(){
      this.x -= this.move;
    },
    moveRight: function(){
      this.x += this.move;
    }
  },
  box = new Image(),                           //image for boxes
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
  box.src = "images/box.gif";

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
      ctx.fillText('TIME', 1065, 25);
      ctx.fillText(pad(seconds.toString(), 5), 1070, 55);
      //^ timer
      seconds++;
    }, 1000);
  }

  function addBricks(brickHeight){
    for (var i = 0; i < width / borderWidth; i++) {                //create header blocks
      boxes.push({
        x: i * borderWidth,
        y: brickHeight
      });
    }
  }
  function drawBorder() {                          //draws border: header and footer
    addBricks(borderFromTop);
    addBricks(height - borderWidth);
    for (var i = 0; i < boxes.length; i++) {     //draw header and footer
      ctx.drawImage(box, boxes[i].x, boxes[i].y);
    }
  }
  function blockAbove(object){
    return (object.y - 40 < borderFromTop);
  }
  function blockBelow(object){
    return (height - borderWidth == object.y + 20);
  }
  function blockToLeft(object){
    return (0 === object.x);
  }
  function blockToRight(object){
    return (width < object.x + 40);
  }

  function ballNear(ballSame, playerSame, ballDiff, playerDiff, offset){
    return (ballSame == playerSame && ballDiff == playerDiff + offset);
  }

  function collisionCheck() {                      //check for collision
    upCheck = blockAbove(player);
    downCheck = blockBelow(player);
    rightCheck = blockToRight(player);
    leftCheck = blockToLeft(player);
    if (ballNear(player.x, ball.x, ball.y, player.y, -player.width)) {
      upBall = true;                           //ball is above player
      upBlock = blockAbove(ball);
    }
    else {
      upBall = false;
    }
    if (ballNear(player.x, ball.x, ball.y, player.y, player.width)) {
      downBall = true;                         //ball is below player
      downBlock = blockBelow(ball);
    }
    else {
      downBall = false;
    }
    if (ballNear(player.y, ball.y, player.x, ball.x, -player.width)) {
      rightBall = true;                        //ball is right of player
      rightBlock = blockToRight(ball);
    }
    else {
      rightBall = false;
    }
    if (ballNear(player.y, ball.y, player.x, ball.x, player.width)) {
      leftBall = true;                         //ball is left of player
      leftBlock = blockToLeft(ball);
    }
    else {
      leftBall = false;
    }
  }

  function move(evt){                              //event (keyboard input)
    switch (evt.keyCode) {
      case 38:                                 //Up arrow was pressed
        if (player.y > 0 && !upCheck){
        if (upBall && !upBlock) {
          player.moveUp();
          ball.moveUp();                //if ball is above player,
        }
        else if (!upBall) {
          player.moveUp();
        }
        collisionCheck();
      }
      break;
      case 40:                                 //Down arrow was pressed
        if (player.y + player.height < height && !downCheck){
        if (downBall && !downBlock) {
          player.moveDown();
          ball.moveDown();
        }
        else if (!downBall) {
          player.moveDown();
        }
        collisionCheck();
      }
      break;
      case 37:                                 //Left arrow was pressed
        if (player.x > 0 && !leftCheck){
        if (leftBall && !leftBlock) {
          player.moveLeft();
          ball.moveLeft();
        }
        else if (!leftBall) {
          player.moveLeft();
        }
        collisionCheck();
      }
      break;
      case 39:                                 //Right arrow was pressed
        if (player.x + player.width < width && !rightCheck){
        if (rightBall && !rightBlock) {
          player.moveRight();
          ball.moveRight();
        }
        else if (!rightBall) {
          player.moveRight();
        }
        collisionCheck();
      }
      break;
    }
  }

  function init() {
    drawHeader(0);
    drawBorder();
    return setInterval(update, 10);              //run update() every 10ms
  }

  function update() {
    ctx.clearRect(0, 100, width, height - 120);          //clears canvas
    ctx.fillStyle = "white";                     //player style + draw player
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#3498DB";
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
  }

  window.addEventListener('keydown', move, true);  //if key is pressed, execute move()

  window.addEventListener("load", function(){      //start init() upon page load
    init();
  });
}();
