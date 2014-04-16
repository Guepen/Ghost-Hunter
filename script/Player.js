"use strict";

function Player(){
    this.x = 400;
    this.height = 50;
    this.y = 450;
    this.width = 50;
    this.speed = 5;
    this.shoot = false;
    this.currentBullet = 0;
    this.bullets = [];

    for(var i = 0; i < 50; i++){
        this.bullets[this.bullets.length] = new Bullet();
    }

}

Player.prototype.render = function(){
    Game.playerCanvas.clearRect(0, 0, 800, 500);
    this.checkDirection();
    this.ifShooting();
    this.renderBullets();
    Game.playerCanvas.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.checkDirection = function(){
    if(Game.pressedKeys[37] || Game.pressedKeys[65]){
        if(!Game.player.x <= 0){
            Game.player.x -= this.speed;
        }
    }

    if(Game.pressedKeys[39] || Game.pressedKeys[68]){
        if(Game.player.x <= Game.width - Game.player.width){
            Game.player.x += this.speed;
        }
    }

    if(Game.pressedKeys[32]){
        Game.player.isSpacebar = true;
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
    console.log(Game.pressedKeys);
    if(Game.pressedKeys[32] && !this.shoot){
        this.shoot = true;
        this.bullets[this.currentBullet].fire(this.x, this.y);
        this.currentBullet++;

        if(this.currentBullet >= this.bullets.length){
            this.currentBullet = 0;
        }
    }

    else if(!Game.pressedKeys[32]){
        this.shoot = false;
    }

};

function keyDown(e){
    Game.pressedKeys[e.keyCode] = true;

}

function keyUp(e){
    Game.pressedKeys[e.keyCode] = false;

}
