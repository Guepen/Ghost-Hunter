function Obstacle(){
    this.drawX =  Math.random() * Game.width;
    this.drawY = -30;
    this.srcY = 500;
    this.srcX = 130;
    this.srcWidth = 65;
    this.srcHeight = 20;
    this.drawWidth = 70;
    this.drawHeight = 20;
}

Obstacle.prototype.render = function() {
    //alert("rendering");
    Game.obstacleCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY, this.drawWidth, this.drawHeight)
};
/*Obstacle.prototype.moveObstacles = function(){
    console.log(Game.score);
    if(Game.obstacle.drawX + Game.obstacle.drawWidth <= Game.obstacle2.drawX &&
        Game.obstacle.drawX + Game.obstacle.drawWidth >= Game.obstacle2.drawX + Game.obstacle2.drawWidth){
        Game.obstacle.drawX--;
        Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
        Game.obstacle.render();
        Game.obstacle2.render();

        }
    }
        if(Game.obstacle.drawY <= 100){
            Game.obstacle.drawY++;
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacle.render();
        }
    }

    if(Game.score >= 8 && Game.score < 18){
        ghost.speed = 0.7;
        Game.spawnAmount = 3;
        if (Game.obstacle2.drawY <= 115) {
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacle2.drawY++;
            Game.obstacle2.render();
            Game.obstacle.render();
        }
    }

    else if(Game.score >= 18 && Game.score < 28){
        ghost.speed = 0.8;
        Game.spawnAmount = 4;
        Game.spawnRate = 2500;
    }

    else if(Game.score >= 28 && Game.score < 40){
        ghost.speed = 1;
        Game.spawnAmount = 5;
        Game.spawnRate = 1800;
        if (Game.obstacle.drawY <= 175) {
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacle.drawY++;
            Game.obstacle.render();
            Game.obstacle2.render();
        }
    }

    else if(Game.score >= 40){
        ghost.speed = 1;
        Game.spawnAmount = 6;
        Game.spawnRate = 1500;
        if (Game.obstacle2.drawY <= 245) {
            Game.obstacle2.drawY++;
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacle2.render();
            Game.obstacle.render();
        }
}*/