Template.RoundBase.rendered = function () {
  $('.carousel').carousel({
    interval: false
  });

  Session.get('game')['logic'] = new WordLogic(players);
}

Template.RoundBase.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});
