$(document).ready(function () {
  var winddowsW = window.innerWidth; // New width
  menuDisplay(winddowsW);
  layoutGapDisplay(winddowsW);
  $(window).resize(function() {
    // This will execute whenever the window is resized
    // var winddowsH = $(window).height(); // New height
    this.winddowsW = window.innerWidth; // New width
    menuDisplay(this.winddowsW);
    layoutGapDisplay(this.winddowsW);
  });

  function layoutGapDisplay($width){
    if($width > 1199 && $width < 1440){
      $('.menu-space').removeClass('col-xl-2');
      $('.content-space').removeClass('col-xl-10');
      $('.menu-space').addClass('col-xl-3');
      $('.content-space').addClass('col-xl-9');
    }else{
      $('.menu-space').removeClass('col-xl-3');
      $('.content-space').removeClass('col-xl-9');
      $('.menu-space').addClass('col-xl-2');
      $('.content-space').addClass('col-xl-10');
    }
  }

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
