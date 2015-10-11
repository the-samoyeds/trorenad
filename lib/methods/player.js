Meteor.methods({
  getPlayer: function(userId) {
    return player = Players.findOne({ userId: userId });
  },

  loginPlayer: function() {
    var player = Players.findOne({ userId: Meteor.userId() });

    if (!player) {
      var player = {};
      player.profile = {};
      player.userId = Meteor.userId();

      if (Meteor.user().services.facebook) {
        player.profile.firstName = Meteor.user().services.facebook.first_name;
        player.profile.lastName = Meteor.user().services.facebook.last_name;
        player.profile.pictureUrl = 'http://graph.facebook.com/' +  Meteor.user().services.facebook.id + '/picture/?type=large';
      } else if (Meteor.user().services.google) {
        player.profile.firstName = Meteor.user().services.google.given_name;
        player.profile.lastName = Meteor.user().services.google.family_name;
        player.profile.pictureUrl = Meteor.user().services.google.picture;
      }

      Players.insert(player);
    }
  }
});
