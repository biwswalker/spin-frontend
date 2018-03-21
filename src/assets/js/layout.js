  var winddowsW = window.innerWidth; // New width
  menuDisplay(winddowsW);
  $(window).resize(function () {
    // This will execute whenever the window is resized
    // var winddowsH = $(window).height(); // New height
    this.winddowsW = window.innerWidth; // New width
    menuDisplay(this.winddowsW);
    // Date picker
    inlineDatepicker();
  });

  $(function() {
    $('#toggle-sidebar').on('click',function(){
      $('#sidebar').toggleClass('active');
    });
  });

  $(function() {
    $('.spin-link ul li').on('click',function(){
      $(this).not( ".disabled" ).addClass('active').siblings().removeClass('active');
    });
  });





  function menuDisplay($width) {
    if ($width > 576) {
      $('#sidebar').removeClass('active');
    }

  }

function inlineDatepicker() {
  var dpInlineWidth = $('.datepicker-inline').width();
  var marginx2 = ((dpInlineWidth / 7) / 2) - 18;
  $('.datepicker-inline table th').css({ 'margin-left': marginx2 + 'px', 'margin-right': marginx2 + 'px' })
  $('.datepicker-inline table td').css({ 'margin-left': marginx2 + 'px', 'margin-right': marginx2 + 'px' })
}

