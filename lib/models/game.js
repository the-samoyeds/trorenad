Game = function(doc) {
  _.extend(this, doc);
};

_.extend(Game.prototype, {
  getPlayers: function() {
    var p = [];
    this.players.forEach(function(playerId) {
      p.push(Players.findOne(playerId));
    });
    return p;
  }
});

Games = new Mongo.Collection('games', {
  transform: function(doc) {
    return new Game(doc);
  }
});
