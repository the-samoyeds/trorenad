Meteor.methods({
  addGame: function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    return Games.insert({
      _id: (Math.random().toString(36)+'00000000000000000').slice(2, 7),
      participants: [ Meteor.userId() ],
      rounds: [],
      creator: Meteor.userId()
    });
  },

  getGame: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    return Games.findOne(_id);
  },

  getParticipants: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var game = Games.findOne(_id);
    if (game) {
      return game.getParticipants();
    } else {
      return [];
    }
  },

  joinGame: function(_id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var game = Games.findOne(_id);
    if (game) {
      game.participants.push(Meteor.userId());
      Games.update({ _id: _id }, { $set: { participants: game.participants }});
      return true;
    } else {
      return false;
    }
  }
})
