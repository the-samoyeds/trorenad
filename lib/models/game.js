Game = function(doc) {
  _.extend(this, doc);
};

_.extend(Game.prototype, {
  getPlayers: function() {
    var players = [];
    this.players.forEach(function(playerId) {
      players.push(Players.findOne(playerId));
    });
    return players;
  }
});

Games = new Mongo.Collection('games', {
  transform: function(doc) {
    return new Game(doc);
  }
});
