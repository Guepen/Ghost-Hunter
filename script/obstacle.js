function Obstacle(){
    this.drawX =  Math.random() * Game.width;
    this.drawY = -30;
    this.srcY = 500;
    this.srcX = 130;
    this.srcWidth = 65;
    this.srcHeight = 20;
    this.drawWidth = 70;
    this.drawHeight = 20;
    this.type = "obstacle";
}

Obstacle.prototype.render = function() {
    //alert("rendering");
    Game.obstacleCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY, this.drawWidth, this.drawHeight)
};
