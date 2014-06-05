"use strict";
/**
 * Funktion som slumpar ett tal
 * @param lowest Lägsta talet
 * @param range Högsta talet
 * @returns {number} Ett slumpat tal
 */
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

/**
 * Stoppar bakgrundsljudet
 */
function stopSoundLoop() {
    Game.backGroundMusic.pause();
}

/**
 * Om spelet är slut spelas ett ljud upp
 */
function gameOverSound() {
    var audio = new Audio("audio/gameOver.wav");
    audio.play();
}

/**
 *rensar allt på spelytan förutom bakgrunden
 * och ritar ut game over
 */
function clearCanvas() {
    var endScreenY = 100;
    var i = 0;
    var canvavasTags = document.getElementsByTagName("canvas");

    /**
     *
     * @type {{text: string, writeY: number}[]} writeY innehåller y-positionen där texten skall renderas ut
     */
    var messages = [
        {
            text: "This game was my project in the course 1D430, individually Software Development",
            writeY: 100
        },
        {
            text: "It is made entirely in HTML5, Javascript and CSS3",
            writeY: 115
        },
        {
            text: "You can find the code here: https://github.com/th222fa/Ghost-Hunter ",
            writeY: 130
        },

        {
            text: "Feel free to copy the code and continue develop the game ",
            writeY: 145
        },

        {
            text: "but it would be nice if you gave me some credit if you use my code! :) ",
            writeY: 160
        }
    ];

    /**
     * i börjar på 1 eftersom jag vill ha kvar min bakgrund
     */
    for (var i = 1; i < canvavasTags.length; i++) {
        canvavasTags[i].getContext("2d").clearRect(0, 0, Game.width, Game.height);
    }

    /**
     * animerar game over skärmen med ett intervall
     */
    setInterval(function () {
        var x = 0;
        Game.backgroundCanvas.font = "italic 46px calibri";
        Game.backgroundCanvas.fillStyle = "black";
        Game.backgroundCanvas.fillRect(Game.width / 2 - 200, 0, 350, endScreenY += 0.2);
        Game.backgroundCanvas.fillStyle = "red";
        Game.backgroundCanvas.fillText("GAME OVER", Game.width / 2 - 150, Game.height / 2 - 200);

        /**
         * lite fulkod för att bestämma vilken text som skall renderas ut
         */
        if (endScreenY >= 120 && endScreenY < 135) {
            i = 3;
        }

        else if (endScreenY >= 135 && endScreenY < 150) {
            i = 2;
        }

        else if (endScreenY >= 150 && endScreenY < 165) {
            i = 1;
        }

        else if (endScreenY >= 165 && endScreenY < 250) {
            i = 0;
        }

        /**
         * Fruktansvärt fult
         * Har dock ingen tid till att fixa en Constructor för Game
         * utan det får vara ett statiskt objekt
         */
        else if (endScreenY >= 250) {
            location.reload();
        }

        for (; i < messages.length; i++) {
            endScreen(messages[x].text, messages[x].writeY);
            x++;
        }


    }, 20);

}

/**
 * Funktion som renderar ut text
 * @param str Texten
 * @param y Y-positionen där texten skall renderas ut
 */
function endScreen(str, y) {
    Game.backgroundCanvas.font = "bold 12px calibri";
    Game.backgroundCanvas.fillStyle = "white";
    Game.backgroundCanvas.fillText(str,
            Game.width / 2 - 195, y, 340);

}

/**
 * Funktion som renderar ut liven
 * @param drawX X-positionen där livet skall renderas ut
 * @param health Antal liv
 */
function renderHealth(drawX, health) {
    for (var i = 0; i < health; i++) {
        if (Game.combat) {
            Game.healthCanvas.drawImage(Game.gameSprite, 0, 1076, 27, 23,
                drawX += 28, 470, 27, 23)
        }

        else {
            var heart = document.createElement("div");
            heart.setAttribute("id", "heart");
            Game.div.appendChild(heart);
        }
    }
}

/**
 * Funktion för att ladda om vapnet
 * @param player Spelarobjektet
 */
function reloadGun(player) {
    setTimeout(function () {
        player.currentBullet = 0;
        player.reloading = false;

    }, 600);
}

/**
 * Funktion som ökar svårighetsgraden i spelet
 */
function ghostRules() {
    if (Game.score > 0) {
        if (Game.score % 10 === 0) {
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

/**
 * flyttar hindrena i sidled
 */
function moveObstacleX() {

    ObstacleObj.obstacles[0].drawX += 0.2;
    ObstacleObj.obstacles[1].drawX -= 0.2;

    if (ObstacleObj.obstacles[1].drawX + ObstacleObj.obstacles[1].drawWidth <= 0) {
        ObstacleObj.obstacles[1].drawX = 870;
    }

    if (ObstacleObj.obstacles[0].drawX >= Game.width) {
        ObstacleObj.obstacles[0].drawX = -70;
    }
}

/**
 * flyttar hindrena neråt
 */
function moveObstacleY() {
    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
    for (var i = 0; i < ObstacleObj.obstacles.length; i++) {
        if (ObstacleObj.moveObs > 0 && ObstacleObj.obstacles[i].drawY < 320) {
            ObstacleObj.obstacles[i].drawY += 0.5;
            ObstacleObj.moveObs -= 0.2;
        }
        ObstacleObj.obstacles[i].render();
    }
    moveObstacleX();
}

/**
 * kollar vinnaren i combat mode
 */
function checkWinner() {
    stopLoop();
    Game.powerUpCanvas.font = "italic 36px calibri";

    if (Game.players[1].score > Game.players[0].score) {
        Game.powerUpCanvas.fillStyle = "Purple";
        Game.powerUpCanvas.fillText("Purple player wins!", 100, 250);
    }

    else if (Game.players[0].score > Game.players[1].score) {
        Game.powerUpCanvas.fillStyle = "Green";
        Game.powerUpCanvas.fillText("Green player wins!", 500, 250);
        Game.players[0].srcX = 326;
        Game.players[0].srcY = 1182;
    }
    else if (Game.players[1].score === Game.players[0].score) {
        Game.powerUpCanvas.fillText("Draw!", 390, 250);
    }
}

/**
 *moveObs måste vara större än 0 för att hindret skall falla neråt
 * moveObs värde minska i funktionen moveObstacleY
 */
function moveObstacleYInterval() {
    setInterval(function () {
        ObstacleObj.moveObs = 50;

    }, 40000);
}