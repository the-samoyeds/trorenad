Meteor.player = function() {
  return Players.findOne({ userId: Meteor.userId() });
}

Meteor.playerId = function() {
  return Players.findOne({ userId: Meteor.userId() });
}
