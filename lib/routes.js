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

  Meteor.call('getPlayers', this.params._id, function(err, players) {
    if (err) {
      console.error(err);
    } else {
      Session.set('players', players);
    }
  });

  Session.set('masterMode', 'words');

  this.render('NewGame');
}, {
  name: 'game.new'
});

Router.route('/join', function() {
  this.render('JoinGame');
});

Router.route('/round', function() {
  this.render('RoundBase');
});
