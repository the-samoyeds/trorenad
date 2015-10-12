Template.RoundWords.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  },
  'click div.word': function (event) {
    Session.set("selectedWord", event.target.innerHTML);
  }
  // ,
  // 'click div.player': function (event) {
  //   selectedWord = Session.get("selectedWord");
  //   if (selectedWord) {
  //     var playerId = event.target;
  //
  //     console.log(playerId);
  //   }
  // }
});

Template.RoundWords.helpers({
  getPool: function() {
    var game = Games.findOne(Session.get("game")._id);
    return game.pool;
  },
  isSelected: function() {
    return Session.get("selectedWord") == this.crypted;
  }
});

Template.RoundWords.helpers({
  getAnswer: function() {
    var game = Games.findOne(Session.get("game")._id);
    return game.answers;
  }
});
