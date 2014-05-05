/**
 * Skapar en instans av Obstacle
 * @constructor
 */
function Obstacle(){
    this.drawX = Math.random() * (Game.width - 75);
    this.drawY = -30;
    this.srcY = 1000;
    this.srcX = 58;
    this.srcWidth = 65;
    this.srcHeight = 19;
    this.drawWidth = 70;
    this.drawHeight = 20;
    this.type = "obstacle";
}

Obstacle.prototype.render = function() {
    Game.obstacleCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY, this.drawWidth, this.drawHeight);
};
