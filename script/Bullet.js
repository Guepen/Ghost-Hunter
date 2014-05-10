"use strict";

/**
 * Skapar en instans av Bullet
 * @constructor
 * @this {Bullet}
 */
function Bullet(){
    this.drawWidth = 8;
    this.drawHeight = 12;
    this.speed = 3;
    this.srcX = 48;
    this.srcY = 1000;
    this.srcWidth = 10;
    this.srcHeight = 14;
    this.drawY = 510;
    this.drawX = -25;
}

/**
 * funktion som ritar ut kulorna och uppdaterar deras position
 */
Bullet.prototype.render = function(){
    Game.bulletCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY -= this.speed, this.drawWidth, this.drawHeight);
};

/**
 *funktion som sätter en kulas position till spelarens position
 * @param playerX Spelarens x-kordinat
 * @param playerY Spelaren y-kordinat
 */
Bullet.prototype.fire = function(playerX, playerY){
    this.drawX = playerX + Game.players[0].drawWidth / 2 - (this.drawWidth / 2);
    this.drawY = playerY;
};
/**
 * funktion som resetar en kulas position
 */
Bullet.prototype.resetBullet = function () {
    this.drawX = -25;
    this.drawY = 510;
};