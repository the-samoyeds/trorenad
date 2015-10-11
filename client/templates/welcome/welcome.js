Template.Welcome.events({
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
