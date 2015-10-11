Player = function(doc) {
  _.extend(this, doc);
};

Players = new Mongo.Collection('players', {
  transform: function(doc) {
    return new Player(doc);
  }
});
