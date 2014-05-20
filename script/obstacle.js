"use strict";

var ObstacleObj = {
    obstacles: [],
    moveObs: 100
};
/**
 * Skapar en instans av Obstacle
 * @constructorpp
 */
function Obstacle(minDrawX, maxDrawX) {
    this.drawX = randomGenerator(minDrawX, maxDrawX);
    this.drawY = -30;
    this.srcY = 1000;
    this.srcX = 58;
    this.srcWidth = 65;
    this.srcHeight = 19;
    this.drawWidth = 70;
    this.drawHeight = 20;
    this.speed = 0.5;
    this.type = "obstacle";
}

/**
 * funktion som renderar ut hindrena
 * @this Obstacle
 */
Obstacle.prototype.render = function () {
    Game.obstacleCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY, this.drawWidth, this.drawHeight);
};
