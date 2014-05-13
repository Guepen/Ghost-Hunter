"use strict";

var PowerUpObj = {
    powerUps: []
}
/**
 * Skapar en instans av PowerUp
 * @constructor
 * @this {PowerUp}
 */
function PowerUp() {
    this.drawX = 900;
    this.drawY = 600;
    this.srcY = 0;
    this.srcX = 0;
    this.srcWidth = 0;
    this.srcHeight = 0;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.speed = 2;
}

/**
 * funktion som ritar ut power-ups
 * @this {PowerUp}
 */
PowerUp.prototype.render = function () {
    Game.powerUpCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);

};

function randomPowerUp() {
    return Math.floor(Math.random() * 25);
}
/**
 * Funktion som slumpar om en power-up ska ges när ett spöke skjutits ner
 * @param {number} ghostX Det skjutna spökets x-kordinat
 * @param {number} ghostY Det skjutna spökets y-kordinat
 */
function newPowerUp(ghostX, ghostY, random) {
    //var random = Math.floor(Math.random() * 25);
    var powerUp;

    if (random === 0) {
        powerUp = new PowerUp();
        powerUp.drawX = ghostX;
        powerUp.drawY = ghostY;
        powerUp.srcY = 1000;
        powerUp.srcX = 150;
        powerUp.srcWidth = 26;
        powerUp.srcHeight = 27;
        powerUp.drawWidth = 26;
        powerUp.drawHeight = 27;
        powerUp.type = "speed";
        PowerUpObj.powerUps[PowerUpObj.powerUps.length] = powerUp;
    }

    else if (random === 1) {
        powerUp = new PowerUp();
        powerUp.drawX = ghostX;
        powerUp.drawY = ghostY;
        powerUp.srcY = 1000;
        powerUp.srcX = 123;
        powerUp.srcWidth = 27;
        powerUp.srcHeight = 27;
        powerUp.drawWidth = 26;
        powerUp.drawHeight = 27;
        powerUp.type = "health";
        PowerUpObj.powerUps[PowerUpObj.powerUps.length] = powerUp;
    }

}

/**
 * funktion som loopar igenom alla power-ups och anropar rit-funktionen render()
 */
function renderPowerUps() {
    for (var i = 0; i < PowerUpObj.powerUps.length; i++) {
        //om power-upen inte är på marken
        if (PowerUpObj.powerUps[i].drawY + PowerUpObj.powerUps[i].drawHeight <= Game.height) {
            Game.powerUpCanvas.clearRect(PowerUpObj.powerUps[i].drawX - 2, PowerUpObj.powerUps[i].drawY - 2,
                    PowerUpObj.powerUps[i].drawWidth + 4, PowerUpObj.powerUps[i].drawHeight + 4);

            PowerUpObj.powerUps[i].render();
        }
    }

}