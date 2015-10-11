Template.NewGame.helpers({
  getGame: function() {
    return Session.get('game');
  }
});

Template.FoundGame.helpers({
  getGameId: function() {
    return Session.get('game')._id;
  },

  getParticipants: function() {
    return Session.get('participants');
  }
});
