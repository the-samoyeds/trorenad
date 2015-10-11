Meteor.methods({
  getPlayer: function(userId) {
    return Players.findOne({ userId: userId });
  },

  loginPlayer: function() {
    var player = Players.findOne({ userId: Meteor.userId() });

    if (!player) {
      player = {};
      player.profile = {};
      player.userId = Meteor.userId();

      Players.insert(player);
    }

    if (Meteor.user().services.facebook) {
      Players.upsert({
        userId: player.userId
      }, {
        $set: {
          "profile.firstName": Meteor.user().services.facebook.first_name,
          "profile.lastName": Meteor.user().services.facebook.last_name,
          "profile.pictureUrl": 'http://graph.facebook.com/' +  Meteor.user().services.facebook.id + '/picture/?width=200&height=200'
        }
      });
    } else if (Meteor.user().services.google) {
      Players.upsert({
        userId: player.userId
      }, {
        $set: {
          "profile.firstName": Meteor.user().services.google.given_name,
          "profile.lastName": Meteor.user().services.google.family_name,
          "profile.pictureUrl": Meteor.user().services.google.picture
        }
      });
    }
  }
});
