var storage = [
    {
        date: 'Thursday, Nov 6, 2015',
        games: [
            {
                id: 1,
                status: 'FINAL',
                station: 'NFL Network',
                homeTeam: 'Cincinnati Bengals',
                homeScore: 31,
                awayTeam: 'Cleveland Browns',
                awayScore: 10
            }
        ]
    },
    {
        date: 'Sunday, Nov 7, 2015',
        games: [
            {
                id: 2,
                status: '1:00pm EST',
                station: 'CBS',
                homeTeam: 'Tennessee Titans',
                homeScore: 0,
                awayTeam: 'San Diego Chargers',
                awayScore: 0
            },
            {
                id: 3,
                status: 'Q1 10:55',
                station: 'Yahoo!',
                homeTeam: 'Jacksonville Jaguars',
                homeScore: 7,
                awayTeam: 'Miami Dolphins',
                awayScore: 3
            },
            {
                id: 4,
                status: '8:30pm EST',
                station: 'NBC',
                homeTeam: 'Dallas Cowboys',
                homeScore: 0,
                awayTeam: 'Philadelphia Eagles',
                awayScore: 0
            }
        ]
    }
];

exports.saveOrUpdate = function (item) {
    if (storage[item.id - 1] === undefined) {
        //item.id = storage.length;
        item.id = storage.push(item);
    } else {
        storage[item.id - 1] = item;
    }
};

exports.get = function (id) {
    return storage[id - 1];
};

exports.getAll = function () {
    return storage.slice();
};