describe('PowerUp', function () {
    describe('Constructor', function () {
        it('should create an instance', function () {
            var powerUp = new PowerUp();
            expect((powerUp)).to.be.instanceof(PowerUp);
            expect(powerUp.drawX).to.be.a('number')
            expect(powerUp.drawY).to.be.a('number');
            expect(powerUp.srcX).to.be.a('number');
            expect(powerUp.srcY).to.be.a('number');
            expect(powerUp.drawWidth).to.be.a('number');
            expect(powerUp.drawHeight).to.be.a('number');
            expect(powerUp.srcWidth).to.be.a('number');
            expect(powerUp.srcHeight).to.be.a('number');
            expect(powerUp.speed).to.eql(2);
            expect(powerUp.speed).to.be.a('number');
            expect(powerUp.type).to.be.a('string');
        });
    });

    it('should create a wallWalker-power-up ', function () {
        newPowerUp(400, 400, 0);
        expect(PowerUpObj.powerUps[0].type).to.eql("wallWalker");

    });

    it('should create a speed-powerUp ', function () {
        newPowerUp(400, 400, 1);
        expect(PowerUpObj.powerUps[1].type).to.eql("speed");

    });

    it('should create a health-powerUp ', function () {
        newPowerUp(400, 400, 2);
        expect(PowerUpObj.powerUps[2].type).to.eql("health");

    });

    it('should not create a powerUp ', function () {
        newPowerUp(400, 400, 4);
        expect(PowerUpObj.powerUps[3]).to.be.undefined;

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

    it('should clear canvas', function () {
        Game = {
            powerUpCanvas: {
                clearRect: sinon.spy(),
                drawImage: sinon.spy()
            },
            height: 500
        };
        renderPowerUps();

        expect(Game.powerUpCanvas.clearRect).to.have.been.calledWith(398, 398, 30, 31);
    });


    it('should not render', function () {
        Game = {
            height: 500,
            powerUpCanvas: {
                drawImage: sinon.spy()
            }

        };

        for (var i = 0; i < PowerUpObj.powerUps.length; i++) {
            PowerUpObj.powerUps[i].drawY = 400;
            PowerUpObj.powerUps[i].drawHeight = 101;

        }
        renderPowerUps();

        expect(Game.powerUpCanvas.drawImage.called).to.be.false;
    });

    it('should not clearCanvas', function () {
        Game = {
            height: 500,
            powerUpCanvas: {
                clearRect: sinon.spy(),
                drawImage: sinon.spy()
            }

        };

        for (var i = 0; i < PowerUpObj.powerUps.length; i++) {
            PowerUpObj.powerUps[i].drawY = 400;
            PowerUpObj.powerUps[i].drawHeight = 101;

        }
        renderPowerUps();

        expect(Game.powerUpCanvas.clearRect.called).to.be.false;
    });

});
