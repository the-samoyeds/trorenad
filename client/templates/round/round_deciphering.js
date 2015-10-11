
Template.RoundDeciphering.helpers({
  currentWord: function() {
    return Meteor.player().currentWord;
  },
  leftCypher: function() {
    return _.map(Meteor.player().cypher, function(i, k) {
        return {key: k, value: i};
    }).splice(0,13);
  },
  rightCypher: function() {
    return _.map(Meteor.player().cypher, function(i, k) {
        return {key: k, value: i};
    }).splice(13);
  }
})
