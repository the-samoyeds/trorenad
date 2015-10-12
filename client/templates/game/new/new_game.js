Template.NewGame.helpers({
  getGame: function() {
    return Session.get('game');
  },
  gameStarted: function() {
    if (Session.get("game") === undefined) return false;

    var game = Games.findOne(Session.get("game")._id);
    return game && game.started;
  }
});

Template.FoundGame.helpers({
  getGameId: function() {
    return Session.get('game')._id;
  },

  getPlayers: function() {
    return Session.get('players');
  },

  isCreator: function() {
    return Session.get('game').creator === Meteor.currentId();
  },

  getCurrentRoute: function () {
    return encodeURI(Router.current().url);
  }
});


Template.NewGame.events({
  'click a[name="new-game"]': function () {
    var game = Games.findOne(Session.get("game")._id);

    logic = new WordLogic(game);
    logic.startRound();
  }
});
