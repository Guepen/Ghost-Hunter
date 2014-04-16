"use strict";

function Bullet(){
    this.width = 8;
    this.height = 10;
    this.speed = 3;
    this.srcX = 710;
    this.srcY = 520;
    this.drawY = 510;
    this.drawX = 400;
}

Bullet.prototype.render = function(){
    //console.log(Game.gameSprite);
    //alert("bullet");
    Game.bulletCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.width,
        this.height, this.drawX, this.drawY -= this.speed, this.width, this.height);

    //console.log(this.drawX, this.drawY, this.width, this.height);
    //Game.bulletCanvas.fillRect(this.drawX, this.drawY, this.width, this.height);


};

Bullet.prototype.fire = function(x, y){
    this.drawX = x + Game.player.width / 2 - (this.width / 2);
    this.drawY = y;
};
