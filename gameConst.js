//
//CANVAS VARIABLES
//
var STAGE_WIDTH = 750,
	STAGE_HEIGHT = 550,
	TIME_PER_FRAME = 300, //this equates to 30 fps
	GAME_FONTS = "bold 20px sans-serif";
//
//IMAGES
//
var PATH_CHAR = "frogger2.png";

var WATER_ZONE_Y = 300,
	INIT_LIFE = 5,
	MAX_TIMER = 500,
	HOME_OFFSET_X = 100,
	HOME_OCCUPIED_OFFSET_X = 150,
	CHIC_MOTION_OFFSET_X = 50,
	CHIC_ANIM_1 = 0,
	CHIC_ANIM_2 = CHIC_MOTION_OFFSET_X;

var CHAR_WIDTH = 50,
	CHAR_HEIGHT = 50,
	CHAR_START_X = 350,
	CHAR_START_Y = 500,
	IMAGE_START_X = 0,
	IMAGE_START_Y = 0,
	SPRITE_WIDTH = 600;
	
//receivers	
var HOME_1_X = 50,
	HOME_1_Y = 50,
	HOME_2_X = 200,
	HOME_2_Y = 50,
	HOME_3_X = 350,
	HOME_3_Y = 50,
	HOME_4_X = 500,
	HOME_4_Y = 50,
	HOME_5_X = 650,
	HOME_5_Y = 50,
	HOME_WIDTH = 50,
	HOME_HEIGHT = 50,
	HOME_STATUS_OCCUPIED = "occupied",
	HOME_STATUS_EMPTY = "empty";
	
//CARS	
var CAR_WIDTH = 100,
	CAR_HEIGHT = 50,
	CAR_START_X = 350,
	CAR_START_Y = 450,
	IMAGECAR_START_X = 200,
	IMAGECAR_START_Y = 0;
	
var CAR2_WIDTH = 100,
	CAR2_HEIGHT = 50,
	CAR2_START_X = 350,
	CAR2_START_Y = 400,
	IMAGECAR2_START_X = 300,
	IMAGECAR2_START_Y = 0;
	
var CAR3_WIDTH = 100,
	CAR3_HEIGHT = 50,
	CAR3_START_X = 350,
	CAR3_START_Y = 350,
	IMAGECAR3_START_X = 400,
	IMAGECAR3_START_Y = 0;	
	
var CAR4_WIDTH = 100,
	CAR4_HEIGHT = 50,
	CAR4_START_X = 350,
	CAR4_START_Y = 300,
	IMAGECAR4_START_X = 600,
	IMAGECAR4_START_Y = 0;		

//LOGS	
var LOG_WIDTH = 100,
	LOG_HEIGHT = 50;
	LOG_OFFSET_X = 500,
	LOG_OFFSET_Y = 0,
	LOG_START_X = 350,
	LOG_START_Y = 200,
	
	LOG_Y_1 = 100, //PLACEMENT OF THE LOGS, 1ST ROW, EACH 50 WIDTH
	LOG_Y_2 = 150,
	LOG_Y_3 = 200;
	
//powers

var POWERS = ["invincibility"],
	POWER_X = 300;
	POWER_Y = 200;
	POWER_WIDTH = 50,
	POWER_HEIGHT = 50,
	POWER_OFFSET_X = 600,
	POWER_OFFSET_y = 0;
	
//LOADING GAME

var TEXT_PRELOADING = "Loading ...", 
	TEXT_PRELOADING_X = 200, 
	TEXT_PRELOADING_Y = 200;
	
//Game Text
var TEXT_TIME = "Score: ",
	TEXT_TIME_X = 20,
	TEXT_TIME_Y = 20,
	TEXT_LIFE = "Lifes: ",
	TEXT_LIFE_X = 600,
	TEXT_LIFE_Y = 20;