var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var btnAddFood,btnFeed;
var fedTime, lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
   
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  console.log("hi");

  

  foodObj = new Food();
  btnAddFood = createButton("AddFood");
  btnAddFood.position(200,200);
  btnAddFood.mousePressed(AddFood);


  btnFeed = createButton("Feed");
  btnFeed.position(200,100);
  btnFeed.mousePressed(FeedDog);

}

// function to display UI
function draw() {
  background(46,139,87);
 
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("red");
  textSize(15);
  if(lastFed>=12){
    text("LastFed : " + lastFed%12 + "PM" , 350,30);
  }
  else if((lastFed == 0)){
    text("lastFed : 12 AM", 350,30);
  }
  else {
    text("LastFed : " + lastFed + "AM" , 350,30);
  }

  textSize(20); 

  drawSprites();
  fill(255,255,254);
  
  foodObj.display();
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function AddFood(){
  foodS ++;
  database.ref('/').update({
    Food:foodS
  })
}

function FeedDog(){
  console.log("hi 2");
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })

}