"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta
var Game = {
    player: null,
    bullet: null,
    pauseButton: "",
    pressedKeys: [],
    backgroundCanvas: "",
    playerCanvas: "",
    bulletCanvas: "",
    ghostCanvas: "",
    gameSprite: null,
    playerSprite: null,
    width: 800,
    height: 500,
    rendering: false,
    paused: true,


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
        Game.init();
    },

    init: function () {
        Game.playerCanvas = document.getElementById("playerCanvas").getContext("2d");
        Game.bulletCanvas = document.getElementById("bulletCanvas").getContext("2d");
        Game.pauseButton = document.getElementById("pauseButton");
        Game.player = new Player();
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);
        Game.pauseButton.addEventListener("click", stopStart, false);

        startLoop();
    }
};

function stopStart(){
    if(Game.paused === true){
        Game.paused = false;
        stopLoop();
        Game.pauseButton.innerHTML = "Play";
    }

    else if(Game.paused === false){
        Game.paused = true;
        startLoop();
        Game.pauseButton.innerHTML = "Pause";
    }

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
        Game.player.render();
        animFrame(loop);
    }
}

// startar spel-loopen när bilderna har laddats in eller om spelet har varit pausat
function startLoop(){
    Game.rendering = true;
    loop();
}

//stoppar spel-loopen när spelet är slut eller om spelet pausas
function stopLoop(){
    Game.rendering = false;
}
//anropar funktionen pictureLoader när sidan är färdigladdad
window.onload = Game.pictureLoader(Game.initPicsSrc);