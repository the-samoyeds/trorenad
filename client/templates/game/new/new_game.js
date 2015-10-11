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
  },

  isCreator: function() {
    return Session.get('game').creator === Meteor.currentId();
  },

  getCurrentRoute: function () {
    return Router.current().route.getName();
  }
});
