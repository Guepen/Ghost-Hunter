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

/**
 * funktion som flyttar hindrena baserat på spelarens poäng
 */
function moveObstacles() {
    for (var i = 0; i < Game.ghosts.length; i++) {

        if (Game.obstacles[0].drawY <= 100) {
            Game.obstacles[0].drawY += 0.5;
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacles[0].render();
        }

        if (Game.score >= 8 && Game.score < 28) {
            if (Game.obstacles[1].drawY <= 125) {
                if (Game.obstacles[0].drawX >= Game.obstacles[1].drawX &&
                    Game.obstacles[0].drawX + Game.obstacles[0].drawWidth <= Game.width) {
                    Game.obstacles[0].drawX += 0.5;
                }

                else if (Game.obstacles[0].drawX >= 0 && Game.obstacles[0].drawX <= Game.obstacles[1].drawX) {
                    Game.obstacles[0].drawX -= 0.5;
                }
                Game.obstacles[1].drawY++;
            }
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacles[1].render();
            Game.obstacles[0].render();
        }

        else if (Game.score >= 28 && Game.score < 40) {
            if (Game.obstacles[0].drawY <= 175) {
                Game.obstacles[0].drawY += 0.5;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[0].render();
                Game.obstacles[1].render();
            }
        }

        else if (Game.score >= 40 && Game.score < 80) {
            if (Game.obstacles[1].drawY <= 255) {
                Game.obstacles[1].drawY += 0.5;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[1].render();
                Game.obstacles[0].render();
            }
        }

        else if (Game.score >= 80 && Game.score < 110) {
            if (Game.obstacles[0].drawY <= 175) {
                Game.obstacles[0].drawY += 0.5;
            }

            Game.obstacles[0].drawX += 0.2;
            Game.obstacles[1].drawX -= 0.2;

            if (Game.obstacles[0].drawX >= Game.width) {
                Game.obstacles[0].drawX = -70;
            }

            if (Game.obstacles[1].drawX <= 0) {
                Game.obstacles[1].drawX = 870;
            }

            if (Game.obstacles[1].drawY <= 280) {
                //Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[1].drawY += 0.5;

            }
            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacles[0].render();
            Game.obstacles[1].render();
        }

        else if (Game.score >= 110) {
            Game.obstacles[0].drawX += 0.2;
            Game.obstacles[1].drawX -= 0.2;

            if (Game.obstacles[0].drawX >= Game.width) {
                Game.obstacles[0].drawX = -70;
            }

            if (Game.obstacles[1].drawX <= 0) {
                Game.obstacles[1].drawX = 870;
            }

            Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
            Game.obstacles[0].render();
            Game.obstacles[1].render();
        }
    }
}
