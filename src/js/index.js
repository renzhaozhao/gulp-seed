var width = $('#slider').width();

var clone = $('.content li').clone();
$('.content').append(clone);
var len = $('.nav li').length;

$('.content').css({ width: width * len })


$('.nav li').click(function () {
  var index = $('.nav li').index(this);
  action(index);
})

action(0);

function action(index) {
  var leftwidth = -index * width;
  $('.content').stop(true, false).animate({ left: leftwidth }, 500);
  $('.nav li').eq(index).addClass('active').siblings().removeClass('active');
}
