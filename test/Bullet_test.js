describe('Bullet', function () {
    it('should create an instance', function () {
        var bullet = new Bullet();
        expect(bullet.drawX).to.eql(-25);
        expect(bullet.drawY).to.eql(510);
        expect(bullet.srcX).to.eql(48);
        expect(bullet.srcY).to.eql(1000);
        expect(bullet.drawWidth).to.eql(8);
        expect(bullet.drawHeight).to.eql(12);
        expect(bullet.srcWidth).to.eql(10);
        expect(bullet.srcHeight).to.eql(14);
        expect(bullet.speed).to.eql(3);
    });

    it('should reset', function () {
        var bullet = new Bullet();
        bullet.drawX = 400;
        bullet.drawY = 300;
        bullet.resetBullet();
        expect(bullet.drawX).to.eql(-25);
        expect(bullet.drawY).to.eql(510);

    });

    it('should change positon to players position', function () {
        Game = {
            players: [
                {
                    drawWidth: 50,
                    drawHeight: 100,
                    drawX: 400,
                    drawY: 400
                }
            ],
            gameSprite: "pic"
        };

        var bullet = new Bullet();
        bullet.fire(Game.players[0]);
        expect(bullet.drawX).to.eql(405);
        expect(bullet.drawY).to.eql(433);
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