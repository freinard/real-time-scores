var games = [{
    id: 1,
    date: 20151005,
    status: 'FINAL',
    station: 'NFL Network',
    homeTeam: 'Cincinnati Bengals',
    homeScore: 31,
    awayTeam: 'Cleveland Browns',
    awayScore: 10
}, {
    id: 2,
    date: 20151004,
    status: '1:00pm EST',
    station: 'CBS',
    homeTeam: 'Tennessee Titans',
    homeScore: 0,
    awayTeam: 'San Diego Chargers',
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
    return game;
}

exports.update = function(game){
    games[game.id - 1] = game;
}
