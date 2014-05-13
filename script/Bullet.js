"use strict";

/**
 * Skapar en instans av Bullet
 * @constructor
 * @this {Bullet}
 */
function Bullet() {
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
 * @this {Bullet}
 */
Bullet.prototype.render = function () {
    Game.bulletCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY -= this.speed, this.drawWidth, this.drawHeight);
};

/**
 *funktion som sätter en kulas position till spelarens position
 * @param player Spelaren
 * @this {Bullet}
 */
Bullet.prototype.fire = function (player) {
    if (player.movingRight) {
        this.drawX = player.drawX + (player.drawWidth - 13);
        this.drawY = player.drawY + ((player.drawHeight / 2) - 17);
    } else {
        this.drawX = player.drawX + 5;
        this.drawY = player.drawY + ((player.drawHeight / 2) - 17);
    }
};
/**
 * funktion som resetar en kulas position
 * @this {Bullet}
 */
Bullet.prototype.resetBullet = function () {
    this.drawX = -25;
    this.drawY = 510;
};