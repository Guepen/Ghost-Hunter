"use strict";

// objektet Game kapslar in kod som behöver köras innan spelet kan starta
var Game = {
    player: null,
    bullet: null,
    bullets: [],
    backgroundCanvas: "",
    playerCanvas: "",
    bulletCanvas: "",
    ghostCanvas: "",
    gameSprite: null,
    width: 800,
    height: 500,
    rendering: false,

    //låter bilderna laddas innan spelet startar så de inte saknas när de skall användas
    pictureLoader: function () {
        Game.gameSprite = new Image();
        Game.gameSprite.src = "pictures/gameSprite.png";

        //när bilderna är laddade anropas funktionen renderBackground som ritar ut bakgrunden
        Game.gameSprite.onload = function () {
            Game.renderBackground();

        }
    },

    renderBackground: function () {
        Game.backgroundCanvas = document.getElementById("backgroundCanvas").getContext("2d");
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
        Game.playerCanvas.fillStyle = "blue";

        Game.player = new Player();
        //console.log(Game.player);
        //alert("Hello world");
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener("keyup", keyUp, false);

        startLoop();
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
window.onload = Game.pictureLoader();