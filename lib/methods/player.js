Meteor.methods({
  getPlayer: function(userId) {
    return player = Players.findOne({ userIds: userId });
  },

  loginPlayer: function() {
    var player = Players.findOne({ userIds: Meteor.userId() });

    if (!player) {
      var player = {};
      player.profile = {};
      player.userIds = [ userId ];

      if (user.services.facebook) {
        player.profile.firstName = user.services.facebook.first_name;
        player.profile.lastName = user.services.facebook.last_name;
        player.profile.pictureUrl = 'http://graph.facebook.com/' +  user.services.facebook.id + '/picture/?type=large';
      } else if (user.services.google) {
        player.profile.firstName = user.services.google.given_name;
        player.profile.lastName = user.services.google.family_name;
        player.profile.pictureUrl = user.services.google.picture;
      }

      Players.insert(player);
    }
  }
});

Meteor.player = function() {
  return Players.findOne({ userIds: Meteor.userId() });
}

Meteor.playerId = function() {
  return Players.findOne({ userIds: Meteor.userId() });
}
