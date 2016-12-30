//VARIABLES //

var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;
var gameState = GAMESTATE_PRELOAD;

//---------------
//STARTING GAME SCREEN
//---------------

//Preload Art Assets//
// - Frogger
var froggerImage = new Image();
froggerImage.ready = false;
froggerImage.onload = setAssetReady;
froggerImage.src = PATH_FROGGER;

// - CARS
var carImage = new Image();
carImage.ready = false;
carImage.onload = setAssetReady;
carImage.src = PATH_CARS;

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
	if (froggerImage.ready && carImage.ready)
	{
		clearInterval(preloader);
		
		var gameloop = setInterval(update, TIME_PER_FRAME);
		gameState = GAMESTATE_MENU;
		stage.addEventListener("click", canvasClick, false);
		document.addEventListener("keydown",keyUpHandler, false);		
	}
}
function initGame()
{
	isClicked = false;
	mouseX = 0;
	mouseY = 0;
	
	life = INIT_LIFE;	
	timeElapsed = 0;
	totalTimer = MAX_TIMER;
	
	speedX = 0;
	speedY = 0;
	
	standingOnLog = false;
	
	player = new Object();
	player.x = FROG_START_X;
	player.y = FROG_START_Y;
	player.width = FROG_WIDTH;
	player.height = FROG_HEIGHT;
	player.animation = FROG_ANIM_1;
	
	cars = new Array();
	logsYPos = new Array(LOG_Y_1,LOG_Y_2,LOG_Y_3,LOG_Y_4);
	carsYPos = new Array(CAR_Y_1,CAR_Y_2,CAR_Y_3,CAR_Y_4);
	
		//Spawn Cars
	//Row 1
	for (var i=1; i<=2; i++)
	{
		var newCar = new Object();
		newCar.x = -300 * i;
		newCar.y = carsYPos[0];
		newCar.width = CAR_WIDTH;
		newCar.height = CAR_HEIGHT;
		newCar.speedX = SPEED_CAR;
		cars.push(newCar);
	}	
	//Row 2
	for (var i=1; i<=3; i++)
	{
		var newCar = new Object();
		newCar.x = (170 * i) + 500;
		newCar.y = carsYPos[1];
		newCar.width = CAR_WIDTH;
		newCar.height = CAR_HEIGHT;
		newCar.speedX = -SPEED_CAR;
		cars.push(newCar);
	}
}

function canvasClick(event)
{	
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	
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
	}
	else if (keyPressed === RIGHT_ARROW)
	{
		right = true;
	}
	else if (keyPressed === UP_ARROW)
	{
		up = true;
	}
	else if (keyPressed === DOWN_ARROW)
	{
		down = true;
	}
}

function updateDraw()
{
	//Clear Canvas
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//Draw Sea
	ctx.fillStyle = "#20BCEF";
	ctx.fillRect(0, LOG_Y_1, stage.width, 200);	
	
	//Draw Roads
	ctx.fillStyle = "#888";
	ctx.fillRect(0, CAR_Y_1, stage.width, 200);	
	
		//Draw Cars
	for (var i=0; i<cars.length; i++)
	{	
		ctx.drawImage(carImage,CAR_OFFSET_X,0,CAR_WIDTH,CAR_HEIGHT,cars[i].x,cars[i].y,CAR_WIDTH,CAR_HEIGHT);
	}
	//Draw Frog
	ctx.drawImage(froggerImage,0,0,FROG_WIDTH,FROG_HEIGHT,player.x,player.y,FROG_WIDTH,FROG_HEIGHT);
	
	
		
	//Draw Life
	ctx.fillStyle = "#000";
	ctx.fillText(TEXT_LIFE+life, TEXT_LIFE_X, TEXT_LIFE_Y);
	
	//Draw Timer
	ctx.fillStyle = "#000";
	ctx.fillText(TEXT_TIME+(totalTimer - Math.floor(timeElapsed/30)), TEXT_TIME_X, TEXT_TIME_Y);
}


function updateMenuUserInput()
{
	if (isClicked)
	{
		isClicked = false;
		if (MENU_START_BUTTON_X <= mouseX && MENU_START_BUTTON_X+MENU_START_BUTTON_WIDTH >= mouseX)
			if (MENU_START_BUTTON_Y <= mouseY && MENU_START_BUTTON_Y+MENU_START_BUTTON_HEIGHT >= mouseY)
			{
				gameState = GAMESTATE_GAMEPLAY;
				initGame();
			}
	}
}

function updateMenuDraw()
{
	//Clear Canvas
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, stage.width, stage.height);	
		
	//Draw Start Button
	ctx.textBaseline = "top";
	//ctx.fillStyle = "#F00";
	//ctx.fillRect(MENU_START_BUTTON_X, MENU_START_BUTTON_Y, MENU_START_BUTTON_WIDTH, MENU_START_BUTTON_HEIGHT);
	ctx.fillStyle = "#000";
	ctx.fillText(TEXT_START_BUTTON, MENU_START_BUTTON_X, MENU_START_BUTTON_Y);
	
}

