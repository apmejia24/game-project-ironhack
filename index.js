
//  VARIABLES

var canvas = document.getElementById("furrywars");
var ctx = canvas.getContext("2d");
var frames = 0;
var interval;
var ardillas = [];
var endgame = false;


// FUNCIONES CONSTRUCTORAS

function Gusano() {
  this.x = 50;
  this.y = 390;
  this.aux = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.sheetWidth = 621;
  this.sheetHeight = 172;
  this.frameCountCols = 9;
  this.frameCountRows = 2;
  this.width =   this.sheetWidth / this.frameCountCols;
  this.height = this.sheetHeight / this.frameCountRows;
  this.currentFrame = 0;
  this.gusano = new Image();
  this.gusano.src = "images/oso2.png"
  this.gusano.onload = function(){
    this.drawImage()
  }.bind(this)
  //this.color = color;
  this.speedx = 0;
  this.health = 80;
  this.newPos = function(){
    this.x += this.speedx;
  };
  this.drawImage = function() {
    ctx.drawImage(this.gusano,this.aux,this.srcY,60,90,this.x,this.y,this.width, this.height);
  };
  this.updateFrame = function(){

    this.currentFrame += this.currentFrame % this.frameCountCols;
    this.srcX = this.currentFrame * this.width;
    console.log(frames)
    this.srcY = 0;
  }
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

var gusano = new Gusano();
var goal = new Goal(700,375,95,95,'yellow');



function moveRight() {
  gusano.x += 5;
  switch (gusano.aux) {
    case 0:
      return gusano.aux = 60;
    case 60:
      return gusano.aux = 130;
    case 130:
      return gusano.aux = 200;
    case 200:
      return gusano.aux = 270;
    case 270:
      return gusano.aux = 330;
    case 330:
      return gusano.aux = 410;
    case 410:
      return gusano.aux = 480;
    case 480:
      return gusano.aux = 550;
    case 550:
      return gusano.aux = 617;
    case 617:
      return gusano.aux = 690;
    case 690:
      return gusano.aux = 760;
    case 760:
      return gusano.aux = 830;
    case 830:
      return gusano.aux = 900;
    case 900:
      return gusano.aux = 970;
    case 970:
      return gusano.aux = 1042;
    case 1042:
      return gusano.aux = 1115;
    case 1115:
        return gusano.aux = 1182;
    case 1182:
        return gusano.aux = 1248;
    case 1248:
        return gusano.aux = 0;
  }
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function generarArdillas(){

    var randomPosition = Math.floor(Math.random() * (canvas.width - (gusano.x + gusano.width))) + (gusano.x + gusano.width);
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
  frames ++
  clearCanvas()
  generarLaPrimerArdilla()
  gusano.drawImage()
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
  update()
}



// LISTENERS

document.onkeydown = function(e){
    switch (e.keyCode) {
      case 39:
        moveRight();
        break;

    }
}
