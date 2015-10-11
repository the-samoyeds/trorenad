Template.Login.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed " + err);
      } else {
        window.location="/";
      }
    });
  },

  'click #google-login': function(event) {
    Meteor.loginWithGoogle({}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed " + err);
      } else {
        window.location="/";
      }
    });
  }
});
