"use strict";

var ObstacleObj = {
    obstacles: []
};
/**
 * Skapar en instans av Obstacle
 * @constructor
 */
function Obstacle() {
    this.drawX = randomGenerator(800);
    this.drawY = -30;
    this.srcY = 1000;
    this.srcX = 58;
    this.srcWidth = 65;
    this.srcHeight = 19;
    this.drawWidth = 70;
    this.drawHeight = 20;
    this.type = "obstacle";
}

Obstacle.prototype.render = function () {
    Game.obstacleCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY, this.drawWidth, this.drawHeight);
};

/**
 * funktion som flyttar hindrena baserat på spelarens poäng
 */
function moveObstacles() {
    for (var i = 0; i < Game.ghosts.length; i++) {

        if (ObstacleObj.obstacles[0].drawY <= 100) {
            ObstacleObj.obstacles[0].drawY += 0.5;
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            ObstacleObj.obstacles[0].render();
        }

        if (Game.score >= 8 && Game.score < 28) {
            if (ObstacleObj.obstacles[1].drawY <= 125) {
                if (ObstacleObj.obstacles[0].drawX >= ObstacleObj.obstacles[1].drawX &&
                    ObstacleObj.obstacles[0].drawX + ObstacleObj.obstacles[0].drawWidth <= Game.width) {
                    ObstacleObj.obstacles[0].drawX += 0.5;
                }

                else if (ObstacleObj.obstacles[0].drawX >= 0 && ObstacleObj.obstacles[0].drawX <= ObstacleObj.obstacles[1].drawX) {
                    ObstacleObj.obstacles[0].drawX -= 0.5;
                }
                ObstacleObj.obstacles[1].drawY++;
            }
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            ObstacleObj.obstacles[1].render();
            ObstacleObj.obstacles[0].render();
        }

        else if (Game.score >= 28 && Game.score < 40) {
            if (ObstacleObj.obstacles[0].drawY <= 175) {
                ObstacleObj.obstacles[0].drawY += 0.5;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                ObstacleObj.obstacles[0].render();
                ObstacleObj.obstacles[1].render();
            }
        }

        else if (Game.score >= 40 && Game.score < 80) {
            if (ObstacleObj.obstacles[1].drawY <= 255) {
                ObstacleObj.obstacles[1].drawY += 0.5;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                ObstacleObj.obstacles[1].render();
                ObstacleObj.obstacles[0].render();
            }
        }

        else if (Game.score >= 80 && Game.score < 110) {
            if (ObstacleObj.obstacles[0].drawY <= 175) {
                ObstacleObj.obstacles[0].drawY += 0.5;
            }

            ObstacleObj.obstacles[0].drawX += 0.2;
            ObstacleObj.obstacles[1].drawX -= 0.2;

            if (ObstacleObj.obstacles[0].drawX >= Game.width) {
                ObstacleObj.obstacles[0].drawX = -70;
            }

            if (ObstacleObj.obstacles[1].drawX <= 0) {
                ObstacleObj.obstacles[1].drawX = 870;
            }

            if (ObstacleObj.obstacles[1].drawY <= 280) {
                //Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                ObstacleObj.obstacles[1].drawY += 0.5;

            }
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            ObstacleObj.obstacles[0].render();
            ObstacleObj.obstacles[1].render();
        }

        else if (Game.score >= 110) {
            ObstacleObj.obstacles[0].drawX += 0.2;
            ObstacleObj.obstacles[1].drawX -= 0.2;

            if (ObstacleObj.obstacles[0].drawX >= Game.width) {
                ObstacleObj.obstacles[0].drawX = -70;
            }

            if (ObstacleObj.obstacles[1].drawX <= 0) {
                ObstacleObj.obstacles[1].drawX = 870;
            }

            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            ObstacleObj.obstacles[0].render();
            ObstacleObj.obstacles[1].render();
        }
    }
}
