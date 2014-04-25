"use strict";

var Game = {

    score: 0,
    hmtlScore:"",
    width: 800,
    heigth: 500,
    backgroundCanvas: "",
    bulletCanvas: "",
    playerCanvas: "",
    ghostCanvas: "",
    wonCanvas:"",
    pictures: [],
    initPics: [],
    ghosts: [],
    bullets: [],
    pressedKeys: {},
    loadedPictures: 0,
    requierdPictures: 1,
    rendering: false,
    timesRenderd: 0,
    numberOfGhosts:0,
    spawnInterval:0,
    spawnRate: 4000,
    spawnAmount:4,
    time: 0,

    spawnGhost: function(ghosts){
        for (var i = 0; i < ghosts; i++) {
            Game.ghosts.push({
                x: Math.floor(Math.random() * Game.width),
                y: -50,
                speed: 0.5,
                pic: 0,
                width: 140,
                heigth: 60,
                dead: false,
                movement: Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1)
            });
        }
    },

    startSpawn: function(){
        Game.spawnInterval = setInterval(function(){Game.spawnGhost(Game.spawnAmount);}, Game.spawnRate);
    },

    stopSpawn: function () {
        clearInterval(Game.spawnInterval);
    },

    pictureLoader: function(picture){
        //alert("teestS");
        //console.log(pictures);
        Game.backgroundCanvas = document.getElementById("backgroundCanvas").getContext("2d");
        Game.backgroundCanvas.fillStyle = "white";
        Game.backgroundCanvas.font = "bold 50px italic";
        Game.backgroundCanvas.fillText("Loading", Game.width / 2 - 100 , Game.heigth / 2 - 50);

        for(var i =0; i < picture.length; i++ ){
            var pic = new Image();
            pic.src = picture[i];
            Game.pictures.push(pic);
            //console.log(picture[i]);
            Game.pictures[i].onload = function(){
                Game.loadedPictures++;
                if(Game.loadedPictures >= Game.requierdPictures){
                    Game.init();
                }
            };



        }

    },

    player: {
        x: 350,
        y:450,
        width: 50,
        height: 50,
        speed: 0.5,
    },

    ghost: {
        x: Math.floor(Math.random() * 800),
        y: -50,
        speed: 1,
        pic: 0,
        width: 140,
        heigth: 60,
    },

    init: function(){
        //alert("Hello World!");
        Game.ghostCanvas = document.getElementById("ghostCanvas").getContext("2d");
        Game.playerCanvas = document.getElementById("playerCanvas").getContext("2d");
        Game.bulletCanvas = document.getElementById("bulletCanvas").getContext("2d");
        Game.wonCanvas = document.getElementById("won").getContext("2d");

        Game.playerCanvas.fillStyle = "blue";
        Game.htmlScore = document.getElementById("score").innerHTML = Game.score;

        document.addEventListener("keydown", function (e) {
            //alert(e.keyCode);
            var keyID = e.keyCode || e.which;
            /*if(keyID === 37 || keyID === 65){
             Game.pressedKeys.push(keyID);
             }

             if(keyID === 39 || keyID === 68){

             Game.pressedKeys.push(keyID);
             }

             if(keyID === 32){

             Game.pressedKeys.push(keyID);
             }*/
            Game.pressedKeys[keyID] = true;
        } , false);

        document.addEventListener("keyup", function (e) {
            //alert(e.keyCode);
            var keyID = e.keyCode || e.which;
            /* var index = Game.pressedKeys.indexOf(keyID);
             if(keyID === 37 || keyID === 65){
             Game.pressedKeys.splice(Game.pressedKeys.indexOf(keyID), 1);
             }

             if(keyID === 39 || keyID === 68){
             Game.pressedKeys.splice(Game.pressedKeys.indexOf(keyID), 1);
             }

             if(keyID === 32){
             Game.pressedKeys.splice(index, 1);
             }*/
            Game.pressedKeys[keyID] = false;

            //console.log(Game.bullets);

        } , false);

        Game.numberOfGhosts = Game.ghosts.length;
        console.log(Game.numberOfGhosts);
        startLoop();
    },

    render: function(){

        /*if(Game.player.x > Game.width - Game.player.width){
         }
         else{*/
        Game.playerCanvas.clearRect(0, 0, Game.width, Game.heigth);
        Game.backgroundCanvas.clearRect(0, 0, Game.width, Game.heigth);
        Game.bulletCanvas.clearRect(0, 0, Game.width, Game.heigth);
        Game.ghostCanvas.clearRect(0, 0, Game.width, Game.heigth);
        Game.playerCanvas.fillRect(Game.player.x, Game.player.y, Game.player.width, Game.player.height);

        //checkCollision();

        for(var i = 0; i < Game.ghosts.length; i++){
            var ghost = Game.ghosts[i];
            //console.log(ghost.x);

            if (ghost.movement > 0) {
                ghost.x += ghost.speed / 2;
                ghost.movement -= ghost.speed / 2;
            } else if (ghost.movement < 0) {
                ghost.x -= ghost.speed / 2;
                ghost.movement += ghost.speed / 2;
            }

            Game.ghostCanvas.drawImage(Game.pictures[ghost.pic], ghost.x, ghost.y += ghost.speed, ghost.width, ghost.heigth );
        }


        for(var i = 0; i < Game.bullets.length; i++){
            var bullet = Game.bullets[i];
            if (bullet.y < -10) {
                Game.bullets.splice(i, 1);
                console.log('removing bullet');
            }
            //console.log(Game.bullets[i], i);
            //checkCollision(Game.bullets[i], i);
            Game.bulletCanvas.drawImage(Game.pictures[bullet.pic], bullet.x, bullet.y -= bullet.speed, bullet.width, bullet.heigth);
        }

    },
    update: function(){
        Game.timesRenderd++;
        //console.log(Game.ghosts.length);
        for(var g = 0; g < Game.ghosts.length; g++){
            for(var b = 0; b < Game.bullets.length; b++){
                if(checkCollision(Game.bullets[b], Game.ghosts[g])){
                    Game.score++;
                    Game.htmlScore = document.getElementById("score").innerHTML = Game.score;
                    Game.ghosts.splice(g, 1);
                    g--;
                    //Game.ghosts[g].dead = true;
                    Game.bullets.splice(b, 2);
                    b-=2;
                    console.log("hit!");

                }
            }
        }


        for(var g = 0; g < Game.ghosts.length; g++){
            if (Game.ghosts[g].movement === 0) {
                Game.ghosts[g].movement = Math.floor(Math.random() * Game.width * 0.2 - Game.width * 0.1);
            }
        }

        if(Game.score === 12){
            Game.spawnAmount = 2;
        }

        else if(Game.score === 24){
            Game.spawnAmount = 3;
        }

        else if(Game.score === 800){
            Game.playerCanvas.clearRect(0, 0, Game.width, Game.heigth);
            Game.backgroundCanvas.clearRect(0, 0, Game.width, Game.heigth);
            Game.bulletCanvas.clearRect(0, 0, Game.width, Game.heigth);
            Game.ghostCanvas.clearRect(0, 0, Game.width, Game.heigth);
            Game.wonCanvas.fillStyle = "white";
            Game.wonCanvas.font = "bold 30px italic";
            Game.wonCanvas.fillText("Great Job! The level is completed", Game.width / 2 - 100 , Game.heigth / 2 - 50);
            stopLoop();
        }

        for(var i = 0; i < Game.ghosts.length; i++){
            if(Game.ghosts[i].dead){
                Game.ghosts.splice(Game.ghosts[i], 1);
            }

            else if (Game.ghosts[i].y === 510) {
                Game.ghosts.splice(Game.ghosts[i], 1);
            }

            /*if(Game.timesRenderd <= 100){
             Game.ghosts[i].x += 1;
             }


             Game.ghosts[i].x -= 1;
             if(Game.timesRenderd >= 170){
             Game.timesRenderd = 0;

             }
             }
             }*/




            if(Game.pressedKeys[37] || Game.pressedKeys[65]){

                if(Game.player.x >= 1){
                    Game.player.x -= Game.player.speed;
                }
            }

            if(Game.pressedKeys[39] || Game.pressedKeys[68]){

                if(Game.player.x <= Game.width){
                    Game.player.x += Game.player.speed;
                }
            }

            if(Game.pressedKeys[32]){
                //console.log(Game.date.getTime());
                if(new Date().getTime() - Game.time > 100) {
                    Game.bullets.push({
                        x: Game.player.x + (Game.player.width / 2) - 4,
                        y: Game.player.y,
                        speed: 2,
                        pic: 1,
                        width: 10,
                        heigth: 13,
                    });
                    Game.time = new Date().getTime();
                }

            }

            /*if(Game.pressedKeys.indexOf(39) !== -1 || Game.pressedKeys.indexOf(68) !== -1){

             if(Game.player.x <= Game.width - 1){
             Game.player.x += Game.player.speed;
             }
             }

             if(Game.pressedKeys.indexOf(32) !== -1){

             Game.bullets.push({
             x: Game.player.x + (Game.player.width / 2) - 4,
             y: Game.player.y,
             speed: 2,
             pic: 1,
             width: 10,
             heigth: 13,
             });
             }

             */
            /*if(keyID === 39 || keyID === 68){

             Game.player.x += Game.player.speed;
             }

             if(keyID === 32){

             e.preventDefault();
             Game.bullets.push({
             x: Game.player.x + (Game.player.width / 2) - 4,
             y: Game.player.y,
             speed: 2,
             pic: 1,
             width: 10,
             heigth: 13,
             });
             }*/




        }
    }
};

function checkCollision(first, second){
    //for (var i = 0; i < Game.Game.ghosts.length; i++) {
    //  for (var x = 0; x < Game.bullets.length; x++) {
    /*     return !(first.x > second.x + second.width ||
     first.x + first.width < second.x ||
     first.y > first.y + second.heigth||
     first.y + first.heigth < second.y);*/
    //console.log(first);
    //console.log(second);
    if (first == undefined || second == undefined) {
        return false;
    }

    if (first.x >= second.x && first.x + first.width <= second.x + second.width) {
        return (first.y <= second.y && first.y - first.heigth >= second.y - second.heigth);
    }
    return false;


}


var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

function loop(){
    if(Game.rendering){
        Game.update();
        Game.render();
        animFrame(loop);
    }
}

function startLoop(){
    Game.rendering = true;
    loop();
    Game.startSpawn();
}

function stopLoop(){
    Game.rendering = false;
    Game.stopSpawn();
}
var initPics = ["pictures/ghost.png", "pictures/bullet.png"];
window.onload = Game.pictureLoader(initPics);
