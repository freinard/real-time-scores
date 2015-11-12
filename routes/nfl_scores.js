var gameRepo;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.accepts('application/json')) {
        res.status(200).json(gameRepo.getAll());
    } else {
        res.status(406);
    }
});

router.put('/:id', function (req, res, next) {
    var game = gameRepo.get(req.params.id);
    var gameUpdate = req.body;
    game.status = gameUpdate.status;
    game.homeScore = gameUpdate.homeScore;
    game.awayScore = gameUpdate.awayScore;
    gameRepo.update(game);
    res.status(200).json("Score Entered: " + JSON.stringify(game));
});

router.put('/', function (req, res, next) {
    gameRepo.save(req.body);
    res.status(200).json("Score Entered: " + JSON.stringify(req.body));
});

module.exports = function (gameRepository) {
    gameRepo = gameRepository;
    return router;
}

