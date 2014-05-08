"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta
var Game = {
    player: null,
    player2: null,
    playerX: 200,
    player2X: 600,
    pauseButton: null,
    onePlayerButton: null,
    twoPlayerButton: null,
    gameDiv: null,
    menuDiv: null,
    clearPowerUp: null,
    pressedKeys: [],
    players: [],
    ghosts: [],
    bullets: [],
    obstacles: [],
    powerUps: [],
    backgroundCanvas: null,
    playerCanvas: null,
    bulletCanvas: null,
    ghostCanvas: null,
    obstacleCanvas: null,
    healthCanvas: null,
    powerUpCanvas: null,
    gameSprite: null,
    width: 800,
    height: 500,
    rendering: false,
    renderPowerUp: false,
    paused: true,
    htmlScore: null,
    score: 0,
    spawnAmount: 2,
    spawnInterval:0,
    spawnRate: 5000,

    //låter bilden laddas innan spelet startar så den inte saknas när den skall användas
    pictureLoader: function () {
        Game.gameSprite = new Image();
        Game.gameSprite.src = "pictures/Spriten.png";

        //ritar ut startskärmen när bilden är laddad
        Game.gameSprite.onload = function () {
            Game.renderStartScreen();

        }
    },

    renderStartScreen: function () {
        Game.onePlayerButton = document.getElementById("onePlayer");
        Game.twoPlayerButton = document.getElementById("twoPlayers");
        this.backgroundCanvas = document.getElementById("backgroundCanvas").getContext("2d");
        var srcX = 0; //x-pixeln i spriten som bakgrunden börjar på
        var srcY = 500; //y-pixeln i spriten som bakgrunden börjar på
        var drawX = 0; //x-pixeln där bakgrunden börjar ritas ut
        var drawY = 0; //y-pixeln där bakgrunden börjar ritas ut


        this.backgroundCanvas.drawImage(Game.gameSprite, srcX, srcY, Game.width, Game.height, drawX, drawY, Game.width, Game.height);

        //Startskärmen visas, init körs och efter det är allt i spelet förberett
        Game.init();
    },

    renderBackground: function () {
        Game.menuDiv.parentNode.removeChild(Game.menuDiv);
        var srcX = 0; //x-pixeln i spriten som bakgrunden börjar på
        var srcY = 0; //y-pixeln i spriten som bakgrunden börjar på
        var drawX = 0; //x-pixeln där bakgrunden börjar ritas ut
        var drawY = 0; //y-pixeln där bakgrunden börjar ritas ut

        this.backgroundCanvas.drawImage(Game.gameSprite, srcX, srcY, Game.width, Game.height, drawX, drawY, Game.width, Game.height);

        //Startar spelet
        startLoop();
    },


    //initserar canvas-tagger, hinder och event
    init: function () {
        Game.playerCanvas = document.getElementById("playerCanvas").getContext("2d");
        Game.bulletCanvas = document.getElementById("bulletCanvas").getContext("2d");
        Game.ghostCanvas = document.getElementById("ghostCanvas").getContext("2d");
        Game.obstacleCanvas = document.getElementById("obstacleCanvas").getContext("2d");
        Game.healthCanvas = document.getElementById("healthCanvas").getContext("2d");
        Game.powerUpCanvas = document.getElementById("powerUpCanvas").getContext("2d");
        Game.pauseButton = document.getElementById("pauseButton");
        Game.gameDiv = document.getElementById("game");
        Game.menuDiv = document.getElementById("menu");
        Game.htmlScore = document.getElementById("score");
        //Game.player = new Player();

        for(var i = 0; i < 2; i++){
            Game.obstacles[i] = new Obstacle();
        }

        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.onePlayerButton.addEventListener("click", onePlayer, false);
        Game.twoPlayerButton.addEventListener("click", twoPlayers, false);
        Game.pauseButton.addEventListener("click", stopStart, false);
    }
};

function onePlayer() {
    Game.players[Game.players.length] = new Player(Game.width / 2);
    Game.renderBackground();
}

function twoPlayers() {
    Game.players[Game.players.length] = new Player(Game.playerX);
    Game.players[Game.players.length] = new Player(Game.player2X);
    Game.renderBackground();
}

//används för att pausa/starta spelet
function stopStart(){
    if(Game.paused){
        stopLoop();
        //stopSpawn();
        Game.paused = false;
        Game.pauseButton.innerHTML = "Play";
    }

    else if(!Game.paused){
        startLoop();
        Game.paused = true;
        Game.pauseButton.innerHTML = "Pause";
    }

}


//funktion som flyttar hindrena och ändrar egenskaper på spöken baserat på spelarens poäng
function moveObstacles() {
    for(var i = 0; i < Game.ghosts.length; i++) {
        for(var o = 0; o < Game.obstacles.length; o++) {

            var ghost = Game.ghosts[i];

            if (Game.obstacles[0].drawY <= 100) {
                Game.obstacles[0].drawY++;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[0].render();
            }

            if (Game.score >= 8 && Game.score < 18) {
                ghost.speed = 0.7;
                Game.spawnAmount = 3;
                if (Game.obstacles[0].drawX >= Game.obstacles[1].drawX &&
                    Game.obstacles[0].drawX + Game.obstacles[0].drawWidth) {
                    Game.obstacles[0].drawX++;
                }

                else if (Game.obstacles[0].drawX >= 0 && Game.obstacles[0].drawX <= Game.obstacles[1].drawX) {
                    Game.obstacles[0].drawX--;
                }
                if (Game.obstacles[1].drawY <= 125) {
                    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                    Game.obstacles[1].drawY++;
                    Game.obstacles[1].render();
                    Game.obstacles[0].render();
                }
            }

            else if (Game.score >= 18 && Game.score < 28) {
                ghost.speed = 0.8;
                Game.spawnAmount = 4;
                Game.spawnRate = 2500;
            }

            else if (Game.score >= 28 && Game.score < 40) {
                ghost.speed = 1;
                Game.spawnAmount = 5;
                Game.spawnRate = 1800;
                if (Game.obstacles[0].drawY <= 175) {
                    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                    Game.obstacles[0].drawY++;
                    Game.obstacles[0].render();
                    Game.obstacles[1].render();
                }
            }

            else if (Game.score >= 40 && Game.score < 80) {
                ghost.speed = 1;
                Game.spawnAmount = 6;
                Game.spawnRate = 1200;
                if (Game.obstacles[1].drawY <= 255) {
                    Game.obstacles[1].drawY++;
                    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                    Game.obstacles[1].render();
                    Game.obstacles[0].render();
                }
            }

            else if (Game.score >= 80) {

                ghost.speed = 1.1;
                Game.spawnAmount = 7;
                Game.spawnRate = 1000;

                /*if (Game.obstacles[0].drawX + Game.obstacles[0].drawWidth <= Game.width - 10) {
                 Game.obstacles[0].drawX++;
                 }*/

                Game.obstacles[0].drawX += 0.2;

                if (Game.obstacles[0].drawX >= Game.width) {
                    Game.obstacles[0].drawX = -70;
                }
                /* if (Game.obstacles[0].drawX <= Game.width) {
                 Game.obstacles[0].drawX--;
                 }*/


                if (Game.obstacles[1].drawY <= 280) {
                    Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                    Game.obstacles[1].drawY++;

                }
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[0].render();
                Game.obstacles[1].render();
            }
        }
    }
}


//funktion som kollar vart objekten befinner sig och kollar om de kolliderar
function checkObjectPositions() {
    //alert("checking");

    //loopar först igenom kulorna och hindrena för att kolla om de kolliderar
    for (var p = 0; p < Game.players.length; p++) {
        for (var b = 0; b < Game.players[p].bullets.length; b++) {
            for (var o = 0; o < Game.obstacles.length; o++) {

                //om de kolliderar "resetas" kulans position och är sen redo att återanvändas
                if (checkCollision(Game.players[p].bullets[b], Game.obstacles[o])) {
                    Game.players[p].bullets[b].resetBullet(Game.players[p].bullets[b]);
                }
            }
            //loopar igenom kulorna och spökena
            for (var g = 0; g < Game.ghosts.length; g++) {
                var ghost = Game.ghosts[g]; // tilldelar variabeln ghost nuvarande spökobjekt
                // i arrayen så det blir mindre kod att skriva

                //om de kolliderar "resetas" kulans position och är sen redo att återanvändas, spöket tas bort
                // poängen ökar och ett anrop till funktionen newPowerUp görs för att slumpa om en powerUp ska ges
                if (checkCollision(Game.players[p].bullets[b], ghost)) {
                    Game.score++;
                    Game.htmlScore.innerHTML = Game.score;
                    Game.ghosts.splice(g, 1);
                    Game.players[p].bullets[b].resetBullet(Game.players[p].bullets[b]);
                    newPowerUp(ghost.drawX, ghost.drawY); // skickar med spökets x och y som blir powerupens startposition
                }
            }
        }
        //loopar igenom power-upsen
        for (var pu = 0; pu < Game.powerUps.length; pu++) {
            if (checkCollision(Game.powerUps[pu], Game.players[p])) {
                //rensar canvasen om spelaren har tagit powerupen
                Game.powerUpCanvas.clearRect(Game.powerUps[pu].drawX, Game.powerUps[pu].drawY,
                    Game.powerUps[pu].drawWidth, Game.powerUps[pu].drawHeight);


                if (Game.powerUps[pu].type === "speed") {
                    // Game.powerUps.splice(p, 1);
                    Game.players[p].speed = 8;

                    // tar bort time- så att tiden ställs om när spelaren får en likadan power-up
                    clearTimeout(Game.clearPowerUp);

                    //efter 15 sekunder återställs spelarens hastighet
                    Game.clearPowerUp = setTimeout((function (p) {
                        return (function () {
                            console.log(Game.players);
                            Game.players[p].speed = 5;
                            console.log(Game.players);
                        });
                    })(p), 3000);

                }

                else if (Game.powerUps[pu].type === "health") {
                    //Game.powerUps.splice(p, 1);
                    //Liv ges bara om spelaren har tappat något liv
                    if (Game.players[0].health < 3) {
                        Game.players[0].health += 1;
                        Game.players[0].renderHealth();
                    }
                }
                //tar bort power-upen från arrayen om spelaren har tagit den
                Game.powerUps.splice(pu, 1);
            }
        }
    }
}

/**
 *Kollar om två objekt kolliderar
 *
 * @param {object} firstObject
 * @param {object} secondObject
 * @returns {boolean} true om två objekt kolliderar, annars false
 */
function checkCollision(firstObject, secondObject) {
    //för säkerhets skull kollar jag om något av objekten är unndef
    //isåfall returneras false. Detta för att undvika att spelet kraschar
    if (firstObject == undefined || secondObject == undefined) {
        return false;
    }

    //jämför två objekt och kollar om de kolliderar
    if (firstObject.drawX + firstObject.drawWidth >= secondObject.drawX &&
        firstObject.drawX <= secondObject.drawX + secondObject.drawWidth &&
        firstObject.drawY + firstObject.drawHeight / 2 <= secondObject.drawY + secondObject.drawHeight &&
        firstObject.drawY + firstObject.drawHeight >= secondObject.drawY) {

        return true;
    }

    return false;

}
//FPS-uträkning av Felipe
//http://www.html5gamedevs.com/topic/1828-how-to-calculate-fps-in-plain-javascript/#entry12580
var fps = {
    startTime: 0,
    frameNumber: 0,
    f: document.querySelector("#fps"),
    getFps: function () {
        this.frameNumber++;

        var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000,
            result = Math.floor((this.frameNumber / currentTime));

        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }
};

//"shim" av Paul Irish som används för bättre aniamtioner
var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

//funktonen loop kallar på sig själv med hjälp av animframe
function loop(){
    if(Game.rendering){
        Game.playerCanvas.clearRect(0, 0, 800, 500);
        Game.players[0].checkDirection();
        Game.players[0].checkBullets();
        Game.players[0].ifShooting();
        for (var i = 0; i < Game.players.length; i++) {
            Game.players[i].render();

        }
        fps.f.innerHTML = fps.getFps();
        checkObjectPositions();
        moveObstacles();
        renderGhosts();
        //kollar om det finns någon power-up att rendera ut
        //om det finns anropas funktionen renderPowerUps
        if (Game.renderPowerUp) {
            renderPowerUps();
        }
        animFrame(loop);
    }
}

// startar spel-loopen när användaren trycker på play och bakgrunden har renderats ut
function startLoop(){
    Game.rendering = true;
    Game.players[0].renderHealth();
    loop();
    startSpawn();
}

//stoppar spel-loopen när spelet är slut eller om spelet pausas
function stopLoop(){
    Game.rendering = false;
    stopSpawn();
}
//anropar funktionen pictureLoader när sidan är färdigladdad
window.onload = Game.pictureLoader;
