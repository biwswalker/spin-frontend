$(document).ready(function () {
  var winddowsW = $(window).width(); // New width
  menuDisplay(winddowsW);
  $(window).resize(function() {
    // This will execute whenever the window is resized
    var winddowsH = $(window).height(); // New height
    this.winddowsW = $(window).width(); // New width
    menuDisplay(this.winddowsW);
  });

  function menuDisplay($width){
    if($width > 767){
      $('#sidebar').removeClass('active');
    }else{
      $('#sidebar').removeClass('active');
      $('#sidebar').addClass('active');
    }

  }

  $('#show-sidebar').on('click', function () {
      $('#sidebar').removeClass('active');

  });

  $('#hide-sidebar').on('click', function () {
    $('#sidebar').addClass('active');
  });

});
