Template.RoundSolution.helpers({
  slots: function() {
    return Session.get('game').answer;
  }
});

Template.RoundSolution.events({
  'click a[type="submit"]': function () {
    console.log("Validate the sentence!");
  }
});
