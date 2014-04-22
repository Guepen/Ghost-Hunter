"use strict";

function Ghost(){
    this.drawX = Math.random() * Game.width;
    this.drawY = -10;
    this.srcY = 500;
    this.srcX = 0;
    this.srcWidth = 50;
    this.srcHeight = 100;
    this.drawWidth = 30;
    this.drawHeight = 50;
    this.speed = 0.5;
    this.movement = Math.random() * Game.width * 0.2 - Game.width * 0.1;
}

Ghost.prototype.render = function(){
    Game.ghostCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth,
    this.srcHeight, this.drawX, this.drawY += this.speed, this.drawWidth, this.drawHeight);

 };

function renderGhosts(){
    Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
    for(var i = 0; i < Game.ghosts.length; i++){
        var ghost = Game.ghosts[i];

        if(ghost.drawX <= 2){
            ghost.drawX += 0.5;
        }

        if(ghost.drawX >= 488){
            ghost.drawX -= 0.5;
        }
        //console.log(ghost);
        if(ghost.drawY >= Game.height){
           //console.log("removing");
            Game.player.health--;
            Game.player.renderHealth();
           Game.ghosts.splice(i, 1);
        }
        else{
            //console.log(ghost.movement);
            if (ghost.movement > 0) {
                ghost.drawX += ghost.speed / 2;
                ghost.movement -= ghost.speed / 2;
            } else {
                ghost.drawX -= ghost.speed / 2;
                ghost.movement += ghost.speed / 2;
            }

            ghost.render();
        }
    }
}

function spawnGhosts(amount){
    for(var i = 0; i < amount; i++){
        Game.ghosts[Game.ghosts.length] = new Ghost();

        //console.log(Game.ghosts);
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