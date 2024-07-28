    const gameBoard=document.querySelector(".game_board");
    const cxt=gameBoard.getContext("2d");
    const score=document.querySelector(".score");
    const reset=document.querySelector(".reset");
    const gameWidth=gameBoard.width;
    const gameHeight=gameBoard.height;
    const boardBackground="white";
    const snakeColor="green";
    const snakeBorder="black";
    const foodColor="red";
    const unitSize=25;
    let running=0;
    let xVelocity=unitSize;
    let yVelocity=0;
    let foodX;
    let foodY;
    let scoreBoard=0;
    let snake=[
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ];

    window.addEventListener("keydown",changeDirection);
    reset.addEventListener("click",resetGame);

    gameStart();
    function gameStart()
    {
    running=true;
    score.textContent=scoreBoard;
    createFood();
    drawFood();
    nextTick();
    }

    function nextTick()
    {
    if(running)
    {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        },100);
    }
    else{
        displayGameover();
    }
    }
    function clearBoard()
    {
    cxt.fillStyle=boardBackground;
    cxt.fillRect(0,0,gameWidth,gameHeight);
    }
    function createFood(){
    function randomFood(min,max)
    {
        const randNum=Math.round((Math.random() * (max-min))/unitSize)*unitSize;
        return randNum
    }
    foodX=randomFood(0,gameWidth-unitSize);
    foodY=randomFood(0,gameWidth-unitSize);

    };
    function drawFood()
    {
    cxt.fillStyle=foodColor;
    cxt.fillRect(foodX,foodY,unitSize,unitSize);
    }
    function moveSnake(){
    const head={x:snake[0].x + xVelocity,
    y:snake[0].y + yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x==foodX && snake[0].y==foodY){
    scoreBoard+=1;
    score.textContent=scoreBoard;
    createFood();
    }
    else{
        snake.pop();
    }
    }
    function drawSnake()
    {
        cxt.fillStyle=snakeColor;
        cxt.strokeStyle=snakeBorder;
        snake.forEach(snakePart=>{
        cxt.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        cxt.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
        })
    }
    function changeDirection(event) {
        const keyPressed = event.key;
        const LEFT = "ArrowLeft";
        const UP = "ArrowUp";
        const RIGHT = "ArrowRight";
        const DOWN = "ArrowDown";
    
        const goingUp = yVelocity === -unitSize;
        const goingDown = yVelocity === unitSize;
        const goingLeft = xVelocity === -unitSize;
        const goingRight = xVelocity === unitSize;
    
        switch (keyPressed) {
        case LEFT:
            if (!goingRight) {
            xVelocity = -unitSize;
            yVelocity = 0;
            }
            break;
        case RIGHT:
            if (!goingLeft) {
            xVelocity = unitSize;
            yVelocity = 0;
            }
            break;
        case UP:
            if (!goingDown) {
            yVelocity = -unitSize;
            xVelocity = 0;
            }
            break;
        case DOWN:
            if (!goingUp) {
            yVelocity = unitSize;
            xVelocity = 0;
            }
            break;
        }
    }
    
    function displayGameover(){
    cxt.font="50px";
    cxt.fillStyle="black";
    cxt.textAlign="center";
    cxt.fillText("GAME OVER!",gameWidth/2,gameHeight/2);
    running=false;
    }
    function checkGameover()
    {
    switch(true)
    {
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x >=gameWidth):
        running=false;
        break;
        case(snake[0].y <0):
        running=false;
        break;
        case(snake[0].y  >=gameHeight):
        running=false;
        break;
    }
    for(let i = 1; i<snake.length;i++)
    {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        {
            running=false;
        }
    }
    }
    function resetGame()
    {
    scoreBoard=0;
    xVelocity=unitSize;
    yVelocity=0;
    snake=[
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ];
    gameStart();
    }



    