Template.RoundPlayers.helpers({
  players: function() {
    return Games.findOne(Session.get('game')._id).getPlayers();
  },
  currentPlayer: function() {
    return Meteor.player().userId == this.userId;
  }
});
