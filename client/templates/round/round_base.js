Template.RoundBase.rendered = function () {
  $('.carousel').carousel({
    interval: false
  });
};

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
    $('#card-'+event.toElement.id).removeClass("word-green");
    $('#card-'+event.toElement.id).removeClass("word-red");
    $('#card-'+event.toElement.id).removeClass("word-white");
    $('#card-'+event.toElement.id).addClass("word-gray");

    $('.word-card').mousedown(function() {
      timeoutId = setTimeout(function() {
        console.log("Open the word notes");
      }, 1000);
    }).bind('mouseup mouseleave', function() {
      clearTimeout(timeoutId);
    });
  },
  'click .player': function (event) {
    console.log(event.toElement.parentElement.id); //userId
  }

});

Template.RoundBase.onRendered(function(){
  // dragula([document.querySelector("#top-defaults"), document.querySelector("#bottom-players")]).on('drag', function (el) {
  //   console.log("DRAG");
  // }).on('drop', function (el, target, source, sibling) {
  //   console.log(el);
  //   console.log(target);
  //   console.log(source);
  //   console.log(sibling);
  //   console.log("DROP");
  // }).on('over', function (el, container) {
  //   console.log(container);
  //   console.log("OVER");
  // }).on('out', function (el, container) {
  //   console.log("OUT");
  // });

  dragula([document.querySelector("#top-defaults"), document.querySelector("#bottom-solve")]).on('drag', function (el) {

  }).on('drop', function (el, target, source, sibling) {

    // TODO: Henrique
    var paragraph = $('#bottom-solve').parent().find('p');
    if ($('#bottom-solve').children().length > 0) {
      paragraph.addClass('hidden');
    } else {
      paragraph.removeClass('hidden');
    }

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

  }).on('out', function (el, container) {

  });
});
