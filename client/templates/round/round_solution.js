Template.RoundSolution.helpers({
  slots: function() {
    return Session.get('game')['logic'].answer.curValue;
  }
});
