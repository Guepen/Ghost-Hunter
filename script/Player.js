"use strict";

function Player(){
    this.drawX = Game.width / 2;
    this.drawHeight = 80;
    this.drawY = Game.height - this.drawHeight;
    this.srcX = 0;
    this.srcY = 1117;
    this.drawWidth = 50;
    this.srcWidth = 54;
    this.srcHeight = 83;
    this.speed = 5;
    this.health = 3;
    this.shoot = false;
    this.currentBullet = 0;
    //Game.bullets = [];
    //this.interval = null;

    //lägger till 50 skott tillhörande spelarinstansen.
    //skotten återanvänds sedan istället för att skapa en
    //ny instans av Bullet-objektet varje gång spelaren skjuter
    for(var i = 0; i < 50; i++){
        Game.bullets[Game.bullets.length] = new Bullet();
    }
}

Player.prototype.render = function(){
    if(this.health <= 0){
        Game.rendering = false;
        Game.bulletCanvas.clearRect(0, 0, Game.width, Game.height);
        Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
        Game.backgroundCanvas.fillStyle = "blue";
        Game.backgroundCanvas.font = "bold 25px Arial";
        Game.backgroundCanvas.fillText("Game Over", Game.width/2, 70);
        stopLoop();
    }
    else {
        Game.playerCanvas.clearRect(0, 0, 800, 500);
        this.checkDirection();
        this.ifShooting();
        this.renderBullets();
        Game.playerCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth, this.srcHeight,
            this.drawX, this.drawY, this.drawWidth, this.drawHeight);
    }
};

Player.prototype.renderHealth = function(){
    console.log(this.health);
    var nextX = -18;
    Game.healthCanvas.clearRect(0, 0, Game.width, Game.height);
    for(var i = 0; i < this.health; i++){
        Game.healthCanvas.drawImage(Game.gameSprite, 0, 1076, 27, 23,
            nextX += 28, 470, 27, 23)
    }

};

Player.prototype.checkDirection = function(){

        if (Game.pressedKeys[37] || Game.pressedKeys[65]) {
            if (Game.player.drawX <= 0) {
                Game.player.drawX = 0;
            }
            else {
                Game.player.drawX -= this.speed;
            }
        }

        if (Game.pressedKeys[39] || Game.pressedKeys[68]) {
            if (Game.player.drawX <= Game.width - Game.player.drawWidth) {
                Game.player.drawX += this.speed;
            }
        }
};

Player.prototype.renderBullets = function() {
    Game.bulletCanvas.clearRect(0, 0, 800, 500);
    for (var i = 0; i < Game.bullets.length; i++) {
        if (Game.bullets[i].drawY <= 500 && Game.bullets[i].drawY >= 0) {
            Game.bullets[i].render();
        }

        else if (Game.bullets[i].drawY <= 0) {
            Game.bullets[i].resetBullet(Game.bullets[i]);
        }
    }
};

Player.prototype.ifShooting = function(){

    if(Game.pressedKeys[32] && !this.shoot){
        this.shoot = true;
        Game.bullets[this.currentBullet].fire(this.drawX, this.drawY);
        this.currentBullet++;

        if(this.currentBullet >= Game.bullets.length){
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

function startGame() {
    Game.renderBackground();
}
