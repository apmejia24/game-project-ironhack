
//  VARIABLES

var canvas = document.getElementById("furrywars");
var ctx = canvas.getContext("2d");
var frames = 0;
var interval;
var ardillas = [];


// FUNCIONES CONSTRUCTORAS

function Gusano(x,y,width,height,color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedx = 0;
  this.health = 100;
  this.newPos = function(){
    this.x += this.speedx;
  };
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width, this.height)
  };
  //this.attack = function() {}
  // this.isAlive = true

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
  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width, this.height)
  };
  this.stop = function(){
    if (ardilla.y == 403) {
      ardilla.y = 403
    }

  }


}

function Dino(x,y,width,height,color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.health = 50;
  this.draw = function (){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width)
  }
}




// FUNCIONES COMPLEMENTARIAS

var gusano = new Gusano(5,300,80,80,'red');



function moveRight() {
  gusano.x += 5;

}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function generarArdillas(){
  if (frames % 300 === 0){
    var randomPosition = Math.floor(Math.random() * (canvas.width - 150)) + 150;
    var ardilla = new Ardilla(randomPosition,50,50,'brown');
    ardillas.push(ardilla);
  }
}

function pintarArdilla() {
  ardillas.forEach(function(ardilla){
    ardilla.draw();
    if (ardilla.y == 403) {
      ardilla.y = 403
    } else if(ardilla.y < 403) {
      ardilla.y += 5;
    }
  });
}





 //Borra canvas y actualiza todo
function update(){
  frames += 1
  clearCanvas()
  gusano.draw()
  generarArdillas()
  pintarArdilla()


 }

function start() {
  interval = setInterval(
    update, 1000/60)
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
