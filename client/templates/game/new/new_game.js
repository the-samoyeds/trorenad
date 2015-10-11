Template.NewGame.helpers({
  getGame: function() {
    return Session.get('game');
  },

  gameOn: function () {
    return Session.get('gameon');
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


Template.NewGame.events({
  'click a[type="submit"]': function () {
    var game = Session.get('game')
    game['logic'] = new WordLogic([{name: "B"},{name: "M"},{name: "L"}]);
    game['logic'].startRound();
    Session.set('game', game);
  }
});
