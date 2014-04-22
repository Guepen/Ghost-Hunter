"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta
var Game = {
    player: null,
    bullet: null,
    pauseButton: null,
    pressedKeys: [],
    ghosts: [],
    bullets: [],
    backgroundCanvas: null,
    playerCanvas: null,
    bulletCanvas: null,
    ghostCanvas: null,
    obstacleCanvas: null,
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
        Game.pauseButton = document.getElementById("pauseButton");
        Game.htmlScore = document.getElementById("score");
        Game.player = new Player();
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.pauseButton.addEventListener("click", stopStart, false);

        //initGhosts(Game.spawnAmount);
        //spawnGhosts(Game.spawnAmount);
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

function checkObjectPositions(){
    //alert("checking");
    for(var g = 0; g < Game.ghosts.length; g++){
        for(var b = 0; b < Game.bullets.length; b++){
            //console.log(g);
            if(checkCollision(Game.bullets[b], Game.ghosts[g])){
                Game.score++;
                Game.htmlScore.innerHTML = Game.score;
                Game.ghosts.splice(g, 1);
                Game.bullets[b].drawY = 520;
            }
        }
    }
}
                        //bullet     //ghost
function checkCollision(firstObject, secondObject){
    //console.log(firstObject);
    if (firstObject == undefined || secondObject == undefined) {
        return false;
    }

    if(firstObject.drawX +15 >= secondObject.drawX &&
        firstObject.drawX + firstObject.drawWidth <= secondObject.drawX + secondObject.drawWidth +20){
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
        fps.f.innerHTML = fps.getFps();
        checkObjectPositions();
        Game.player.render();
        renderGhosts();
        animFrame(loop);
    }
}

// startar spel-loopen när bilderna har laddats in eller om spelet har varit pausat
function startLoop(){
    Game.rendering = true;
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