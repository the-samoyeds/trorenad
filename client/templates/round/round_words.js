Template.RoundWords.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});

Template.RoundWords.helpers({
  getPool: function() {
    return Session.get('game').pool;
  }
});
