"use strict";
var PlayerObj = {
    shootAudio: new Audio("audio/shoot.wav")
};
/**
 * Skapar en instans av Player
 * @constructor
 */
function Player(drawX, srcX, srcY, htmlScore, type, shootKey, moveLeftKey, moveRightKey, minX, maxX) {
    this.drawX = drawX;
    this.drawHeight = 100;
    this.drawY = Game.height - this.drawHeight;
    this.drawWidth = 60;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = 60;
    this.srcHeight = 89;
    this.speed = 5;
    this.health = 3;
    this.shoot = false;
    this.currentBullet = 0;
    //this.currentBullet2 = 0;
    this.interval = 0;
    this.interval2 = 0;
    this.bullets = [];
    this.shootKey = shootKey;
    this.moveLeftKey = moveLeftKey;
    this.moveRightKey = moveRightKey;
    this.movingLeft = false;
    this.movingRight = false;
    this.score = 0;
    this.htmlScore = htmlScore;
    this.type = type;
    this.wallWalker = false;
    this.dead = false;

    //lägger till 50 skott tillhörande spelarinstansen.
    //skotten återanvänds sedan istället för att skapa en
    //ny instans av Bullet-objektet varje gång spelaren skjuter
    for (var i = 0; i < 50; i++) {
        this.bullets[this.bullets.length] = new Bullet();
    }
}

Player.prototype.render = function () {
    //Om spelaren inte har några liv kvar är spelet slut
    if (this.health <= 0) {
        checkWinner();
        this.dead = true;
        Game.playerCanvas.fillStyle = "red";
        Game.playerCanvas.fillRect(this.drawX, this.drawY, 25, 25);
    }

    if (!this.dead) {
        Game.playerCanvas.drawImage(Game.gameSprite, this.srcX, this.srcY, this.srcWidth, this.srcHeight,
            this.drawX, this.drawY, this.drawWidth, this.drawHeight);
    }

};

Player.prototype.renderHealth = function (x) {
    var nextX = x; // position för utritning av liv

    //Loopar igenom alla liv och ritar ut dom
    for (var i = 0; i < this.health; i++) {
        Game.healthCanvas.drawImage(Game.gameSprite, 0, 1076, 27, 23,
            nextX += 28, 470, 27, 23)
    }

};
/**
 * Funktion som kollar om spelaren rör sig
 */
Player.prototype.checkDirection = function () {
    //om användaren trycker på höger pil-tangent eller d-tangenten
    if (Game.pressedKeys[this.moveRightKey]) {
        this.movingLeft = false;
        this.movingRight = true;
        //Kollar så att inte spelaren kan gå utanför banan
        if (Game.numberOfPlayers === 1 || this.wallWalker) {
            if (this.drawX <= Game.width - this.drawWidth) {
                this.drawX += this.speed;
            }
        }

        else if (this.type === "purple") {
            if (this.drawX + this.drawWidth <= Game.width / 2 - 4) {
                this.drawX += this.speed;
            }
        }

        else if (this.type === "green") {
            if (this.drawX <= Game.width - this.drawWidth) {
                this.drawX += this.speed;
            }
        }
    }

    if (Game.pressedKeys[this.moveLeftKey]) {
        this.movingLeft = true;
        this.movingRight = false;
        //Kollar så att inte spelaren kan gå utanför banan
        if (this.drawX <= 0) {
            this.drawX = 0;
            }
        else {
            if (Game.numberOfPlayers === 1 || this.wallWalker) {
                this.drawX -= this.speed;
            }
            else if (this.type === "green") {
                if (this.drawX >= Game.width / 2 + 4) {
                    this.drawX -= this.speed;
                }
            }

            else if (this.type === "purple") {
                if (this.drawX + this.drawWidth >= 0) {
                    this.drawX -= this.speed;
                }
            }

            }
        }
};

/**
 * Funktion som kollar om användaren skjuter
 */
Player.prototype.ifShooting = function () {
    //kollar om användaren trycker på spacebar och inte redan skjuer
    if (Game.pressedKeys[this.shootKey] && !this.shoot) {
        PlayerObj.shootAudio.play();
        PlayerObj.shootAudio.currentTime = 0;
        this.shoot = true;

        //anropar funktionen fire som sätter kulans position till spelarens
        this.bullets[this.currentBullet].fire(this);
        this.currentBullet++;

        //om användaren skjutit slut på alla kulor börjar arrayen om på 0
        if (this.currentBullet >= this.bullets.length) {
            this.currentBullet = 0;
        }
    }
    //när användaren släppper spacebar blir shott false och då kan ett nytt skott skjutas
    else if (!Game.pressedKeys[this.shootKey]) {
        this.shoot = false;
    }
};

/**
 * Event för keydown
 * @param e Event
 */
function keyDown(e) {
    //alert(e.keyCode);

    //förhindrar normalt beteende
    if (e.keyCode === 32 || e.keyCode === 87 || e.keyCode === 16) {
        e.preventDefault();
    }

    if (e.keyCode === 39) {
        if (!Game.pressedKeys[e.keyCode]) {
            Game.players[0].interval = setInterval(function () {
                Game.players[0].srcX -= 60;
                if (Game.players[0].srcX <= 560) {
                    Game.players[0].srcX = 743;
                }
            }, 100);
        }
    }

    if (e.keyCode === 68) {
        if (!Game.pressedKeys[e.keyCode]) {
            Game.players[1].interval = setInterval(function () {
                Game.players[1].srcX -= 60;
                if (Game.players[1].srcX <= 560) {
                    Game.players[1].srcX = 743;
                }
            }, 100);
        }
    }

    if (e.keyCode === 37) {
        if (!Game.pressedKeys[e.keyCode]) {
            Game.players[0].srcX = 502;
            Game.players[0].interval2 = setInterval(function () {
                Game.players[0].srcX -= 60;
                if (Game.players[0].srcX <= 320) {
                    Game.players[0].srcX = 502;
                }
            }, 100);
        }
    }
    if (e.keyCode === 65) {
        if (!Game.pressedKeys[e.keyCode]) {
            Game.players[1].srcX = 502;
            Game.players[1].interval2 = setInterval(function () {
                Game.players[1].srcX -= 60;
                if (Game.players[1].srcX <= 320) {
                    Game.players[1].srcX = 502;
                }
            }, 100);
        }
    }

    // om användaren trycker på p-tangenten anropas stopStart som pausar/fortsätter spelet
    if (e.keyCode === 80) {
        Game.stopStart();
    }

    //sätter tangentens kod till true
    Game.pressedKeys[e.keyCode] = true;
}


/**
 * Event för keyup
 * @param e Event
 */
function keyUp(e) {
    if (e.keyCode === 39) {
        clearInterval(Game.players[0].interval);
        Game.players[0].srcX = 743;
        //Game.players[0].movingRight = false;
    }

    if (e.keyCode === 68) {
        clearInterval(Game.players[1].interval);
        Game.players[1].srcX = 743;
    }

    if (e.keyCode === 65) {
        clearInterval(Game.players[1].interval2);
        Game.players[1].srcX = 502;
    }

    if (e.keyCode === 37) {
        clearInterval(Game.players[0].interval2);
        Game.players[0].srcX = 502;
    }
    //sätter tangentens kod till false
    Game.pressedKeys[e.keyCode] = false;

}
