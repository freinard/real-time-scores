describe("Game Repository", function () {
    var GameRepo = require('../modules/gameRepo');

    it("should have an 'on' method defined", function () {
        var repo = new GameRepo();
        expect(repo.getAll).toBeDefined();
    });

});