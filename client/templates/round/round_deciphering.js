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
