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

  }).on('over', function (el, container) {

  }).on('out', function (el, container) {

  });
});
