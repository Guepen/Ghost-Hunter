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

function renderGhosts(){
    Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
    for(var i = 0; i < Game.ghosts.length; i++){
        var ghost = Game.ghosts[i];

        if(ghost.drawX <= 5){
            ghost.drawX += 0.5;
        }

        if(ghost.drawX + ghost.drawWidth >= 795){
            ghost.drawX -= 0.5;
        }
        //console.log(ghost);
        if(ghost.drawY >= Game.height){
            Game.player.health--;
            Game.player.renderHealth();
            Game.ghosts.splice(i, 1);
        }

        if (!ghost.drawX <= 5 || ghost.drawX + ghost.drawWidth >= 795 ) {
            //console.log("moving");
            if (ghost.movement === 0) {
                ghost.movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
            }

            if (ghost.movement > 0) {
                //console.log("larger");
                ghost.drawX += ghost.xSpeed / 2;
                ghost.movement -= ghost.xSpeed;
                }

            else if (ghost.movement < 0) {
                //console.log("smaller");
                ghost.drawX -= ghost.xSpeed / 2;
                ghost.movement += ghost.xSpeed;
                }
        }

            ghost.render();
        }
}
function spawnGhosts(amount){
    for(var i = 0; i < amount; i++){
        Game.ghosts[Game.ghosts.length] = new Ghost();
    }
}
function startSpawn(){
    Game.spawnInterval = setInterval(function(){
        spawnGhosts(Game.spawnAmount);

    }, Game.spawnRate);
}
function stopSpawn(){
    clearInterval(Game.spawnInterval);
}