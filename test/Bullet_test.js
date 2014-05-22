describe('Bullet', function () {
    describe('Constructor', function () {
        it('should create an instance', function () {
            var bullet = new Bullet();
            expect(bullet.drawX).to.eql(-25);
            expect(bullet.drawX).to.be.a('number');
            expect(bullet.drawY).to.eql(510);
            expect(bullet.drawY).to.be.a('number');
            expect(bullet.srcX).to.eql(48);
            expect(bullet.srcX).to.be.a('number');
            expect(bullet.srcY).to.eql(1000);
            expect(bullet.srcY).to.be.a('number');
            expect(bullet.drawWidth).to.eql(9);
            expect(bullet.drawWidth).to.be.a('number');
            expect(bullet.drawHeight).to.eql(9);
            expect(bullet.drawHeight).to.be.a('number');
            expect(bullet.srcWidth).to.eql(9);
            expect(bullet.srcWidth).to.be.a('number');
            expect(bullet.srcHeight).to.eql(9);
            expect(bullet.srcHeight).to.be.a('number');
            expect(bullet.speed).to.eql(3);
            expect(bullet.speed).to.be.a('number');
        });
    });

    it('should reset', function () {
        var bullet = new Bullet();
        bullet.drawX = 400;
        bullet.drawY = 300;
        bullet.resetBullet();
        expect(bullet.drawX).to.eql(-25);
        expect(bullet.drawY).to.eql(510);

    });

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
        expect(bullet.drawY).to.eql(Game.players[0].drawY + (Game.players[0].drawHeight / 2) - 17);
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
        expect(bullet.drawY).to.eql(Game.players[0].drawY + (Game.players[0].drawHeight / 2) - 17);
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
    });
});