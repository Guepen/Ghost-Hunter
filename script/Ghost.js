"use strict";

function Ghost(){
    this.drawX = Math.random() * (Game.width - 20);
    this.drawY = -10;
    this.srcY = 1000;
    this.srcX = 0;
    this.srcWidth = 48;
    this.srcHeight = 75;
    this.drawWidth = 30;
    this.drawHeight = 45;
    this.speed = 0.5;
    this.xSpeed = 1;
    this.movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
    this.type = "ghost";
}

Ghost.prototype.render = function(){
    Game.ghostCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
    this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);

 };

/**
 * Användnigsområden
 * gör så spökena rör sig
 * tar bort ett från arrayen spöke om det är under marken
 * anropar render som ritar ut spökena
 */
function renderGhosts(){

    Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
    for(var i = 0; i < Game.ghosts.length; i++){

        //förkortning
        var ghost = Game.ghosts[i];

        if (Game.score >= 8 && Game.score < 18) {
            ghost.speed = 0.7;
            Game.spawnAmount = 3;
        }

        else if (Game.score >= 18 && Game.score < 28) {
            ghost.speed = 0.8;
            Game.spawnAmount = 4;
            Game.spawnRate = 1000;
        }

        else if (Game.score >= 28 && Game.score < 40) {
            ghost.speed = 1;
            Game.spawnAmount = 5;
            Game.spawnRate = 1800;
        }

        else if (Game.score >= 40 && Game.score < 80) {
            ghost.speed = 1;
            Game.spawnAmount = 6;
            Game.spawnRate = 1200;
        }

        else if (Game.score >= 80 && Game.score < 110) {

            ghost.speed = 1;
            Game.spawnAmount = 7;
            Game.spawnRate = 1000;
        }

        else if (Game.score >= 110 && Game.score < 150) {
            Game.spawnAmount = 9;
            Game.spawnRate = 900;
            ghost.speed = 1;
        }

        else if (Game.score >= 150 && Game.score < 180) {
            Game.spawnAmount = 12;
            Game.spawnRate = 900;
            ghost.speed = 1;
        }

        else if (Game.score >= 180 && Game.score < 220) {
            Game.spawnAmount = 14;
            Game.spawnRate = 900;
            ghost.speed = 1;
        }

        else if (Game.score >= 220 && Game.score < 250) {
            Game.spawnAmount = 17;
            Game.spawnRate = 900;
            ghost.speed = 1;
        }

        else if (Game.score >= 250) {
            Game.spawnAmount = 20;
            Game.spawnRate = 900;
            ghost.speed = 1;
        }
        //om spöket är nära vänstra kanten flyttas det till höger
        if(ghost.drawX <= 5){
            ghost.drawX += 0.5;
        }

        //om spöket är nära högra kanten flyttas det till vänster
        if(ghost.drawX + ghost.drawWidth >= 795){
            ghost.drawX -= 0.5;
        }

        //om spöket är under marken
        if(ghost.drawY >= Game.height){
            Game.players[0].health--;
            Game.players[0].renderHealth();
            Game.ghosts.splice(i, 1);
        }

        //Huvudfunktionalitet för att röra på spöken
        if (!ghost.drawX <= 5 || ghost.drawX + ghost.drawWidth >= 795 ) {

            //om spökets "rörelsetal" är noll slumpas ett nytt tal
            if (ghost.movement === 0) {
                ghost.movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
            }

            //om spökets rörelsetal är större än noll
            if (ghost.movement > 0) {
                ghost.drawX += ghost.xSpeed / 2; //spöket går åt höger
                ghost.movement -= ghost.xSpeed; // rörelsetalet minskas och blir tillslut noll
                }

            //om spökets rörelsetal är mindre än noll
            else if (ghost.movement < 0) {
                ghost.drawX -= ghost.xSpeed / 2; //spöket går åt vänster
                ghost.movement += ghost.xSpeed; //rörelsetalet ökar och blir tillslut noll
                }
        }
        //ritar ut spöket
            ghost.render();
        }
}
/**
 * Skapar nya spöken
 * @param {number} amount Antal spöken som skall skapas
 */
function spawnGhosts(amount){
    for(var i = 0; i < amount; i++){
        Game.ghosts[Game.ghosts.length] = new Ghost();
    }
}
/**
 * Anropar funktionen spawnGhosts med ett tidsintervall
 * Skickar med hur många spöken som skall skapas
 */
function startSpawn(){

    Game.spawnInterval = setInterval(function(){
        spawnGhosts(Game.spawnAmount);

    }, Game.spawnRate);
}

//tar bort intervallet för att skapa nya spöken
function stopSpawn(){
    clearInterval(Game.spawnInterval);
}