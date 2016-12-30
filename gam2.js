//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "black";
ctx.font = GAME_FONTS;
var gameState = GAMESTATE_PRELOAD;

//---------------
//Preloading ...
//---------------

//Preload Art Assets
// - Frogger
var froggerImage = new Image();
froggerImage.ready = false;
froggerImage.onload = setAssetReady;
froggerImage.src = PATH_CHICK;

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
	if (froggerImage.ready)
	{
		clearInterval(preloader);
		
		var gameloop = setInterval(update, TIME_PER_FRAME);
		gameState = GAMESTATE_MENU;
		stage.addEventListener("click", canvasClick, false);
		document.addEventListener("keydown",keyUpHandler, false);		
	}
}

//------------
//Game Vars
//------------
var isClicked, mouseX, mouseY;
var up,down,left,right;
var results,life,timeElapsed,totalTimer,speedX,speedY,standingOnLog,player,logs,cars,homes,logsYPos,carsYPos;
				
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
	player.x = CHICK_START_X;
	player.y = CHICK_START_Y;
	player.width = FROG_WIDTH;
	player.height = CHICK_HEIGHT;
	player.animation = CHICK_ANIM_1;
	
	cars = new Array();
	logs = new Array();
	
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
	
	homes = new Array(home1,home2,home3,home4,home5);
	
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
	//Row 3
	for (var i=1; i<=3; i++)
	{
		var newCar = new Object();
		newCar.x = (-220 * i) + 100;
		newCar.y = carsYPos[2];
		newCar.width = CAR_WIDTH;
		newCar.height = CAR_HEIGHT;
		newCar.speedX = SPEED_FAST_CAR;
		cars.push(newCar);
	}	
	//Row 4
	for (var i=1; i<=3; i++)
	{
		var newCar = new Object();
		newCar.x = (200 * i) + 350;
		newCar.y = carsYPos[3];
		newCar.width = CAR_WIDTH;
		newCar.height = CAR_HEIGHT;
		newCar.speedX = -SPEED_CAR;
		cars.push(newCar);
	}
	
	//Spawn Logs
	//Row 1
	for (var i=1; i<=3; i++)
	{
		var newLog = new Object();
		newLog.x = -300 * i;
		newLog.y = logsYPos[0];
		newLog.width = LOG_WIDTH;
		newLog.height = LOG_HEIGHT;
		newLog.speedX = SPEED_LOG;
		logs.push(newLog);
	}
	
	//Row 2
	for (var i=1; i<=3; i++)
	{
		var newLog = new Object();
		newLog.x = (250 * i) + 500;
		newLog.y = logsYPos[1];
		newLog.width = LOG_WIDTH;
		newLog.height = LOG_HEIGHT;
		newLog.speedX = -SPEED_LOG;
		logs.push(newLog);
	}
	
	//Row 3
	for (var i=1; i<=3; i++)
	{
		var newLog = new Object();
		newLog.x = (-200 * i) + 100;
		newLog.y = logsYPos[2];
		newLog.width = LOG_WIDTH;
		newLog.height = LOG_HEIGHT;
		newLog.speedX = SPEED_FAST_LOG;
		logs.push(newLog);
	}
	
	//Row 4
	for (var i=1; i<=3; i++)
	{
		var newLog = new Object();
		newLog.x = (250 * i) + 400;
		newLog.y = logsYPos[3];
		newLog.width = LOG_WIDTH;
		newLog.height = LOG_HEIGHT;
		newLog.speedX = -SPEED_LOG;
		logs.push(newLog);
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

//------------
//Game Loop
//------------
function update()
{	
	if (gameState == GAMESTATE_GAMEPLAY)
	{
		//User Input
		updateUserInput();
		
		//Game Logic	
		updateGame();
		
		//Draw
		updateDraw();
	}
	else if (gameState == GAMESTATE_MENU)
	{
		//User Input
		updateMenuUserInput();
		
		updateMenuDraw();
	}
	else if (gameState == GAMESTATE_RESULTS)
	{
		//User Input
		updateResultsUserInput();
		
		updateResultsDraw();
	}
}

function updateUserInput()
{
	if (isClicked)
	{
		isClicked = false;		
			
	}//isClicked
	
	if (right)
	{
		right = false;
		
		if (player.x + SPEED_PLAYER < stage.width)
			player.x += SPEED_PLAYER;
		
		animatePlayer();
	}
	else if (left)
	{
		left = false;
		
		if (player.x - SPEED_PLAYER > 0)
			player.x -= SPEED_PLAYER;	
		
		animatePlayer();
	}
	
	if (up)
	{
		up = false;
		
		player.y -= SPEED_PLAYER;
		
		animatePlayer();
	}
	else if (down)
	{
		down = false;
		
		if (player.y + SPEED_PLAYER < stage.height)
			player.y += SPEED_PLAYER;	
		
		animatePlayer();
	}	
}

function animatePlayer()
{
	if (player.animation == CHICK_ANIM_1)
		player.animation = CHICK_ANIM_2;
	else if (player.animation == CHICK_ANIM_2)
		player.animation = CHICK_ANIM_1;			
}

function updateGame()
{
	timeElapsed++;
	
	var playerMidPtX = player.x + player.width/2;
	var playerMidPtY = player.y + player.height/2;
	
	//Update the cars
	for (var i=cars.length-1; i>= 0; i--)
	{
		cars[i].x += cars[i].speedX;
		
		//Check for collision with frog
		if ((cars[i].x <= playerMidPtX && cars[i].x+cars[i].width >= playerMidPtX) &&
			(cars[i].y <= playerMidPtY && cars[i].y+cars[i].height >= playerMidPtY))
		{
			life--;
			resetGame();
		}
		
		if (cars[i].speedX < 0 && cars[i].x <= -DIST_BEFORE_CAR_DISAPPEAR)
		{
			cars[i].x = stage.width+DIST_BEFORE_CAR_DISAPPEAR;
		}
		else if (cars[i].speedX > 0 && cars[i].x >= stage.width+DIST_BEFORE_CAR_DISAPPEAR)
		{
			cars[i].x = -DIST_BEFORE_CAR_DISAPPEAR;
		}
	}
	
	//update the logs
	var standingOnLog = false;
	for (var i=logs.length-1; i>= 0; i--)
	{
		logs[i].x += logs[i].speedX;
		
		//Check for collision with frog
		if ((logs[i].x <= playerMidPtX && logs[i].x+logs[i].width >= playerMidPtX) &&
			(logs[i].y <= playerMidPtY && logs[i].y+logs[i].height >= playerMidPtY))
		{
			standingOnLog = true;
			player.x += logs[i].speedX;
		}
		
		if (logs[i].speedX < 0 && logs[i].x <= -DIST_BEFORE_LOG_DISAPPEAR)
		{
			logs[i].x = stage.width+DIST_BEFORE_LOG_DISAPPEAR;
		}
		else if (logs[i].speedX > 0 && logs[i].x >= stage.width+DIST_BEFORE_LOG_DISAPPEAR)
		{
			logs[i].x = -DIST_BEFORE_LOG_DISAPPEAR;
		}
	}
	
	//Check if frog reaches homes
	for (var i = 0; i < homes.length; i++)
	{
		if (homes[i].status == HOME_STATUS_EMPTY)
		{
			if ((homes[i].x <= playerMidPtX && homes[i].x+homes[i].width >= playerMidPtX) &&
				(homes[i].y <= playerMidPtY && homes[i].y+homes[i].height >= playerMidPtY))
			{
				homes[i].status = HOME_STATUS_OCCUPIED;
				
				player.x = CHICK_START_X;
				player.y = CHICK_START_Y;
			}
		}
	}
	
	//Check if frog is in water
	if (player.y < WATER_ZONE_Y) //in water zone
	{
		if (!standingOnLog)
		{
			life--;
			resetGame();
		}
	}
	
	//Check if timeElapsed or no lives left
	if ((totalTimer - Math.floor(timeElapsed/30) <= 0) || (life <= 0))
	{
		results = RESULTS_LOST;
		gameState = GAMESTATE_RESULTS;
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
		results = RESULTS_WON;
		gameState = GAMESTATE_RESULTS;
	}
}

function collided()
{
	life -= 1;
	
	if (life > 0)
		resetGame();
	else
	{
		results = RESULTS_LOST;
		gameState = GAMESTATE_RESULTS;
	}
}

function resetGame()
{
	player.x = CHICK_START_X;
	player.y = CHICK_START_Y;
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
		ctx.drawImage(froggerImage,CAR_OFFSET_X,0,CAR_WIDTH,CAR_HEIGHT,cars[i].x,cars[i].y,CAR_WIDTH,CAR_HEIGHT);
	}
	
	//Draw Logs
	for (var i=0; i<logs.length; i++)
	{	
		ctx.drawImage(froggerImage,LOG_OFFSET_X,0,LOG_WIDTH,LOG_HEIGHT,logs[i].x,logs[i].y,LOG_WIDTH,LOG_HEIGHT);
	}
	
	//Draw Homes
	for (var i=0; i<homes.length; i++)
	{	
		if (homes[i].status == HOME_STATUS_EMPTY)
			ctx.drawImage(froggerImage,HOME_OFFSET_X,0,HOME_WIDTH,HOME_HEIGHT,homes[i].x,homes[i].y,HOME_WIDTH,HOME_HEIGHT);
		else if (homes[i].status == HOME_STATUS_OCCUPIED)
			ctx.drawImage(froggerImage,HOME_OCCUPIED_OFFSET_X,0,HOME_WIDTH,HOME_HEIGHT,homes[i].x,homes[i].y,HOME_WIDTH,HOME_HEIGHT);
	}
	
	//Draw Frog
	ctx.drawImage(froggerImage,player.animation,0,FROG_WIDTH,CHICK_HEIGHT,player.x,player.y,FROG_WIDTH,CHICK_HEIGHT);
	
	
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

function updateResultsUserInput()
{
	if (isClicked)
	{
		isClicked = false;
		if (RESULTS_RESTART_BUTTON_X <= mouseX && RESULTS_RESTART_BUTTON_X+RESULTS_RESTART_BUTTON_WIDTH >= mouseX)
			if (RESULTS_RESTART_BUTTON_Y <= mouseY && RESULTS_RESTART_BUTTON_Y+RESULTS_RESTART_BUTTON_HEIGHT >= mouseY)
			{
				gameState = GAMESTATE_GAMEPLAY;
				initGame();
			}
	}
}

function updateResultsDraw()
{
	//Clear Canvas
	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//If player won, display winning text
	if (results == RESULTS_WON)
	{
		//Won
		ctx.textBaseline = "top";
		ctx.fillStyle = "#000";
		ctx.fillText(TEXT_WON, TEXT_WON_X, TEXT_WON_Y);
	}
	else if (results == RESULTS_LOST)
	{
		//Lost
		ctx.textBaseline = "top";
		ctx.fillStyle = "#000";
		ctx.fillText(TEXT_LOST, TEXT_LOST_X, TEXT_LOST_Y);	
	}
			
	//Draw Restart Button
	ctx.textBaseline = "top";
	//ctx.fillStyle = "#F00";
	//ctx.fillRect(RESULTS_RESTART_BUTTON_X, RESULTS_RESTART_BUTTON_Y, RESULTS_RESTART_BUTTON_WIDTH, RESULTS_RESTART_BUTTON_HEIGHT);
	ctx.fillStyle = "#000";
	ctx.fillText(TEXT_RESTART_BUTTON, RESULTS_RESTART_BUTTON_X, RESULTS_RESTART_BUTTON_Y);
}