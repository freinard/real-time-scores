var IOServer = require('socket.io');

module.exports = ScoreUpdates;

function ScoreUpdates(srv, gameRepo) {
    var io = new IOServer(srv);

    gameRepo.on('update', function (data) {
        io.emit('update', data);
    });

    gameRepo.on('new', function (data) {
        io.emit('new', data);
    });

}