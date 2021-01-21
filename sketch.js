//Create variables here
var dog,happyDog,dogSprite;
var database;
var backgroundImg;
var foodS, foodStock;
var bg;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  backgroundImg = loadImage("images/bggg.jpg");
}

function setup() {
	createCanvas(500, 500);
  
  bg = createSprite(250,250,500,500);
  bg.addImage(backgroundImg);
  bg.scale=1.25;

  dogSprite = createSprite(250,400,50,50);
  dogSprite.addImage(dog);
  dogSprite.scale=0.25; 


  database=firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readstock);

 
}


function draw() {  
//background();

if(keyWentDown(UP_ARROW)){

  writeStock(foodS);
  dogSprite.addImage(happyDog);
}
  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("press UP_ARROW to feed dogo",175,250);
  textSize(30);
  text("Food remaning:"+ foodS,175,50);
}

function readstock(data){
  foodS = data.val();
}

function writeStock(x){

   if(x<=0){
     x=0
   }else{
     x=x-1;
   }
   

  database.ref().update({
    food:x
  })
}
