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
    direction = "down";
    score = 0;
    createSnake();
    createFood();

    if(typeof gameLoop != "undefined") clearInterval(gameLoop);
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
//Lets paint the snake now
function paint()
{
    //To prevent the snake trail we need to paint the BG on every frame
    //Lets paint the canvas BG
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);
    
    //The movement code comes here
    //The logic is to take out the tail cell of the snake
    //and position it on the new head position
    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;
    
    if(direction == "right") nx++;
    else if(direction == "left") nx--;
    else if(direction == "up") ny--;
    else if(direction == "down") ny++;
    
    //Lets add the game over clauses now
    //Game over clauses come after the new head position calculation
    //Time to add body collision check
    if(nx == -1 || nx == w/10 || ny == -1 || ny == h/10 || snakeCollision(nx, ny, snakeArray))
    {
        //restart the game
        init();
        //Lets organize the code a bit now.
        return;
    }
    
    //Code to make the snake eat the food
    //The logic is that if the new head position matches with the food position
    //then instead of transferring the tail to the new head, create a new head
    if(nx == food.x && ny == food.y)
    {
        var tail = {x: nx, y: ny};
        //recreate food
        createFood();
        score++;
    }
    else
    {
        //Lets do the cell transfer now
        var tail = snakeArray.pop(); 
        //pop throws out the last element of an array
        tail.x = nx; tail.y = ny;
    }
    snakeArray.unshift(tail);
    //Now if the snake eats the food, it gets longer.
    
    for(var i = 0; i < snakeArray.length; i++)
    {
        var c = snakeArray[i];
        drawFood(c.x, c.y);
        //Thats the snake.
    }
    
    //Lets paint the food
    drawFood(food.x, food.y);
    //We can see the food now.
    
    scoreText = "Score: " + score;
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