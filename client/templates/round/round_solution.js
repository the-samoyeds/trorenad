Template.RoundSolution.helpers({
  slots: function() {
    return Session.get('game').answer;
  }
});

Template.RoundSolution.events({
  'click a[type="submit"]': function () {

    var sentence = "";
    $("#bottom-solve code").each(function (i, el) {
      sentence = sentence + " " + el.innerHTML;
    })

    console.log("Validate the sentence: " + sentence);
  }
});
