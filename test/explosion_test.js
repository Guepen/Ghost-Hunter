describe('Explosion', function () {
    describe('Constructor', function () {
        it('should create an instance', function () {

            var explosion = new Explosion(200, 200, function () {
                ExplosionObj.explosions.splice(ExplosionObj.explosions.length, 1);
            }, randomGenerator(0, 9));
            expect(explosion).to.be.instanceof(Explosion);
            expect(explosion.drawX).to.eql(200);
            expect(explosion.drawX).to.be.a('number');
            expect(explosion.drawY).to.eql(200);
            expect(explosion.drawY).to.be.a('number');
            expect(explosion.srcX).to.eql(177);
            expect(explosion.srcX).to.be.a('number');
            expect(explosion.srcY).to.eql(1000);
            expect(explosion.srcY).to.be.a('number');
            expect(explosion.drawWidth).to.eql(22);
            expect(explosion.drawWidth).to.be.a('number');
            expect(explosion.drawHeight).to.eql(22);
            expect(explosion.drawHeight).to.be.a('number');
            expect(explosion.callback).to.be.function;


        });
    });

    /*it('should clear', function () {
     var explosion = new Explosion();

     expect(explosion.callback.called).to.be.true;

     });*/
    /*
     it('should change positon to players right position', function () {
     Game = {
     players: [
     {
     drawWidth: 50,
     drawHeight: 100,
     drawX: 400,
     drawY: 400,
     movingRight: true
     }
     ],
     gameSprite: "pic"
     };

     var bullet = new Bullet();
     bullet.fire(Game.players[0]);
     expect(bullet.drawX).to.eql(Game.players[0].drawX + (Game.players[0].drawWidth - 13));
     expect(bullet.drawY).to.eql(Game.players[0].drawY + (Game.players[0].drawHeight / 2) -17);
     });

     it('should change positon to players left position', function () {
     Game = {
     players: [
     {
     drawWidth: 50,
     drawHeight: 100,
     drawX: 400,
     drawY: 400,
     movingRight: false
     }
     ],
     gameSprite: "pic"
     };

     var bullet = new Bullet();
     bullet.fire(Game.players[0]);
     expect(bullet.drawX).to.eql(Game.players[0].drawX + 5);
     expect(bullet.drawY).to.eql(Game.players[0].drawY + (Game.players[0].drawHeight / 2) -17);
     });

     it('should render', function () {
     Game = {
     bulletCanvas: {
     drawImage: sinon.spy()
     },
     gameSprite: 5
     };

     var bullet = new Bullet();
     bullet.render();

     expect(Game.bulletCanvas.drawImage).to.have.been.calledWith(Game.gameSprite, bullet.srcX, bullet.srcY,
     bullet.srcWidth, bullet.srcHeight, bullet.drawX, bullet.drawY, bullet.drawWidth, bullet.drawHeight);
     });*/
});