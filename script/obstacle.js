"use strict";
/**
 * @type {{obstacles: Array, moveObs: number}}
 */
var ObstacleObj = {
    obstacles: [],
    moveObs: 100
};

/**
 * @param minDrawX Minsta position i x-led där hindret kan skapas
 * @param maxDrawX Högsta position i x-led där hindret kan skapas
 * @constructor
 */
function Obstacle(minDrawX, maxDrawX) {
    this.drawX = randomGenerator(minDrawX, maxDrawX);
    this.drawY = -30;
    this.srcY = 1170;
    this.srcX = 0;
    this.srcWidth = 78;
    this.srcHeight = 20;
    this.drawWidth = 80;
    this.drawHeight = 25;
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
