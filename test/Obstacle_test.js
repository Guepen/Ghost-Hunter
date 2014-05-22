describe('Obstacle', function () {
    describe('Constructor', function () {
        it('should create an instance', function () {
            var minX = 0;
            var rangeX = 730;
            var obstacle = new Obstacle(minX, rangeX);
            expect(obstacle).to.be.instanceof(Obstacle);
            expect(obstacle.drawX).to.be.within(minX, rangeX);
            expect(obstacle.drawX).to.be.a('number');
            expect(obstacle.drawY).to.eql(-30);
            expect(obstacle.drawY).to.be.a('number');
            expect(obstacle.srcX).to.eql(58);
            expect(obstacle.srcX).to.be.a('number');
            expect(obstacle.srcY).to.eql(1000);
            expect(obstacle.srcY).to.be.a('number');
            expect(obstacle.drawWidth).to.eql(70);
            expect(obstacle.drawWidth).to.be.a('number');
            expect(obstacle.drawHeight).to.eql(20);
            expect(obstacle.drawHeight).to.be.a('number');
            expect(obstacle.srcWidth).to.eql(65);
            expect(obstacle.srcWidth).to.be.a('number')
            expect(obstacle.srcHeight).to.eql(19);
            expect(obstacle.srcHeight).to.be.a('number');
            expect(obstacle.type).to.eql("obstacle");
            expect(obstacle.type).to.be.a('string');
        });
    });

    it('should render', function () {
        Game = {
            obstacleCanvas: {
                drawImage: sinon.spy()
            },
            gameSprite: "pic"
        };

        var obstacle = new Obstacle();
        expect(obstacle).to.be.instanceof(Obstacle);
        obstacle.render();

        expect(Game.obstacleCanvas.drawImage).to.have.been.calledWith(Game.gameSprite, obstacle.srcX, obstacle.srcY,
            obstacle.srcWidth, obstacle.srcHeight, obstacle.drawX, obstacle.drawY, obstacle.drawWidth, obstacle.drawHeight);
    });

});
