Template.RoundPlayers.helpers({
  players: function() {
    return Games.findOne(Session.get('game')._id).getPlayers();
  }
});
