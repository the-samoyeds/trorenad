Template.Welcome.events({
  'click button[name="new-game"]': function(ev) {
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
