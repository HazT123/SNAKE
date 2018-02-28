var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = c.width / 2;
var y = c.width - 250;
var right = false;
var left = false;
var up = false;
var down = false;
var rightStop = false;
var leftStop = false;
var upStop = false;
var downStop = false;
var lastRight = false;
var lastLeft = false;
var lastUp = false;
var lastDown = false;
var firstKeyCount = 0
var X = 0;
var X = 0;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39 && rightStop == false) { // right
        right = true
        left = false;
        up = false;
        down = false;
        leftStop = true;
        rightStop = false;
        upStop = false;
        downStop = false;
        lastRight = true;
    } else if (e.keyCode == 37 && leftStop == false) { //left
        right = false
        left = true;
        up = false;
        down = false;
        rightStop = true;
        leftStop = false;
        upStop = false;
        downStop = false;
        lastLeft = true;
    } else if (e.keyCode == 38 && upStop == false) { // up
        right = false
        left = false;
        up = true;
        down = false;
        downStop = true;
        upStop = false;
        leftStop = false;
        rightStop = false;
        lastUp = true;
    } else if (e.keyCode == 40 && downStop == false) { // down
        right = false;
        left = false;
        up = false;
        down = true;
        upStop = true
        downStop = false;
        leftStop = false;
        rightStop = false;
        lastDown = true;
    }
}

function Snake() {    
    ctx.beginPath()
    ctx.rect(x, y, 5, 5);
    ctx.fill();
    ctx.closePath();
        
    if (right) {
        firstKeyCount ++;
        x += 0.2;
        ctx.clearRect(x - 20, y, 6, 6)
    } else if (right && lastRight == true) { // removes from bottom and left 
        y -= 0.2;
        ctx.clearRect(x + 20, y + 20, 6, 6);
    } else if (right && lastLeft == true) { // removes from bottom and right 
        y -= 0.2;
        ctx.clearRect(x - 20, y + 20, 6, 6);
    }

    if (left) {
        x -= 0.2
        ctx.clearRect(x + 20, y, 6, 6);
    } else if (left && lastRight == true) { // removes from bottom and left 
        y -= 0.2;
        ctx.clearRect(x + 20, y + 20, 6, 6);
    } else if (left && lastLeft == true) { // removes from bottom and right 
        y -= 0.2;
        ctx.clearRect(x - 20, y + 20, 6, 6);
    }

    if (up && lastRight == false && lastLeft == false) { // removes from bottom
        y -= 0.2;
        ctx.clearRect(x, y + 20, 6, 6)
    } else if (up && lastRight == true) { // removes from bottom and left 
        y -= 0.2;
        ctx.clearRect(x - 20, y + 20, 6, 6);
    } else if (up && lastLeft == true) { // removes from bottom and right 
        y -= 0.2;
        ctx.clearRect(x - 20, y + 20, 6, 6);
    }

    if (down) {
        y += 0.2;
        ctx.clearRect(x, y - 20, 7, 7)
    } else if (down && lastRight == true) { // removes from bottom and left 
        y -= 0.2;
        ctx.clearRect(x + 20, y + 20, 7, 7);
    } else if (down && lastLeft == true) { // removes from bottom and right 
        y -= 0.2;
        ctx.clearRect(x - 20, y + 20, 7, 7);
    }
}

function draw() {
    Snake()
}

var Interval = setInterval(draw, 10);