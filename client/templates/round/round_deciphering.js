Template.RoundDeciphering.events({
  'click span.glyphicon-ok': function (event) {
    var game = Games.findOne(Session.get("game")._id);
    var logic = new WordLogic(game, true);

    logic.solveWord();
  },
  'click span.glyphicon-remove': function (event) {
    var game = Games.findOne(Session.get("game")._id);
    var logic = new WordLogic(game, true);
    logic.returnWord();
  }

});


Template.RoundDeciphering.helpers({
  currentWord: function() {
    return Meteor.player().currentWord;
  },
  leftCypher: function() {
    return _.map(Meteor.player().cypher, function(k, v) {
        return {key: k, value: v};
    }).splice(0,13);
  },
  rightCypher: function() {
    return _.map(Meteor.player().cypher, function(k, v) {
        return {key: k, value: v};
    }).splice(13);
  }
});
