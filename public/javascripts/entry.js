$(function () {

    function buildScore(game) {
        return '<li>' + game.id + '<table><tr><th colspan="2">' +
            '<span class="status">' + game.status + '</span>' +
            '<span class="station">' + game.station + '</span>' +
            '</th></tr><tr>' +
            '<td class="team-name">' + game.awayTeam + '</td>' +
            '<td>' + game.awayScore + '</td></tr><tr>' +
            '<td>' + game.homeTeam + '</td>' +
            '<td>' + game.homeScore + '</td>' +
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

});