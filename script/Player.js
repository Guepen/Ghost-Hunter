"use strict";

function Player(){
    this.x = 400;
    this.height = 50;
    this.y = 450;
    this.width = 50;
    this.speed = 5;
    this.moveLeft = false;
    this.moveRight = false;
    this.shoot = false;
    this.isSpacebar = false;
    this.currentBullet = 0;
    this.bullets = [];

    for(var i = 0; i < 50; i++){
        this.bullets[this.bullets.length] = new Bullet();
    }

}

Player.prototype.render = function(){
    //console.log("loop");
    Game.playerCanvas.clearRect(0, 0, 800, 500);
    this.checkDirection();
    this.ifShooting();
    this.renderBullets();
    Game.playerCanvas.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.checkDirection = function(){
    //console.log("hej");
    //console.log(Game.player.x);
    if(this.moveLeft){
        if (!Game.player.x <= 0) {
            this.x -= this.speed;
        }
    }

    if(this.moveRight){
        if (Game.player.x < Game.width - this.width) {
            this.x += this.speed;
        }
    }
};

Player.prototype.renderBullets = function(){

    Game.bulletCanvas.clearRect(0, 0, 800, 500);
    for(var i = 0; i < this.bullets.length; i++){
        if (this.bullets[i].drawY <= 500) {
            this.bullets[i].render();
        }


    }
};

Player.prototype.ifShooting = function(){
    if(this.isSpacebar && !this.shoot){
        this.shoot = true;
        this.bullets[this.currentBullet].fire(this.x, this.y);
        this.currentBullet++;

        if(this.currentBullet >= this.bullets.length){
            this.currentBullet = 0;
        }
    }

    else if(!this.isSpacebar){
        this.shoot = false;
    }

};

function keyDown(e){
    var keyId = e.keyCode || e.which;
    if(keyId === 37 || keyId === 65){ //flyttar spelaren åt vänster
        if(!Game.player.x <= 0){
            e.preventDefault();
            Game.player.moveLeft = true;
        }
    }

    if(keyId === 39 || keyId === 68){ //flyttar spelaren åt höger
        e.preventDefault();
        Game.player.moveRight = true;
    }

    if(keyId === 32){
        Game.player.isSpacebar = true; // spelaren skjuter
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

    if(keyId === 32){
        Game.player.isSpacebar = false; //spelaren skjuter inte
    }
}
