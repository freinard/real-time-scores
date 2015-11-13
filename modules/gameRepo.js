var games = [{
    id: 1,
    date: 20151005,
    status: 'Q2 8:00',
    station: 'CBS',
    homeTeam: 'Choppers',
    homeScore: 7,
    awayTeam: 'Mini Bikes',
    awayScore: 10
}, {
    id: 2,
    date: 20151004,
    status: '1:00pm EST',
    station: 'CBS',
    homeTeam: 'Jumpers',
    homeScore: 0,
    awayTeam: 'Blitz',
    awayScore: 0
}];

const util = require('util');
const EventEmitter = require('events');
function GameRepository() {
    EventEmitter.call(this);
}

util.inherits(GameRepository, EventEmitter);

GameRepository.prototype.getAll = function () {
    return games.slice();
};

GameRepository.prototype.get = function (id) {
    if (id !== undefined) {
        return games[id - 1];
    } else {
        return undefined;
    }
};

GameRepository.prototype.save = function (game) {
    game.id = games.push(game);
    this.emit('new', game);
    return game;
};

GameRepository.prototype.update = function (game) {
    games[game.id - 1] = game;
    this.emit('update', game);
    console.log('GOT UPDATE');
};

module.exports = GameRepository;
