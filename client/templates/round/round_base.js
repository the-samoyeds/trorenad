Template.RoundBase.onRendered(function () {
  $(function() {
    togglePlaceholder();
  });

  $('.carousel').carousel({
    interval: false
  });

  dragula([
    document.querySelector("#top-defaults"),
    document.querySelector("#bottom-solve"),
    document.querySelector("#bottom-players"),
  ]).on('drag', function (el) {

  }).on('drop', function (el, target, source, sibling) {
    togglePlaceholder();

    var game = Games.findOne(Session.get("game")._id);
    var logic = new WordLogic(game, true);

    var code = el.innerText.trim();

    var pos = 0;

    $("#bottom-solve code").each(function (i, el) {
      if (el.innerText.trim() == code) {
        pos = i;
      }
    });

    logic.answerWord(pos, code);

  }).on('over', function (el, container) {
    togglePlaceholder();
  }).on('out', function (el, container) {
    togglePlaceholder();
  });

  function togglePlaceholder() {
    var paragraph = $('#placeholder');
    if ($('#bottom-solve').children().length > 0) {
      paragraph.hide();
    } else {
      paragraph.show();
    }
  }

  // Toggle between 'words' and 'solution' mode
  if (Session.get('masterMode') === 'words') {
    $('#words').removeClass('hidden');
    $('#solution').addClass('hidden');
  } else if (Session.get('masterMode') === 'solution') {
    $('#solution').removeClass('hidden');
    $('#words').addClass('hidden');
  }
});

Template.RoundBase.helpers({
  isMaster: function() {
    return Meteor.player().master;
  }
});

Template.RoundBase.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  },
  'click .player': function (event) {
    var game = Games.findOne(Session.get("game")._id);
    var logic = new WordLogic(game, true);

    var player = Players.findOne({userId: this.userId});

    logic.giveWord(player, Session.get("selectedWord"));
  },
  'click .btn-master-mode': function (event) {
    $('.btn-master-mode').closest('.container').toggleClass('hidden');
  }
});
