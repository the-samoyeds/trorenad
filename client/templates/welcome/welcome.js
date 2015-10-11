Template.Welcome.events({
  'click a[name="new-game"]': function(ev) {
    ev.preventDefault();
    
    Meteor.call('addGame', function(err, _id) {
      if (err) {
        return console.error(err);
      }

      Router.go('game.new', { _id: _id });
    });
  },

  'click #logout': function(event) {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      } else {
        window.location="/";
      }
    });
  }
});

Template.Welcome.helpers({
  getUserPicture: function() {
    if ( Meteor.user().services.facebook) {
      return 'http://graph.facebook.com/' +  Meteor.user().services.facebook.id + '/picture/?type=large';
    } else if ( Meteor.user().services.google) {
      return  Meteor.user().services.google.picture;
    }
  },

  getUserName: function() {
    if ( Meteor.user().services.facebook) {
      return  Meteor.user().services.facebook.first_name;
    } else if ( Meteor.user().services.google) {
      return  Meteor.user().services.google.given_name;
    }
  }
});
