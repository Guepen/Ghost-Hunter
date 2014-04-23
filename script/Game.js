"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta
var Game = {
    player: null,
    bullet: null,
    obstacle: null,
    obstacle2: null,
    pauseButton: null,
    pressedKeys: [],
    ghosts: [],
    bullets: [],
    obstacles: [],
    backgroundCanvas: null,
    playerCanvas: null,
    bulletCanvas: null,
    ghostCanvas: null,
    obstacleCanvas: null,
    healthCanvas: null,
    gameSprite: null,
    playerSprite: null,
    width: 800,
    height: 500,
    rendering: false,
    paused: true,
    htmlScore: null,
    score: 0,
    spawnAmount: 2,
    spawnInterval:0,
    spawnRate: 5000,

    //låter bilderna laddas innan spelet startar så de inte saknas när de skall användas
    pictureLoader: function () {
            Game.gameSprite = new Image();
            Game.gameSprite.src = "pictures/Spriten.png";

            Game.gameSprite.onload = function(){
                Game.renderBackground();

        }
    },

    renderBackground: function () {
        //alert("laddats");
        this.backgroundCanvas = document.getElementById("backgroundCanvas").getContext("2d");
        var srcX = 0; //x-pixeln i spriten som bakgrunden börjar på
        var srcY = 0; //y-pixeln i spriten som bakgrunden börjar på
        var drawX = 0; //x-pixeln där bakgrunden börjar ritas ut
        var drawY = 0; //y-pixeln där bakgrunden börjar ritas ut

        Game.backgroundCanvas.drawImage(Game.gameSprite, srcX, srcY, Game.width, Game.height, drawX, drawY, Game.width, Game.height);

        //när bakgrunden är utritad anropas init
        //spawnGhosts();
        Game.init();
    },

    init: function () {
        Game.playerCanvas = document.getElementById("playerCanvas").getContext("2d");
        Game.bulletCanvas = document.getElementById("bulletCanvas").getContext("2d");
        Game.ghostCanvas = document.getElementById("ghostCanvas").getContext("2d");
        Game.obstacleCanvas = document.getElementById("obstacleCanvas").getContext("2d");
        Game.healthCanvas = document.getElementById("healthCanvas").getContext("2d");
        Game.pauseButton = document.getElementById("pauseButton");
        Game.htmlScore = document.getElementById("score");
        Game.player = new Player();

        for(var i = 0; i < 2; i++){
            Game.obstacles[i] = new Obstacle();
        }
        //Game.obstacle = new Obstacle();
        //Game.obstacle2 = new  Obstacle();
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.pauseButton.addEventListener("click", stopStart, false);

        //initGhosts(Game.spawnAmount);
        //spawnGhosts(Game.spawnAmount);
        //Game.obstacle.render();
        startLoop();
    }
};

function stopStart(){
    if(Game.paused){
        Game.paused = false;
        stopLoop();
        Game.pauseButton.innerHTML = "Play";
    }

    else if(!Game.paused){
        Game.paused = true;
        startLoop();
        Game.pauseButton.innerHTML = "Pause";
    }

}

function checkObstacles() {
    for(var i = 0; i < Game.ghosts.length; i++) {
        for(var o = 0; o < Game.obstacles.length; o++) {

            var ghost = Game.ghosts[i];
            /*if (Game.obstacles[o].drawX + Game.obstacle.drawWidth <= Game.obstacle2.drawX &&
                Game.obstacle.drawX + Game.obstacle.drawWidth >= Game.obstacle2.drawX + Game.obstacle2.drawWidth) {
                Game.obstacle.drawX--;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacle.render();
                Game.obstacle2.render();

            }*/

            if (Game.obstacles[0].drawY <= 100) {
                Game.obstacles[0].drawY++;
                Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                Game.obstacles[0].render();
            }

            if (Game.score >= 8 && Game.score < 18) {
                ghost.speed = 0.7;
                Game.spawnAmount = 3;
                if (Game.obstacles[1].drawY <= 115) {
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
                    if (Game.obstacles[1].drawY <= 280) {
                        Game.obstacleCanvas.clearRect(0, 0, Game.width, Game.height);
                        Game.obstacles[1].drawY++;
                        Game.obstacles[0].render();
                        Game.obstacles[1].render();
                    }
                }

                //else if(Game.score)
            }
        }
}

function checkObjectPositions(){
    //alert("checking");
    for(var b = 0; b < Game.bullets.length; b++) {
        if(checkCollision(Game.bullets[b], Game.obstacle)){
            Game.bullets[b].drawY = 520;
        }
        for (var g = 0; g < Game.ghosts.length; g++) {
            //console.log(g);
            if (checkCollision(Game.bullets[b], Game.ghosts[g])) {
                Game.score++;
                Game.htmlScore.innerHTML = Game.score;
                Game.ghosts.splice(g, 1);
                Game.bullets[b].drawY = 520;
            }
        }
    }
}

function bulletHitObstacle(){
    //console.log(Game.obstacle);
    for(var i = 0; i < Game.bullets.length; i++){
        for(var x = 0; x < Game.obstacles.length; x++) {
            var bullet = Game.bullets[i];
            var obstacle = Game.obstacles[x];
            if (bullet.drawX + bullet.drawWidth >= obstacle.drawX &&
                bullet.drawX + bullet.drawWidth <= obstacle.drawX + obstacle.drawWidth + 10 &&
                bullet.drawY <= obstacle.drawY) {
                Game.bullets[i].drawY = 520;
            }

            /*if (bullet.drawX + bullet.drawWidth >= Game.obstacle2.drawX &&
                bullet.drawX + bullet.drawWidth <= Game.obstacle2.drawX + Game.obstacle2.drawWidth + 10 &&
                bullet.drawY <= Game.obstacle2.drawY) {
                Game.bullets[i].drawY = 520;
            }*/
        }
    }
}
                        //bullet     //ghost
function checkCollision(firstObject, secondObject){
    //console.log(firstObject);
    //console.log(firstObject);
    if (firstObject == undefined || secondObject == undefined) {
        return false;
    }

    if(firstObject.drawX + firstObject.drawWidth >= secondObject.drawX &&
        firstObject.drawX + firstObject.drawWidth <= secondObject.drawX + secondObject.drawWidth + 15){
        return(firstObject.drawY <= secondObject.drawY &&
            firstObject.drawY - firstObject.drawHeight >= secondObject.drawY - secondObject.drawHeight)
    }

    return false;

}
//FPS-uträkning av Felipe
//http://www.html5gamedevs.com/topic/1828-how-to-calculate-fps-in-plain-javascript/#entry12580
var fps = {
   startTime: 0,
   frameNumber: 0,
   f: document.querySelector("#fps"),
   getFps: function()
{
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

//funktonen loop kallar på sig själv med hjälp av aninframe
function loop(){
    if(Game.rendering){
        Game.player.render();
        fps.f.innerHTML = fps.getFps();
        checkObjectPositions();
        bulletHitObstacle();
        checkObstacles();
        renderGhosts();
        animFrame(loop);
    }
}

// startar spel-loopen när bilderna har laddats in eller om spelet har varit pausat
function startLoop(){
    Game.rendering = true;
    Game.player.renderHealth();
    loop();
    startSpawn();
}

//stoppar spel-loopen när spelet är slut eller om spelet pausas
function stopLoop(){
    Game.rendering = false;
    stopSpawn();
}
//anropar funktionen pictureLoader när sidan är färdigladdad
window.onload = Game.pictureLoader(Game.initPicsSrc);