Template.RoundPlayers.helpers({
  players: function() {
    return Session.get('game').players;
  }
});
