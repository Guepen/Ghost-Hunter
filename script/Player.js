"use strict";

function Player(){
    this.x = 400;
    this.height = 50;
    this.y = 450;
    this.width = 50;
    this.speed = 5;
    this.moveLeft = false;
    this.moveRight = false;
}

Player.prototype.render = function(){
    //console.log("loop");
    Game.playerCanvas.clearRect(0, 0, 800, 500);
    this.checkDirection();
    Game.playerCanvas.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.checkDirection = function(){
    //console.log("hej");
    if(this.moveLeft){
        this.x -= this.speed;
    }

    if(this.moveRight){
        this.x += this.speed;
    }
};

function keyDown(e){
    var keyId = e.keyCode || e.which;
    if(keyId === 37 || keyId === 65){ //flyttar spelaren åt vänster
        e.preventDefault();
        Game.player.moveLeft = true;
    }

    if(keyId === 39 || keyId === 68){ //flyttar spelaren åt höger
        e.preventDefault();
        Game.player.moveRight = true;
    }
}

function keyUp(e){
    var keyId = e.keyCode || e.which;
    if(keyId === 37 || 65){ //om spelaren inte flyttas till vänster
        e.preventDefault();
        Game.player.moveLeft = false;
    }

    if(keyId === 39 || 68){ //om spelaren inte flyttas till höger
        e.preventDefault();
        Game.player.moveRight = false;
    }
}