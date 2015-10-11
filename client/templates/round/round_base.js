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

Template.RoundBase.onRendered(function(){
  dragula([document.querySelector("#top-defaults"), document.querySelector("#bottom-defaults")]).on('drag', function (el) {

  }).on('drop', function (el) {

  }).on('over', function (el, container) {

  }).on('out', function (el, container) {
    
  });
});
