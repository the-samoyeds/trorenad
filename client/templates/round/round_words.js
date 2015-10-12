Template.RoundWords.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});

Template.RoundWords.helpers({
  getPool: function() {
    var game = Games.findOne(Session.get("game")._id);
    return game.pool;
  }
});

Template.RoundWords.helpers({
  getAnswer: function() {
    var game = Games.findOne(Session.get("game")._id);
    return game.answers;
  }
});
