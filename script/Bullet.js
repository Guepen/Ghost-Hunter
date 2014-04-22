"use strict";

function Bullet(){
    this.drawWidth = 18;
    this.drawHeight = 22;
    this.speed = 3;
    this.srcX = 50;
    this.srcY = 500;
    this.drawY = 510;
    this.drawX = -25;
}

Bullet.prototype.render = function(){
    Game.bulletCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.drawWidth,
       this.drawHeight, this.drawX, this.drawY -= this.speed, this.drawWidth, this.drawHeight);
};

Bullet.prototype.fire = function(playerX, playerY){
    this.drawX = playerX + Game.player.drawWidth / 2 - (this.drawWidth / 2);
    this.drawY = playerY;
};

