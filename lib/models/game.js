Game = function(doc) {
  _.extend(this, doc);
};

_.extend(Game.prototype, {
  getParticipants: function() {
    var participants = [];
    this.participants.forEach(function(participantId) {
      participants.push(Meteor.users.findOne(participantId));
    });
    return participants;
  }
});

Games = new Mongo.Collection('games', {
  transform: function(doc) {
    return new Game(doc);
  }
});
