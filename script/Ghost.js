"use strict";

function Ghost() {
    this.drawX = randomGenerator(0, 752);
    this.drawY = -10;
    this.srcY = 1000;
    this.srcX = 0;
    this.srcWidth = 48;
    this.srcHeight = 75;
    this.drawWidth = 30;
    this.drawHeight = 45;
    this.xSpeed = 1;
    this.movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
    this.type = "ghost";
}

/**
 * sätter spökenas fart
 * @type {number}
 */
Ghost.prototype.speed = 0.5;

/**
 * funktion som ritar spökena
 * @this Ghost
 */
Ghost.prototype.render = function () {
    Game.ghostCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
        this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);

};

/**
 * Användnigsområden
 * gör så spökena rör sig
 * tar bort ett från arrayen spöke om det är under marken
 * anropar render som ritar ut spökena
 */
function renderGhosts() {

    Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
    for (var i = 0; i < Game.ghosts.length; i++) {

        //förkortning
        var ghost = Game.ghosts[i];

        //om spöket är nära högra kanten flyttas det till vänster
        if (ghost.drawX + ghost.drawWidth >= 795) {
            ghost.drawX -= ghost.xSpeed / 2;
        }
        else if (ghost.drawX <= 5) {
            ghost.drawX += ghost.xSpeed / 2;
        }

        //Huvudfunktionalitet för att röra på spöken
        else {

            //om spökets "rörelsetal" är noll slumpas ett nytt tal
            if (ghost.movement === 0) {
                // ghost.movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
                ghost.movement = randomGenerator(-(Game.width * 0.1), Game.width * 0.2);
            }

            //om spökets rörelsetal är större än noll
            else if (ghost.movement > 0) {
                ghost.drawX += ghost.xSpeed / 2; //spöket går åt höger
                ghost.movement -= ghost.xSpeed; // rörelsetalet minskas och blir tillslut noll
            }

            //om spökets rörelsetal är mindre än noll
            else if (ghost.movement < 0) {
                ghost.drawX -= ghost.xSpeed / 2; //spöket går åt vänster
                ghost.movement += ghost.xSpeed; //rörelsetalet ökar och blir tillslut noll
            }
        }

        //om spöket är under marken
        if (ghost.drawY + ghost.drawHeight >= Game.height) {
            if (ghost.drawX + ghost.drawWidth <= Game.width / 2 - 2) {
                Game.healthCanvas.clearRect(0, 0, 400, 500);
                Game.players[1].health--;
                Game.players[1].renderHealth(-18);
                Game.ghosts.splice(i, 1);
            }
            else {
                Game.healthCanvas.clearRect(400, 0, 400, 500);
                Game.players[0].health--;
                Game.players[0].renderHealth(680);
                Game.ghosts.splice(i, 1);
            }
        }
        //anropar ritfunktionen
        ghost.render();
    }
}
/**
 * Skapar nya spöken
 * @param {number} amount Antal spöken som skall skapas
 */
function spawnGhosts(amount) {
    for (var i = 0; i < amount; i++) {
        Game.ghosts[Game.ghosts.length] = new Ghost();
    }
}
/**
 * Anropar funktionen spawnGhosts med ett tidsintervall
 * Skickar med hur många spöken som skall skapas
 */
function startSpawn() {

    Game.spawnInterval = setInterval(function () {
        spawnGhosts(Game.spawnAmount);

    }, Game.spawnRate);
}

//tar bort intervallet för att skapa nya spöken
function stopSpawn() {
    clearInterval(Game.spawnInterval);
}