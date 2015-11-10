var express = require('express');
var gameRepo = require('../modules/gameRepo.js');
var router = express.Router();
var parser = require('body-parser');
var urlEncodedParser = parser.urlencoded({extended: false});

router.get('/', function (req, res, next) {
    if (req.accepts('application/json')) {
        res.status(200).json(gameRepo.getAll());
    } else if (req.accepts('text/html')) {
        res.render('nfl_scores', {dates: repo.getAll()});
    } else {
        res.status(406);
    }
});

var updateScore = function (req, res, next) {
    var game = req.game;
    game.status = req.body.status;
    game.homeScore = req.body.homeScore;
    game.awayScore = req.body.awayScore;
    res.status(200).json("Score Entered: " + JSON.stringify(game));
};

var insert = function (req, res, next) {
    if (req.params.id === undefined) {
        var entry = req.body;
        game = {
            date: entry.date,
            homeTeam: entry.homeTeam,
            awayTeam: entry.awayTeam,
        };
        req.game = gameRepo.save(game);
    }
    next();
};

var find = function () {
    req.game = gameRepo.get(req.params.id);
    next();
};

router.put('/', urlEncodedParser, insert, updateScore);
router.put('/:id', urlEncodedParser, find, updateScore);

module.exports = router;
