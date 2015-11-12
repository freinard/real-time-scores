$(function () {

    function buildScore(game) {
        return '<li data-game-id="' + game.id + '">' +
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
        games.forEach(function (game) {
            $('#scores').append(buildScore(game));
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