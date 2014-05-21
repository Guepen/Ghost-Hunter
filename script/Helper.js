"use strict";

function randomGenerator(lowest, range) {
    return Math.floor((Math.random() * range) + lowest);
}

/**
 * funktion som kollar kulornas position
 * och kollar om de ska renderas ut
 */
function checkBullets() {
    //"clearar" canvasen så inte det gamla finns kvar
    Game.bulletCanvas.clearRect(0, 0, 800, 500);
    //loopar igenom alla kulor
    for (var p = 0; p < Game.players.length; p++) {
        for (var i = 0; i < Game.players[p].bullets.length; i++) {
            //om kulan finns på spelytan renderas den ut
            if (Game.players[p].bullets[i].drawY <= 500 && Game.players[p].bullets[i].drawY >= 0) {
                Game.players[p].bullets[i].render();
            }
            //om kulan är över spelytan anropas funktionen resetBullet
            else if (Game.players[p].bullets[i].drawY <= 0) {
                Game.players[p].bullets[i].resetBullet(Game.players[p].bullets[i]);
            }
        }
    }
}

function clearCanvas() {
    var canvavasTags = document.getElementsByTagName("canvas");

    for (var i = 1; i < canvavasTags.length; i++) {
        canvavasTags[i].getContext("2d").clearRect(0, 0, Game.width, Game.height);
    }

    Game.backgroundCanvas.font = "italic 46px calibri";
    Game.backgroundCanvas.fillStyle = "black";
    Game.backgroundCanvas.fillRect(Game.width / 2 - 200, 0, 350, 150);
    Game.backgroundCanvas.fillStyle = "red";
    Game.backgroundCanvas.fillText("GAME OVER", Game.width / 2 - 150, Game.height / 2 - 200);
}

function renderHealth(drawX, health) {
    for (var i = 0; i < health; i++) {
        if (Game.combat) {
            Game.healthCanvas.drawImage(Game.gameSprite, 0, 1076, 27, 23,
                drawX += 28, 470, 27, 23)
        }

        else {
            var img = document.createElement("img");
            img.setAttribute("id", "heart");
            Game.div.appendChild(img);
        }
    }
}

function reloadGun(player) {
    setTimeout(function () {
        player.currentBullet = 0;
        player.reloading = false;

    }, 600);
}
function ghostRules() {
    if (Game.score > 0) {
        if (Game.score % 15 === 0) {
            if (!Game.updateGhostRules) {
                Game.updateGhostRules = true;
                Game.spawnAmount++;
                Game.spawnRate -= 200;
                Game.updateGhostRulesTwo++;

                if (Game.numberOfPlayers === 2 && Game.updateGhostRulesTwo % 2 === 0) {
                    Game.spawnRate -= 50;
                    Game.spawnAmount++;
                    Ghost.prototype.speed += 0.1;
                    Game.updateGhostRulesTwo = 0;
                }
            }
        }

        else {
            Game.updateGhostRules = false;
        }
    }
}

function moveObstacleX() {

    ObstacleObj.obstacles[0].drawX += 0.2;
    ObstacleObj.obstacles[1].drawX -= 0.2;

    if (ObstacleObj.obstacles[1].drawX <= 0) {
        ObstacleObj.obstacles[1].drawX = 870;
    }

    if (ObstacleObj.obstacles[0].drawX >= Game.width) {
        ObstacleObj.obstacles[0].drawX = -70;
    }
}

function moveObstacleY() {
    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
    for (var i = 0; i < ObstacleObj.obstacles.length; i++) {
        if (ObstacleObj.moveObs > 0 && ObstacleObj.obstacles[i].drawY < 320) {
            ObstacleObj.obstacles[i].drawY += 0.5;
            ObstacleObj.moveObs -= 0.2;
        }
        if (Game.score >= 5) {
            moveObstacleX();
        }

        ObstacleObj.obstacles[i].render();
    }
}

function checkWinner() {
    stopLoop();
    Game.powerUpCanvas.font = "italic 36px calibri";

    if (Game.players[0].score > Game.players[1].score) {
        Game.powerUpCanvas.fillStyle = "green";
        Game.powerUpCanvas.fillText("Purple player wins!", 100, 250);
    }

    else if (Game.players[1].score > Game.players[0].score) {
        Game.powerUpCanvas.fillStyle = "purple";
        Game.powerUpCanvas.fillText("Green player wins!", 500, 250);
    }
    else if (Game.players[1].score === Game.players[0].score) {
        Game.powerUpCanvas.fillText("Draw!", 390, 250);
    }
}

function interval() {
    setInterval(function () {
        ObstacleObj.moveObs = 50;

    }, 40000);
}