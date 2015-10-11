Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('Welcome');
});

Router.route('/tutorial', function() {
  this.render('Tutorial');
});

Router.route('/game/:_id', function() {
  Meteor.call('getGame', this.params._id, function(err, game) {
    if (err || !game) {
      console.error('Game not found');
    } else {
      Session.set('game', game);
    }
  });

  Meteor.call('getParticipants', this.params._id, function(err, participants) {
    if (err) {
      console.error(err);
    } else {
      Session.set('participants', participants);
    }
  });

  this.render('NewGame');
}, {
  name: 'game.new'
});

Router.route('/join', function() {
  this.render('JoinGame');
});
