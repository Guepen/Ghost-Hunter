"use strict";

/**
 * @type {{explosions: Array, audio: Audio}}
 */
var ExplosionObj = {
    explosions: [],
    audio: new Audio("audio/powerup.wav")
};

/**
 * Skapar en ny instans av Explosion
 * @param drawX X-positionen där explosionen skall renderas ut
 * @param drawY Y-positionen där explosionen skall renderas ut
 * @param callback funktion som tar bort explosionen från arrayen
 * @param move Ett slumpat tal som bestämmer hur explosionen skall röra sig
 * @constructor
 */
function Explosion(drawX, drawY, callback, move) {
    this.drawWidth = 22;
    this.drawHeight = 22;
    this.srcX = 177;
    this.srcY = 1000;
    this.srcWidth = 22;
    this.srcHeight = 22;
    this.drawY = drawY;
    this.drawX = drawX;
    this.move = move;

    ExplosionObj.explosions.clearExplosion = setTimeout(function () {
        callback();
    }, 5000);
}

/**
 * Renderar ut explosionerna
 */
Explosion.prototype.render = function () {
    if (this.move <= 4) {
        if (this.drawHeight >= 0 && this.drawWidth > 0) {
            Game.explosionCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
                this.srcHeight, this.drawX -= this.move, this.drawY -= 2, this.drawWidth -= 0.5, this.drawHeight -= 0.5);
        }
    }
    else {
        if (this.drawHeight >= 0 && this.drawWidth > 0) {
            Game.explosionCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
                this.srcHeight, this.drawX += this.move, this.drawY -= 2, this.drawWidth -= 2, this.drawHeight -= 2);
        }
    }
};

/**
 * rensar canvasen och anropar render
 */
function renderExplosions() {
    Game.explosionCanvas.clearRect(0, 0, Game.width, Game.height);
    for (var i = 0; i < ExplosionObj.explosions.length; i++) {
        ExplosionObj.explosions[i].render();

    }
}