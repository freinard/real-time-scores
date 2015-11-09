var express = require('express');
var repo = require('../modules/repo.js');
var router = express.Router();
var parser = require('body-parser');
var urlEncodedParser = parser.urlencoded({extended: false});

router.get('/', function (req, res, next) {
    res.render('nfl_scores', {dates: repo.getAll()});
});

router.put('/:id', urlEncodedParser, function(req, res, next) {
    console.log("Game id: " + req.params.id, + " -> " + JSON.stringify(req.body));
    var gameId = req.params.id;
    var game = repo.get(gameId);
    console.log("Before update " + JSON.stringify(game));
    game.status = req.body.status;
    game.homeScore = req.body.homeScore;
    game.awayScore = req.body.awayScore;
    console.log("After update " + JSON.stringify(game));
    repo.saveOrUpdate(game);
    console.log(repo.getAll().length);
    res.status(200).json("Score Entered: " + JSON.stringify(game));
});

module.exports = router;
