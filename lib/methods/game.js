Meteor.methods({
  addGame: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    return Games.insert({
      _id: (Math.random().toString(36)+'00000000000000000').slice(2, 7),
      players: [ Meteor.playerId() ],
      rounds: [],
      creator: Meteor.playerId()
    });
  },

  getGame: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    return Games.findOne(_id);
  },

  getPlayers: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var game = Games.findOne(_id);
    if (game) {
      return game.getPlayers();
    } else {
      return [];
    }
  },

  joinGame: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var game = Games.findOne(_id);
    if (game && game.players.indexOf(Meteor.playerId()) < 0) {
      Games.update({ _id: _id }, { $push: { players: { $each : [ Meteor.playerId() ] }}});
      return true;
    } else {
      return false;
    }
  },

  leaveGame: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var game = Games.findOne(_id);
    if (game) {
      Games.update({ _id: _id }, { $pull: { players: Meteor.playerId() }});
    }
  }
})
