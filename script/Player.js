"use strict";

function Player(){
    this.drawX = 400;
    this.height = 100;
    this.drawY = 420;
    this.srcX = 63;
    this.srcY =500;
    this.width = 80;
    this.speed = 5;
    this.shoot = false;
    this.currentBullet = 0;
    this.bullets = [];
    //this.interval = null;

    //lägger till 50 skott tillhörande spelarinstansen.
    //skotten återanvänds sedan istället för att skapa en
    //ny instans av Bullet-objektet varje gång spelaren skjuter
    for(var i = 0; i < 50; i++){
        this.bullets[this.bullets.length] = new Bullet();
    }
}

Player.prototype.render = function(){
    Game.playerCanvas.clearRect(0, 0, 800, 500);
    this.checkDirection();
    this.ifShooting();
    this.renderBullets();
    Game.playerCanvas.drawImage(Game.gameSprite,this.srcX, this.srcY, this.width, this.height,
                                this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.checkDirection = function(){

        if (Game.pressedKeys[37] || Game.pressedKeys[65]) {
            if (!Game.player.drawX <= 0) {
                Game.player.drawX -= this.speed;
            }
        }

        if (Game.pressedKeys[39] || Game.pressedKeys[68]) {
            if (Game.player.drawX <= Game.width - Game.player.width) {
                Game.player.drawX += this.speed;
            }
        }
};

Player.prototype.renderBullets = function() {

    Game.bulletCanvas.clearRect(0, 0, 800, 500);
    for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].drawY <= 500) {
            this.bullets[i].render();
        }
    }
};

Player.prototype.ifShooting = function(){

    if(Game.pressedKeys[32] && !this.shoot){
        this.shoot = true;
        this.bullets[this.currentBullet].fire(this.drawX, this.drawY);
        this.currentBullet++;

        if(this.currentBullet >= this.bullets.length){
            this.currentBullet = 0;
        }
    }

    else if(!Game.pressedKeys[32]){
        this.shoot = false;
    }

};

function keyDown(e){
    e.preventDefault();
    //alert(e.keyCode);
    /*if (e.keyCode === 37 || e.keyCode === 39)  {
       // if (!Game.pressedKeys[e.keyCode]) {
            //Game.player.interval = setInterval(function () {
                Game.player.srcX += 150;
                //if (Game.player.srcX >= 1050) {
                    Game.player.srcX = 150;
                }
           // }, 100);
        }
    }*/

    if(e.keyCode === 80){
        stopStart();
    }
    //console.log('down');
    Game.pressedKeys[e.keyCode] = true;
}

function keyUp(e){
    e.preventDefault();
   /* if (e.keyCode === 37 || e.keyCode === 39) {
        clearInterval(Game.player.interval);
    }*/
    Game.pressedKeys[e.keyCode] = false;
    //Game.player.srcX = 0;

}
