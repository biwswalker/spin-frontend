$(document).ready(function () {
  var winddowsW = window.innerWidth; // New width
  menuDisplay(winddowsW);
  layoutGapDisplay(winddowsW);
  $(window).resize(function () {
    // This will execute whenever the window is resized
    // var winddowsH = $(window).height(); // New height
    this.winddowsW = window.innerWidth; // New width
    menuDisplay(this.winddowsW);
    layoutGapDisplay(this.winddowsW);
    // Date picker
    inlineDatepicker();
  });

  $('#toggle-sidebar').on('click',function(){
    $('#sidebar').toggleClass('active');
  });

  function layoutGapDisplay($width) {
    if ($width > 1199 && $width < 1440) {
      $('.menu-space').removeClass('col-xl-2');
      $('.content-space').removeClass('col-xl-10');
      $('.menu-space').addClass('col-xl-3');
      $('.content-space').addClass('col-xl-9');
    } else {
      $('.menu-space').removeClass('col-xl-3');
      $('.content-space').removeClass('col-xl-9');
      $('.menu-space').addClass('col-xl-2');
      $('.content-space').addClass('col-xl-10');
    }
  }

  function menuDisplay($width) {
    if ($width > 767) {
      $('#sidebar').removeClass('active');
    }

  }

});
function inlineDatepicker() {
  var dpInlineWidth = $('.ui-datepicker-inline > .ui-datepicker-calendar').width();
  let marginx2 = ((dpInlineWidth / 7) / 2) - 18;
  $('.inline-picker > .ui-datepicker td').css({ 'margin-left': marginx2 + 'px', 'margin-right': marginx2 + 'px' })
  $('.inline-picker > .ui-datepicker th').css({ 'margin-left': marginx2 + 'px', 'margin-right': marginx2 + 'px' })
}
