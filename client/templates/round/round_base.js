Template.RoundBase.rendered = function () {
  $('.carousel').carousel({
    interval: false
  });
}

Template.RoundBase.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});
