$(document).ready(function () {

  $(window).resize(function() {
    // This will execute whenever the window is resized
    var winddowsH = $(window).height(); // New height
    var winddowsW = $(window).width(); // New width
    menuDisplay(winddowsW);
  });

  function menuDisplay($width){
    if($width > 576){
      $('#sidebar').removeClass('active');
    }

  }

  $('#show-sidebar').on('click', function () {
      $('#sidebar').removeClass('active');

  });

  $('#hide-sidebar').on('click', function () {
    $('#sidebar').addClass('active');
  });

});
