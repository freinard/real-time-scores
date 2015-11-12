var entryHandlers = {};
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

exports.getAll = function () {
    return games.slice();
};

exports.get = function (id) {
    if (id !== undefined) {
        return games[id - 1];
    } else {
        return undefined;
    }
}

exports.save = function (game) {
    game.id = games.push(game);
    entryHandlers['new'].forEach(function (handler) {
        handler(game);
    });
    return game;
}

exports.update = function (game) {
    games[game.id - 1] = game;
    entryHandlers['update'].forEach(function (handler) {
        handler(game);
    });
}

exports.on = function (key, handler) {
    if (entryHandlers[key] === undefined) {
        entryHandlers[key] = [];
    }
    entryHandlers[key].push(handler);
}
