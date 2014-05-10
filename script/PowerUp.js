"use strict";

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

PowerUp.prototype.render = function () {
    Game.powerUpCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);

};

/**
 * Funktion som slumpar om en power-up ska ges när ett spöke skjutits ner
 *
 * @param {number} ghostX Det skjutna spökets x-kordinat
 * @param {number} ghostY Det skjutna spökets y-kordinat
 */
function newPowerUp(ghostX, ghostY) {
    var randomPowerUp = Math.floor(Math.random() * 25);
    var powerUp;

    if (randomPowerUp === 0) {
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
        Game.powerUps[Game.powerUps.length] = powerUp;
        Game.renderPowerUp = true;

    }

    else if (randomPowerUp === 1) {
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
        Game.powerUps[Game.powerUps.length] = powerUp;
        Game.renderPowerUp = true;
    }

}

/**
 * funktion som renderar ut power-ups
 */
function renderPowerUps() {

    if (Game.powerUps.length === 0) {
        Game.renderPowerUp = false;
    }

    for (var i = 0; i < Game.powerUps.length; i++) {
        //om power-upen inte är på marken
        if (Game.powerUps[i].drawY + Game.powerUps[i].drawHeight <= Game.height) {
            Game.powerUpCanvas.clearRect(Game.powerUps[i].drawX - 2, Game.powerUps[i].drawY - 2,
                    Game.powerUps[i].drawWidth + 4, Game.powerUps[i].drawHeight + 4);

            Game.powerUps[i].render();
        }
    }

}