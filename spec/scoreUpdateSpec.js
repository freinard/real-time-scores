describe("Score Updates", function () {
    var EventEmitter = require('events');
    var proxyquire = require('proxyquire');
    var sock;
    var mockSocket = function () {
        sock = jasmine.createSpyObj('socket', ['emit']);
        return sock;
    };
    var ScoreUpdates = proxyquire('../modules/score_updates.js',
        {'socket.io': mockSocket});
    var scoreUpdates;
    var server = {};
    var gameRepo = new EventEmitter();

    beforeEach(function () {
        scoreUpdates = new ScoreUpdates(server, gameRepo);
    });

    it("should emit update when repo updates", function () {
        gameRepo.emit('update', 'score update');
        expect(sock.emit).toHaveBeenCalledWith('update', 'score update');
    });

    it("should emit new when repo has new score added", function () {
        gameRepo.emit('new', 'new score');
        expect(sock.emit).toHaveBeenCalledWith('new', 'new score');
    });

});
