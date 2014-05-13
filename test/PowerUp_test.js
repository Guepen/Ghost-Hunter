describe('PowerUp', function () {
    describe('Constructor', function () {
        it('should create an instance', function () {
            var powerUp = new PowerUp();
            expect(powerUp.drawX).to.eql(900);
            expect(powerUp.drawY).to.eql(600);
            expect(powerUp.srcX).to.eql(0);
            expect(powerUp.srcY).to.eql(0);
            expect(powerUp.drawWidth).to.eql(0);
            expect(powerUp.drawHeight).to.eql(0);
            expect(powerUp.srcWidth).to.eql(0);
            expect(powerUp.srcHeight).to.eql(0);
            expect(powerUp.speed).to.eql(2);
        });
    });

    it('should render', function () {
        Game = {
            powerUpCanvas: {
                drawImage: sinon.spy()
            },
            gameSprite: 5
        };

        var powerUp = new PowerUp();
        powerUp.render();

        expect(Game.powerUpCanvas.drawImage).to.have.been.calledWith(Game.gameSprite, powerUp.srcX, powerUp.srcY,
            powerUp.srcWidth, powerUp.srcHeight, powerUp.drawX, powerUp.drawY, powerUp.drawWidth, powerUp.drawHeight);
    });

    it('should create a speed-powerUp ', function () {
        newPowerUp(400, 400, 0);
        expect(PowerUpObj.powerUps[0].type).to.eql("speed");

    });

    it('should create a health-powerUp ', function () {
        newPowerUp(400, 400, 1);
        expect(PowerUpObj.powerUps[1].type).to.eql("health");

    });

});
