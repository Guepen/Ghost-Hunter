"use strict";

/**
 * Skapar en instans av Player
 * @constructor
 */
function Player(drawX) {
    this.drawX = drawX;
    this.drawHeight = 80;
    this.drawY = Game.height - this.drawHeight;
    this.srcX = 0;
    this.srcY = 1117;
    this.drawWidth = 50;
    this.srcWidth = 54;
    this.srcHeight = 83;
    this.speed = 5;
    this.health = 3;
    this.shoot = false;
    this.shoot2 = false;
    this.currentBullet = 0;
    this.currentBullet2 = 0;
    this.bullets = [];

    //lägger till 50 skott tillhörande spelarinstansen.
    //skotten återanvänds sedan istället för att skapa en
    //ny instans av Bullet-objektet varje gång spelaren skjuter
    for(var i = 0; i < 50; i++){
        this.bullets[this.bullets.length] = new Bullet();
    }
}

Player.prototype.render = function(){
    //console.log("render");
    //Om spelaren inte har några liv kvar är spelet slut
    if(this.health <= 0){
        Game.rendering = false;
        Game.bulletCanvas.clearRect(0, 0, Game.width, Game.height);
        Game.ghostCanvas.clearRect(0, 0, Game.width, Game.height);
        Game.backgroundCanvas.fillStyle = "blue";
        Game.backgroundCanvas.font = "bold 25px Arial";
        Game.backgroundCanvas.fillText("Game Over", Game.width/2, 70);
        stopLoop();
    }
    else {
        Game.playerCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth, this.srcHeight,
            this.drawX, this.drawY, this.drawWidth, this.drawHeight);
    }
};

Player.prototype.renderHealth = function(){
    var nextX = -18; // position för utritning av liv
    Game.healthCanvas.clearRect(0, 0, Game.width, Game.height);

    //Loopar igenom alla liv och ritar ut dom
    for(var i = 0; i < this.health; i++){
        Game.healthCanvas.drawImage(Game.gameSprite, 0, 1076, 27, 23,
            nextX += 28, 470, 27, 23)
    }

};
/**
 * Funktion som kollar om spelaren rör sig
 */
Player.prototype.checkDirection = function(){
    //om användaren trycker på vänster pil-tangetn eller a-tangenten
    if (Game.pressedKeys[37]) {
            //Kollar så att inte spelaren kan gå utanför banan
        if (Game.players[0].drawX <= 0) {
            Game.players[0].drawX = 0;
            }
            else {
            //console.log("player move left");
            Game.players[0].drawX -= this.speed;
            }
        }

    if (Game.pressedKeys[65]) {
        if (Game.players[1].drawX <= 0) {
            Game.players[1].drawX = 0;
        }
        else {
            //console.log("player move left");
            Game.players[1].drawX -= this.speed;
        }
    }
    //om användaren trycker på höger pil-tangetn eller d-tangenten
    if (Game.pressedKeys[39]) {
            //Kollar så att inte spelaren kan gå utanför banan
        if (Game.players[0].drawX <= Game.width - Game.players[0].drawWidth) {
            Game.players[0].drawX += this.speed;
            }
        }

    if (Game.pressedKeys[68]) {
        if (Game.players[1].drawX <= Game.width - Game.players[1].drawWidth) {
            Game.players[1].drawX += this.speed;
        }
    }
};

/**
 * funktion som kollar kulornas position
 * och kollar om de ska renderas ut
 */
Player.prototype.checkBullets = function () {
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

    /* for (var i = 0; i < Game.player2.bullets.length; i++) {
     //om kulan finns på spelytan renderas den ut
     if (Game.player2.bullets[i].drawY <= 500 && Game.player2.bullets[i].drawY >= 0) {
     Game.player2.bullets[i].render();
     }
        //om kulan är över spelytan anropas funktionen resetBullet
     else if (Game.player2.bullets[i].drawY <= 0) {
     Game.player2.bullets[i].resetBullet(Game.player2.bullets[i]);
     }
     }*/
};

/**
 * Funktion som kollar om användaren skjuter
 */
Player.prototype.ifShooting = function(){
    //kollar om användaren trycker på spacebar och inte redan skjuer
    if(Game.pressedKeys[32] && !this.shoot){
        this.shoot = true;
        //anropar funktionen fire som sätter kulans position till spelarens
        Game.players[0].bullets[this.currentBullet].fire(Game.players[0].drawX, Game.players[0].drawY);
        this.currentBullet++;

        //om användaren skjutit slut på alla kulor börjar arrayen om på 0
        if (this.currentBullet >= Game.players[0].bullets.length) {
            this.currentBullet = 0;
        }
    }
    //när användaren släppper spacebar blir shott false och då kan ett nytt skott skjutas
    else if(!Game.pressedKeys[32]){
        this.shoot = false;
    }

    if (Game.pressedKeys[87] && !this.shoot2) {
        this.shoot2 = true;
        //anropar funktionen fire som sätter kulans position till spelarens
        Game.players[1].bullets[this.currentBullet2].fire(Game.players[1].drawX, Game.players[1].drawY);
        this.currentBullet2++;

        //om användaren skjutit slut på alla kulor börjar arrayen om på 0
        if (this.currentBullet2 >= Game.players[1].bullets.length) {
            this.currentBullet2 = 0;
        }
    }
    //när användaren släppper spacebar blir shott false och då kan ett nytt skott skjutas
    else if (!Game.pressedKeys[87]) {
        this.shoot2 = false;
    }

};

/**
 * Event för keydown
 * @param e event
 */
function keyDown(e){

    //förhindrar normalt beteende
    e.preventDefault();
    // alert(e.keyCode);
    /*if (e.keyCode === 37 || e.keyCode === 39)  {
       // if (!Game.pressedKeys[e.keyCode]) {
            //Game.player.interval = setInterval(function () {
                Game.player.srcX += 150;
                //if (Game.player.srcX >= 1050) {
                    Game.player.srcX = 150;
                }
           // }, 100);
        }
    }*/
    // om användaren trycker på p-tangenten anropas stopStart som pausar/fortsätter spelet
    if(e.keyCode === 80){
        stopStart();
    }

    //sätter tangentens kod till true
    Game.pressedKeys[e.keyCode] = true;
}

/**
 * Event för keyup
 * @param e event
 */
function keyUp(e){
   /* if (e.keyCode === 37 || e.keyCode === 39) {
        clearInterval(Game.player.interval);
    }*/
    //sätter tangentens kod till false
    Game.pressedKeys[e.keyCode] = false;
    //Game.player.srcX = 0;

}

