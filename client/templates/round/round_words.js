Template.RoundWords.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});

Template.RoundWords.helpers({
  getPool: function() {
    Session.get('game')['logic'].pool
  }
});
