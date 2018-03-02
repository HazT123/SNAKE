$(document).ready(function() {
var canvas = $("#myCanvas")[0];
var ctx = canvas.getContext("2d");

var w = 500; var h = 500;

var cellSize = 10;
var direction;
var snakeArray = [];
var food = {};
var score = 0;
var scoreText;

function init() {
    direction = "right";
    score = 0;
    createSnake();
    createFood();

    if(typeof gameLoop != "undefined") clearInterval(paint);
    gameLoop = setInterval(paint, 50);
}

init();

function createFood() {
    food = {
        x: Math.round(Math.random()*(w-cellSize)/cellSize), 
        y: Math.round(Math.random()*(w-cellSize)/cellSize)
    };
}

function createSnake() {    
    var length = 5;
    snakeArray = [];
    for (var i = length; i > 0; i--) {
        snakeArray.push({x: i, y: 0});
    }
}
    
function paint() {    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 0, w, h);
    
    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    if(direction == "right") nx ++;
    else if (direction == "left") nx --;
    else if (direction == "up") ny --;
    else if (direction == "down") ny ++;

    if (nx == -1 || nx == w/10 || ny == -1 || ny == h/10 || snakeCollision(nx, ny, snakeArray)) {
        init();
        return;
    }

    if (nx == food.x && ny == food.y) {
        var tail = {x: nx, y: ny};
        createFood();
        score ++
    } else {
        var tail = snakeArray.pop;
        tail.x = nx; tail.y = ny;
    }

    snakeArray.unshift(tail);

    for (var i = 0; i < snakeArray.length; i ++) {
        var c = snakeArray[i];
        drawFood(c.x, c.y);
    }

    drawFood(food.x, food.y);

    scoreText = "Score " + score;
    ctx.fillText(scoreText, 5, h-5);

}

function drawFood(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize);
}

function snakeCollision(x, y, array) {
    for (var i = 0; i<array.length; i++) {
        if(array[i].x == x && array[i]. y == y) 
            return true;
        }
    return false;
}

$(document).keydown(function(e) {
    var key = e.which;
    if(key == "37" && direction != "right") direction = "left";
    else if(key == "38" && direction != "down") direction = "up";
    else if(key == "39" && direction != "left") direction = "right";
    else if(key == "40" && direction != "up") direction = "down";
})

})