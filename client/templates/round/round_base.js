Template.RoundBase.onRendered(function(){
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
  'click .word-card': function (event) {
    var timeoutId;

    $("#top-defaults li div").removeClass("word-gray").addClass("word-green");
    $('#card-'+event.toElement.id).removeClass("word-green").addClass("word-gray");
    console.log("WORD SELECTED: " + this.text);

    $('.word-card').mousedown(function() {
      timeoutId = setTimeout(function() {
        console.log("Open the word notes");
      }, 1000);
    }).bind('mouseup mouseleave', function() {
      clearTimeout(timeoutId);
    });
  },
  'click .player': function (event) {
    console.log("USER ID SELECTED: " + this.userId);
  }

});
