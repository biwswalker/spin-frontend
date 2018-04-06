  var winddowsW = window.innerWidth; // New width
  this.menuDisplay(winddowsW);
  this.toggleSidebar();
  $(window).resize(function () {
    // This will execute whenever the window is resized
    // var winddowsH = $(window).height(); // New height
    this.winddowsW = window.innerWidth; // New width
    menuDisplay(this.winddowsW);
    // Date picker
    inlineDatepicker();
  });

  function toggleSidebar(){
    $(document).on('click','#toggle-sidebar',function(){
      $('#sidebar').toggleClass('active');
    });
  }

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

