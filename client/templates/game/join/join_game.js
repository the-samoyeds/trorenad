Template.JoinGame.events({
  'click button[name="join-game"]': function(ev) {
    ev.preventDefault();

    var gameCode = $('input[name="gameName"]').val();
    Meteor.call('joinGame', gameCode, function(err, result) {
      if (err || !result) {
        Session.set('error', 'Failed to join game. Sucks to be you...');
        console.error(result);
      } else {
        Router.go('game.new', { _id: gameCode });
      }
    });
  }
});

Template.JoinGame.helpers({
  error: function() {
    return Session.get('error');
  }
})
