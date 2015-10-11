Template.Welcome.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed " + err);
      }
    });
  },

  'click #google-login': function(event) {
    Meteor.loginWithGoogle({}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed " + err);
      }
    });
  },

  'click #logout': function(event) {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
    });
  }
});
