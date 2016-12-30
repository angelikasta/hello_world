
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;
var gameState = GAMESTATE_PRELOAD;


//---------------
//starting the game
//---------------

//Preload the images

var chickImage = new Image();
chickImage.ready = false;
chickImage.onload = setAssetReady;
chickImage.src = SOURCE_CHICK;

var waterImage = new Image();
waterImage.src = WATER_SRC;

var grassImage = new Image();
grassImage.src = GRASS_SRC;

var logoImage = new Image();
logoImage.src = LOGO_SRC;

var backImage = new Image();
backImage.src = BACKGROUND_SRC;

var splat = new Image();
splat.src = SPLAT_SRC;
splat.x = 0;
splat.y = 0;

var typeOfPower = 0;
var powerImage = new Image();
var power = {
    x: 0,
    y: 0
};


//SOUNDS
var mySound = new Audio("jump.wav");

//function sound(src) {
/*    this.sound = document.createElement("audio");
 this.sound.src = src;
 this.sound.setAttribute("preload", "auto");
 this.sound.setAttribute("controls", "none");
 this.sound.style.display = "none";
 document.body.appendChild(this.sound);
 this.play = function(){
 this.sound.play();
 }
 this.stop = function(){
 this.sound.pause();
 }    
 }*/


function setAssetReady()
{
    this.ready = true;
}

//Display Preloading
ctx.textBaseline = "top";
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

function preloading()
{
    if (chickImage.ready)
    {
        clearInterval(preloader);

        var gameloop = setInterval(update, TIME_PER_FRAME);
        gameState = GAMESTATE_MENU;
        stage.addEventListener("click", canvasClick, false);
        document.addEventListener("keydown", keyUpHandler, false);
    }
}

//------------
//Game Variables, objects
//------------
var isClicked, mouseX, mouseY;
var up, down, left, right;
var results, life, score, finalScore, timeElapsed, totalTimer, speedX, speedY, standingOnLog, player,
        logs, cars, cars2, homes, logsYPos, carsYPos, cars2YPos;

function initGame()
{
    isClicked = false;
    mouseX = 0;
    mouseY = 0;

    life = INITIAL_LIFES;
    score = POINTS;
    timeElapsed = 0;
    totalTimer = MAX_TIMER;

    speedX = 0;
    speedY = 0;

    standingOnLog = false;

    //creating the chicken (player)
    player = new Object();
    player.x = CHICK_START_X;
    player.y = CHICK_START_Y;
    player.width = CHICK_WIDTH;
    player.height = CHICK_HEIGHT;
    player.animation = CHICK_ANIM_1;

    //storing the cars and logs in arrays
    cars = new Array();
    cars2 = new Array();
    logs = new Array();

    //creating the receivers
    var home1 = new Object();
    home1.x = HOME_1_X;
    home1.y = HOME_1_Y;
    home1.width = HOME_WIDTH;
    home1.height = HOME_HEIGHT;
    home1.status = HOME_STATUS_EMPTY;

    var home2 = new Object();
    home2.x = HOME_2_X;
    home2.y = HOME_2_Y;
    home2.width = HOME_WIDTH;
    home2.height = HOME_HEIGHT;
    home2.status = HOME_STATUS_EMPTY;

    var home3 = new Object();
    home3.x = HOME_3_X;
    home3.y = HOME_3_Y;
    home3.width = HOME_WIDTH;
    home3.height = HOME_HEIGHT;
    home3.status = HOME_STATUS_EMPTY;

    var home4 = new Object();
    home4.x = HOME_4_X;
    home4.y = HOME_4_Y;
    home4.width = HOME_WIDTH;
    home4.height = HOME_HEIGHT;
    home4.status = HOME_STATUS_EMPTY;

    var home5 = new Object();
    home5.x = HOME_5_X;
    home5.y = HOME_5_Y;
    home5.width = HOME_WIDTH;
    home5.height = HOME_HEIGHT;
    home5.status = HOME_STATUS_EMPTY;

    //putting receivers into the array
    homes = new Array(home1, home2, home3, home4, home5);

    //Y positioning of cars and logs
    logsYPos = new Array(LOG_Y_1, LOG_Y_2, LOG_Y_3);
    carsYPos = new Array(CAR_Y_1, CAR_Y_2);
    cars2YPos = new Array(CAR_Y_3, CAR_Y_4);

    //create cars
    //Row 1
    for (var i = 1; i <= 3; i++) //i = max amount cars on screen at same time
    {
        var newCar = new Object();
        newCar.x = -300 * i;//moving from left to right of the screen
        newCar.y = carsYPos[0];
        newCar.width = CAR_WIDTH;
        newCar.height = CAR_HEIGHT;
        newCar.speedX = SPEED_CAR;
        cars.push(newCar);
    }
    //Row 2
    for (var i = 1; i <= 4; i++)
    {
        var newCar = new Object();
        newCar.x = (180 * i) + 400;
        newCar.y = carsYPos[1];
        newCar.width = CAR_WIDTH;
        newCar.height = CAR_HEIGHT;
        newCar.speedX = -SPEED_CAR;
        cars.push(newCar);
    }
    //2nd type of cars
    //Row 3
    for (var i = 1; i <= 3; i++)
    {
        var newCar2 = new Object();
        newCar2.x = (-200 * i) + 30;
        newCar2.y = cars2YPos[0];
        newCar2.width = CAR_WIDTH;
        newCar2.height = CAR_HEIGHT;
        newCar2.speedX = SPEED_FAST_CAR;
        cars2.push(newCar2);
    }
    //Row 4
    for (var i = 1; i <= 3; i++)
    {
        var newCar2 = new Object();
        newCar2.x = (220 * i) + 280;
        newCar2.y = cars2YPos[1];
        newCar2.width = CAR_WIDTH;
        newCar2.height = CAR_HEIGHT;
        newCar2.speedX = -SPEED_CAR;
        cars2.push(newCar2);
    }

    //create logs
    //Row 1
    for (var i = 1; i <= 3; i++)
    {
        var newLog = new Object();
        newLog.x = -320 * i; //starting from left moving to right
        newLog.y = logsYPos[0];
        newLog.width = LOG_WIDTH;
        newLog.height = LOG_HEIGHT;
        newLog.speedX = SPEED_LOG;
        logs.push(newLog);
    }

    //Row 2
    for (var i = 1; i <= 3; i++)
    {
        var newLog = new Object();
        newLog.x = (240 * i) + 510;
        newLog.y = logsYPos[1];
        newLog.width = LOG_WIDTH;
        newLog.height = LOG_HEIGHT;
        newLog.speedX = -SPEED_LOG;//moving in opposite direction
        logs.push(newLog);
    }

    //Row 3
    for (var i = 1; i <= 3; i++)
    {
        var newLog = new Object();
        newLog.x = (-220 * i) + 80;
        newLog.y = logsYPos[2];
        newLog.width = LOG_WIDTH;
        newLog.height = LOG_HEIGHT;
        newLog.speedX = SPEED_FAST_LOG;
        logs.push(newLog);
    }

}

function canvasClick(event) //CHECK THIS ONE
{
    mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
    mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
    console.log("start button clicked");
    isClicked = true;
}

function keyUpHandler(event)
{
    var keyPressed = (event.keyCode);
    var LEFT_ARROW = 37;
    UP_ARROW = 38;
    RIGHT_ARROW = 39;
    DOWN_ARROW = 40;

    if (keyPressed === LEFT_ARROW)
    {
        left = true;
    } else if (keyPressed === RIGHT_ARROW)
    {
        right = true;
    } else if (keyPressed === UP_ARROW)
    {
        up = true;
    } else if (keyPressed === DOWN_ARROW)
    {
        down = true;
    }
}

//------------
//Game Loop
//------------

function backToGame() {
    gameState = GAMESTATE_GAMEPLAY;
}
function update()
{
    if (gameState == GAMESTATE_GAMEPLAY)
    {
        //User Input
        updateUserInput();

        //Game	
        updateGame();

        //Draw
        updateDraw();

    } else if (gameState == GAMESTATE_DEAD) {

        //display lost life
        createSplat();
        //back to game after 0.8sec
        setTimeout(backToGame, 800);
    } else if (gameState == GAMESTATE_MENU)
    {
        //User Input
        updateMenuUserInput();
        //draw the user menu
        updateMenuDraw();
    } else if (gameState == GAMESTATE_RESULTS)
    {
        //User Input
        updateResultsUserInput();
        //draw the results
        updateResultsDraw();
    }
}

function updateUserInput()
{

    if (isClicked)
    {
        isClicked = false;

    }

    if (right)
    {
        right = false;//set back to false so only moves 1 step

        if (player.x + SPEED_PLAYER < stage.width) //check if chicken can move to right
            player.x += SPEED_PLAYER; //change position of chicken
        //console.log("pressed right, move");
        //mySound.play();
        animatePlayer();
    } else if (left)
    {
        left = false;

        if (player.x - SPEED_PLAYER > 0)
            player.x -= SPEED_PLAYER;
        //console.log("pressed left, move");
        //mySound.play();
        animatePlayer();
    }

    if (up)
    {
        up = false;

        player.y -= SPEED_PLAYER;
        //console.log("pressed up, move");
        //mySound.play();
        animatePlayer();
    } else if (down)
    {
        down = false;

        if (player.y + SPEED_PLAYER < stage.height)
            player.y += SPEED_PLAYER;
        //console.log("pressed down, move");
        //mySound.play();
        animatePlayer();
    }
}


function animatePlayer() //change between 2 images of chicken for animation on move
{
    if (player.animation == CHICK_ANIM_1)
        player.animation = CHICK_ANIM_2;
    else if (player.animation == CHICK_ANIM_2)
        player.animation = CHICK_ANIM_1;
}


function getPowerType() {
    var rand = Math.floor(Math.random() * 4);

    //
    if (rand == 1) {
        powerImage.src = POWER_IMAGE_SRC;
        console.log("power 1 appeared");
        typeOfPower = 1;


    } else if (rand == 2) {
        powerImage.src = LIFE_IMAGE_SRC;
        console.log("power 2 appeared");
        typeOfPower = 2;

    } else if (rand == 3) {
        powerImage.src = POWER2_IMAGE_SRC;
        console.log("power 3 appeared");
        typeOfPower = 3;
    }



}
function actPower() { //


    if (typeOfPower == 2) {
        life++;
        console.log("life added");
    } else if (typeOfPower == 3) {
        score = score + 300;
        console.log("score 300 added by power");
    } else if (typeOfPower == 1) {
        score = score + 100;
        console.log("score 100 added by power");
    }

}
function createPower() { //randomize position of the power and place it on, calls get powertype
    getPowerType();
    power.x = 50 + (Math.random() * 600);
    power.y = 100 + (Math.random() * 350);

}

function createSplat() {
    console.log("splat created");
    ctx.drawImage(splat, SPLAT_OFFSET_X, SPLAT_OFFSET_Y, SPLAT_WIDTH, SPLAT_HEIGHT,
            100, 50, SPLAT_WIDTH, SPLAT_HEIGHT);
    ctx.fillStyle = "#fff";
    ctx.fillText(DEATH_MSG, 250, 250);
}

function updateGame()
{

    timeElapsed++; //counter

    var playerMidPtX = player.x + player.width / 2; //middle of the character
    var playerMidPtY = player.y + player.height / 2;



    if (playerMidPtX <= (power.x + 40)
            && power.x <= (playerMidPtX + 40)
            && playerMidPtY <= (power.y + 50)
            && power.y <= (playerMidPtY + 40))
    {
        actPower();
        createPower();
    }

    for (var i = cars.length - 1; i >= 0; i--)
    {
        cars[i].x += cars[i].speedX;

        //Check for car collision with chicken,from all directions
        if ((cars[i].x <= playerMidPtX && cars[i].x + cars[i].width >= playerMidPtX) &&
                (cars[i].y <= playerMidPtY && cars[i].y + cars[i].height >= playerMidPtY))
        {

            collided();
            mySound.play();
            console.log("life lost collision with first car type");
            console.log(score);
            gameState = GAMESTATE_DEAD;
            //resetGame();
        }

        if (cars[i].speedX < 0 && cars[i].x <= -DIST_BEFORE_CAR_DISAPPEAR)
        {
            cars[i].x = stage.width + DIST_BEFORE_CAR_DISAPPEAR;
        } else if (cars[i].speedX > 0 && cars[i].x >= stage.width + DIST_BEFORE_CAR_DISAPPEAR)
        {
            cars[i].x = -DIST_BEFORE_CAR_DISAPPEAR;
        }
    }
    //checking 2nd type of car collision
    for (var i = cars2.length - 1; i >= 0; i--)
    {
        cars2[i].x += cars2[i].speedX;

        //Check for position chicken vs car, collision detection
        if ((cars2[i].x <= playerMidPtX && cars2[i].x + cars2[i].width >= playerMidPtX) &&
                (cars2[i].y <= playerMidPtY && cars2[i].y + cars2[i].height >= playerMidPtY))
        {

            collided();
            mySound.play();
            console.log("life lost, collision with the car");
            console.log(score);
            //resetGame();
            gameState = GAMESTATE_DEAD;
        }

        if (cars2[i].speedX < 0 && cars2[i].x <= -DIST_BEFORE_CAR_DISAPPEAR)
        {
            cars2[i].x = stage.width + DIST_BEFORE_CAR_DISAPPEAR;
        } else if (cars2[i].speedX > 0 && cars2[i].x >= stage.width + DIST_BEFORE_CAR_DISAPPEAR)
        {
            cars2[i].x = -DIST_BEFORE_CAR_DISAPPEAR;
        }
    }

    //update the logs
    var standingOnLog = false;
    for (var i = logs.length - 1; i >= 0; i--)
    {
        logs[i].x += logs[i].speedX;

        //Check for collision with chicken
        if ((logs[i].x <= playerMidPtX && logs[i].x + logs[i].width >= playerMidPtX) &&
                (logs[i].y <= playerMidPtY && logs[i].y + logs[i].height >= playerMidPtY))
        {
            standingOnLog = true;
            player.x += logs[i].speedX;

        }

        if (logs[i].speedX < 0 && logs[i].x <= -DIST_BEFORE_LOG_DISAPPEAR)
        {
            logs[i].x = stage.width + DIST_BEFORE_LOG_DISAPPEAR;
        } else if (logs[i].speedX > 0 && logs[i].x >= stage.width + DIST_BEFORE_LOG_DISAPPEAR)
        {
            logs[i].x = -DIST_BEFORE_LOG_DISAPPEAR;
        }
    }

    //Check if chicken reaches homes
    for (var i = 0; i < homes.length; i++)
    {
        if (homes[i].status == HOME_STATUS_EMPTY)
        {
            if ((homes[i].x <= playerMidPtX && homes[i].x + homes[i].width + 10 >= playerMidPtX) &&
                    (homes[i].y <= playerMidPtY && homes[i].y + homes[i].height >= playerMidPtY))
            {
                homes[i].status = HOME_STATUS_OCCUPIED;
                createPower();
                score += 250;
                console.log(score);
                player.x = CHICK_START_X;
                player.y = CHICK_START_Y;


            }
        }
    }

    //Check if chicken is in water
    if (player.y < WATER_ZONE_Y) // in water zone
    {
        if (!standingOnLog)
        {
            collided();
            mySound.play();
            console.log(score);
            console.log("life lost, chicken drawn");
            //resetGame();
            gameState = GAMESTATE_DEAD;
        }

    }

    //Check if time finished or no lives left
    if ((totalTimer - Math.floor(timeElapsed / 30) <= 0) || (life <= 0))
    {
        endGameLost();
    }

    //check if all homes are occupied
    var allOccupied = true;
    for (var i = 0; i < homes.length; i++)
    {
        if (homes[i].status == HOME_STATUS_EMPTY)
            allOccupied = false;
    }

    if (allOccupied)
    {
        console.log("game completed");
        console.log(score);
        endGame();
    }

}
function finalScoreFunc() {
    console.log("score before final " + score);
    finalScore = (life * 50) + score;
    console.log("final score " + finalScore);

    //trying to display score and keep it, doesnt work
    sessionStorage.loggedInScore = finalScore;

    if (sessionStorage.userLoggedIn)
    {
        console.log("local storage score " + localStorage.topScore);
        console.log("user " + sessionStorage.loggedInFirstName +
                " signed in, final score " + sessionStorage.loggedInScore);

    }


    //Extract data structure for logged in user if it exists

    //convert to object? json
    //Update with new top score if it is higher


}




function endGameLost() {
    finalScoreFunc();
    console.log("end of game, lost");
    results = RESULTS_LOST;
    gameState = GAMESTATE_RESULTS;
}
function endGame() {
    finalScoreFunc();
    console.log("end of game, won");
    results = RESULTS_WON;
    gameState = GAMESTATE_RESULTS;
}



function collided()
{

    life -= 1;
    score -= 200;

    if (life > 0)
        resetGame();

    else
    {
        endGameLost();

    }

}


function resetGame()
{

    player.x = CHICK_START_X;
    player.y = CHICK_START_Y;

    createPower();
}

function updateDraw()
{
    //Clear Canvas
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, stage.width, stage.height);

    //draw water
    ctx.fillStyle = "#20BCEF";
    ctx.fillRect(0, 100, stage.width, 200);
    //water image
    ctx.drawImage(waterImage, WATER_OFFSET_X, WATER_OFFSET_Y, WATER_WIDTH, WATER_HEIGHT, 0, 100,
            WATER_WIDTH, WATER_HEIGHT);



    //Draw Roads
    ctx.fillStyle = "#888";
    ctx.fillRect(0, CAR_Y_1, stage.width, 200);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(50, 400, 50, 5);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(200, 400, 50, 5);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(350, 400, 50, 5);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(500, 400, 50, 5);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(650, 400, 50, 5);

    //draw grass on the bottom
    ctx.fillStyle = "#339900";
    ctx.fillRect(0, 500, stage.width, 50);

    ctx.drawImage(grassImage, GRASS_OFFSET_X, GRASS_OFFSET_Y, GRASS_WIDTH, GRASS_HEIGHT,
            0, 500, GRASS_WIDTH, GRASS_HEIGHT);

    //draw grass 
    ctx.fillStyle = "#339900";
    ctx.fillRect(0, 250, stage.width, 50);

    ctx.drawImage(grassImage, GRASS_OFFSET_X, GRASS_OFFSET_Y, GRASS_WIDTH, GRASS_HEIGHT,
            0, 250, GRASS_WIDTH, GRASS_HEIGHT);

    ctx.drawImage(grassImage, GRASS_OFFSET_X, GRASS_OFFSET_Y, GRASS_WIDTH, GRASS_HEIGHT,
            0, 50, GRASS_WIDTH, GRASS_HEIGHT);


    //Draw Cars
    for (var i = 0; i < cars.length; i++)
    {
        ctx.drawImage(chickImage, CAR_OFFSET_X, 0, CAR_WIDTH, CAR_HEIGHT, cars[i].x, cars[i].y, CAR_WIDTH, CAR_HEIGHT);
    }

    for (var i = 0; i < cars2.length; i++)
    {
        ctx.drawImage(chickImage, CAR2_OFFSET_X, 0, CAR_WIDTH, CAR_HEIGHT, cars2[i].x, cars2[i].y, CAR_WIDTH, CAR_HEIGHT);
    }

    //Draw Logs
    for (var i = 0; i < logs.length; i++)
    {
        ctx.drawImage(chickImage, LOG_OFFSET_X, 0, LOG_WIDTH, LOG_HEIGHT, logs[i].x, logs[i].y, LOG_WIDTH, LOG_HEIGHT);
    }


    //Draw Homes
    for (var i = 0; i < homes.length; i++)
    {
        if (homes[i].status == HOME_STATUS_EMPTY)
            ctx.drawImage(chickImage, HOME_OFFSET_X, 0, HOME_WIDTH, HOME_HEIGHT, homes[i].x, homes[i].y, HOME_WIDTH, HOME_HEIGHT);
        else if (homes[i].status == HOME_STATUS_OCCUPIED)
            ctx.drawImage(chickImage, HOME_OCCUPIED_OFFSET_X, 0, HOME_WIDTH, HOME_HEIGHT, homes[i].x, homes[i].y, HOME_WIDTH, HOME_HEIGHT);
    }

    //Draw chicken
    ctx.drawImage(chickImage, player.animation, 0, CHICK_WIDTH, CHICK_HEIGHT, player.x, player.y, CHICK_WIDTH, CHICK_HEIGHT);

    //DRAW POWERS
    ctx.drawImage(powerImage, power.x, power.y, 50, 50);

    //Draw SCOREBOARD
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, stage.width, 50);

    //Draw life
    ctx.fillStyle = "#fff";
    ctx.fillText(TEXT_LIFE + life, TEXT_LIFE_X, TEXT_LIFE_Y);

    //Draw Timer
    ctx.fillStyle = "#fff";
    ctx.fillText(TEXT_TIME + (totalTimer - Math.floor(timeElapsed / 30)), TEXT_TIME_X, TEXT_TIME_Y);

    //draw score
    ctx.fillStyle = "#fff";
    ctx.fillText(TEXT_SCORE + score, TEXT_SCORE_X, TEXT_SCORE_Y);
}

function updateMenuUserInput()
{
    if (isClicked)
    {
        isClicked = false;
        if (MENU_START_BUTTON_X <= mouseX && MENU_START_BUTTON_X + MENU_START_BUTTON_WIDTH >= mouseX)
            if (MENU_START_BUTTON_Y <= mouseY && MENU_START_BUTTON_Y + MENU_START_BUTTON_HEIGHT >= mouseY)
            {
                gameState = GAMESTATE_GAMEPLAY;
                initGame();
            }
    }
}

function updateMenuDraw() //START GAME STAGE
{
    //Clear Canvas

    ctx.drawImage(backImage, 0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT,
            0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);

    ctx.drawImage(logoImage, 0, 0, LOGO_WIDTH, LOGO_HEIGHT,
            280, 20, LOGO_WIDTH, LOGO_HEIGHT);

    //Draw Start Button
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    ctx.fillText(TEXT_START_BUTTON, MENU_START_BUTTON_X, MENU_START_BUTTON_Y);

}

function updateResultsUserInput()
{
    if (isClicked)
    {
        isClicked = false;
        if (RESULTS_RESTART_BUTTON_X <= mouseX && RESULTS_RESTART_BUTTON_X + RESULTS_RESTART_BUTTON_WIDTH >= mouseX)
            if (RESULTS_RESTART_BUTTON_Y <= mouseY && RESULTS_RESTART_BUTTON_Y + RESULTS_RESTART_BUTTON_HEIGHT >= mouseY)
            {
                gameState = GAMESTATE_GAMEPLAY;
                initGame();
            }
    }
}


function updateResultsDraw()
{
    //Clear Canvas
    ctx.drawImage(backImage, 0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT,
            0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);

    ctx.drawImage(logoImage, 0, 0, LOGO_WIDTH, LOGO_HEIGHT,
            280, 20, LOGO_WIDTH, LOGO_HEIGHT);

    //If player won, display winning text
    if (results == RESULTS_WON)
    {
        //Won
        ctx.textBaseline = "top";
        ctx.fillStyle = "#000";
        ctx.fillText(TEXT_WON, TEXT_WON_X, TEXT_WON_Y);
        ctx.fillStyle = "#000";
        ctx.fillText("Your final score is " + finalScore, 280, TEXT_WON_Y + 30);
    } else if (results == RESULTS_LOST)
    {
        //Lost
        ctx.textBaseline = "top";
        ctx.fillStyle = "#000";
        ctx.fillText(TEXT_LOST, TEXT_LOST_X, TEXT_LOST_Y);
        ctx.fillStyle = "#000";
        ctx.fillText("Your final score is " + finalScore, 280, TEXT_LOST_Y + 30);
    }

    //Draw Restart Button
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    ctx.fillText(TEXT_RESTART_BUTTON, RESULTS_RESTART_BUTTON_X, RESULTS_RESTART_BUTTON_Y);
}

