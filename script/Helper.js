"use strict";

function randomGenerator(lowest, range) {
    return Math.floor((Math.random() * range) + lowest);
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
                    Game.updateGhostRulesTwo = 0;
                }
            }
        }

        else {
            Game.updateGhostRules = false;
        }
    }
}

function obstacleRules() {
    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
    for (var i = 0; i < ObstacleObj.obstacles.length; i++) {
        if (ObstacleObj.moveObs > 0 && ObstacleObj.obstacles[i].drawY < 320) {
            ObstacleObj.obstacles[i].drawY += 0.5;
            ObstacleObj.moveObs -= 0.2;
        }
        if (Game.score >= 80) {
            ObstacleObj.obstacles[0].drawX += 0.2;
            ObstacleObj.obstacles[1].drawX -= 0.2;

        }

        if (ObstacleObj.obstacles[1].drawX <= 0) {
            ObstacleObj.obstacles[1].drawX = 870;
        }

        if (ObstacleObj.obstacles[0].drawX >= Game.width) {
            ObstacleObj.obstacles[0].drawX = -70;
        }


        ObstacleObj.obstacles[i].render();
    }
}

function checkWinner() {
    stopLoop();
    Game.powerUpCanvas.font = "italic 36px calibri";

    if (Game.players[0].score > Game.players[1].score) {
        Game.powerUpCanvas.fillStyle = "green";
        Game.powerUpCanvas.fillText("Green player wins!", 100, 250);
    }

    else if (Game.players[1].score > Game.players[0].score) {
        Game.powerUpCanvas.fillStyle = "purple";
        Game.powerUpCanvas.fillText("Purple player wins!", 500, 250);
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