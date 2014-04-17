"use strict";

function Bullet(){
    this.width = 18;
    this.height = 22;
    this.speed = 3;
    this.srcX = 50;
    this.srcY = 500;
    this.drawY = 510;
    this.drawX = 400;
}

Bullet.prototype.render = function(){
    Game.bulletCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.width,
       this.height, this.drawX, this.drawY -= this.speed, this.width, this.height);
};

Bullet.prototype.fire = function(playerX, playerY){
    this.drawX = playerX + Game.player.width / 2 - (this.width / 2);
    this.drawY = playerY;
};
