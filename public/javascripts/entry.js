$(function () {

    function buildScore(game) {
        return '<li data-game-id="' + game.id + '">' + game.id +
            '<table><tr><th colspan="2">' +
            '<span class="status">' + game.status + '</span>' +
            '<span class="station">' + game.station + '</span>' +
            '</th></tr><tr>' +
            '<td class="team-name">' + game.awayTeam + '</td>' +
            '<td id="awayScore">' + game.awayScore + '</td></tr><tr>' +
            '<td>' + game.homeTeam + '</td>' +
            '<td id="homeScore">' + game.homeScore + '</td>' +
            '</tr></table></li>';
    }

    $.get('/nfl_scores', function (games) {
        var list = $('#scores');
        games.forEach(function (game) {
            var item = list.append(buildScore(game));
            item.data = game;
        });
    }).fail(function (error) {
        console.log('failed');
    });

    $('#score_update').on('submit', function (event) {
        event.preventDefault();
        var form = $(this);
        var gameId = $('[name=gameId]');
        var gameData = form.serialize();

        $.ajax({
            method: 'PUT',
            url: '/nfl_scores/' + gameId.val(),
            data: gameData
        }).done(function (game) {
            console.log(JSON.stringify(game));
            form.trigger('reset');
        }).fail(function () {
            form.trigger('reest');
        });

    });

    $('#score_entry').on('submit', function (event) {
        event.preventDefault();
        var form = $(this);
        var gameData = form.serialize();

        $.ajax({
            method: 'PUT',
            url: '/nfl_scores',
            data: gameData
        }).done(function (game) {
            console.log(JSON.stringify(game));
            form.trigger('reset');
        }).fail(function () {
            form.trigger('reest');
        });

    });

    var socket = io.connect('http://localhost:3000');
    socket.on('update', function (gameUpdate) {
        console.log("update: " + JSON.stringify(gameUpdate));
        var selector = '[data-game-id="' + gameUpdate.id + '"]';
        $(selector).find('.status').text(gameUpdate.status);
        $(selector).find('#awayScore').text(gameUpdate.awayScore);
        $(selector).find('#homeScore').text(gameUpdate.homeScore);
    });

    socket.on('new', function (gameUpdate) {
        console.log("new: " + JSON.stringify(gameUpdate));
        $('#scores').append(buildScore(gameUpdate));
    });

});