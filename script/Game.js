"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta och även viss funkonalitet
var Game = {
    playerX: 40,
    player2X: 700,
    numberOfPlayers: 0,
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
    sounds: {"shoot": new Audio("audio/shoot.wav")},
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
    htmlScore: null,
    score: 0,
    spawnAmount: 2,
    spawnInterval: 0,
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
        Game.explosionCanvas = document.getElementById("explosionCanvas").getContext("2d");
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

        for (var i = 0; i < 2; i++) {
            ObstacleObj.obstacles[i] = new Obstacle();
        }

        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.onePlayerButton.addEventListener("click", this.onePlayer, false);
        Game.twoPlayerButton.addEventListener("click", this.twoPlayers, false);
        Game.pauseButton.addEventListener("click", this.stopStart, false);
    },

    onePlayer: function () {
        Game.players[Game.players.length] = new Player(Game.width / 2, 743, 1089);
        Game.numberOfPlayers = 1;
        Game.renderBackground();
    },

    twoPlayers: function () {
        Game.players[Game.players.length] = new Player(Game.playerX, 743, 1089);
        Game.players[Game.players.length] = new Player(Game.player2X, 502, 1000);
        Game.players[0].movingRight = true;
        Game.players[1].movingLeft = true;
        Game.numberOfPlayers = 2;
        Game.renderBackground();
    },

//används för att pausa/starta spelet
    stopStart: function () {
        if (Game.paused) {
            stopLoop();
            //stopSpawn();
            Game.paused = false;
            Game.pauseButton.innerHTML = "Play";
        }

        else if (!Game.paused) {
            startLoop();
            Game.paused = true;
            Game.pauseButton.innerHTML = "Pause";
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
                    Game.htmlScore.innerHTML = Game.score;
                    Game.ghosts.splice(g, 1);
                    Game.players[p].bullets[b].resetBullet(Game.players[p].bullets[b]);
                    var random = randomGenerator(25);
                    newPowerUp(ghost.drawX, ghost.drawY, random); // skickar med spökets x och y som blir powerupens startposition
                    var moveExplosion = randomGenerator(9);
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
                    if (Game.players[0].health < 3) {
                        Game.players[0].health += 1;
                        Game.players[0].renderHealth();
                    }
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

function playSound(file) {
    Game.sounds[file].currentTime = 0;
    Game.sounds[file].play();
    Game.sounds[file].ended = false;
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
        Game.players[0].checkDirection();
        Game.players[0].checkBullets();
        Game.players[0].ifShooting();
        for (var i = 0; i < Game.players.length; i++) {
            Game.players[i].render();

        }
        fps.f.innerHTML = fps.getFps();
        checkObjectCollisions();
        moveObstacles();
        renderGhosts();
        clearExplosion();
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
    Game.players[0].renderHealth();
    loop();
    startSpawn();
}

//stoppar spel-loopen när spelet är slut eller om spelet pausas
function stopLoop() {
    Game.rendering = false;
    stopSpawn();
}
//anropar funktionen pictureLoader när sidan är färdigladdad
window.onload = Game.pictureLoader;
