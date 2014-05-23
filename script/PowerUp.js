"use strict";

var PowerUpObj = {
    powerUps: []
};
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
    this.type = "";
}

/**
 * funktion som ritar ut power-ups
 * @this {PowerUp}
 */
PowerUp.prototype.render = function () {
    Game.powerUpCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);
};

/**
 * Funktion som slumpar om en power-up ska ges när ett spöke skjutits ner
 * @param {number} ghostX Det skjutna spökets x-kordinat
 * @param {number} ghostY Det skjutna spökets y-kordinat
 * @param {number} random ett randomtal mellan 0-25 som gör att det slumpas om en power-up skall ges
 */
function newPowerUp(ghostX, ghostY, random) {
    var powerUp;

    switch (random) {
        case 0:
            powerUp = new PowerUp();
            powerUp.drawX = ghostX;
            powerUp.drawY = ghostY;
            powerUp.drawWidth = 26;
            powerUp.drawHeight = 27;
            powerUp.srcY = 0;
            powerUp.srcX = 0;
            powerUp.srcWidth = 26;
            powerUp.srcHeight = 27;
            powerUp.type = "wallWalker";
            PowerUpObj.powerUps[PowerUpObj.powerUps.length] = powerUp;
            break;

        case 1:
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
            break;

        case 2:
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
            break;

        default :
            break;
    }
}

/**
 * funktion som loopar igenom alla power-ups och anropar rit-funktionen render()
 */
function renderPowerUps() {
    for (var i = 0; i < PowerUpObj.powerUps.length; i++) {
        console.log(PowerUpObj.powerUps[i]);
        //om power-upen inte är på marken
        if (PowerUpObj.powerUps[i].drawY + PowerUpObj.powerUps[i].drawHeight <= Game.height) {
            console.log("clear");
            Game.powerUpCanvas.clearRect(PowerUpObj.powerUps[i].drawX - 2, PowerUpObj.powerUps[i].drawY - 2,
                    PowerUpObj.powerUps[i].drawWidth + 4, PowerUpObj.powerUps[i].drawHeight + 4);

            PowerUpObj.powerUps[i].render();
        }
    }

}