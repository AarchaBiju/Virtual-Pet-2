class Food{
 constructor(){
     this.milk = loadImage("Images/Milk.png");
     this.foodStock = 0;
     this.lastFed;
 }

 getFoodStock(){
     return this.foodStock;
 }

 updateFoodStock(food){
     this.foodStock = food;
     
 }

 deductFood(){
   this.foodStock = this.foodStock -1;

 }



display(){
    var x=80,y=100;
    imageMode(CENTER);
    //image (this.milk,200,200,50,50);

    if(this.foodStock!=0){
    for(var i = 0;i<this.foodStock;i++){
        if(i%10==0){
            x=80;
            y=y+50;
        }
        image(this.milk,x,y,50,50);
        x=x+30;
    }
}

}
}