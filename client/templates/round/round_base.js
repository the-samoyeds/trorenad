Template.RoundBase.rendered = function () {
  $('.carousel').carousel({
    interval: false
  });
}

Template.RoundBase.helpers({
  isMaster: function() {
    return Meteor.player().master;
  }
})


Template.RoundBase.events({
  'click .carousel-control': function () {
    $('.carousel-control').toggleClass('hidden');
  }
});

Template.RoundBase.onRendered(function(){
  dragula([document.querySelector("#top-defaults"), document.querySelector("#bottom-defaults")]).on('drag', function (el) {
    console.log("DRAG");
  }).on('drop', function (el) {
    console.log("DROP");
  }).on('over', function (el, container) {
    console.log("OVER");
  }).on('out', function (el, container) {
    console.log("OUT");
  });
});
