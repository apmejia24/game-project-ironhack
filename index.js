
//  VARIABLES

var canvas = document.getElementById("furrywars");
var ctx = canvas.getContext("2d");
var frames = 0;
var interval;
var ardillas = [];
var endgame = false;


// FUNCIONES CONSTRUCTORAS

function Gusano(x,y,width,height,color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedx = 0;
  this.health = 80;
  this.newPos = function(){
    this.x += this.speedx;
  };
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width, this.height)
  };
  //this.attack = function() {}
  this.isAlive = true
  this.isTouching = function(ardilla){
    return (this.x < ardilla.x + ardilla.width) &&
           (this.x + this.width > ardilla.x) &&
           (this.y < ardilla.y + ardilla.height) &&
           (this.y + this.height > ardilla.y)
  }
}



function Ardilla(x,width,height,color) {
  this.x = x;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.color = color;
  this.health = 40;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.isAlive = true;
  
  this.draw = function () {
    ctx.fillStyle = this.color;
    if(this.y-this.height < 370){
      this.y++
    }else{
      this.x--
    }
    ctx.fillRect(this.x,this.y,this.width, this.height)
  };
  this.stop = function(){
    if (ardilla.y == 320) {
      ardilla.y = 320
    }
  }
}



function Goal(x,y,width,height,color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.draw = function (){
    ctx,fillStyle = this.color;
    ctx.fillRect(this.x, this.y,this.width, this.height)
  }
}



// FUNCIONES COMPLEMENTARIAS

var gusano = new Gusano(5,390,80,80,'red');
var goal = new Goal(700,375,95,95,'yellow');



function moveRight() {
  gusano.x += 5;

}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function generarArdillas(){

    var randomPosition = Math.floor(Math.random() * (canvas.width - (gusano.x + gusano.width))) + (gusano.x + gusano.width);
    console.log(randomPosition)
    var ardilla = new Ardilla(randomPosition+20,50,50,'brown');
    ardillas.push(ardilla);



  // if(ardillas[0].isAlive === false){
  //   if (frames % 100 === 0){
  //     var randomPosition = Math.floor(Math.random() * (canvas.width - 150)) - 150;
  //     var ardilla = new Ardilla(randomPosition,50,50,'brown');
  //     ardillas.push(ardilla);
  //   }
  // }
}




function pintarArdilla() {
  ardillas.forEach(function(ardilla){
    ardilla.draw();
    // if (ardilla.y == 418) {
    //   console.log('hol')
    //   ardilla.y = 418
    // } else if(ardilla.y < 418) {
    //   ardilla.y += 5;
    // }
  });
}

function checkColisionArdilla(){
  ardillas.forEach(function(ardillaMala, index){
    if(gusano.isTouching(ardillaMala)){
      ardillaMala.x = gusano.x + gusano.width
      moveRight = ''
      if (frames % 100 == 0){
        ardillaMala.health -= 10

        console.log(ardillaMala.health)
        if(ardillaMala.health == 0){
          ardillas.shift();
          moveRight = function(){
            gusano.x += 5;
          }
          if(!endgame){
            generarArdillas()
          }
        }
      }
    }
  })
}


function ckeckColisionGusano(){
 if(ardillaMala.isTouching(gusano)){
   gusano.x = ardillaMala.x + gusano.width
   if(frames % 100 == 0 ){
     gusano.health -=20
     if(gusano.health == 0){
       console.log('muere gusano')
      gusano.shift();
     }
   }
 }
}




function checkColisionMeta() {
    if (gusano.isTouching(goal)){
      console.log('gwegwkjegsjwhg')
      gameOver()
    }
}


function gameOver (){
  clearInterval(interval)
  interval = ''
  }


function generarLaPrimerArdilla(){
  if (frames == 10) generarArdillas()
}






 //Borra canvas y actualiza todo
function update(){
  frames += 1
  clearCanvas()
  generarLaPrimerArdilla()
  gusano.draw()
  pintarArdilla()
  checkColisionArdilla ()
  checkColisionMeta()
  goal.draw()

 }

function start() {
  interval = setInterval(update, 1000/90)
}


window.onload = function() {
  start()
}



// LISTENERS

document.onkeydown = function(e){
    switch (e.keyCode) {
      case 39:
        moveRight();
        break;

    }
}
