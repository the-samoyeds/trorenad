Template.NewGame.helpers({
  getGame: function() {
    return Session.get('game');
  },
  gameStarted: function() {
    if (Session.get("game") === undefined) return false;
    
    var game = Games.findOne(Session.get("game")._id)
    return game && game.started;
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
    var game = Games.findOne(Session.get("game")._id)

    // game.participants.push(Meteor.userId());

    // var logic = new WordLogic([{name: "B"},{name: "M"},{name: "L"},{name: "H"},{name: "A"},{name: "C"}]);
    var logic = new WordLogic(game);
    logic.startRound();
    // game.logic = logic;

    // Games.update({ _id: game._id }, { $set: { logic: logic }});

    // Session.set('game', game);
  }
});
