Template.RoundSolution.helpers({
  slots: function() {
    var game = Games.findOne(Session.get("game")._id);
    return game.answer;
  }
});

Template.RoundSolution.events({
  'click a[type="submit"]': function () {

    var sentence = "";
    $("#bottom-solve code").each(function (i, el) {
      sentence = sentence + " " + el.innerHTML;
    });

    console.log("Validate the sentence: " + sentence);

    var game = Games.findOne(Session.get("game")._id);
    var logic = new WordLogic(game, true);
    if (logic.validateSentence(sentence)) {
      alert("Congratulations! You solved the sentence: " + logic.getRealSentence());
    } else {
      alert("Wrong answer. The correct sentence is: " + logic.getRealSentence() + ". Good luck next time!");
    }
    
    logic.endRound();
    logic.startRound();


  }
});
