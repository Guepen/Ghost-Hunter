"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta och även viss funkonalitet
var Game = {
    playerX: 40,
    player2X: 700,
    numberOfPlayers: 0,
    pauseButton: null,
    hideControls: null,
    onePlayerButton: null,
    twoPlayerButton: null,
    gameDiv: null,
    menuDiv: null,
    secondScoreDiv: null,
    clearPowerUp: null,
    pressedKeys: [],
    players: [],
    ghosts: [],
    bullets: [],
    obstacles: [],
    backgroundCanvas: null,
    playerCanvas: null,
    bulletCanvas: null,
    ghostCanvas: null,
    obstacleCanvas: null,
    healthCanvas: null,
    powerUpCanvas: null,
    explosionCanvas: null,
    gameSprite: null,
    width: 800,
    height: 500,
    rendering: false,
    renderPowerUp: false,
    paused: true,
    updateGhostRules: false,
    updateGhostRulesTwo: 0,
    score: 0,
    spawnAmount: 2,
    spawnInterval: null,
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
        var obstacleMaxDrawX = 328;
        var obstacleMinDrawX = 0;
        Game.menuDiv.parentNode.removeChild(Game.menuDiv);
        var srcX = 0; //x-pixeln i spriten som bakgrunden börjar på
        var srcY = 0; //y-pixeln i spriten som bakgrunden börjar på
        var drawX = 0; //x-pixeln där bakgrunden börjar ritas ut
        var drawY = 0; //y-pixeln där bakgrunden börjar ritas ut

        this.backgroundCanvas.drawImage(Game.gameSprite, srcX, srcY, Game.width, Game.height, drawX, drawY, Game.width, Game.height);

        for (var i = 0; i < 2; i++) {
            if (Game.numberOfPlayers === 2) {
                ObstacleObj.obstacles[i] = new Obstacle(obstacleMinDrawX, obstacleMaxDrawX);
                obstacleMinDrawX = 402;
                obstacleMaxDrawX = 328;

                Game.secondScoreDiv.style.display = "block";
                this.backgroundCanvas.strokeStyle = "red";
                this.backgroundCanvas.lineWidth = 4;
                this.backgroundCanvas.beginPath();
                this.backgroundCanvas.moveTo(398, 0);
                this.backgroundCanvas.lineTo(398, 500);
                this.backgroundCanvas.stroke();
            }

            else {
                ObstacleObj.obstacles[i] = new Obstacle(0, 730);
            }
        }

        //Startar spelet
        startLoop();
    },


    //initserar canvas-tagger, hinder och event
    init: function () {
        Game.playerCanvas = document.getElementById("playerCanvas").getContext("2d");
        Game.explosionCanvas = document.getElementById("explosionCanvas").getContext("2d");
        Game.bulletCanvas = document.getElementById("bulletCanvas").getContext("2d");
        Game.ghostCanvas = document.getElementById("ghostCanvas").getContext("2d");
        Game.obstacleCanvas = document.getElementById("obstacleCanvas").getContext("2d");
        Game.healthCanvas = document.getElementById("healthCanvas").getContext("2d");
        Game.powerUpCanvas = document.getElementById("powerUpCanvas").getContext("2d");
        //Game.pauseButton = document.getElementById("pauseButton");
        Game.hideControls = document.getElementById("Hide");
        Game.gameDiv = document.getElementById("game");
        Game.menuDiv = document.getElementById("menu");
        Game.htmlScore = document.getElementById("countScore");
        Game.secondScoreDiv = document.getElementById("score2");

        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.onePlayerButton.addEventListener("click", this.onePlayer, false);
        Game.twoPlayerButton.addEventListener("click", this.twoPlayers, false);
        //Game.pauseButton.addEventListener("click", this.stopStart, false);
        Game.hideControls.addEventListener("click", this.removeControls, false);
    },

    onePlayer: function () {
        Game.players[Game.players.length] = new Player(Game.width / 2, 743, 1089, score, "green", 32, 37, 39, 0, 368);
        Game.numberOfPlayers = 1;
        Game.players[0].movingRight = true;
        Game.renderBackground();
    },

    twoPlayers: function () {
        var score = document.getElementById("countScore");
        var score2 = document.getElementById("countScore2");
        Game.players[Game.players.length] = new Player(700, 743, 1089, score, "green", 32, 37, 39, 0, 368);
        Game.players[Game.players.length] = new Player(40, 502, 1000, score2, "purple", 16, 65, 68, 402, 402);
        Game.players[1].movingRight = true;
        Game.players[0].movingLeft = true;
        Game.numberOfPlayers = 2;
        Game.renderBackground();
    },

    removeControls: function () {
        var controls = document.getElementById("Controls");
        controls.style.visibility = 'hidden';
    },

//används för att pausa/starta spelet
    stopStart: function () {
        if (Game.paused) {
            stopLoop();
            //stopSpawn();
            Game.paused = false;
            // Game.pauseButton.innerHTML = "Play";
        }

        else if (!Game.paused) {
            Game.rendering = true;
            Game.paused = true;
            // Game.pauseButton.innerHTML = "Pause";
            startLoop();
        }

    }
};
/**
 * funktion som kollar om två objekt kolliderar
 */
function checkObjectCollisions() {
    //loopar först igenom kulorna och hindrena för att kolla om de kolliderar
    for (var p = 0; p < Game.players.length; p++) {
        for (var b = 0; b < Game.players[p].bullets.length; b++) {
            for (var o = 0; o < ObstacleObj.obstacles.length; o++) {

                //om de kolliderar "resetas" kulans position och är sen redo att återanvändas
                if (checkCollision(Game.players[p].bullets[b], ObstacleObj.obstacles[o])) {
                    Game.players[p].bullets[b].resetBullet(Game.players[p].bullets[b]);
                }
            }
            //loopar igenom kulorna och spökena
            for (var g = 0; g < Game.ghosts.length; g++) {
                // tilldelar variabeln ghost nuvarande spökobjekt
                // i arrayen så det blir mindre kod att skriva
                var ghost = Game.ghosts[g];

                //om de kolliderar "resetas" kulans position och är sen redo att återanvändas, spöket tas bort
                // poängen ökar och ett anrop till funktionen newPowerUp görs för att slumpa om en powerUp ska ges
                if (checkCollision(Game.players[p].bullets[b], ghost)) {
                    Game.score++;
                    Game.players[p].score++;
                    Game.players[p].htmlScore.innerHTML = Game.players[p].score;
                    Game.ghosts.splice(g, 1);
                    Game.players[p].bullets[b].resetBullet(Game.players[p].bullets[b]);
                    var random = randomGenerator(0, 30);
                    newPowerUp(ghost.drawX, ghost.drawY, random); // skickar med spökets x och y som blir powerupens startposition
                    var moveExplosion = randomGenerator(0, 9);
                    ExplosionObj.explosions[ExplosionObj.explosions.length] = new Explosion(ghost.drawX, ghost.drawY, function () {
                        ExplosionObj.explosions.splice(ExplosionObj.explosions.length, 1);
                    }, moveExplosion);

                }
            }
        }
        //loopar igenom power-upsen
        for (var pu = 0; pu < PowerUpObj.powerUps.length; pu++) {
            if (checkCollision(PowerUpObj.powerUps[pu], Game.players[p])) {
                //rensar canvasen om spelaren har tagit powerupen
                Game.powerUpCanvas.clearRect(PowerUpObj.powerUps[pu].drawX, PowerUpObj.powerUps[pu].drawY,
                    PowerUpObj.powerUps[pu].drawWidth, PowerUpObj.powerUps[pu].drawHeight);
                ExplosionObj.audio.play();
                ExplosionObj.audio.currentTime = 0;


                if (PowerUpObj.powerUps[pu].type === "speed") {
                    // PowerUpObj.powerUps.splice(p, 1);
                    Game.players[p].speed = 8;

                    // tar bort time- så att tiden ställs om när spelaren får en likadan power-up
                    clearTimeout(Game.clearPowerUp);

                    //efter 15 sekunder återställs spelarens hastighet
                    Game.clearPowerUp = setTimeout((function (p) {
                        return (function () {
                            Game.players[p].speed = 5;
                        });
                    })(p), 15000);

                }

                else if (PowerUpObj.powerUps[pu].type === "health") {

                    //Liv ges bara om spelaren har tappat något liv
                    if (Game.players[p].type === "green") {
                        if (Game.players[0].health < 3) {
                            Game.players[0].health += 1;
                            Game.players[0].renderHealth(-18);
                        }
                    }
                    else if (Game.players[p].type === "purple") {
                        if (Game.players[1].health < 3) {
                            Game.players[1].health += 1;
                            Game.players[1].renderHealth(680);
                        }
                    }
                }

                else if (PowerUpObj.powerUps[pu].type === "wallWalker") {
                    Game.players[p].wallWalker = true;

                    setTimeout((function (p) {
                        return (function () {
                            Game.players[p].wallWalker = false;
                            if (Game.players[1].drawX + Game.players[0].drawWidth >= 402) {
                                Game.players[1].drawX = 150;
                            }

                            if (Game.players[0].drawX <= 398) {
                                Game.players[0].drawX = 500;
                            }
                        });
                    })(p), 9000);
                }
                //tar bort power-upen från arrayen om spelaren har tagit den
                PowerUpObj.powerUps.splice(pu, 1);
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
        firstObject.drawX <= secondObject.drawX + secondObject.drawWidth) {

        return(firstObject.drawY + firstObject.drawHeight / 2 <= secondObject.drawY + secondObject.drawHeight &&
            firstObject.drawY + firstObject.drawHeight >= secondObject.drawY)

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
function loop() {
    if (Game.rendering) {
        Game.playerCanvas.clearRect(0, 0, 800, 500);
        for (var i = 0; i < Game.players.length; i++) {
            Game.players[i].render();
            Game.players[i].checkDirection();
            Game.players[i].ifShooting();
        }
        fps.f.innerHTML = fps.getFps();
        checkObjectCollisions();
        checkBullets();
        renderGhosts();
        clearExplosion();
        moveObstacleY();
        ghostRules();

        //kollar om det finns någon power-up att rendera ut
        //om det finns anropas funktionen renderPowerUps
        if (PowerUpObj.powerUps.length > 0) {
            renderPowerUps();
        }
        animFrame(loop);
    }
}

// startar spel-loopen när användaren trycker på play och bakgrunden har renderats ut
function startLoop() {
    Game.rendering = true;
    Game.players[0].renderHealth(-18);
    Game.players[0].renderHealth(680);
    startSpawn();
    interval();
    loop();
}

//stoppar spel-loopen när spelet är slut eller om spelet pausas
function stopLoop() {
    Game.rendering = false;
    stopSpawn();
}
//anropar funktionen pictureLoader när sidan är färdigladdad
window.onload = Game.pictureLoader;
