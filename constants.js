//------------
//System Values
//------------
var STAGE_WIDTH = 750,
        STAGE_HEIGHT = 550,
        TIME_PER_FRAME = 33, //this equates to 30 fps
        GAME_FONTS = "bold 20px serif";

//States
var GAMESTATE_PRELOAD = "preloading",
        GAMESTATE_MENU = "menu",
        GAMESTATE_GAMEPLAY = "gameplay",
        GAMESTATE_DEAD = "dead",
        GAMESTATE_RESULTS = "results";

//------------
//Preloading
//------------
var TEXT_PRELOADING = "Loading the images...",
        TEXT_PRELOADING_X = STAGE_HEIGHT / 2,
        TEXT_PRELOADING_Y = STAGE_WIDTH / 2;

//-----------------
//ACCESSING IMAGES FROM SPRITESHEET
//-----------------
var SOURCE_CHICK = "chicken2.png",
        CHICK_MOTION_OFFSET_X = 50,
        HOME_OFFSET_X = 100,
        HOME_OCCUPIED_OFFSET_X = 150,
        CAR_OFFSET_X = 300,
        CAR2_OFFSET_X = 400,
        LOG_OFFSET_X = 500;

//-----------------
//MENU CONSTANTS
//-----------------
var MENU_START_BUTTON_X = 300,
        MENU_START_BUTTON_Y = 280,
        MENU_START_BUTTON_WIDTH = 200,
        MENU_START_BUTTON_HEIGHT = 100,
        TEXT_START_BUTTON = "Click to START",
        LOGO_SRC = "writingandchicken2.png",
        LOGO_HEIGHT = 250,
        LOGO_WIDTH = 300,
        BACKGROUND_SRC = "background.png",
        BACKGROUND_HEIGHT = STAGE_HEIGHT,
        BACKGROUND_WIDTH = STAGE_WIDTH;


//-----------------
//RESULTS CONSTANTS
//-----------------
var RESULTS_WON = "won",
        RESULTS_LOST = "lost",
        RESULTS_RESTART_BUTTON_X = 300,
        RESULTS_RESTART_BUTTON_Y = 280,
        RESULTS_RESTART_BUTTON_WIDTH = 200,
        RESULTS_RESTART_BUTTON_HEIGHT = 100,
        TEXT_RESTART_BUTTON = "Click to RESTART",
        TEXT_WON_X = 350,
        TEXT_WON_Y = 220,
        TEXT_WON = "You won!",
        TEXT_LOST_X = 350,
        TEXT_LOST_Y = 220,
        TEXT_LOST = "You lost!",
        DEATH_MSG = "...AND YOU'RE DEAD!";

//-----------------
//GAME SCORING
//-----------------	

var POINTS = 0,
        POINTS_FOR_CLEARED_LEVEL = 250,
        MAX_TIMER = 240,
        INITIAL_LIFES = 5;
//-----------------
//GAME CONSTANTS
//-----------------
var
        CHICK_START_X = 350,
        CHICK_START_Y = 500,
        CHICK_WIDTH = 50,
        CHICK_HEIGHT = 50,
        CHICK_ANIM_1 = 0, //first on spritesheet
        CHICK_ANIM_2 = CHICK_MOTION_OFFSET_X, //animating the chicken, moving between 2 images

        LOG_Y_1 = 100,
        LOG_Y_2 = 150,
        LOG_Y_3 = 200,
        LOG_WIDTH = 100,
        LOG_HEIGHT = 50,
        GRASS_SRC = "grass.png",
        GRASS_OFFSET_X = 0,
        GRASS_OFFSET_Y = 0,
        GRASS_HEIGHT = 50,
        GRASS_WIDTH = STAGE_WIDTH,
        WATER_SRC = "water2.jpg",
        WATER_OFFSET_X = 0,
        WATER_OFFSET_Y = 0,
        WATER_HEIGHT = 250,
        WATER_WIDTH = STAGE_WIDTH,
        WATER_ZONE_Y = 250, //waterzone start

        SPLAT_OFFSET_X = 0,
        SPLAT_OFFSET_Y = 0,
        SPLAT_WIDTH = 500,
        SPLAT_HEIGHT = 470,
        SPLAT_SRC = "bigsplat.png",
        POWER_IMAGE_SRC = "points.png",
        POWER2_IMAGE_SRC = "points3.png"
        LIFE_IMAGE_SRC = "heart.png",
                
        CAR_Y_1 = 300, //PLACEMENT OF CARS ON CANVAS, HEIGHT, 1ST ROW
        CAR_Y_2 = 350, //2ND ROW ETC
        CAR_Y_3 = 400,
        CAR_Y_4 = 450,
        CAR_WIDTH = 100, //CAR SIZE
        CAR_HEIGHT = 50,
        DIST_BEFORE_CAR_DISAPPEAR = 100, //has to be equal to width of car for smooth disappearance


        DIST_BEFORE_LOG_DISAPPEAR = 100,
        SPEED_CAR = 5,
        SPEED_FAST_CAR = 8,
        SPEED_LOG = 5,
        SPEED_FAST_LOG = 8,
        SPEED_PLAYER = 50; //move by width of the chicken

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

//Game Text
var TEXT_TIME = "Time: ",
        TEXT_TIME_X = 20,
        TEXT_TIME_Y = 20,
        TEXT_LIFE = "Life: ",
        TEXT_LIFE_X = 600,
        TEXT_LIFE_Y = 20,
        TEXT_SCORE = "Score: ",
        TEXT_SCORE_X = 300,
        TEXT_SCORE_Y = 20;