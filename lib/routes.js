Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
  this.render('Welcome');
});

Router.route('/tutorial', function() {
  this.render('Tutorial');
});

Router.route('/new', function() {
  this.render('NewGame');
});

Router.route('/join', function() {
  this.render('JoinGame');
});
